(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('ractive'), require('hasher'), require('crossroads')) :
  typeof define === 'function' && define.amd ? define(['ractive', 'hasher', 'crossroads'], factory) :
  (global.RactiveRouter = factory(global.Ractive,global.hasher,global.crossroads));
}(this, function (Ractive,hasher,crossroads) { 'use strict';

  Ractive = 'default' in Ractive ? Ractive['default'] : Ractive;
  hasher = 'default' in hasher ? hasher['default'] : hasher;
  crossroads = 'default' in crossroads ? crossroads['default'] : crossroads;

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };

  var asyncGenerator = function () {
    function AwaitValue(value) {
      this.value = value;
    }

    function AsyncGenerator(gen) {
      var front, back;

      function send(key, arg) {
        return new Promise(function (resolve, reject) {
          var request = {
            key: key,
            arg: arg,
            resolve: resolve,
            reject: reject,
            next: null
          };

          if (back) {
            back = back.next = request;
          } else {
            front = back = request;
            resume(key, arg);
          }
        });
      }

      function resume(key, arg) {
        try {
          var result = gen[key](arg);
          var value = result.value;

          if (value instanceof AwaitValue) {
            Promise.resolve(value.value).then(function (arg) {
              resume("next", arg);
            }, function (arg) {
              resume("throw", arg);
            });
          } else {
            settle(result.done ? "return" : "normal", result.value);
          }
        } catch (err) {
          settle("throw", err);
        }
      }

      function settle(type, value) {
        switch (type) {
          case "return":
            front.resolve({
              value: value,
              done: true
            });
            break;

          case "throw":
            front.reject(value);
            break;

          default:
            front.resolve({
              value: value,
              done: false
            });
            break;
        }

        front = front.next;

        if (front) {
          resume(front.key, front.arg);
        } else {
          back = null;
        }
      }

      this._invoke = send;

      if (typeof gen.return !== "function") {
        this.return = undefined;
      }
    }

    if (typeof Symbol === "function" && Symbol.asyncIterator) {
      AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
        return this;
      };
    }

    AsyncGenerator.prototype.next = function (arg) {
      return this._invoke("next", arg);
    };

    AsyncGenerator.prototype.throw = function (arg) {
      return this._invoke("throw", arg);
    };

    AsyncGenerator.prototype.return = function (arg) {
      return this._invoke("return", arg);
    };

    return {
      wrap: function (fn) {
        return function () {
          return new AsyncGenerator(fn.apply(this, arguments));
        };
      },
      await: function (value) {
        return new AwaitValue(value);
      }
    };
  }();

  var RactiveRouter = Ractive.extend({
      template: '<main class="routeContainer"></main>',
      oninit: function oninit() {
          var _this = this;

          //Will hold all constructed crossroads Route objects, for a further use I didn't find yet
          this.routesObjects = [];

          //The current componet the Router displays at a time
          this.currentComponent = undefined;

          //Get user config
          this.routesConfig = this.get('routesConfig');

          //Register for every route, a callback that will display the matching Component
          Object.keys(this.routesConfig).map(function (routePattern) {

              var routeObject = crossroads.addRoute(routePattern, function () {
                  var routeConfig = this.routesConfig[routePattern];

                  //Build a Route Params Object that will be available in child Component Data
                  var routeParams = this.buildRouteParams(routePattern, arguments);

                  //Prepare Route callback, if applied
                  var callback = routeConfig.callback instanceof Function ? routeConfig.callback : undefined;

                  //Create the Route Component or just execute the Route Callback
                  if (routeConfig.component) {
                      this.currentComponent = new routeConfig.component({
                          el: this.find('main.routeContainer'),
                          data: {
                              routeParams: routeParams,
                              parentGlobals: this.get('globals')
                          },
                          oncomplete: function oncomplete() {
                              if (callback) callback(routeParams);
                          }
                      });
                  } else {
                      if (callback) callback(routeParams);
                  }
              }.bind(_this));
              _this.routesObjects.push(routeObject);
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
      onrender: function onrender() {
          //Hasher init
          var parseHash = function parseHash(newHash, oldHash) {
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
      buildRouteParams: function buildRouteParams(routePattern, values) {
          var routeParamNames = crossroads.patternLexer.getParamIds(routePattern);
          var result = routeParamNames.reduce(function (result, field, index) {
              var value = values[index];
              if (_typeof(values[index]) !== 'object') {
                  result[field] = values[index] || undefined;
              } else {
                  Object.keys(value).map(function (key) {
                      result[key] = value[key];
                  });
              }
              return result;
          }, {});
          return result;
      },
      navigateToHome: function navigateToHome() {
          var _this2 = this;

          var routePattern = Object.keys(this.routesConfig).find(function (patten) {
              return _this2.routesConfig[patten].index;
          });
          if (routePattern) {
              hasher.replaceHash(routePattern);
          }
      }
  });

  //Programatically navigate to a new route
  RactiveRouter.go = function (hash) {
      hasher.setHash(hash);
  };

  //Similar to Router.go(hash), but doesn't create a new record in browser history.
  RactiveRouter.replace = function (hash) {
      hasher.replaceHash(hash);
  };

  return RactiveRouter;

}));
//# sourceMappingURL=ractive-router.umd.js.map