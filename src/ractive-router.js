import Ractive from 'ractive';
import hasher from 'hasher';
import crossroads from 'crossroads';

let RactiveRouter = Ractive.extend({
    template: `<main class="routeContainer"></main>`,
    oninit () {
        //Will hold all constructed crossroads Route objects, for a further use I didn't find yet
        this.routesObjects = [];

        //The current componet the Router displays at a time
        this.currentComponent = undefined;

        //Get user config
        this.routesConfig = this.get('routesConfig');

        //Register for every route, a callback that will display the matching Component
        Object.keys(this.routesConfig).map((routePattern) => {

            let routeObject = crossroads.addRoute(routePattern, function () {
                let routeConfig = this.routesConfig[routePattern];

                //Build a Route Params Object that will be available in child Component Data
                let routeParams = this.buildRouteParams(routePattern, arguments);

                //Prepare Route callback, if applied
                let callback = routeConfig.callback instanceof Function ? routeConfig.callback : undefined;

                //Create the Route Component or just execute the Route Callback
                if (routeConfig.component) {
                    this.currentComponent = new routeConfig.component({
                        el: this.find('main.routeContainer'),
                        data: {
                            routeParams,
                            parentGlobals: this.get('globals')
                        },
                        oncomplete () {
                            if (callback) callback(routeParams);
                        }
                    });
                } else {
                    if (callback) callback(routeParams);
                }
            }.bind(this));
            this.routesObjects.push(routeObject);
        });

        //Observe Global Data and notify current route Component
        this.observe('globals', function (globals) {
            if (this.currentComponent && this.currentComponent.update) {
                this.currentComponent.update('parentGlobals');
            }
        });

        //Redirect Not found route to 404
        crossroads.bypassed.add(function () {
            hasher.replaceHash('404');
        });
    },
    onrender () {
        //Hasher init
        let parseHash = function (newHash, oldHash) {
            crossroads.parse(newHash);
        };
        hasher.initialized.add(parseHash);
        hasher.changed.add(parseHash);
        hasher.prependHash = '';
        hasher.init();

        //Launch home
        if (!location.hash) {
            this.navigateToHome();
        }
    },
    buildRouteParams (routePattern, values) {
        //Todo: Support Query Params here ?
        let routeParamNames = crossroads.patternLexer.getParamIds(routePattern);
        let result = routeParamNames.reduce((result, field, index) => {
            result[field] = values[index] || undefined;
            return result;
        }, {});
        return result;
    },
    navigateToHome () {
        var routePattern = Object.keys(this.routesConfig).find((patten)=> {
            return this.routesConfig[patten].index;
        });
        if (routePattern) {
            hasher.replaceHash(routePattern);
        }
    }
});

export default RactiveRouter;