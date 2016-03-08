import Ractive from 'ractive';
import hasher from 'hasher';
import crossroads from 'crossroads';

export default Ractive.extend({
    template: `
        <main class="routeContainer"></main>
    `,
    oninit () {
        this.routes = [];
        this.currentComponent = undefined;

        this.routesConfig = this.get('routesConfig');
        Object.keys(this.routesConfig).map((pattern) => {
            let routeConfig = this.routesConfig[pattern];
            let routeObject = crossroads.addRoute(pattern, function () {
                let container = this.find('main.routeContainer');
                //
                let values = arguments;
                let pathParamNames = crossroads.patternLexer.getParamIds(pattern);
                let pathParams = pathParamNames.reduce((result, field, index) => {
                    result[field] = values[index] || undefined;
                    return result;
                }, {});
                //
                let callback = routeConfig.callback instanceof Function ? routeConfig.callback : undefined;
                let component = routeConfig.component;
                if (component) {
                    this.currentComponent = new component({
                        el: container,
                        data: {
                            pathParams,
                            parentGlobals: this.get('globals')
                        },
                        oncomplete () {
                            if (callback) callback(pathParams);
                        }
                    });
                } else {
                    if (callback) callback(pathParams);
                }
            }.bind(this));
            this.routes.push(routeObject);
        });
        //
        this.observe('globals', function (globals) {
            if (this.currentComponent && this.currentComponent.update) {
                this.currentComponent.update('parentGlobals');
            }
        });
        //
        crossroads.bypassed.add(function () {
            hasher.replaceHash('404');
        });
    },
    onrender () {
        let parseHash = function (newHash, oldHash) {
            crossroads.parse(newHash);
        };
        hasher.initialized.add(parseHash);
        hasher.changed.add(parseHash);
        hasher.prependHash = '';
        hasher.init();
        //launch home
        if (!location.hash) {
            var pattern = Object.keys(this.routesConfig).find((patten)=> {
                return this.routesConfig[patten].index;
            });
            if (pattern) {
                hasher.replaceHash(pattern);
            }
        }
    }
});