(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('ractive'), require('hasher'), require('crossroads')) :
    typeof define === 'function' && define.amd ? define(['ractive', 'hasher', 'crossroads'], factory) :
    (global.Ractive = global.Ractive || {}, global.Ractive.router = factory(global.Ractive,global.hasher,global.crossroads));
}(this, function (Ractive,hasher,crossroads) { 'use strict';

    Ractive = 'default' in Ractive ? Ractive['default'] : Ractive;
    hasher = 'default' in hasher ? hasher['default'] : hasher;
    crossroads = 'default' in crossroads ? crossroads['default'] : crossroads;

    var ractiveRouter = Ractive.extend({
        template: '\n        <main class="routeContainer"></main>\n    ',
        oninit: function oninit() {
            var _this = this;

            this.routesConfig = this.get('config');
            this.routes = [];
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
                        new component({
                            el: container,
                            data: {
                                pathParams: pathParams
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

    return ractiveRouter;

}));
//# sourceMappingURL=ractive-router.umd.js.map