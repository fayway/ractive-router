import Ractive from 'ractive';
import hasher from 'hasher';
import crossroads from 'crossroads';

var ractiveRouter = Ractive.extend({
    template: '\n        <main class="routeContainer"></main>\n    ',
    oninit: function oninit() {
        var _this = this;

        this.routes = [];
        this.currentComponent = undefined;

        this.routesConfig = this.get('routesConfig');
        Object.keys(this.routesConfig).map(function (pattern) {
            var routeConfig = _this.routesConfig[pattern];
            var routeObject = crossroads.addRoute(pattern, function () {
                var container = this.find('main.routeContainer');
                //
                var values = arguments;
                var pathParamNames = crossroads.patternLexer.getParamIds(pattern);
                var pathParams = pathParamNames.reduce(function (result, field, index) {
                    result[field] = values[index] || undefined;
                    return result;
                }, {});
                //
                var callback = routeConfig.callback instanceof Function ? routeConfig.callback : undefined;
                var component = routeConfig.component;
                if (component) {
                    this.currentComponent = new component({
                        el: container,
                        data: {
                            pathParams: pathParams,
                            parentGlobals: this.get('globals')
                        },
                        oncomplete: function oncomplete() {
                            if (callback) callback(pathParams);
                        }
                    });
                } else {
                    if (callback) callback(pathParams);
                }
            }.bind(_this));
            _this.routes.push(routeObject);
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
    onrender: function onrender() {
        var _this2 = this;

        var parseHash = function parseHash(newHash, oldHash) {
            crossroads.parse(newHash);
        };
        hasher.initialized.add(parseHash);
        hasher.changed.add(parseHash);
        hasher.prependHash = '';
        hasher.init();
        //launch home
        if (!location.hash) {
            var pattern = Object.keys(this.routesConfig).find(function (patten) {
                return _this2.routesConfig[patten].index;
            });
            if (pattern) {
                hasher.replaceHash(pattern);
            }
        }
    }
});

export default ractiveRouter;
//# sourceMappingURL=ractive-router.es.js.map