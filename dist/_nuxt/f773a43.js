(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[6],{

/***/ 0:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export createGetCounter */
/* unused harmony export empty */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return globalHandleError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "m", function() { return interopDefault; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "l", function() { return hasFetch; });
/* unused harmony export purifyData */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return getChildrenComponentInstancesUsingFetch; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return applyAsyncData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "s", function() { return sanitizeComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return getMatchedComponents; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return getMatchedComponentsInstances; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return flatMapComponents; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "r", function() { return resolveRouteComponents; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return getRouteData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "t", function() { return setContext; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "o", function() { return middlewareSeries; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "q", function() { return promisify; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return getLocation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return compile; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return getQueryDiff; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "p", function() { return normalizeError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return addLifecycleHook; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "v", function() { return urlJoin; });
/* unused harmony export stripTrailingSlash */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "n", function() { return isSamePath; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "u", function() { return setScrollRestoration; });
/* harmony import */ var core_js_modules_es_array_from_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(58);
/* harmony import */ var core_js_modules_es_array_from_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_from_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(29);
/* harmony import */ var core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(59);
/* harmony import */ var core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(60);
/* harmony import */ var core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_object_get_own_property_descriptor_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(73);
/* harmony import */ var core_js_modules_es_object_get_own_property_descriptor_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_get_own_property_descriptor_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(28);
/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_es_object_get_own_property_descriptors_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(74);
/* harmony import */ var core_js_modules_es_object_get_own_property_descriptors_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_get_own_property_descriptors_js__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _babel_runtime_helpers_esm_typeof__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(37);
/* harmony import */ var _babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(13);
/* harmony import */ var _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(30);
/* harmony import */ var _babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(18);
/* harmony import */ var regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(72);
/* harmony import */ var regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(14);
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var core_js_modules_es_array_filter_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(49);
/* harmony import */ var core_js_modules_es_array_filter_js__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_filter_js__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var core_js_modules_es_object_entries_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(169);
/* harmony import */ var core_js_modules_es_object_entries_js__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_entries_js__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(46);
/* harmony import */ var core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(106);
/* harmony import */ var core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_16__);
/* harmony import */ var core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(47);
/* harmony import */ var core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_17__);
/* harmony import */ var core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(27);
/* harmony import */ var core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_18___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_18__);
/* harmony import */ var core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(32);
/* harmony import */ var core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_19___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_19__);
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(34);
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_20___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_20__);
/* harmony import */ var core_js_modules_es_array_slice_js__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(42);
/* harmony import */ var core_js_modules_es_array_slice_js__WEBPACK_IMPORTED_MODULE_21___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_slice_js__WEBPACK_IMPORTED_MODULE_21__);
/* harmony import */ var core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(24);
/* harmony import */ var core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_22___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_22__);
/* harmony import */ var core_js_modules_es_string_replace_js__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(79);
/* harmony import */ var core_js_modules_es_string_replace_js__WEBPACK_IMPORTED_MODULE_23___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_replace_js__WEBPACK_IMPORTED_MODULE_23__);
/* harmony import */ var core_js_modules_es_string_starts_with_js__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(170);
/* harmony import */ var core_js_modules_es_string_starts_with_js__WEBPACK_IMPORTED_MODULE_24___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_starts_with_js__WEBPACK_IMPORTED_MODULE_24__);
/* harmony import */ var core_js_modules_es_string_search_js__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(171);
/* harmony import */ var core_js_modules_es_string_search_js__WEBPACK_IMPORTED_MODULE_25___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_search_js__WEBPACK_IMPORTED_MODULE_25__);
/* harmony import */ var core_js_modules_es_regexp_constructor_js__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(233);
/* harmony import */ var core_js_modules_es_regexp_constructor_js__WEBPACK_IMPORTED_MODULE_26___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_constructor_js__WEBPACK_IMPORTED_MODULE_26__);
/* harmony import */ var core_js_modules_es_regexp_to_string_js__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(101);
/* harmony import */ var core_js_modules_es_regexp_to_string_js__WEBPACK_IMPORTED_MODULE_27___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_to_string_js__WEBPACK_IMPORTED_MODULE_27__);
/* harmony import */ var core_js_modules_es_array_join_js__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(173);
/* harmony import */ var core_js_modules_es_array_join_js__WEBPACK_IMPORTED_MODULE_28___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_join_js__WEBPACK_IMPORTED_MODULE_28__);
/* harmony import */ var core_js_modules_es_string_repeat_js__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(235);
/* harmony import */ var core_js_modules_es_string_repeat_js__WEBPACK_IMPORTED_MODULE_29___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_repeat_js__WEBPACK_IMPORTED_MODULE_29__);
/* harmony import */ var core_js_modules_es_array_includes_js__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(95);
/* harmony import */ var core_js_modules_es_array_includes_js__WEBPACK_IMPORTED_MODULE_30___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_includes_js__WEBPACK_IMPORTED_MODULE_30__);
/* harmony import */ var core_js_modules_es_string_includes_js__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(96);
/* harmony import */ var core_js_modules_es_string_includes_js__WEBPACK_IMPORTED_MODULE_31___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_includes_js__WEBPACK_IMPORTED_MODULE_31__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(1);
/* harmony import */ var ufo__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(25);













function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_9__[/* default */ "a"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }






















 // window.{{globals.loadedCallback}} hook
// Useful for jsdom testing or plugins (https://github.com/tmpvar/jsdom#dealing-with-asynchronous-script-loading)

if (true) {
  window.onNuxtReadyCbs = [];

  window.onNuxtReady = function (cb) {
    window.onNuxtReadyCbs.push(cb);
  };
}

function createGetCounter(counterObject) {
  var defaultKey = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  return function getCounter() {
    var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultKey;

    if (counterObject[id] === undefined) {
      counterObject[id] = 0;
    }

    return counterObject[id]++;
  };
}
function empty() {}
function globalHandleError(error) {
  if (vue__WEBPACK_IMPORTED_MODULE_32__[/* default */ "a"].config.errorHandler) {
    vue__WEBPACK_IMPORTED_MODULE_32__[/* default */ "a"].config.errorHandler(error);
  }
}
function interopDefault(promise) {
  return promise.then(function (m) {
    return m.default || m;
  });
}
function hasFetch(vm) {
  return vm.$options && typeof vm.$options.fetch === 'function' && !vm.$options.fetch.length;
}
function purifyData(data) {
  if (true) {
    return data;
  }

  return Object.entries(data).filter(function (_ref) {
    var _ref2 = Object(_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"])(_ref, 2),
        key = _ref2[0],
        value = _ref2[1];

    var valid = !(value instanceof Function) && !(value instanceof Promise);

    if (!valid) {
      console.warn("".concat(key, " is not able to be stringified. This will break in a production environment."));
    }

    return valid;
  }).reduce(function (obj, _ref3) {
    var _ref4 = Object(_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"])(_ref3, 2),
        key = _ref4[0],
        value = _ref4[1];

    obj[key] = value;
    return obj;
  }, {});
}
function getChildrenComponentInstancesUsingFetch(vm) {
  var instances = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var children = vm.$children || [];

  var _iterator = _createForOfIteratorHelper(children),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var child = _step.value;

      if (child.$fetch) {
        instances.push(child);
        continue; // Don't get the children since it will reload the template
      }

      if (child.$children) {
        getChildrenComponentInstancesUsingFetch(child, instances);
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return instances;
}
function applyAsyncData(Component, asyncData) {
  if ( // For SSR, we once all this function without second param to just apply asyncData
  // Prevent doing this for each SSR request
  !asyncData && Component.options.__hasNuxtData) {
    return;
  }

  var ComponentData = Component.options._originDataFn || Component.options.data || function () {
    return {};
  };

  Component.options._originDataFn = ComponentData;

  Component.options.data = function () {
    var data = ComponentData.call(this, this);

    if (this.$ssrContext) {
      asyncData = this.$ssrContext.asyncData[Component.cid];
    }

    return _objectSpread(_objectSpread({}, data), asyncData);
  };

  Component.options.__hasNuxtData = true;

  if (Component._Ctor && Component._Ctor.options) {
    Component._Ctor.options.data = Component.options.data;
  }
}
function sanitizeComponent(Component) {
  // If Component already sanitized
  if (Component.options && Component._Ctor === Component) {
    return Component;
  }

  if (!Component.options) {
    Component = vue__WEBPACK_IMPORTED_MODULE_32__[/* default */ "a"].extend(Component); // fix issue #6

    Component._Ctor = Component;
  } else {
    Component._Ctor = Component;
    Component.extendOptions = Component.options;
  } // If no component name defined, set file path as name, (also fixes #5703)


  if (!Component.options.name && Component.options.__file) {
    Component.options.name = Component.options.__file;
  }

  return Component;
}
function getMatchedComponents(route) {
  var matches = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var prop = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'components';
  return Array.prototype.concat.apply([], route.matched.map(function (m, index) {
    return Object.keys(m[prop]).map(function (key) {
      matches && matches.push(index);
      return m[prop][key];
    });
  }));
}
function getMatchedComponentsInstances(route) {
  var matches = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  return getMatchedComponents(route, matches, 'instances');
}
function flatMapComponents(route, fn) {
  return Array.prototype.concat.apply([], route.matched.map(function (m, index) {
    return Object.keys(m.components).reduce(function (promises, key) {
      if (m.components[key]) {
        promises.push(fn(m.components[key], m.instances[key], m, key, index));
      } else {
        delete m.components[key];
      }

      return promises;
    }, []);
  }));
}
function resolveRouteComponents(route, fn) {
  return Promise.all(flatMapComponents(route, /*#__PURE__*/function () {
    var _ref5 = Object(_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"])( /*#__PURE__*/regeneratorRuntime.mark(function _callee(Component, instance, match, key) {
      var timeNow, previousReloadTime;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(typeof Component === 'function' && !Component.options)) {
                _context.next = 11;
                break;
              }

              _context.prev = 1;
              _context.next = 4;
              return Component();

            case 4:
              Component = _context.sent;
              _context.next = 11;
              break;

            case 7:
              _context.prev = 7;
              _context.t0 = _context["catch"](1);

              // Handle webpack chunk loading errors
              // This may be due to a new deployment or a network problem
              if (_context.t0 && _context.t0.name === 'ChunkLoadError' && typeof window !== 'undefined' && window.sessionStorage) {
                timeNow = Date.now();
                previousReloadTime = parseInt(window.sessionStorage.getItem('nuxt-reload')); // check for previous reload time not to reload infinitely

                if (!previousReloadTime || previousReloadTime + 60000 < timeNow) {
                  window.sessionStorage.setItem('nuxt-reload', timeNow);
                  window.location.reload(true
                  /* skip cache */
                  );
                }
              }

              throw _context.t0;

            case 11:
              match.components[key] = Component = sanitizeComponent(Component);
              return _context.abrupt("return", typeof fn === 'function' ? fn(Component, instance, match, key) : Component);

            case 13:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[1, 7]]);
    }));

    return function (_x, _x2, _x3, _x4) {
      return _ref5.apply(this, arguments);
    };
  }()));
}
function getRouteData(_x5) {
  return _getRouteData.apply(this, arguments);
}

function _getRouteData() {
  _getRouteData = Object(_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"])( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(route) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (route) {
              _context2.next = 2;
              break;
            }

            return _context2.abrupt("return");

          case 2:
            _context2.next = 4;
            return resolveRouteComponents(route);

          case 4:
            return _context2.abrupt("return", _objectSpread(_objectSpread({}, route), {}, {
              meta: getMatchedComponents(route).map(function (Component, index) {
                return _objectSpread(_objectSpread({}, Component.options.meta), (route.matched[index] || {}).meta);
              })
            }));

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _getRouteData.apply(this, arguments);
}

function setContext(_x6, _x7) {
  return _setContext.apply(this, arguments);
}

function _setContext() {
  _setContext = Object(_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"])( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(app, context) {
    var _yield$Promise$all, _yield$Promise$all2, currentRouteData, fromRouteData;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            // If context not defined, create it
            if (!app.context) {
              app.context = {
                isStatic: true,
                isDev: false,
                isHMR: false,
                app: app,
                store: app.store,
                payload: context.payload,
                error: context.error,
                base: app.router.options.base,
                env: {}
              }; // Only set once

              if (context.req) {
                app.context.req = context.req;
              }

              if (context.res) {
                app.context.res = context.res;
              }

              if (context.ssrContext) {
                app.context.ssrContext = context.ssrContext;
              }

              app.context.redirect = function (status, path, query) {
                if (!status) {
                  return;
                }

                app.context._redirected = true; // if only 1 or 2 arguments: redirect('/') or redirect('/', { foo: 'bar' })

                var pathType = Object(_babel_runtime_helpers_esm_typeof__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"])(path);

                if (typeof status !== 'number' && (pathType === 'undefined' || pathType === 'object')) {
                  query = path || {};
                  path = status;
                  pathType = Object(_babel_runtime_helpers_esm_typeof__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"])(path);
                  status = 302;
                }

                if (pathType === 'object') {
                  path = app.router.resolve(path).route.fullPath;
                } // "/absolute/route", "./relative/route" or "../relative/route"


                if (/(^[.]{1,2}\/)|(^\/(?!\/))/.test(path)) {
                  app.context.next({
                    path: path,
                    query: query,
                    status: status
                  });
                } else {
                  path = Object(ufo__WEBPACK_IMPORTED_MODULE_33__[/* withQuery */ "d"])(path, query);

                  if (false) {}

                  if (true) {
                    // https://developer.mozilla.org/en-US/docs/Web/API/Location/replace
                    window.location.replace(path); // Throw a redirect error

                    throw new Error('ERR_REDIRECT');
                  }
                }
              };

              if (false) {}

              if (true) {
                app.context.nuxtState = window.__NUXT__;
              }
            } // Dynamic keys


            _context3.next = 3;
            return Promise.all([getRouteData(context.route), getRouteData(context.from)]);

          case 3:
            _yield$Promise$all = _context3.sent;
            _yield$Promise$all2 = Object(_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"])(_yield$Promise$all, 2);
            currentRouteData = _yield$Promise$all2[0];
            fromRouteData = _yield$Promise$all2[1];

            if (context.route) {
              app.context.route = currentRouteData;
            }

            if (context.from) {
              app.context.from = fromRouteData;
            }

            app.context.next = context.next;
            app.context._redirected = false;
            app.context._errored = false;
            app.context.isHMR = false;
            app.context.params = app.context.route.params || {};
            app.context.query = app.context.route.query || {};

          case 15:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _setContext.apply(this, arguments);
}

function middlewareSeries(promises, appContext) {
  if (!promises.length || appContext._redirected || appContext._errored) {
    return Promise.resolve();
  }

  return promisify(promises[0], appContext).then(function () {
    return middlewareSeries(promises.slice(1), appContext);
  });
}
function promisify(fn, context) {
  var promise;

  if (fn.length === 2) {
    // fn(context, callback)
    promise = new Promise(function (resolve) {
      fn(context, function (err, data) {
        if (err) {
          context.error(err);
        }

        data = data || {};
        resolve(data);
      });
    });
  } else {
    promise = fn(context);
  }

  if (promise && promise instanceof Promise && typeof promise.then === 'function') {
    return promise;
  }

  return Promise.resolve(promise);
} // Imported from vue-router

function getLocation(base, mode) {
  if (mode === 'hash') {
    return window.location.hash.replace(/^#\//, '');
  }

  base = decodeURI(base).slice(0, -1); // consideration is base is normalized with trailing slash

  var path = decodeURI(window.location.pathname);

  if (base && path.startsWith(base)) {
    path = path.slice(base.length);
  }

  var fullPath = (path || '/') + window.location.search + window.location.hash;
  return Object(ufo__WEBPACK_IMPORTED_MODULE_33__[/* normalizeURL */ "c"])(fullPath);
} // Imported from path-to-regexp

/**
 * Compile a string to a template function for the path.
 *
 * @param  {string}             str
 * @param  {Object=}            options
 * @return {!function(Object=, Object=)}
 */

function compile(str, options) {
  return tokensToFunction(parse(str, options), options);
}
function getQueryDiff(toQuery, fromQuery) {
  var diff = {};

  var queries = _objectSpread(_objectSpread({}, toQuery), fromQuery);

  for (var k in queries) {
    if (String(toQuery[k]) !== String(fromQuery[k])) {
      diff[k] = true;
    }
  }

  return diff;
}
function normalizeError(err) {
  var message;

  if (!(err.message || typeof err === 'string')) {
    try {
      message = JSON.stringify(err, null, 2);
    } catch (e) {
      message = "[".concat(err.constructor.name, "]");
    }
  } else {
    message = err.message || err;
  }

  return _objectSpread(_objectSpread({}, err), {}, {
    message: message,
    statusCode: err.statusCode || err.status || err.response && err.response.status || 500
  });
}
/**
 * The main path matching regexp utility.
 *
 * @type {RegExp}
 */

var PATH_REGEXP = new RegExp([// Match escaped characters that would otherwise appear in future matches.
// This allows the user to escape special characters that won't transform.
'(\\\\.)', // Match Express-style parameters and un-named parameters with a prefix
// and optional suffixes. Matches appear as:
//
// "/:test(\\d+)?" => ["/", "test", "\d+", undefined, "?", undefined]
// "/route(\\d+)"  => [undefined, undefined, undefined, "\d+", undefined, undefined]
// "/*"            => ["/", undefined, undefined, undefined, undefined, "*"]
'([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))'].join('|'), 'g');
/**
 * Parse a string for the raw tokens.
 *
 * @param  {string}  str
 * @param  {Object=} options
 * @return {!Array}
 */

function parse(str, options) {
  var tokens = [];
  var key = 0;
  var index = 0;
  var path = '';
  var defaultDelimiter = options && options.delimiter || '/';
  var res;

  while ((res = PATH_REGEXP.exec(str)) != null) {
    var m = res[0];
    var escaped = res[1];
    var offset = res.index;
    path += str.slice(index, offset);
    index = offset + m.length; // Ignore already escaped sequences.

    if (escaped) {
      path += escaped[1];
      continue;
    }

    var next = str[index];
    var prefix = res[2];
    var name = res[3];
    var capture = res[4];
    var group = res[5];
    var modifier = res[6];
    var asterisk = res[7]; // Push the current path onto the tokens.

    if (path) {
      tokens.push(path);
      path = '';
    }

    var partial = prefix != null && next != null && next !== prefix;
    var repeat = modifier === '+' || modifier === '*';
    var optional = modifier === '?' || modifier === '*';
    var delimiter = res[2] || defaultDelimiter;
    var pattern = capture || group;
    tokens.push({
      name: name || key++,
      prefix: prefix || '',
      delimiter: delimiter,
      optional: optional,
      repeat: repeat,
      partial: partial,
      asterisk: Boolean(asterisk),
      pattern: pattern ? escapeGroup(pattern) : asterisk ? '.*' : '[^' + escapeString(delimiter) + ']+?'
    });
  } // Match any characters still remaining.


  if (index < str.length) {
    path += str.substr(index);
  } // If the path exists, push it onto the end.


  if (path) {
    tokens.push(path);
  }

  return tokens;
}
/**
 * Prettier encoding of URI path segments.
 *
 * @param  {string}
 * @return {string}
 */


function encodeURIComponentPretty(str, slashAllowed) {
  var re = slashAllowed ? /[?#]/g : /[/?#]/g;
  return encodeURI(str).replace(re, function (c) {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase();
  });
}
/**
 * Encode the asterisk parameter. Similar to `pretty`, but allows slashes.
 *
 * @param  {string}
 * @return {string}
 */


function encodeAsterisk(str) {
  return encodeURIComponentPretty(str, true);
}
/**
 * Escape a regular expression string.
 *
 * @param  {string} str
 * @return {string}
 */


function escapeString(str) {
  return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, '\\$1');
}
/**
 * Escape the capturing group by escaping special characters and meaning.
 *
 * @param  {string} group
 * @return {string}
 */


function escapeGroup(group) {
  return group.replace(/([=!:$/()])/g, '\\$1');
}
/**
 * Expose a method for transforming tokens into the path function.
 */


function tokensToFunction(tokens, options) {
  // Compile all the tokens into regexps.
  var matches = new Array(tokens.length); // Compile all the patterns before compilation.

  for (var i = 0; i < tokens.length; i++) {
    if (Object(_babel_runtime_helpers_esm_typeof__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"])(tokens[i]) === 'object') {
      matches[i] = new RegExp('^(?:' + tokens[i].pattern + ')$', flags(options));
    }
  }

  return function (obj, opts) {
    var path = '';
    var data = obj || {};
    var options = opts || {};
    var encode = options.pretty ? encodeURIComponentPretty : encodeURIComponent;

    for (var _i = 0; _i < tokens.length; _i++) {
      var token = tokens[_i];

      if (typeof token === 'string') {
        path += token;
        continue;
      }

      var value = data[token.name || 'pathMatch'];
      var segment = void 0;

      if (value == null) {
        if (token.optional) {
          // Prepend partial segment prefixes.
          if (token.partial) {
            path += token.prefix;
          }

          continue;
        } else {
          throw new TypeError('Expected "' + token.name + '" to be defined');
        }
      }

      if (Array.isArray(value)) {
        if (!token.repeat) {
          throw new TypeError('Expected "' + token.name + '" to not repeat, but received `' + JSON.stringify(value) + '`');
        }

        if (value.length === 0) {
          if (token.optional) {
            continue;
          } else {
            throw new TypeError('Expected "' + token.name + '" to not be empty');
          }
        }

        for (var j = 0; j < value.length; j++) {
          segment = encode(value[j]);

          if (!matches[_i].test(segment)) {
            throw new TypeError('Expected all "' + token.name + '" to match "' + token.pattern + '", but received `' + JSON.stringify(segment) + '`');
          }

          path += (j === 0 ? token.prefix : token.delimiter) + segment;
        }

        continue;
      }

      segment = token.asterisk ? encodeAsterisk(value) : encode(value);

      if (!matches[_i].test(segment)) {
        throw new TypeError('Expected "' + token.name + '" to match "' + token.pattern + '", but received "' + segment + '"');
      }

      path += token.prefix + segment;
    }

    return path;
  };
}
/**
 * Get the flags for a regexp from the options.
 *
 * @param  {Object} options
 * @return {string}
 */


function flags(options) {
  return options && options.sensitive ? '' : 'i';
}

function addLifecycleHook(vm, hook, fn) {
  if (!vm.$options[hook]) {
    vm.$options[hook] = [];
  }

  if (!vm.$options[hook].includes(fn)) {
    vm.$options[hook].push(fn);
  }
}
var urlJoin = ufo__WEBPACK_IMPORTED_MODULE_33__[/* joinURL */ "b"];
var stripTrailingSlash = ufo__WEBPACK_IMPORTED_MODULE_33__[/* withoutTrailingSlash */ "e"];
var isSamePath = ufo__WEBPACK_IMPORTED_MODULE_33__[/* isSamePath */ "a"];
function setScrollRestoration(newVal) {
  try {
    window.history.scrollRestoration = newVal;
  } catch (e) {}
}

/***/ }),

/***/ 105:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var core_js_modules_web_timers_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(98);
/* harmony import */ var core_js_modules_web_timers_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_timers_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(14);
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(28);
/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_array_includes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(95);
/* harmony import */ var core_js_modules_es_array_includes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_includes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_string_includes_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(96);
/* harmony import */ var core_js_modules_es_string_includes_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_includes_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(47);
/* harmony import */ var core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_es_array_filter_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(49);
/* harmony import */ var core_js_modules_es_array_filter_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_filter_js__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var core_js_modules_es_array_slice_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(42);
/* harmony import */ var core_js_modules_es_array_slice_js__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_slice_js__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(46);
/* harmony import */ var core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var core_js_modules_es_array_from_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(58);
/* harmony import */ var core_js_modules_es_array_from_js__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_from_js__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(32);
/* harmony import */ var core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(24);
/* harmony import */ var core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(29);
/* harmony import */ var core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(59);
/* harmony import */ var core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(60);
/* harmony import */ var core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(34);
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(1);
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }



















var requestIdleCallback = window.requestIdleCallback || function (cb) {
  var start = Date.now();
  return setTimeout(function () {
    cb({
      didTimeout: false,
      timeRemaining: function timeRemaining() {
        return Math.max(0, 50 - (Date.now() - start));
      }
    });
  }, 1);
};

var cancelIdleCallback = window.cancelIdleCallback || function (id) {
  clearTimeout(id);
};

var observer = window.IntersectionObserver && new window.IntersectionObserver(function (entries) {
  entries.forEach(function (_ref) {
    var intersectionRatio = _ref.intersectionRatio,
        link = _ref.target;

    if (intersectionRatio <= 0 || !link.__prefetch) {
      return;
    }

    link.__prefetch();
  });
});
/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'NuxtLink',
  extends: vue__WEBPACK_IMPORTED_MODULE_16__[/* default */ "a"].component('RouterLink'),
  props: {
    prefetch: {
      type: Boolean,
      default: true
    },
    noPrefetch: {
      type: Boolean,
      default: false
    }
  },
  mounted: function mounted() {
    if (this.prefetch && !this.noPrefetch) {
      this.handleId = requestIdleCallback(this.observe, {
        timeout: 2e3
      });
    }
  },
  beforeDestroy: function beforeDestroy() {
    cancelIdleCallback(this.handleId);

    if (this.__observed) {
      observer.unobserve(this.$el);
      delete this.$el.__prefetch;
    }
  },
  methods: {
    observe: function observe() {
      // If no IntersectionObserver, avoid prefetching
      if (!observer) {
        return;
      } // Add to observer


      if (this.shouldPrefetch()) {
        this.$el.__prefetch = this.prefetchLink.bind(this);
        observer.observe(this.$el);
        this.__observed = true;
      }
    },
    shouldPrefetch: function shouldPrefetch() {
      return this.getPrefetchComponents().length > 0;
    },
    canPrefetch: function canPrefetch() {
      var conn = navigator.connection;
      var hasBadConnection = this.$nuxt.isOffline || conn && ((conn.effectiveType || '').includes('2g') || conn.saveData);
      return !hasBadConnection;
    },
    getPrefetchComponents: function getPrefetchComponents() {
      var ref = this.$router.resolve(this.to, this.$route, this.append);
      var Components = ref.resolved.matched.map(function (r) {
        return r.components.default;
      });
      return Components.filter(function (Component) {
        return typeof Component === 'function' && !Component.options && !Component.__prefetched;
      });
    },
    prefetchLink: function prefetchLink() {
      if (!this.canPrefetch()) {
        return;
      } // Stop observing this link (in case of internet connection changes)


      observer.unobserve(this.$el);
      var Components = this.getPrefetchComponents();

      var _iterator = _createForOfIteratorHelper(Components),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var Component = _step.value;
          var componentOrPromise = Component();

          if (componentOrPromise instanceof Promise) {
            componentOrPromise.catch(function () {});
          }

          Component.__prefetched = true;
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }
});

/***/ }),

/***/ 107:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (useSourceMap) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item, useSourceMap);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join('');
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === 'string') {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, '']];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

function cssWithMappingToString(item, useSourceMap) {
  var content = item[1] || ''; // eslint-disable-next-line prefer-destructuring

  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (useSourceMap && typeof btoa === 'function') {
    var sourceMapping = toComment(cssMapping);
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || '').concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
  }

  return [content].join('\n');
} // Adapted from convert-source-map (MIT)


function toComment(sourceMap) {
  // eslint-disable-next-line no-undef
  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
  var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
  return "/*# ".concat(data, " */");
}

/***/ }),

/***/ 108:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "default", function() { return /* binding */ addStylesClient; });

// CONCATENATED MODULE: ./node_modules/vue-style-loader/lib/listToStyles.js
/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}

// CONCATENATED MODULE: ./node_modules/vue-style-loader/lib/addStylesClient.js
/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/



var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}
var options = null
var ssrIdKey = 'data-vue-ssr-id'

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

function addStylesClient (parentId, list, _isProduction, _options) {
  isProduction = _isProduction

  options = _options || {}

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[' + ssrIdKey + '~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }
  if (options.ssrId) {
    styleElement.setAttribute(ssrIdKey, obj.id)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),

/***/ 130:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var middleware = {};
/* harmony default export */ __webpack_exports__["a"] = (middleware);

/***/ }),

/***/ 131:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * vue-client-only v0.0.0-semantic-release
 * (c) 2021-present egoist <0x142857@gmail.com>
 * Released under the MIT License.
 */


var index = {
  name: 'ClientOnly',
  functional: true,
  props: {
    placeholder: String,
    placeholderTag: {
      type: String,
      default: 'div'
    }
  },
  render: function render(h, ref) {
    var parent = ref.parent;
    var slots = ref.slots;
    var props = ref.props;

    var ref$1 = slots();
    var defaultSlot = ref$1.default; if ( defaultSlot === void 0 ) defaultSlot = [];
    var placeholderSlot = ref$1.placeholder;

    if (parent._isMounted) {
      return defaultSlot
    }

    parent.$once('hook:mounted', function () {
      parent.$forceUpdate();
    });

    if (props.placeholderTag && (props.placeholder || placeholderSlot)) {
      return h(
        props.placeholderTag,
        {
          class: ['client-only-placeholder']
        },
        props.placeholder || placeholderSlot
      )
    }

    // Return a placeholder element for each child in the default slot
    // Or if no children return a single placeholder
    return defaultSlot.length > 0 ? defaultSlot.map(function () { return h(false); }) : h(false)
  }
};

module.exports = index;


/***/ }),

/***/ 133:
/***/ (function(module, exports) {

module.exports={
	"jet":[{"index":0,"rgb":[0,0,131]},{"index":0.125,"rgb":[0,60,170]},{"index":0.375,"rgb":[5,255,255]},{"index":0.625,"rgb":[255,255,0]},{"index":0.875,"rgb":[250,0,0]},{"index":1,"rgb":[128,0,0]}],

	"hsv":[{"index":0,"rgb":[255,0,0]},{"index":0.169,"rgb":[253,255,2]},{"index":0.173,"rgb":[247,255,2]},{"index":0.337,"rgb":[0,252,4]},{"index":0.341,"rgb":[0,252,10]},{"index":0.506,"rgb":[1,249,255]},{"index":0.671,"rgb":[2,0,253]},{"index":0.675,"rgb":[8,0,253]},{"index":0.839,"rgb":[255,0,251]},{"index":0.843,"rgb":[255,0,245]},{"index":1,"rgb":[255,0,6]}],

	"hot":[{"index":0,"rgb":[0,0,0]},{"index":0.3,"rgb":[230,0,0]},{"index":0.6,"rgb":[255,210,0]},{"index":1,"rgb":[255,255,255]}],

	"spring":[{"index":0,"rgb":[255,0,255]},{"index":1,"rgb":[255,255,0]}],

	"summer":[{"index":0,"rgb":[0,128,102]},{"index":1,"rgb":[255,255,102]}],

	"autumn":[{"index":0,"rgb":[255,0,0]},{"index":1,"rgb":[255,255,0]}],

	"winter":[{"index":0,"rgb":[0,0,255]},{"index":1,"rgb":[0,255,128]}],

	"bone":[{"index":0,"rgb":[0,0,0]},{"index":0.376,"rgb":[84,84,116]},{"index":0.753,"rgb":[169,200,200]},{"index":1,"rgb":[255,255,255]}],

	"copper":[{"index":0,"rgb":[0,0,0]},{"index":0.804,"rgb":[255,160,102]},{"index":1,"rgb":[255,199,127]}],

	"greys":[{"index":0,"rgb":[0,0,0]},{"index":1,"rgb":[255,255,255]}],

	"yignbu":[{"index":0,"rgb":[8,29,88]},{"index":0.125,"rgb":[37,52,148]},{"index":0.25,"rgb":[34,94,168]},{"index":0.375,"rgb":[29,145,192]},{"index":0.5,"rgb":[65,182,196]},{"index":0.625,"rgb":[127,205,187]},{"index":0.75,"rgb":[199,233,180]},{"index":0.875,"rgb":[237,248,217]},{"index":1,"rgb":[255,255,217]}],

	"greens":[{"index":0,"rgb":[0,68,27]},{"index":0.125,"rgb":[0,109,44]},{"index":0.25,"rgb":[35,139,69]},{"index":0.375,"rgb":[65,171,93]},{"index":0.5,"rgb":[116,196,118]},{"index":0.625,"rgb":[161,217,155]},{"index":0.75,"rgb":[199,233,192]},{"index":0.875,"rgb":[229,245,224]},{"index":1,"rgb":[247,252,245]}],

	"yiorrd":[{"index":0,"rgb":[128,0,38]},{"index":0.125,"rgb":[189,0,38]},{"index":0.25,"rgb":[227,26,28]},{"index":0.375,"rgb":[252,78,42]},{"index":0.5,"rgb":[253,141,60]},{"index":0.625,"rgb":[254,178,76]},{"index":0.75,"rgb":[254,217,118]},{"index":0.875,"rgb":[255,237,160]},{"index":1,"rgb":[255,255,204]}],

	"bluered":[{"index":0,"rgb":[0,0,255]},{"index":1,"rgb":[255,0,0]}],

	"rdbu":[{"index":0,"rgb":[5,10,172]},{"index":0.35,"rgb":[106,137,247]},{"index":0.5,"rgb":[190,190,190]},{"index":0.6,"rgb":[220,170,132]},{"index":0.7,"rgb":[230,145,90]},{"index":1,"rgb":[178,10,28]}],

	"picnic":[{"index":0,"rgb":[0,0,255]},{"index":0.1,"rgb":[51,153,255]},{"index":0.2,"rgb":[102,204,255]},{"index":0.3,"rgb":[153,204,255]},{"index":0.4,"rgb":[204,204,255]},{"index":0.5,"rgb":[255,255,255]},{"index":0.6,"rgb":[255,204,255]},{"index":0.7,"rgb":[255,153,255]},{"index":0.8,"rgb":[255,102,204]},{"index":0.9,"rgb":[255,102,102]},{"index":1,"rgb":[255,0,0]}],

	"rainbow":[{"index":0,"rgb":[150,0,90]},{"index":0.125,"rgb":[0,0,200]},{"index":0.25,"rgb":[0,25,255]},{"index":0.375,"rgb":[0,152,255]},{"index":0.5,"rgb":[44,255,150]},{"index":0.625,"rgb":[151,255,0]},{"index":0.75,"rgb":[255,234,0]},{"index":0.875,"rgb":[255,111,0]},{"index":1,"rgb":[255,0,0]}],

	"portland":[{"index":0,"rgb":[12,51,131]},{"index":0.25,"rgb":[10,136,186]},{"index":0.5,"rgb":[242,211,56]},{"index":0.75,"rgb":[242,143,56]},{"index":1,"rgb":[217,30,30]}],

	"blackbody":[{"index":0,"rgb":[0,0,0]},{"index":0.2,"rgb":[230,0,0]},{"index":0.4,"rgb":[230,210,0]},{"index":0.7,"rgb":[255,255,255]},{"index":1,"rgb":[160,200,255]}],

	"earth":[{"index":0,"rgb":[0,0,130]},{"index":0.1,"rgb":[0,180,180]},{"index":0.2,"rgb":[40,210,40]},{"index":0.4,"rgb":[230,230,50]},{"index":0.6,"rgb":[120,70,20]},{"index":1,"rgb":[255,255,255]}],

	"electric":[{"index":0,"rgb":[0,0,0]},{"index":0.15,"rgb":[30,0,100]},{"index":0.4,"rgb":[120,0,100]},{"index":0.6,"rgb":[160,90,0]},{"index":0.8,"rgb":[230,200,0]},{"index":1,"rgb":[255,250,220]}],

	"alpha": [{"index":0, "rgb": [255,255,255,0]},{"index":1, "rgb": [255,255,255,1]}],

	"viridis": [{"index":0,"rgb":[68,1,84]},{"index":0.13,"rgb":[71,44,122]},{"index":0.25,"rgb":[59,81,139]},{"index":0.38,"rgb":[44,113,142]},{"index":0.5,"rgb":[33,144,141]},{"index":0.63,"rgb":[39,173,129]},{"index":0.75,"rgb":[92,200,99]},{"index":0.88,"rgb":[170,220,50]},{"index":1,"rgb":[253,231,37]}],

	"inferno": [{"index":0,"rgb":[0,0,4]},{"index":0.13,"rgb":[31,12,72]},{"index":0.25,"rgb":[85,15,109]},{"index":0.38,"rgb":[136,34,106]},{"index":0.5,"rgb":[186,54,85]},{"index":0.63,"rgb":[227,89,51]},{"index":0.75,"rgb":[249,140,10]},{"index":0.88,"rgb":[249,201,50]},{"index":1,"rgb":[252,255,164]}],

	"magma": [{"index":0,"rgb":[0,0,4]},{"index":0.13,"rgb":[28,16,68]},{"index":0.25,"rgb":[79,18,123]},{"index":0.38,"rgb":[129,37,129]},{"index":0.5,"rgb":[181,54,122]},{"index":0.63,"rgb":[229,80,100]},{"index":0.75,"rgb":[251,135,97]},{"index":0.88,"rgb":[254,194,135]},{"index":1,"rgb":[252,253,191]}],

	"plasma": [{"index":0,"rgb":[13,8,135]},{"index":0.13,"rgb":[75,3,161]},{"index":0.25,"rgb":[125,3,168]},{"index":0.38,"rgb":[168,34,150]},{"index":0.5,"rgb":[203,70,121]},{"index":0.63,"rgb":[229,107,93]},{"index":0.75,"rgb":[248,148,65]},{"index":0.88,"rgb":[253,195,40]},{"index":1,"rgb":[240,249,33]}],

	"warm": [{"index":0,"rgb":[125,0,179]},{"index":0.13,"rgb":[172,0,187]},{"index":0.25,"rgb":[219,0,170]},{"index":0.38,"rgb":[255,0,130]},{"index":0.5,"rgb":[255,63,74]},{"index":0.63,"rgb":[255,123,0]},{"index":0.75,"rgb":[234,176,0]},{"index":0.88,"rgb":[190,228,0]},{"index":1,"rgb":[147,255,0]}],

	"cool": [{"index":0,"rgb":[125,0,179]},{"index":0.13,"rgb":[116,0,218]},{"index":0.25,"rgb":[98,74,237]},{"index":0.38,"rgb":[68,146,231]},{"index":0.5,"rgb":[0,204,197]},{"index":0.63,"rgb":[0,247,146]},{"index":0.75,"rgb":[0,255,88]},{"index":0.88,"rgb":[40,255,8]},{"index":1,"rgb":[147,255,0]}],

	"rainbow-soft": [{"index":0,"rgb":[125,0,179]},{"index":0.1,"rgb":[199,0,180]},{"index":0.2,"rgb":[255,0,121]},{"index":0.3,"rgb":[255,108,0]},{"index":0.4,"rgb":[222,194,0]},{"index":0.5,"rgb":[150,255,0]},{"index":0.6,"rgb":[0,255,55]},{"index":0.7,"rgb":[0,246,150]},{"index":0.8,"rgb":[50,167,222]},{"index":0.9,"rgb":[103,51,235]},{"index":1,"rgb":[124,0,186]}],

	"bathymetry": [{"index":0,"rgb":[40,26,44]},{"index":0.13,"rgb":[59,49,90]},{"index":0.25,"rgb":[64,76,139]},{"index":0.38,"rgb":[63,110,151]},{"index":0.5,"rgb":[72,142,158]},{"index":0.63,"rgb":[85,174,163]},{"index":0.75,"rgb":[120,206,163]},{"index":0.88,"rgb":[187,230,172]},{"index":1,"rgb":[253,254,204]}],

	"cdom": [{"index":0,"rgb":[47,15,62]},{"index":0.13,"rgb":[87,23,86]},{"index":0.25,"rgb":[130,28,99]},{"index":0.38,"rgb":[171,41,96]},{"index":0.5,"rgb":[206,67,86]},{"index":0.63,"rgb":[230,106,84]},{"index":0.75,"rgb":[242,149,103]},{"index":0.88,"rgb":[249,193,135]},{"index":1,"rgb":[254,237,176]}],

	"chlorophyll": [{"index":0,"rgb":[18,36,20]},{"index":0.13,"rgb":[25,63,41]},{"index":0.25,"rgb":[24,91,59]},{"index":0.38,"rgb":[13,119,72]},{"index":0.5,"rgb":[18,148,80]},{"index":0.63,"rgb":[80,173,89]},{"index":0.75,"rgb":[132,196,122]},{"index":0.88,"rgb":[175,221,162]},{"index":1,"rgb":[215,249,208]}],

	"density": [{"index":0,"rgb":[54,14,36]},{"index":0.13,"rgb":[89,23,80]},{"index":0.25,"rgb":[110,45,132]},{"index":0.38,"rgb":[120,77,178]},{"index":0.5,"rgb":[120,113,213]},{"index":0.63,"rgb":[115,151,228]},{"index":0.75,"rgb":[134,185,227]},{"index":0.88,"rgb":[177,214,227]},{"index":1,"rgb":[230,241,241]}],

	"freesurface-blue": [{"index":0,"rgb":[30,4,110]},{"index":0.13,"rgb":[47,14,176]},{"index":0.25,"rgb":[41,45,236]},{"index":0.38,"rgb":[25,99,212]},{"index":0.5,"rgb":[68,131,200]},{"index":0.63,"rgb":[114,156,197]},{"index":0.75,"rgb":[157,181,203]},{"index":0.88,"rgb":[200,208,216]},{"index":1,"rgb":[241,237,236]}],

	"freesurface-red": [{"index":0,"rgb":[60,9,18]},{"index":0.13,"rgb":[100,17,27]},{"index":0.25,"rgb":[142,20,29]},{"index":0.38,"rgb":[177,43,27]},{"index":0.5,"rgb":[192,87,63]},{"index":0.63,"rgb":[205,125,105]},{"index":0.75,"rgb":[216,162,148]},{"index":0.88,"rgb":[227,199,193]},{"index":1,"rgb":[241,237,236]}],

	"oxygen": [{"index":0,"rgb":[64,5,5]},{"index":0.13,"rgb":[106,6,15]},{"index":0.25,"rgb":[144,26,7]},{"index":0.38,"rgb":[168,64,3]},{"index":0.5,"rgb":[188,100,4]},{"index":0.63,"rgb":[206,136,11]},{"index":0.75,"rgb":[220,174,25]},{"index":0.88,"rgb":[231,215,44]},{"index":1,"rgb":[248,254,105]}],

	"par": [{"index":0,"rgb":[51,20,24]},{"index":0.13,"rgb":[90,32,35]},{"index":0.25,"rgb":[129,44,34]},{"index":0.38,"rgb":[159,68,25]},{"index":0.5,"rgb":[182,99,19]},{"index":0.63,"rgb":[199,134,22]},{"index":0.75,"rgb":[212,171,35]},{"index":0.88,"rgb":[221,210,54]},{"index":1,"rgb":[225,253,75]}],

	"phase": [{"index":0,"rgb":[145,105,18]},{"index":0.13,"rgb":[184,71,38]},{"index":0.25,"rgb":[186,58,115]},{"index":0.38,"rgb":[160,71,185]},{"index":0.5,"rgb":[110,97,218]},{"index":0.63,"rgb":[50,123,164]},{"index":0.75,"rgb":[31,131,110]},{"index":0.88,"rgb":[77,129,34]},{"index":1,"rgb":[145,105,18]}],

	"salinity": [{"index":0,"rgb":[42,24,108]},{"index":0.13,"rgb":[33,50,162]},{"index":0.25,"rgb":[15,90,145]},{"index":0.38,"rgb":[40,118,137]},{"index":0.5,"rgb":[59,146,135]},{"index":0.63,"rgb":[79,175,126]},{"index":0.75,"rgb":[120,203,104]},{"index":0.88,"rgb":[193,221,100]},{"index":1,"rgb":[253,239,154]}],

	"temperature": [{"index":0,"rgb":[4,35,51]},{"index":0.13,"rgb":[23,51,122]},{"index":0.25,"rgb":[85,59,157]},{"index":0.38,"rgb":[129,79,143]},{"index":0.5,"rgb":[175,95,130]},{"index":0.63,"rgb":[222,112,101]},{"index":0.75,"rgb":[249,146,66]},{"index":0.88,"rgb":[249,196,65]},{"index":1,"rgb":[232,250,91]}],

	"turbidity": [{"index":0,"rgb":[34,31,27]},{"index":0.13,"rgb":[65,50,41]},{"index":0.25,"rgb":[98,69,52]},{"index":0.38,"rgb":[131,89,57]},{"index":0.5,"rgb":[161,112,59]},{"index":0.63,"rgb":[185,140,66]},{"index":0.75,"rgb":[202,174,88]},{"index":0.88,"rgb":[216,209,126]},{"index":1,"rgb":[233,246,171]}],

	"velocity-blue": [{"index":0,"rgb":[17,32,64]},{"index":0.13,"rgb":[35,52,116]},{"index":0.25,"rgb":[29,81,156]},{"index":0.38,"rgb":[31,113,162]},{"index":0.5,"rgb":[50,144,169]},{"index":0.63,"rgb":[87,173,176]},{"index":0.75,"rgb":[149,196,189]},{"index":0.88,"rgb":[203,221,211]},{"index":1,"rgb":[254,251,230]}],

	"velocity-green": [{"index":0,"rgb":[23,35,19]},{"index":0.13,"rgb":[24,64,38]},{"index":0.25,"rgb":[11,95,45]},{"index":0.38,"rgb":[39,123,35]},{"index":0.5,"rgb":[95,146,12]},{"index":0.63,"rgb":[152,165,18]},{"index":0.75,"rgb":[201,186,69]},{"index":0.88,"rgb":[233,216,137]},{"index":1,"rgb":[255,253,205]}],

	"cubehelix": [{"index":0,"rgb":[0,0,0]},{"index":0.07,"rgb":[22,5,59]},{"index":0.13,"rgb":[60,4,105]},{"index":0.2,"rgb":[109,1,135]},{"index":0.27,"rgb":[161,0,147]},{"index":0.33,"rgb":[210,2,142]},{"index":0.4,"rgb":[251,11,123]},{"index":0.47,"rgb":[255,29,97]},{"index":0.53,"rgb":[255,54,69]},{"index":0.6,"rgb":[255,85,46]},{"index":0.67,"rgb":[255,120,34]},{"index":0.73,"rgb":[255,157,37]},{"index":0.8,"rgb":[241,191,57]},{"index":0.87,"rgb":[224,220,93]},{"index":0.93,"rgb":[218,241,142]},{"index":1,"rgb":[227,253,198]}]
};


/***/ }),

/***/ 175:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(244);
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(108).default
var update = add("3d8de15e", content, true, {"sourceMap":false});

/***/ }),

/***/ 176:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(246);
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(108).default
var update = add("6439d180", content, true, {"sourceMap":false});

/***/ }),

/***/ 177:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (function(e,n){return n=n||{},new Promise(function(t,r){var s=new XMLHttpRequest,o=[],u=[],i={},a=function(){return{ok:2==(s.status/100|0),statusText:s.statusText,status:s.status,url:s.responseURL,text:function(){return Promise.resolve(s.responseText)},json:function(){return Promise.resolve(s.responseText).then(JSON.parse)},blob:function(){return Promise.resolve(new Blob([s.response]))},clone:a,headers:{keys:function(){return o},entries:function(){return u},get:function(e){return i[e.toLowerCase()]},has:function(e){return e.toLowerCase()in i}}}};for(var l in s.open(n.method||"get",e,!0),s.onload=function(){s.getAllResponseHeaders().replace(/^(.*?):[^\S\n]*([\s\S]*?)$/gm,function(e,n,t){o.push(n=n.toLowerCase()),u.push([n,t]),i[n]=i[n]?i[n]+","+t:t}),t(a())},s.onerror=r,s.withCredentials="include"==n.credentials,n.headers)s.setRequestHeader(l,n.headers[l]);s.send(n.body||null)})});
//# sourceMappingURL=unfetch.module.js.map


/***/ }),

/***/ 179:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isMergeableObject = function isMergeableObject(value) {
	return isNonNullObject(value)
		&& !isSpecial(value)
};

function isNonNullObject(value) {
	return !!value && typeof value === 'object'
}

function isSpecial(value) {
	var stringValue = Object.prototype.toString.call(value);

	return stringValue === '[object RegExp]'
		|| stringValue === '[object Date]'
		|| isReactElement(value)
}

// see https://github.com/facebook/react/blob/b5ac963fb791d1298e7f396236383bc955f916c1/src/isomorphic/classic/element/ReactElement.js#L21-L25
var canUseSymbol = typeof Symbol === 'function' && Symbol.for;
var REACT_ELEMENT_TYPE = canUseSymbol ? Symbol.for('react.element') : 0xeac7;

function isReactElement(value) {
	return value.$$typeof === REACT_ELEMENT_TYPE
}

function emptyTarget(val) {
	return Array.isArray(val) ? [] : {}
}

function cloneUnlessOtherwiseSpecified(value, options) {
	return (options.clone !== false && options.isMergeableObject(value))
		? deepmerge(emptyTarget(value), value, options)
		: value
}

function defaultArrayMerge(target, source, options) {
	return target.concat(source).map(function(element) {
		return cloneUnlessOtherwiseSpecified(element, options)
	})
}

function getMergeFunction(key, options) {
	if (!options.customMerge) {
		return deepmerge
	}
	var customMerge = options.customMerge(key);
	return typeof customMerge === 'function' ? customMerge : deepmerge
}

function getEnumerableOwnPropertySymbols(target) {
	return Object.getOwnPropertySymbols
		? Object.getOwnPropertySymbols(target).filter(function(symbol) {
			return target.propertyIsEnumerable(symbol)
		})
		: []
}

function getKeys(target) {
	return Object.keys(target).concat(getEnumerableOwnPropertySymbols(target))
}

function propertyIsOnObject(object, property) {
	try {
		return property in object
	} catch(_) {
		return false
	}
}

// Protects from prototype poisoning and unexpected merging up the prototype chain.
function propertyIsUnsafe(target, key) {
	return propertyIsOnObject(target, key) // Properties are safe to merge if they don't exist in the target yet,
		&& !(Object.hasOwnProperty.call(target, key) // unsafe if they exist up the prototype chain,
			&& Object.propertyIsEnumerable.call(target, key)) // and also unsafe if they're nonenumerable.
}

function mergeObject(target, source, options) {
	var destination = {};
	if (options.isMergeableObject(target)) {
		getKeys(target).forEach(function(key) {
			destination[key] = cloneUnlessOtherwiseSpecified(target[key], options);
		});
	}
	getKeys(source).forEach(function(key) {
		if (propertyIsUnsafe(target, key)) {
			return
		}

		if (propertyIsOnObject(target, key) && options.isMergeableObject(source[key])) {
			destination[key] = getMergeFunction(key, options)(target[key], source[key], options);
		} else {
			destination[key] = cloneUnlessOtherwiseSpecified(source[key], options);
		}
	});
	return destination
}

function deepmerge(target, source, options) {
	options = options || {};
	options.arrayMerge = options.arrayMerge || defaultArrayMerge;
	options.isMergeableObject = options.isMergeableObject || isMergeableObject;
	// cloneUnlessOtherwiseSpecified is added to `options` so that custom arrayMerge()
	// implementations can use it. The caller may not replace it.
	options.cloneUnlessOtherwiseSpecified = cloneUnlessOtherwiseSpecified;

	var sourceIsArray = Array.isArray(source);
	var targetIsArray = Array.isArray(target);
	var sourceAndTargetTypesMatch = sourceIsArray === targetIsArray;

	if (!sourceAndTargetTypesMatch) {
		return cloneUnlessOtherwiseSpecified(source, options)
	} else if (sourceIsArray) {
		return options.arrayMerge(target, source, options)
	} else {
		return mergeObject(target, source, options)
	}
}

deepmerge.all = function deepmergeAll(array, options) {
	if (!Array.isArray(array)) {
		throw new Error('first argument should be an array')
	}

	return array.reduce(function(prev, next) {
		return deepmerge(prev, next, options)
	}, {})
};

var deepmerge_1 = deepmerge;

module.exports = deepmerge_1;


/***/ }),

/***/ 180:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(13);
/* harmony import */ var regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(72);
/* harmony import */ var regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(14);
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_web_timers_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(98);
/* harmony import */ var core_js_modules_web_timers_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_timers_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(0);







var isSsrHydration = function isSsrHydration(vm) {
  return vm.$vnode && vm.$vnode.elm && vm.$vnode.elm.dataset && vm.$vnode.elm.dataset.fetchKey;
};

var nuxtState = window.__NUXT__;
/* harmony default export */ __webpack_exports__["a"] = ({
  beforeCreate: function beforeCreate() {
    if (!Object(_utils__WEBPACK_IMPORTED_MODULE_5__[/* hasFetch */ "l"])(this)) {
      return;
    }

    this._fetchDelay = typeof this.$options.fetchDelay === 'number' ? this.$options.fetchDelay : 200;
    vue__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"].util.defineReactive(this, '$fetchState', {
      pending: false,
      error: null,
      timestamp: Date.now()
    });
    this.$fetch = $fetch.bind(this);
    Object(_utils__WEBPACK_IMPORTED_MODULE_5__[/* addLifecycleHook */ "a"])(this, 'created', created);
    Object(_utils__WEBPACK_IMPORTED_MODULE_5__[/* addLifecycleHook */ "a"])(this, 'beforeMount', beforeMount);
  }
});

function beforeMount() {
  if (!this._hydrated) {
    return this.$fetch();
  }
}

function created() {
  if (!isSsrHydration(this)) {
    return;
  } // Hydrate component


  this._hydrated = true;
  this._fetchKey = this.$vnode.elm.dataset.fetchKey;
  var data = nuxtState.fetch[this._fetchKey]; // If fetch error

  if (data && data._error) {
    this.$fetchState.error = data._error;
    return;
  } // Merge data


  for (var key in data) {
    vue__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"].set(this.$data, key, data[key]);
  }
}

function $fetch() {
  var _this = this;

  if (!this._fetchPromise) {
    this._fetchPromise = $_fetch.call(this).then(function () {
      delete _this._fetchPromise;
    });
  }

  return this._fetchPromise;
}

function $_fetch() {
  return _$_fetch.apply(this, arguments);
}

function _$_fetch() {
  _$_fetch = Object(_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var _this2 = this;

    var error, startTime, delayLeft;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            this.$nuxt.nbFetching++;
            this.$fetchState.pending = true;
            this.$fetchState.error = null;
            this._hydrated = false;
            error = null;
            startTime = Date.now();
            _context.prev = 6;
            _context.next = 9;
            return this.$options.fetch.call(this);

          case 9:
            _context.next = 15;
            break;

          case 11:
            _context.prev = 11;
            _context.t0 = _context["catch"](6);

            if (false) {}

            error = Object(_utils__WEBPACK_IMPORTED_MODULE_5__[/* normalizeError */ "p"])(_context.t0);

          case 15:
            delayLeft = this._fetchDelay - (Date.now() - startTime);

            if (!(delayLeft > 0)) {
              _context.next = 19;
              break;
            }

            _context.next = 19;
            return new Promise(function (resolve) {
              return setTimeout(resolve, delayLeft);
            });

          case 19:
            this.$fetchState.error = error;
            this.$fetchState.pending = false;
            this.$fetchState.timestamp = Date.now();
            this.$nextTick(function () {
              return _this2.$nuxt.nbFetching--;
            });

          case 23:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[6, 11]]);
  }));
  return _$_fetch.apply(this, arguments);
}

/***/ }),

/***/ 193:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(194);
module.exports = __webpack_require__(195);


/***/ }),

/***/ 194:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {global.installComponents = function (component, components) {
  var options = typeof component.exports === 'function'
    ? component.exports.extendOptions
    : component.options

  if (typeof component.exports === 'function') {
    options.components = component.exports.options.components
  }

  options.components = options.components || {}

  for (var i in components) {
    options.components[i] = options.components[i] || components[i]
  }


  if (options.functional) {
    provideFunctionalComponents(component, options.components)
  }
}

var functionalPatchKey = '_functionalComponents'

function provideFunctionalComponents(component, components) {
  if (component.exports[functionalPatchKey]) {
    return
  }
  component.exports[functionalPatchKey] = true

  var render = component.exports.render
  component.exports.render = function (h, vm) {
    return render(h, Object.assign({}, vm, {
      _c: function (n, a, b) {
        return vm._c(components[n] || n, a, b)
      }
    }))
  }
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(35)))

/***/ }),

/***/ 195:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/* harmony import */ var core_js_modules_es_array_slice_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(42);
/* harmony import */ var core_js_modules_es_array_slice_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_slice_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_array_from_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(58);
/* harmony import */ var core_js_modules_es_array_from_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_from_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(29);
/* harmony import */ var core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(59);
/* harmony import */ var core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(60);
/* harmony import */ var core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_esm_typeof__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(37);
/* harmony import */ var _babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(13);
/* harmony import */ var core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(114);
/* harmony import */ var core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var core_js_modules_es_promise_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(211);
/* harmony import */ var core_js_modules_es_promise_js__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_promise_js__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var core_js_modules_es_object_assign_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(224);
/* harmony import */ var core_js_modules_es_object_assign_js__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_assign_js__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var core_js_modules_es_promise_finally_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(225);
/* harmony import */ var core_js_modules_es_promise_finally_js__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_promise_finally_js__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(72);
/* harmony import */ var regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(46);
/* harmony import */ var core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(14);
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(28);
/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var core_js_modules_es_array_filter_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(49);
/* harmony import */ var core_js_modules_es_array_filter_js__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_filter_js__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(27);
/* harmony import */ var core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_16__);
/* harmony import */ var core_js_modules_es_array_includes_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(95);
/* harmony import */ var core_js_modules_es_array_includes_js__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_includes_js__WEBPACK_IMPORTED_MODULE_17__);
/* harmony import */ var core_js_modules_es_string_includes_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(96);
/* harmony import */ var core_js_modules_es_string_includes_js__WEBPACK_IMPORTED_MODULE_18___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_includes_js__WEBPACK_IMPORTED_MODULE_18__);
/* harmony import */ var core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(106);
/* harmony import */ var core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_19___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_19__);
/* harmony import */ var core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(47);
/* harmony import */ var core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_20___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_20__);
/* harmony import */ var core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(24);
/* harmony import */ var core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_21___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_21__);
/* harmony import */ var core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(32);
/* harmony import */ var core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_22___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_22__);
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(34);
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_23___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_23__);
/* harmony import */ var core_js_modules_web_timers_js__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(98);
/* harmony import */ var core_js_modules_web_timers_js__WEBPACK_IMPORTED_MODULE_24___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_timers_js__WEBPACK_IMPORTED_MODULE_24__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(1);
/* harmony import */ var unfetch__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(177);
/* harmony import */ var _middleware_js__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(130);
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(0);
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(26);
/* harmony import */ var _mixins_fetch_client__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(180);
/* harmony import */ var _components_nuxt_link_client_js__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(105);












function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }





















 // should be included after ./index.js
// Fetch mixin

if (!vue__WEBPACK_IMPORTED_MODULE_25__[/* default */ "a"].__nuxt__fetch__mixin__) {
  vue__WEBPACK_IMPORTED_MODULE_25__[/* default */ "a"].mixin(_mixins_fetch_client__WEBPACK_IMPORTED_MODULE_30__[/* default */ "a"]);
  vue__WEBPACK_IMPORTED_MODULE_25__[/* default */ "a"].__nuxt__fetch__mixin__ = true;
} // Component: <NuxtLink>


vue__WEBPACK_IMPORTED_MODULE_25__[/* default */ "a"].component(_components_nuxt_link_client_js__WEBPACK_IMPORTED_MODULE_31__[/* default */ "a"].name, _components_nuxt_link_client_js__WEBPACK_IMPORTED_MODULE_31__[/* default */ "a"]);
vue__WEBPACK_IMPORTED_MODULE_25__[/* default */ "a"].component('NLink', _components_nuxt_link_client_js__WEBPACK_IMPORTED_MODULE_31__[/* default */ "a"]);

if (!global.fetch) {
  global.fetch = unfetch__WEBPACK_IMPORTED_MODULE_26__[/* default */ "a"];
} // Global shared references


var _lastPaths = [];
var app;
var router;
var store; // Try to rehydrate SSR data from window

var NUXT = window.__NUXT__ || {};
var $config = NUXT.config || {};

if ($config._app) {
  __webpack_require__.p = Object(_utils_js__WEBPACK_IMPORTED_MODULE_28__[/* urlJoin */ "v"])($config._app.cdnURL, $config._app.assetsPath);
}

Object.assign(vue__WEBPACK_IMPORTED_MODULE_25__[/* default */ "a"].config, {
  "silent": true,
  "performance": false
});
var errorHandler = vue__WEBPACK_IMPORTED_MODULE_25__[/* default */ "a"].config.errorHandler || console.error; // Create and mount App

Object(_index_js__WEBPACK_IMPORTED_MODULE_29__[/* createApp */ "b"])(null, NUXT.config).then(mountApp).catch(errorHandler);

function componentOption(component, key) {
  if (!component || !component.options || !component.options[key]) {
    return {};
  }

  var option = component.options[key];

  if (typeof option === 'function') {
    for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      args[_key - 2] = arguments[_key];
    }

    return option.apply(void 0, args);
  }

  return option;
}

function mapTransitions(toComponents, to, from) {
  var componentTransitions = function componentTransitions(component) {
    var transition = componentOption(component, 'transition', to, from) || {};
    return typeof transition === 'string' ? {
      name: transition
    } : transition;
  };

  var fromComponents = from ? Object(_utils_js__WEBPACK_IMPORTED_MODULE_28__[/* getMatchedComponents */ "g"])(from) : [];
  var maxDepth = Math.max(toComponents.length, fromComponents.length);
  var mergedTransitions = [];

  var _loop = function _loop(i) {
    // Clone original objects to prevent overrides
    var toTransitions = Object.assign({}, componentTransitions(toComponents[i]));
    var transitions = Object.assign({}, componentTransitions(fromComponents[i])); // Combine transitions & prefer `leave` properties of "from" route

    Object.keys(toTransitions).filter(function (key) {
      return typeof toTransitions[key] !== 'undefined' && !key.toLowerCase().includes('leave');
    }).forEach(function (key) {
      transitions[key] = toTransitions[key];
    });
    mergedTransitions.push(transitions);
  };

  for (var i = 0; i < maxDepth; i++) {
    _loop(i);
  }

  return mergedTransitions;
}

function loadAsyncComponents(_x, _x2, _x3) {
  return _loadAsyncComponents.apply(this, arguments);
}

function _loadAsyncComponents() {
  _loadAsyncComponents = Object(_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"])( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(to, from, next) {
    var _this3 = this;

    var Components, startLoader, err, statusCode, message;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            // Check if route changed (this._routeChanged), only if the page is not an error (for validate())
            this._routeChanged = Boolean(app.nuxt.err) || from.name !== to.name;
            this._paramChanged = !this._routeChanged && from.path !== to.path;
            this._queryChanged = !this._paramChanged && from.fullPath !== to.fullPath;
            this._diffQuery = this._queryChanged ? Object(_utils_js__WEBPACK_IMPORTED_MODULE_28__[/* getQueryDiff */ "i"])(to.query, from.query) : [];

            if ((this._routeChanged || this._paramChanged) && this.$loading.start && !this.$loading.manual) {
              this.$loading.start();
            }

            _context2.prev = 5;

            if (!this._queryChanged) {
              _context2.next = 12;
              break;
            }

            _context2.next = 9;
            return Object(_utils_js__WEBPACK_IMPORTED_MODULE_28__[/* resolveRouteComponents */ "r"])(to, function (Component, instance) {
              return {
                Component: Component,
                instance: instance
              };
            });

          case 9:
            Components = _context2.sent;
            // Add a marker on each component that it needs to refresh or not
            startLoader = Components.some(function (_ref2) {
              var Component = _ref2.Component,
                  instance = _ref2.instance;
              var watchQuery = Component.options.watchQuery;

              if (watchQuery === true) {
                return true;
              }

              if (Array.isArray(watchQuery)) {
                return watchQuery.some(function (key) {
                  return _this3._diffQuery[key];
                });
              }

              if (typeof watchQuery === 'function') {
                return watchQuery.apply(instance, [to.query, from.query]);
              }

              return false;
            });

            if (startLoader && this.$loading.start && !this.$loading.manual) {
              this.$loading.start();
            }

          case 12:
            // Call next()
            next();
            _context2.next = 26;
            break;

          case 15:
            _context2.prev = 15;
            _context2.t0 = _context2["catch"](5);
            err = _context2.t0 || {};
            statusCode = err.statusCode || err.status || err.response && err.response.status || 500;
            message = err.message || ''; // Handle chunk loading errors
            // This may be due to a new deployment or a network problem

            if (!/^Loading( CSS)? chunk (\d)+ failed\./.test(message)) {
              _context2.next = 23;
              break;
            }

            window.location.reload(true
            /* skip cache */
            );
            return _context2.abrupt("return");

          case 23:
            this.error({
              statusCode: statusCode,
              message: message
            });
            this.$nuxt.$emit('routeChanged', to, from, err);
            next();

          case 26:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this, [[5, 15]]);
  }));
  return _loadAsyncComponents.apply(this, arguments);
}

function applySSRData(Component, ssrData) {
  if (NUXT.serverRendered && ssrData) {
    Object(_utils_js__WEBPACK_IMPORTED_MODULE_28__[/* applyAsyncData */ "b"])(Component, ssrData);
  }

  Component._Ctor = Component;
  return Component;
} // Get matched components


function resolveComponents(route) {
  return Object(_utils_js__WEBPACK_IMPORTED_MODULE_28__[/* flatMapComponents */ "d"])(route, /*#__PURE__*/function () {
    var _ref = Object(_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"])( /*#__PURE__*/regeneratorRuntime.mark(function _callee(Component, _, match, key, index) {
      var _Component;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(typeof Component === 'function' && !Component.options)) {
                _context.next = 4;
                break;
              }

              _context.next = 3;
              return Component();

            case 3:
              Component = _context.sent;

            case 4:
              // Sanitize it and save it
              _Component = applySSRData(Object(_utils_js__WEBPACK_IMPORTED_MODULE_28__[/* sanitizeComponent */ "s"])(Component), NUXT.data ? NUXT.data[index] : null);
              match.components[key] = _Component;
              return _context.abrupt("return", _Component);

            case 7:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x4, _x5, _x6, _x7, _x8) {
      return _ref.apply(this, arguments);
    };
  }());
}

function callMiddleware(Components, context, layout) {
  var _this = this;

  var midd = [];
  var unknownMiddleware = false; // If layout is undefined, only call global middleware

  if (typeof layout !== 'undefined') {
    midd = []; // Exclude global middleware if layout defined (already called before)

    layout = Object(_utils_js__WEBPACK_IMPORTED_MODULE_28__[/* sanitizeComponent */ "s"])(layout);

    if (layout.options.middleware) {
      midd = midd.concat(layout.options.middleware);
    }

    Components.forEach(function (Component) {
      if (Component.options.middleware) {
        midd = midd.concat(Component.options.middleware);
      }
    });
  }

  midd = midd.map(function (name) {
    if (typeof name === 'function') {
      return name;
    }

    if (typeof _middleware_js__WEBPACK_IMPORTED_MODULE_27__[/* default */ "a"][name] !== 'function') {
      unknownMiddleware = true;

      _this.error({
        statusCode: 500,
        message: 'Unknown middleware ' + name
      });
    }

    return _middleware_js__WEBPACK_IMPORTED_MODULE_27__[/* default */ "a"][name];
  });

  if (unknownMiddleware) {
    return;
  }

  return Object(_utils_js__WEBPACK_IMPORTED_MODULE_28__[/* middlewareSeries */ "o"])(midd, context);
}

function render(_x9, _x10, _x11) {
  return _render.apply(this, arguments);
} // Fix components format in matched, it's due to code-splitting of vue-router


function _render() {
  _render = Object(_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"])( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(to, from, next) {
    var _this4 = this;

    var spaFallback, fromMatches, nextCalled, _next, matches, Components, errorLayout, layout, _layout, isValid, _iterator, _step, Component, instances, error, _layout2;

    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            if (!(this._routeChanged === false && this._paramChanged === false && this._queryChanged === false)) {
              _context4.next = 2;
              break;
            }

            return _context4.abrupt("return", next());

          case 2:
            // Handle first render on SPA mode
            spaFallback = false;

            if (to === from) {
              _lastPaths = [];
              spaFallback = true;
            } else {
              fromMatches = [];
              _lastPaths = Object(_utils_js__WEBPACK_IMPORTED_MODULE_28__[/* getMatchedComponents */ "g"])(from, fromMatches).map(function (Component, i) {
                return Object(_utils_js__WEBPACK_IMPORTED_MODULE_28__[/* compile */ "c"])(from.matched[fromMatches[i]].path)(from.params);
              });
            } // nextCalled is true when redirected


            nextCalled = false;

            _next = function _next(path) {
              if (from.path === path.path && _this4.$loading.finish) {
                _this4.$loading.finish();
              }

              if (from.path !== path.path && _this4.$loading.pause) {
                _this4.$loading.pause();
              }

              if (nextCalled) {
                return;
              }

              nextCalled = true;
              next(path);
            }; // Update context


            _context4.next = 8;
            return Object(_utils_js__WEBPACK_IMPORTED_MODULE_28__[/* setContext */ "t"])(app, {
              route: to,
              from: from,
              next: _next.bind(this)
            });

          case 8:
            this._dateLastError = app.nuxt.dateErr;
            this._hadError = Boolean(app.nuxt.err); // Get route's matched components

            matches = [];
            Components = Object(_utils_js__WEBPACK_IMPORTED_MODULE_28__[/* getMatchedComponents */ "g"])(to, matches); // If no Components matched, generate 404

            if (Components.length) {
              _context4.next = 27;
              break;
            }

            _context4.next = 15;
            return callMiddleware.call(this, Components, app.context);

          case 15:
            if (!nextCalled) {
              _context4.next = 17;
              break;
            }

            return _context4.abrupt("return");

          case 17:
            // Load layout for error page
            errorLayout = (_index_js__WEBPACK_IMPORTED_MODULE_29__[/* NuxtError */ "a"].options || _index_js__WEBPACK_IMPORTED_MODULE_29__[/* NuxtError */ "a"]).layout;
            _context4.next = 20;
            return this.loadLayout(typeof errorLayout === 'function' ? errorLayout.call(_index_js__WEBPACK_IMPORTED_MODULE_29__[/* NuxtError */ "a"], app.context) : errorLayout);

          case 20:
            layout = _context4.sent;
            _context4.next = 23;
            return callMiddleware.call(this, Components, app.context, layout);

          case 23:
            if (!nextCalled) {
              _context4.next = 25;
              break;
            }

            return _context4.abrupt("return");

          case 25:
            // Show error page
            app.context.error({
              statusCode: 404,
              message: 'This page could not be found'
            });
            return _context4.abrupt("return", next());

          case 27:
            // Update ._data and other properties if hot reloaded
            Components.forEach(function (Component) {
              if (Component._Ctor && Component._Ctor.options) {
                Component.options.asyncData = Component._Ctor.options.asyncData;
                Component.options.fetch = Component._Ctor.options.fetch;
              }
            }); // Apply transitions

            this.setTransitions(mapTransitions(Components, to, from));
            _context4.prev = 29;
            _context4.next = 32;
            return callMiddleware.call(this, Components, app.context);

          case 32:
            if (!nextCalled) {
              _context4.next = 34;
              break;
            }

            return _context4.abrupt("return");

          case 34:
            if (!app.context._errored) {
              _context4.next = 36;
              break;
            }

            return _context4.abrupt("return", next());

          case 36:
            // Set layout
            _layout = Components[0].options.layout;

            if (typeof _layout === 'function') {
              _layout = _layout(app.context);
            }

            _context4.next = 40;
            return this.loadLayout(_layout);

          case 40:
            _layout = _context4.sent;
            _context4.next = 43;
            return callMiddleware.call(this, Components, app.context, _layout);

          case 43:
            if (!nextCalled) {
              _context4.next = 45;
              break;
            }

            return _context4.abrupt("return");

          case 45:
            if (!app.context._errored) {
              _context4.next = 47;
              break;
            }

            return _context4.abrupt("return", next());

          case 47:
            // Call .validate()
            isValid = true;
            _context4.prev = 48;
            _iterator = _createForOfIteratorHelper(Components);
            _context4.prev = 50;

            _iterator.s();

          case 52:
            if ((_step = _iterator.n()).done) {
              _context4.next = 63;
              break;
            }

            Component = _step.value;

            if (!(typeof Component.options.validate !== 'function')) {
              _context4.next = 56;
              break;
            }

            return _context4.abrupt("continue", 61);

          case 56:
            _context4.next = 58;
            return Component.options.validate(app.context);

          case 58:
            isValid = _context4.sent;

            if (isValid) {
              _context4.next = 61;
              break;
            }

            return _context4.abrupt("break", 63);

          case 61:
            _context4.next = 52;
            break;

          case 63:
            _context4.next = 68;
            break;

          case 65:
            _context4.prev = 65;
            _context4.t0 = _context4["catch"](50);

            _iterator.e(_context4.t0);

          case 68:
            _context4.prev = 68;

            _iterator.f();

            return _context4.finish(68);

          case 71:
            _context4.next = 77;
            break;

          case 73:
            _context4.prev = 73;
            _context4.t1 = _context4["catch"](48);
            // ...If .validate() threw an error
            this.error({
              statusCode: _context4.t1.statusCode || '500',
              message: _context4.t1.message
            });
            return _context4.abrupt("return", next());

          case 77:
            if (isValid) {
              _context4.next = 80;
              break;
            }

            this.error({
              statusCode: 404,
              message: 'This page could not be found'
            });
            return _context4.abrupt("return", next());

          case 80:
            _context4.next = 82;
            return Promise.all(Components.map( /*#__PURE__*/function () {
              var _ref3 = Object(_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"])( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(Component, i) {
                var childPathChanged, watchParam, watchQuery, promises, hasAsyncData, hasFetch, loadingIncrease, promise, p;
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        // Check if only children route changed
                        Component._path = Object(_utils_js__WEBPACK_IMPORTED_MODULE_28__[/* compile */ "c"])(to.matched[matches[i]].path)(to.params);
                        Component._dataRefresh = false;
                        childPathChanged = Component._path !== _lastPaths[i]; // Refresh component (call asyncData & fetch) when:
                        // Route path changed part includes current component
                        // Or route param changed part includes current component and watchParam is not `false`
                        // Or route query is changed and watchQuery returns `true`

                        if (_this4._routeChanged && childPathChanged) {
                          Component._dataRefresh = true;
                        } else if (_this4._paramChanged && childPathChanged) {
                          watchParam = Component.options.watchParam;
                          Component._dataRefresh = watchParam !== false;
                        } else if (_this4._queryChanged) {
                          watchQuery = Component.options.watchQuery;

                          if (watchQuery === true) {
                            Component._dataRefresh = true;
                          } else if (Array.isArray(watchQuery)) {
                            Component._dataRefresh = watchQuery.some(function (key) {
                              return _this4._diffQuery[key];
                            });
                          } else if (typeof watchQuery === 'function') {
                            if (!instances) {
                              instances = Object(_utils_js__WEBPACK_IMPORTED_MODULE_28__[/* getMatchedComponentsInstances */ "h"])(to);
                            }

                            Component._dataRefresh = watchQuery.apply(instances[i], [to.query, from.query]);
                          }
                        }

                        if (!(!_this4._hadError && _this4._isMounted && !Component._dataRefresh)) {
                          _context3.next = 6;
                          break;
                        }

                        return _context3.abrupt("return");

                      case 6:
                        promises = [];
                        hasAsyncData = Component.options.asyncData && typeof Component.options.asyncData === 'function';
                        hasFetch = Boolean(Component.options.fetch) && Component.options.fetch.length;
                        loadingIncrease = hasAsyncData && hasFetch ? 30 : 45; // Call asyncData(context)

                        if (hasAsyncData) {
                          promise = Object(_utils_js__WEBPACK_IMPORTED_MODULE_28__[/* promisify */ "q"])(Component.options.asyncData, app.context);
                          promise.then(function (asyncDataResult) {
                            Object(_utils_js__WEBPACK_IMPORTED_MODULE_28__[/* applyAsyncData */ "b"])(Component, asyncDataResult);

                            if (_this4.$loading.increase) {
                              _this4.$loading.increase(loadingIncrease);
                            }
                          });
                          promises.push(promise);
                        } // Check disabled page loading


                        _this4.$loading.manual = Component.options.loading === false; // Call fetch(context)

                        if (hasFetch) {
                          p = Component.options.fetch(app.context);

                          if (!p || !(p instanceof Promise) && typeof p.then !== 'function') {
                            p = Promise.resolve(p);
                          }

                          p.then(function (fetchResult) {
                            if (_this4.$loading.increase) {
                              _this4.$loading.increase(loadingIncrease);
                            }
                          });
                          promises.push(p);
                        }

                        return _context3.abrupt("return", Promise.all(promises));

                      case 14:
                      case "end":
                        return _context3.stop();
                    }
                  }
                }, _callee3);
              }));

              return function (_x13, _x14) {
                return _ref3.apply(this, arguments);
              };
            }()));

          case 82:
            // If not redirected
            if (!nextCalled) {
              if (this.$loading.finish && !this.$loading.manual) {
                this.$loading.finish();
              }

              next();
            }

            _context4.next = 99;
            break;

          case 85:
            _context4.prev = 85;
            _context4.t2 = _context4["catch"](29);
            error = _context4.t2 || {};

            if (!(error.message === 'ERR_REDIRECT')) {
              _context4.next = 90;
              break;
            }

            return _context4.abrupt("return", this.$nuxt.$emit('routeChanged', to, from, error));

          case 90:
            _lastPaths = [];
            Object(_utils_js__WEBPACK_IMPORTED_MODULE_28__[/* globalHandleError */ "k"])(error); // Load error layout

            _layout2 = (_index_js__WEBPACK_IMPORTED_MODULE_29__[/* NuxtError */ "a"].options || _index_js__WEBPACK_IMPORTED_MODULE_29__[/* NuxtError */ "a"]).layout;

            if (typeof _layout2 === 'function') {
              _layout2 = _layout2(app.context);
            }

            _context4.next = 96;
            return this.loadLayout(_layout2);

          case 96:
            this.error(error);
            this.$nuxt.$emit('routeChanged', to, from, error);
            next();

          case 99:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, this, [[29, 85], [48, 73], [50, 65, 68, 71]]);
  }));
  return _render.apply(this, arguments);
}

function normalizeComponents(to, ___) {
  Object(_utils_js__WEBPACK_IMPORTED_MODULE_28__[/* flatMapComponents */ "d"])(to, function (Component, _, match, key) {
    if (Object(_babel_runtime_helpers_esm_typeof__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"])(Component) === 'object' && !Component.options) {
      // Updated via vue-router resolveAsyncComponents()
      Component = vue__WEBPACK_IMPORTED_MODULE_25__[/* default */ "a"].extend(Component);
      Component._Ctor = Component;
      match.components[key] = Component;
    }

    return Component;
  });
}

function setLayoutForNextPage(to) {
  // Set layout
  var hasError = Boolean(this.$options.nuxt.err);

  if (this._hadError && this._dateLastError === this.$options.nuxt.dateErr) {
    hasError = false;
  }

  var layout = hasError ? (_index_js__WEBPACK_IMPORTED_MODULE_29__[/* NuxtError */ "a"].options || _index_js__WEBPACK_IMPORTED_MODULE_29__[/* NuxtError */ "a"]).layout : to.matched[0].components.default.options.layout;

  if (typeof layout === 'function') {
    layout = layout(app.context);
  }

  this.setLayout(layout);
}

function checkForErrors(app) {
  // Hide error component if no error
  if (app._hadError && app._dateLastError === app.$options.nuxt.dateErr) {
    app.error();
  }
} // When navigating on a different route but the same component is used, Vue.js
// Will not update the instance data, so we have to update $data ourselves


function fixPrepatch(to, ___) {
  var _this2 = this;

  if (this._routeChanged === false && this._paramChanged === false && this._queryChanged === false) {
    return;
  }

  var instances = Object(_utils_js__WEBPACK_IMPORTED_MODULE_28__[/* getMatchedComponentsInstances */ "h"])(to);
  var Components = Object(_utils_js__WEBPACK_IMPORTED_MODULE_28__[/* getMatchedComponents */ "g"])(to);
  var triggerScroll = false;
  vue__WEBPACK_IMPORTED_MODULE_25__[/* default */ "a"].nextTick(function () {
    instances.forEach(function (instance, i) {
      if (!instance || instance._isDestroyed) {
        return;
      }

      if (instance.constructor._dataRefresh && Components[i] === instance.constructor && instance.$vnode.data.keepAlive !== true && typeof instance.constructor.options.data === 'function') {
        var newData = instance.constructor.options.data.call(instance);

        for (var key in newData) {
          vue__WEBPACK_IMPORTED_MODULE_25__[/* default */ "a"].set(instance.$data, key, newData[key]);
        }

        triggerScroll = true;
      }
    });

    if (triggerScroll) {
      // Ensure to trigger scroll event after calling scrollBehavior
      window.$nuxt.$nextTick(function () {
        window.$nuxt.$emit('triggerScroll');
      });
    }

    checkForErrors(_this2);
  });
}

function nuxtReady(_app) {
  window.onNuxtReadyCbs.forEach(function (cb) {
    if (typeof cb === 'function') {
      cb(_app);
    }
  }); // Special JSDOM

  if (typeof window._onNuxtLoaded === 'function') {
    window._onNuxtLoaded(_app);
  } // Add router hooks


  router.afterEach(function (to, from) {
    // Wait for fixPrepatch + $data updates
    vue__WEBPACK_IMPORTED_MODULE_25__[/* default */ "a"].nextTick(function () {
      return _app.$nuxt.$emit('routeChanged', to, from);
    });
  });
}

function mountApp(_x12) {
  return _mountApp.apply(this, arguments);
}

function _mountApp() {
  _mountApp = Object(_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"])( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(__app) {
    var _app, mount, Components, clientFirstMount;

    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            // Set global variables
            app = __app.app;
            router = __app.router;
            store = __app.store; // Create Vue instance

            _app = new vue__WEBPACK_IMPORTED_MODULE_25__[/* default */ "a"](app); // Mounts Vue app to DOM element

            mount = function mount() {
              _app.$mount('#__nuxt'); // Add afterEach router hooks


              router.afterEach(normalizeComponents);
              router.afterEach(setLayoutForNextPage.bind(_app));
              router.afterEach(fixPrepatch.bind(_app)); // Listen for first Vue update

              vue__WEBPACK_IMPORTED_MODULE_25__[/* default */ "a"].nextTick(function () {
                // Call window.{{globals.readyCallback}} callbacks
                nuxtReady(_app);
              });
            }; // Resolve route components


            _context5.next = 7;
            return Promise.all(resolveComponents(app.context.route));

          case 7:
            Components = _context5.sent;
            // Enable transitions
            _app.setTransitions = _app.$options.nuxt.setTransitions.bind(_app);

            if (Components.length) {
              _app.setTransitions(mapTransitions(Components, router.currentRoute));

              _lastPaths = router.currentRoute.matched.map(function (route) {
                return Object(_utils_js__WEBPACK_IMPORTED_MODULE_28__[/* compile */ "c"])(route.path)(router.currentRoute.params);
              });
            } // Initialize error handler


            _app.$loading = {}; // To avoid error while _app.$nuxt does not exist

            if (NUXT.error) {
              _app.error(NUXT.error);
            } // Add beforeEach router hooks


            router.beforeEach(loadAsyncComponents.bind(_app));
            router.beforeEach(render.bind(_app)); // Fix in static: remove trailing slash to force hydration
            // Full static, if server-rendered: hydrate, to allow custom redirect to generated page
            // Fix in static: remove trailing slash to force hydration

            if (!(NUXT.serverRendered && Object(_utils_js__WEBPACK_IMPORTED_MODULE_28__[/* isSamePath */ "n"])(NUXT.routePath, _app.context.route.path))) {
              _context5.next = 16;
              break;
            }

            return _context5.abrupt("return", mount());

          case 16:
            // First render on client-side
            clientFirstMount = function clientFirstMount() {
              normalizeComponents(router.currentRoute, router.currentRoute);
              setLayoutForNextPage.call(_app, router.currentRoute);
              checkForErrors(_app); // Don't call fixPrepatch.call(_app, router.currentRoute, router.currentRoute) since it's first render

              mount();
            }; // fix: force next tick to avoid having same timestamp when an error happen on spa fallback


            _context5.next = 19;
            return new Promise(function (resolve) {
              return setTimeout(resolve, 0);
            });

          case 19:
            render.call(_app, router.currentRoute, router.currentRoute, function (path) {
              // If not redirected
              if (!path) {
                clientFirstMount();
                return;
              } // Add a one-time afterEach hook to
              // mount the app wait for redirect and route gets resolved


              var unregisterHook = router.afterEach(function (to, from) {
                unregisterHook();
                clientFirstMount();
              }); // Push the path and let route to be resolved

              router.push(path, undefined, function (err) {
                if (err) {
                  errorHandler(err);
                }
              });
            });

          case 20:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));
  return _mountApp.apply(this, arguments);
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(35)))

/***/ }),

/***/ 243:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_3_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_3_oneOf_1_2_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_nuxt_error_vue_vue_type_style_index_0_id_5eb69f1c_prod_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(175);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_3_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_3_oneOf_1_2_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_nuxt_error_vue_vue_type_style_index_0_id_5eb69f1c_prod_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_3_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_3_oneOf_1_2_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_nuxt_error_vue_vue_type_style_index_0_id_5eb69f1c_prod_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ 244:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(107);
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(false);
// Module
___CSS_LOADER_EXPORT___.push([module.i, "\n.__nuxt-error-page {\n  padding: 1rem;\n  background: #F7F8FB;\n  color: #47494E;\n  text-align: center;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  flex-direction: column;\n  font-family: sans-serif;\n  font-weight: 100 !important;\n  -ms-text-size-adjust: 100%;\n  -webkit-text-size-adjust: 100%;\n  -webkit-font-smoothing: antialiased;\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n}\n.__nuxt-error-page .error {\n  max-width: 450px;\n}\n.__nuxt-error-page .title {\n  font-size: 1.5rem;\n  margin-top: 15px;\n  color: #47494E;\n  margin-bottom: 8px;\n}\n.__nuxt-error-page .description {\n  color: #7F828B;\n  line-height: 21px;\n  margin-bottom: 10px;\n}\n.__nuxt-error-page a {\n  color: #7F828B !important;\n  text-decoration: none;\n}\n.__nuxt-error-page .logo {\n  position: fixed;\n  left: 12px;\n  bottom: 12px;\n}\n", ""]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ 245:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_3_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_3_oneOf_1_2_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_nuxt_loading_vue_vue_type_style_index_0_id_33856d5f_prod_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(176);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_3_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_3_oneOf_1_2_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_nuxt_loading_vue_vue_type_style_index_0_id_33856d5f_prod_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_3_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_3_oneOf_1_2_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_nuxt_loading_vue_vue_type_style_index_0_id_33856d5f_prod_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ 246:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(107);
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(false);
// Module
___CSS_LOADER_EXPORT___.push([module.i, "\n.nuxt-progress {\n  position: fixed;\n  top: 0px;\n  left: 0px;\n  right: 0px;\n  height: 2px;\n  width: 0%;\n  opacity: 1;\n  transition: width 0.1s, opacity 0.4s;\n  background-color: black;\n  z-index: 999999;\n}\n.nuxt-progress.nuxt-progress-notransition {\n  transition: none;\n}\n.nuxt-progress-failed {\n  background-color: red;\n}\n", ""]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ 247:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(248);
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(108).default
var update = add("0cab0c9e", content, true, {"sourceMap":false});

/***/ }),

/***/ 248:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(107);
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(false);
// Module
___CSS_LOADER_EXPORT___.push([module.i, "\n*, *:before, *:after {\n    box-sizing: border-box;\n}\nhtml,\nbody {\n    margin: 0;\n    padding: 0;\n}\nbody {\n    width: 100vw;\n    height: 100vh;\n    position: relative;\n    font-family: Helvetica, Arial, sans-serif;\n    overflow: hidden;\n}\n.controls {\n    padding: 20px;\n    overflow-y: auto;\n}\n.controls__semi {\n    position: absolute;\n    top: 0;\n    right: 0;\n    padding: 20px;\n}\n.controls > .row {\n    display: flex;\n    margin: 3px 0;\n}\n.controls label {\n    display: flex;\n    flex-grow: 1;\n    padding-right: 35px;\n}\n.controls input,\n.controls select {\n    display: inline-block;\n    vertical-align: top;\n    margin: 0;\n    accent-color: hotpink;\n    padding: 2px 4px;\n    border: 0;\n    border-radius: 5px;\n}\n.controls input[type=checkbox] {\n    width: 20px;\n    height: 20px;\n    vertical-align: middle;\n}\n.controls input[type=range] {\n    padding-left: 0;\n    padding-right: 0;\n}\ncanvas {\n    position: absolute;\n    width: MAX(100vw, 100vh) !important;\n    height: MAX(100vw, 100vh) !important;\n    top: 50%;\n    left: 50%;\n    transform: translate(-50%, -50%);\n}\n.root {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 200px;\n    transform-origin: top left;\n}\n@media only screen and (max-width: 980px) {\n    .root {\n        transform: scale(2);\n    }\n}\n\n\n\nbody {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    text-align: center;\n    font-family: sans-serif;\n    font-size: 20px;\n}\nh1 {\n    font-size: 3.5rem;\n    font-weight: 300;\n    margin-bottom: 0;\n}\nbutton {\n    padding: 0.75rem 1.5rem;\n    font-size: 100%;\n    border: none;\n    appearance: none;\n    background-color: #800080;\n    color: white;\n    border-radius: 2rem;\n    box-shadow: 0 0.33rem 1rem rgba(0,0,0,0.2);\n    margin-bottom: 1rem;\n    transition: background-color 0.3s, transform 0.13s;\n}\nbutton:hover {\n    background-color: #5c005c;\n}\nbutton:active {\n    transform: scale(0.9);\n}\ninput[type=\"text\"] {\n    padding: 0.75rem 1rem;\n    font-size: 100%;\n    border: none;\n    appearance: none;\n    box-shadow: 0 0.33rem 1rem rgba(0,0,0,0.2);\n    margin-bottom: 1rem;\n    border-radius: 2rem;\n}\n#response {\n    font-family: 'Courier New', Courier, monospace;\n    background-color: white;\n    box-shadow: 0 0.33rem 1rem rgba(0,0,0,0.1) inset;\n    min-height: 200px;\n    width: 35rem;\n    max-width: 100vw;\n    padding: 1rem;\n}\n.container {\n    position: absolute;\n    bottom: 0;\n    right: 0;\n    text-align: right;\n    color: white;\n    z-index: 1;\n}\n.container--controls {\n    margin-right: 20px;\n}\n.statusMessage {\n    width: 100%;\n    text-align: center;\n    opacity: 0;\n    transition: opacity 0.3s;\n}\nbody:hover .statusMessage {\n    opacity: 1;\n}", ""]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ 249:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "state", function() { return state; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mutations", function() { return mutations; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "actions", function() { return actions; });
/* harmony import */ var _babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(18);
/* harmony import */ var core_js_modules_es_object_from_entries_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(250);
/* harmony import */ var core_js_modules_es_object_from_entries_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_from_entries_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(47);
/* harmony import */ var core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_object_entries_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(169);
/* harmony import */ var core_js_modules_es_object_entries_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_entries_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(27);
/* harmony import */ var core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(14);
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(28);
/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(34);
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var core_js_modules_es_array_slice_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(42);
/* harmony import */ var core_js_modules_es_array_slice_js__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_slice_js__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(46);
/* harmony import */ var core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var core_js_modules_es_array_from_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(58);
/* harmony import */ var core_js_modules_es_array_from_js__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_from_js__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(32);
/* harmony import */ var core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(24);
/* harmony import */ var core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(29);
/* harmony import */ var core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(59);
/* harmony import */ var core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(60);
/* harmony import */ var core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_15__);


function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
















// This is the input ID offset of my "Intech Studio: Grid" MIDI controller. Probably different for other devices.
var KNOB_OFFSET = 32;
var DEFAULTS = {};
var DEFAULTS_KEYS = {};

function getRandomNumber(data) {
  var min = Math.ceil(data.min);
  var max = Math.floor(data.max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomElement(array) {
  return array[Math.random() * array.length | 0];
}

function getFromLocalStorage(key) {
  return typeof localStorage.midiDrawSettings !== 'undefined' ? JSON.parse(localStorage.midiDrawSettings)[key] : null;
} // This function maps the option ranges to the MIDI controller ranges.
// We assume the MIDI controller returns a value between 0 and 127.


function limitNumber(number, options) {
  return Math.floor(Math.min(Math.max(number / 127 * options.max, options.min), options.max) * (1 / options.step)) / (1 / options.step);
}

function getDefaultSettings(data) {
  return Object.fromEntries(Object.entries(data).map(function (_ref) {
    var _getFromLocalStorage;

    var _ref2 = Object(_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(_ref, 2),
        key = _ref2[0],
        value = _ref2[1];

    return [key, (_getFromLocalStorage = getFromLocalStorage(key)) !== null && _getFromLocalStorage !== void 0 ? _getFromLocalStorage : value.default];
  }));
}

var state = function state() {
  return {
    settings: null,
    stopMultiplicator: 1
  };
};
var mutations = {
  SET_OPTION: function SET_OPTION(state, payload) {
    var property = Object.keys(payload)[0];

    if (state.settings[property] !== payload[property]) {
      state.settings[property] = payload[property];
    }
  },
  SET_STOP_MULTIPLICATOR: function SET_STOP_MULTIPLICATOR(state, payload) {
    state.stopMultiplicator = payload;
  },
  // Store needs to be populated on every page to create the settings object.
  // TODO: move to plugin
  POPULATE_STORE: function POPULATE_STORE(state, payload) {
    state.settings = getDefaultSettings(payload);
    DEFAULTS = payload;
    DEFAULTS_KEYS = Object.keys(payload);
  }
};
var actions = {
  SET_OPTIONS: function SET_OPTIONS(_ref3, payload) {
    var commit = _ref3.commit;
    var optionKeys = Object.keys(payload);
    optionKeys.forEach(function (optionKey) {
      var data = {};
      data[optionKey] = payload[optionKey];
      commit('SET_OPTION', data);
    });
    localStorage.midiDrawSettings = JSON.stringify(payload);
  },
  // TODO: Connection should be handled inside Sender component.
  addMidiController: function addMidiController(context) {
    var connect = function connect() {
      navigator.requestMIDIAccess().then(function (midi) {
        return midiReady(midi);
      }, function (err) {
        return console.log('Something went wrong', err);
      });
    };

    var midiReady = function midiReady(midi) {
      midi.addEventListener('statechange', function (event) {
        return initDevices(event.target);
      });
      initDevices(midi);
    };

    var midiDevices = [];

    var initDevices = function initDevices(midi) {
      var inputs = midi.inputs.values();

      for (var input = inputs.next(); input && !input.done; input = inputs.next()) {
        midiDevices.push(input.value);
      }

      startListening();
    };

    var midiMessageReceived = function midiMessageReceived(_ref4) {
      var data = _ref4.data;
      var knob = data['1'];
      var degree = data['2'];
      var commitData = {};
      var key = DEFAULTS_KEYS[knob - KNOB_OFFSET];

      if (key) {
        commitData[key] = limitNumber(degree, DEFAULTS[key]);
        context.commit('SET_OPTION', commitData);
        localStorage.midiDrawSettings = JSON.stringify(payload);
      }
    };

    var startListening = function startListening() {
      var _iterator = _createForOfIteratorHelper(midiDevices),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var input = _step.value;
          input.addEventListener('midimessage', midiMessageReceived);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    };

    connect();
  }
};

/***/ }),

/***/ 26:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, "b", function() { return /* binding */ createApp; });
__webpack_require__.d(__webpack_exports__, "a", function() { return /* reexport */ nuxt_error; });

// NAMESPACE OBJECT: ./.nuxt/components/index.js
var components_namespaceObject = {};
__webpack_require__.r(components_namespaceObject);
__webpack_require__.d(components_namespaceObject, "PeerClient", function() { return PeerClient; });
__webpack_require__.d(components_namespaceObject, "PeerController", function() { return PeerController; });
__webpack_require__.d(components_namespaceObject, "Receiver", function() { return Receiver; });
__webpack_require__.d(components_namespaceObject, "Sender", function() { return Sender; });
__webpack_require__.d(components_namespaceObject, "RemoteSkyRenderer", function() { return RemoteSkyRenderer; });
__webpack_require__.d(components_namespaceObject, "WaveRenderer", function() { return WaveRenderer; });

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.keys.js
var es_object_keys = __webpack_require__(27);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.symbol.js
var es_symbol = __webpack_require__(29);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.filter.js
var es_array_filter = __webpack_require__(49);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.get-own-property-descriptor.js
var es_object_get_own_property_descriptor = __webpack_require__(73);

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom-collections.for-each.js
var web_dom_collections_for_each = __webpack_require__(28);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.get-own-property-descriptors.js
var es_object_get_own_property_descriptors = __webpack_require__(74);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js
var asyncToGenerator = __webpack_require__(13);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/defineProperty.js
var defineProperty = __webpack_require__(30);

// EXTERNAL MODULE: ./node_modules/regenerator-runtime/runtime.js
var runtime = __webpack_require__(72);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.function.name.js
var es_function_name = __webpack_require__(46);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.to-string.js
var es_object_to_string = __webpack_require__(14);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.map.js
var es_array_map = __webpack_require__(47);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.regexp.exec.js
var es_regexp_exec = __webpack_require__(24);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.replace.js
var es_string_replace = __webpack_require__(79);

// EXTERNAL MODULE: ./node_modules/vue/dist/vue.runtime.esm.js
var vue_runtime_esm = __webpack_require__(1);

// EXTERNAL MODULE: ./node_modules/vuex/dist/vuex.esm.js
var vuex_esm = __webpack_require__(63);

// EXTERNAL MODULE: ./node_modules/vue-meta/dist/vue-meta.esm.browser.js
var vue_meta_esm_browser = __webpack_require__(178);

// EXTERNAL MODULE: ./node_modules/vue-client-only/dist/vue-client-only.common.js
var vue_client_only_common = __webpack_require__(131);
var vue_client_only_common_default = /*#__PURE__*/__webpack_require__.n(vue_client_only_common);

// EXTERNAL MODULE: ./node_modules/vue-no-ssr/dist/vue-no-ssr.common.js
var vue_no_ssr_common = __webpack_require__(62);
var vue_no_ssr_common_default = /*#__PURE__*/__webpack_require__.n(vue_no_ssr_common);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.iterator.js
var es_string_iterator = __webpack_require__(32);

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom-collections.iterator.js
var web_dom_collections_iterator = __webpack_require__(34);

// EXTERNAL MODULE: ./node_modules/vue-router/dist/vue-router.esm.js
var vue_router_esm = __webpack_require__(132);

// EXTERNAL MODULE: ./node_modules/ufo/dist/index.mjs + 4 modules
var dist = __webpack_require__(25);

// EXTERNAL MODULE: ./.nuxt/utils.js
var utils = __webpack_require__(0);

// CONCATENATED MODULE: ./.nuxt/router.scrollBehavior.js



if (true) {
  if ('scrollRestoration' in window.history) {
    Object(utils["u" /* setScrollRestoration */])('manual'); // reset scrollRestoration to auto when leaving page, allowing page reload
    // and back-navigation from other pages to use the browser to restore the
    // scrolling position.

    window.addEventListener('beforeunload', function () {
      Object(utils["u" /* setScrollRestoration */])('auto');
    }); // Setting scrollRestoration to manual again when returning to this page.

    window.addEventListener('load', function () {
      Object(utils["u" /* setScrollRestoration */])('manual');
    });
  }
}

function shouldScrollToTop(route) {
  var Pages = Object(utils["g" /* getMatchedComponents */])(route);

  if (Pages.length === 1) {
    var _Pages$0$options = Pages[0].options,
        options = _Pages$0$options === void 0 ? {} : _Pages$0$options;
    return options.scrollToTop !== false;
  }

  return Pages.some(function (_ref) {
    var options = _ref.options;
    return options && options.scrollToTop;
  });
}

/* harmony default export */ var router_scrollBehavior = (function (to, from, savedPosition) {
  // If the returned position is falsy or an empty object, will retain current scroll position
  var position = false;
  var isRouteChanged = to !== from; // savedPosition is only available for popstate navigations (back button)

  if (savedPosition) {
    position = savedPosition;
  } else if (isRouteChanged && shouldScrollToTop(to)) {
    position = {
      x: 0,
      y: 0
    };
  }

  var nuxt = window.$nuxt;

  if ( // Initial load (vuejs/vue-router#3199)
  !isRouteChanged || // Route hash changes
  to.path === from.path && to.hash !== from.hash) {
    nuxt.$nextTick(function () {
      return nuxt.$emit('triggerScroll');
    });
  }

  return new Promise(function (resolve) {
    // wait for the out transition to complete (if necessary)
    nuxt.$once('triggerScroll', function () {
      // coords will be used if no selector is provided,
      // or if the selector didn't match any element.
      if (to.hash) {
        var hash = to.hash; // CSS.escape() is not supported with IE and Edge.

        if (typeof window.CSS !== 'undefined' && typeof window.CSS.escape !== 'undefined') {
          hash = '#' + window.CSS.escape(hash.substr(1));
        }

        try {
          if (document.querySelector(hash)) {
            // scroll to anchor by returning the selector
            position = {
              selector: hash
            };
          }
        } catch (e) {
          console.warn('Failed to save scroll position. Please add CSS.escape() polyfill (https://github.com/mathiasbynens/CSS.escape).');
        }
      }

      resolve(position);
    });
  });
});
// CONCATENATED MODULE: ./.nuxt/router.js


function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { Object(defineProperty["a" /* default */])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
















var router_7b8feb03 = function _7b8feb03() {
  return Object(utils["m" /* interopDefault */])(Promise.all(/* import() | pages/remote-sky/index */[__webpack_require__.e(3), __webpack_require__.e(0), __webpack_require__.e(2), __webpack_require__.e(4), __webpack_require__.e(14)]).then(__webpack_require__.bind(null, 391)));
};

var router_c2e922bc = function _c2e922bc() {
  return Object(utils["m" /* interopDefault */])(Promise.all(/* import() | pages/wave/index */[__webpack_require__.e(0), __webpack_require__.e(2), __webpack_require__.e(5), __webpack_require__.e(16)]).then(__webpack_require__.bind(null, 392)));
};

var router_07faf4d4 = function _07faf4d4() {
  return Object(utils["m" /* interopDefault */])(Promise.all(/* import() | pages/remote-sky/sender */[__webpack_require__.e(1), __webpack_require__.e(0), __webpack_require__.e(15)]).then(__webpack_require__.bind(null, 393)));
};

var router_446fe515 = function _446fe515() {
  return Object(utils["m" /* interopDefault */])(Promise.all(/* import() | pages/wave/sender */[__webpack_require__.e(1), __webpack_require__.e(0), __webpack_require__.e(17)]).then(__webpack_require__.bind(null, 394)));
};

var emptyFn = function emptyFn() {};

vue_runtime_esm["a" /* default */].use(vue_router_esm["a" /* default */]);
var routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior: router_scrollBehavior,
  routes: [{
    path: "/remote-sky",
    component: router_7b8feb03,
    name: "remote-sky"
  }, {
    path: "/wave",
    component: router_c2e922bc,
    name: "wave"
  }, {
    path: "/remote-sky/sender",
    component: router_07faf4d4,
    name: "remote-sky-sender"
  }, {
    path: "/wave/sender",
    component: router_446fe515,
    name: "wave-sender"
  }],
  fallback: false
};
function createRouter(ssrContext, config) {
  var base = config._app && config._app.basePath || routerOptions.base;
  var router = new vue_router_esm["a" /* default */](_objectSpread(_objectSpread({}, routerOptions), {}, {
    base: base
  })); // TODO: remove in Nuxt 3

  var originalPush = router.push;

  router.push = function push(location) {
    var onComplete = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : emptyFn;
    var onAbort = arguments.length > 2 ? arguments[2] : undefined;
    return originalPush.call(this, location, onComplete, onAbort);
  };

  var resolve = router.resolve.bind(router);

  router.resolve = function (to, current, append) {
    if (typeof to === 'string') {
      to = Object(dist["c" /* normalizeURL */])(to);
    }

    return resolve(to, current, append);
  };

  return router;
}
// CONCATENATED MODULE: ./.nuxt/components/nuxt-child.js


/* harmony default export */ var nuxt_child = ({
  name: 'NuxtChild',
  functional: true,
  props: {
    nuxtChildKey: {
      type: String,
      default: ''
    },
    keepAlive: Boolean,
    keepAliveProps: {
      type: Object,
      default: undefined
    }
  },
  render: function render(_, _ref) {
    var parent = _ref.parent,
        data = _ref.data,
        props = _ref.props;
    var h = parent.$createElement;
    data.nuxtChild = true;
    var _parent = parent;
    var transitions = parent.$nuxt.nuxt.transitions;
    var defaultTransition = parent.$nuxt.nuxt.defaultTransition;
    var depth = 0;

    while (parent) {
      if (parent.$vnode && parent.$vnode.data.nuxtChild) {
        depth++;
      }

      parent = parent.$parent;
    }

    data.nuxtChildDepth = depth;
    var transition = transitions[depth] || defaultTransition;
    var transitionProps = {};
    transitionsKeys.forEach(function (key) {
      if (typeof transition[key] !== 'undefined') {
        transitionProps[key] = transition[key];
      }
    });
    var listeners = {};
    listenersKeys.forEach(function (key) {
      if (typeof transition[key] === 'function') {
        listeners[key] = transition[key].bind(_parent);
      }
    });

    if (true) {
      // Add triggerScroll event on beforeEnter (fix #1376)
      var beforeEnter = listeners.beforeEnter;

      listeners.beforeEnter = function (el) {
        // Ensure to trigger scroll event after calling scrollBehavior
        window.$nuxt.$nextTick(function () {
          window.$nuxt.$emit('triggerScroll');
        });

        if (beforeEnter) {
          return beforeEnter.call(_parent, el);
        }
      };
    } // make sure that leave is called asynchronous (fix #5703)


    if (transition.css === false) {
      var leave = listeners.leave; // only add leave listener when user didnt provide one
      // or when it misses the done argument

      if (!leave || leave.length < 2) {
        listeners.leave = function (el, done) {
          if (leave) {
            leave.call(_parent, el);
          }

          _parent.$nextTick(done);
        };
      }
    }

    var routerView = h('routerView', data);

    if (props.keepAlive) {
      routerView = h('keep-alive', {
        props: props.keepAliveProps
      }, [routerView]);
    }

    return h('transition', {
      props: transitionProps,
      on: listeners
    }, [routerView]);
  }
});
var transitionsKeys = ['name', 'mode', 'appear', 'css', 'type', 'duration', 'enterClass', 'leaveClass', 'appearClass', 'enterActiveClass', 'enterActiveClass', 'leaveActiveClass', 'appearActiveClass', 'enterToClass', 'leaveToClass', 'appearToClass'];
var listenersKeys = ['beforeEnter', 'enter', 'afterEnter', 'enterCancelled', 'beforeLeave', 'leave', 'afterLeave', 'leaveCancelled', 'beforeAppear', 'appear', 'afterAppear', 'appearCancelled'];
// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2-0!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./.nuxt/components/nuxt-error.vue?vue&type=template&id=5eb69f1c&
var nuxt_errorvue_type_template_id_5eb69f1c_render = function render() {
  var _vm = this,
      _c = _vm._self._c;

  return _c('div', {
    staticClass: "__nuxt-error-page"
  }, [_c('div', {
    staticClass: "error"
  }, [_c('svg', {
    attrs: {
      "xmlns": "http://www.w3.org/2000/svg",
      "width": "90",
      "height": "90",
      "fill": "#DBE1EC",
      "viewBox": "0 0 48 48"
    }
  }, [_c('path', {
    attrs: {
      "d": "M22 30h4v4h-4zm0-16h4v12h-4zm1.99-10C12.94 4 4 12.95 4 24s8.94 20 19.99 20S44 35.05 44 24 35.04 4 23.99 4zM24 40c-8.84 0-16-7.16-16-16S15.16 8 24 8s16 7.16 16 16-7.16 16-16 16z"
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "title"
  }, [_vm._v(_vm._s(_vm.message))]), _vm._v(" "), _vm.statusCode === 404 ? _c('p', {
    staticClass: "description"
  }, [typeof _vm.$route === 'undefined' ? _c('a', {
    staticClass: "error-link",
    attrs: {
      "href": "/"
    }
  }) : _c('NuxtLink', {
    staticClass: "error-link",
    attrs: {
      "to": "/"
    }
  }, [_vm._v("Back to the home page")])], 1) : _vm._e(), _vm._v(" "), _vm._m(0)])]);
};

var staticRenderFns = [function () {
  var _vm = this,
      _c = _vm._self._c;

  return _c('div', {
    staticClass: "logo"
  }, [_c('a', {
    attrs: {
      "href": "https://nuxtjs.org",
      "target": "_blank",
      "rel": "noopener"
    }
  }, [_vm._v("Nuxt")])]);
}];

// CONCATENATED MODULE: ./.nuxt/components/nuxt-error.vue?vue&type=template&id=5eb69f1c&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2-0!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./.nuxt/components/nuxt-error.vue?vue&type=script&lang=js&
/* harmony default export */ var nuxt_errorvue_type_script_lang_js_ = ({
  name: 'NuxtError',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  computed: {
    statusCode: function statusCode() {
      return this.error && this.error.statusCode || 500;
    },
    message: function message() {
      return this.error.message || 'Error';
    }
  },
  head: function head() {
    return {
      title: this.message,
      meta: [{
        name: 'viewport',
        content: 'width=device-width,initial-scale=1.0,minimum-scale=1.0'
      }]
    };
  }
});
// CONCATENATED MODULE: ./.nuxt/components/nuxt-error.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_nuxt_errorvue_type_script_lang_js_ = (nuxt_errorvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./.nuxt/components/nuxt-error.vue?vue&type=style&index=0&id=5eb69f1c&prod&lang=css&
var nuxt_errorvue_type_style_index_0_id_5eb69f1c_prod_lang_css_ = __webpack_require__(243);

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(48);

// CONCATENATED MODULE: ./.nuxt/components/nuxt-error.vue






/* normalize component */

var nuxt_error_component = Object(componentNormalizer["a" /* default */])(
  components_nuxt_errorvue_type_script_lang_js_,
  nuxt_errorvue_type_template_id_5eb69f1c_render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var nuxt_error = (nuxt_error_component.exports);
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/slicedToArray.js + 1 modules
var slicedToArray = __webpack_require__(18);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.regexp.to-string.js
var es_regexp_to_string = __webpack_require__(101);

// CONCATENATED MODULE: ./.nuxt/components/nuxt.js









/* harmony default export */ var components_nuxt = ({
  name: 'Nuxt',
  components: {
    NuxtChild: nuxt_child,
    NuxtError: nuxt_error
  },
  props: {
    nuxtChildKey: {
      type: String,
      default: undefined
    },
    keepAlive: Boolean,
    keepAliveProps: {
      type: Object,
      default: undefined
    },
    name: {
      type: String,
      default: 'default'
    }
  },
  errorCaptured: function errorCaptured(error) {
    // if we receive and error while showing the NuxtError component
    // capture the error and force an immediate update so we re-render
    // without the NuxtError component
    if (this.displayingNuxtError) {
      this.errorFromNuxtError = error;
      this.$forceUpdate();
    }
  },
  computed: {
    routerViewKey: function routerViewKey() {
      // If nuxtChildKey prop is given or current route has children
      if (typeof this.nuxtChildKey !== 'undefined' || this.$route.matched.length > 1) {
        return this.nuxtChildKey || Object(utils["c" /* compile */])(this.$route.matched[0].path)(this.$route.params);
      }

      var _this$$route$matched = Object(slicedToArray["a" /* default */])(this.$route.matched, 1),
          matchedRoute = _this$$route$matched[0];

      if (!matchedRoute) {
        return this.$route.path;
      }

      var Component = matchedRoute.components.default;

      if (Component && Component.options) {
        var options = Component.options;

        if (options.key) {
          return typeof options.key === 'function' ? options.key(this.$route) : options.key;
        }
      }

      var strict = /\/$/.test(matchedRoute.path);
      return strict ? this.$route.path : this.$route.path.replace(/\/$/, '');
    }
  },
  beforeCreate: function beforeCreate() {
    vue_runtime_esm["a" /* default */].util.defineReactive(this, 'nuxt', this.$root.$options.nuxt);
  },
  render: function render(h) {
    var _this = this;

    // if there is no error
    if (!this.nuxt.err) {
      // Directly return nuxt child
      return h('NuxtChild', {
        key: this.routerViewKey,
        props: this.$props
      });
    } // if an error occurred within NuxtError show a simple
    // error message instead to prevent looping


    if (this.errorFromNuxtError) {
      this.$nextTick(function () {
        return _this.errorFromNuxtError = false;
      });
      return h('div', {}, [h('h2', 'An error occurred while showing the error page'), h('p', 'Unfortunately an error occurred and while showing the error page another error occurred'), h('p', "Error details: ".concat(this.errorFromNuxtError.toString())), h('nuxt-link', {
        props: {
          to: '/'
        }
      }, 'Go back to home')]);
    } // track if we are showing the NuxtError component


    this.displayingNuxtError = true;
    this.$nextTick(function () {
      return _this.displayingNuxtError = false;
    });
    return h(nuxt_error, {
      props: {
        error: this.nuxt.err
      }
    });
  }
});
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.slice.js
var es_array_slice = __webpack_require__(42);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.from.js
var es_array_from = __webpack_require__(58);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.symbol.description.js
var es_symbol_description = __webpack_require__(59);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.symbol.iterator.js
var es_symbol_iterator = __webpack_require__(60);

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.timers.js
var web_timers = __webpack_require__(98);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2-0!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./.nuxt/components/nuxt-loading.vue?vue&type=script&lang=js&

/* harmony default export */ var nuxt_loadingvue_type_script_lang_js_ = ({
  name: 'NuxtLoading',
  data: function data() {
    return {
      percent: 0,
      show: false,
      canSucceed: true,
      reversed: false,
      skipTimerCount: 0,
      rtl: false,
      throttle: 200,
      duration: 5000,
      continuous: false
    };
  },
  computed: {
    left: function left() {
      if (!this.continuous && !this.rtl) {
        return false;
      }

      return this.rtl ? this.reversed ? '0px' : 'auto' : !this.reversed ? '0px' : 'auto';
    }
  },
  beforeDestroy: function beforeDestroy() {
    this.clear();
  },
  methods: {
    clear: function clear() {
      clearInterval(this._timer);
      clearTimeout(this._throttle);
      this._timer = null;
    },
    start: function start() {
      var _this = this;

      this.clear();
      this.percent = 0;
      this.reversed = false;
      this.skipTimerCount = 0;
      this.canSucceed = true;

      if (this.throttle) {
        this._throttle = setTimeout(function () {
          return _this.startTimer();
        }, this.throttle);
      } else {
        this.startTimer();
      }

      return this;
    },
    set: function set(num) {
      this.show = true;
      this.canSucceed = true;
      this.percent = Math.min(100, Math.max(0, Math.floor(num)));
      return this;
    },
    get: function get() {
      return this.percent;
    },
    increase: function increase(num) {
      this.percent = Math.min(100, Math.floor(this.percent + num));
      return this;
    },
    decrease: function decrease(num) {
      this.percent = Math.max(0, Math.floor(this.percent - num));
      return this;
    },
    pause: function pause() {
      clearInterval(this._timer);
      return this;
    },
    resume: function resume() {
      this.startTimer();
      return this;
    },
    finish: function finish() {
      this.percent = this.reversed ? 0 : 100;
      this.hide();
      return this;
    },
    hide: function hide() {
      var _this2 = this;

      this.clear();
      setTimeout(function () {
        _this2.show = false;

        _this2.$nextTick(function () {
          _this2.percent = 0;
          _this2.reversed = false;
        });
      }, 500);
      return this;
    },
    fail: function fail(error) {
      this.canSucceed = false;
      return this;
    },
    startTimer: function startTimer() {
      var _this3 = this;

      if (!this.show) {
        this.show = true;
      }

      if (typeof this._cut === 'undefined') {
        this._cut = 10000 / Math.floor(this.duration);
      }

      this._timer = setInterval(function () {
        /**
         * When reversing direction skip one timers
         * so 0, 100 are displayed for two iterations
         * also disable css width transitioning
         * which otherwise interferes and shows
         * a jojo effect
         */
        if (_this3.skipTimerCount > 0) {
          _this3.skipTimerCount--;
          return;
        }

        if (_this3.reversed) {
          _this3.decrease(_this3._cut);
        } else {
          _this3.increase(_this3._cut);
        }

        if (_this3.continuous) {
          if (_this3.percent >= 100) {
            _this3.skipTimerCount = 1;
            _this3.reversed = !_this3.reversed;
          } else if (_this3.percent <= 0) {
            _this3.skipTimerCount = 1;
            _this3.reversed = !_this3.reversed;
          }
        }
      }, 100);
    }
  },
  render: function render(h) {
    var el = h(false);

    if (this.show) {
      el = h('div', {
        staticClass: 'nuxt-progress',
        class: {
          'nuxt-progress-notransition': this.skipTimerCount > 0,
          'nuxt-progress-failed': !this.canSucceed
        },
        style: {
          width: this.percent + '%',
          left: this.left
        }
      });
    }

    return el;
  }
});
// CONCATENATED MODULE: ./.nuxt/components/nuxt-loading.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_nuxt_loadingvue_type_script_lang_js_ = (nuxt_loadingvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./.nuxt/components/nuxt-loading.vue?vue&type=style&index=0&id=33856d5f&prod&lang=css&
var nuxt_loadingvue_type_style_index_0_id_33856d5f_prod_lang_css_ = __webpack_require__(245);

// CONCATENATED MODULE: ./.nuxt/components/nuxt-loading.vue
var nuxt_loading_render, nuxt_loading_staticRenderFns





/* normalize component */

var nuxt_loading_component = Object(componentNormalizer["a" /* default */])(
  components_nuxt_loadingvue_type_script_lang_js_,
  nuxt_loading_render,
  nuxt_loading_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var nuxt_loading = (nuxt_loading_component.exports);
// EXTERNAL MODULE: ./public/style.css
var style = __webpack_require__(247);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2-0!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./.nuxt/layouts/default.vue?vue&type=template&id=0040005c&
var defaultvue_type_template_id_0040005c_render = function render() {
  var _vm = this,
      _c = _vm._self._c;

  return _c('Nuxt');
};

var defaultvue_type_template_id_0040005c_staticRenderFns = [];

// CONCATENATED MODULE: ./.nuxt/layouts/default.vue?vue&type=template&id=0040005c&

// CONCATENATED MODULE: ./.nuxt/layouts/default.vue

var script = {}


/* normalize component */

var default_component = Object(componentNormalizer["a" /* default */])(
  script,
  defaultvue_type_template_id_0040005c_render,
  defaultvue_type_template_id_0040005c_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var layouts_default = (default_component.exports);
// CONCATENATED MODULE: ./.nuxt/App.js









function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }













var layouts = {
  "_default": Object(utils["s" /* sanitizeComponent */])(layouts_default)
};
/* harmony default export */ var App = ({
  render: function render(h, props) {
    var loadingEl = h('NuxtLoading', {
      ref: 'loading'
    });
    var layoutEl = h(this.layout || 'nuxt');
    var templateEl = h('div', {
      domProps: {
        id: '__layout'
      },
      key: this.layoutName
    }, [layoutEl]);
    var transitionEl = h('transition', {
      props: {
        name: 'layout',
        mode: 'out-in'
      },
      on: {
        beforeEnter: function beforeEnter(el) {
          // Ensure to trigger scroll event after calling scrollBehavior
          window.$nuxt.$nextTick(function () {
            window.$nuxt.$emit('triggerScroll');
          });
        }
      }
    }, [templateEl]);
    return h('div', {
      domProps: {
        id: '__nuxt'
      }
    }, [loadingEl, transitionEl]);
  },
  data: function data() {
    return {
      isOnline: true,
      layout: null,
      layoutName: '',
      nbFetching: 0
    };
  },
  beforeCreate: function beforeCreate() {
    vue_runtime_esm["a" /* default */].util.defineReactive(this, 'nuxt', this.$options.nuxt);
  },
  created: function created() {
    // Add this.$nuxt in child instances
    this.$root.$options.$nuxt = this;

    if (true) {
      // add to window so we can listen when ready
      window.$nuxt = this;
      this.refreshOnlineStatus(); // Setup the listeners

      window.addEventListener('online', this.refreshOnlineStatus);
      window.addEventListener('offline', this.refreshOnlineStatus);
    } // Add $nuxt.error()


    this.error = this.nuxt.error; // Add $nuxt.context

    this.context = this.$options.context;
  },
  mounted: function mounted() {
    var _this = this;

    return Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _this.$loading = _this.$refs.loading;

            case 1:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  },
  watch: {
    'nuxt.err': 'errorChanged'
  },
  computed: {
    isOffline: function isOffline() {
      return !this.isOnline;
    },
    isFetching: function isFetching() {
      return this.nbFetching > 0;
    },
    isPreview: function isPreview() {
      return Boolean(this.$options.previewData);
    }
  },
  methods: {
    refreshOnlineStatus: function refreshOnlineStatus() {
      if (true) {
        if (typeof window.navigator.onLine === 'undefined') {
          // If the browser doesn't support connection status reports
          // assume that we are online because most apps' only react
          // when they now that the connection has been interrupted
          this.isOnline = true;
        } else {
          this.isOnline = window.navigator.onLine;
        }
      }
    },
    refresh: function refresh() {
      var _this2 = this;

      return Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var pages, promises;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                pages = Object(utils["h" /* getMatchedComponentsInstances */])(_this2.$route);

                if (pages.length) {
                  _context2.next = 3;
                  break;
                }

                return _context2.abrupt("return");

              case 3:
                _this2.$loading.start();

                promises = pages.map(function (page) {
                  var p = []; // Old fetch

                  if (page.$options.fetch && page.$options.fetch.length) {
                    p.push(Object(utils["q" /* promisify */])(page.$options.fetch, _this2.context));
                  }

                  if (page.$fetch) {
                    p.push(page.$fetch());
                  } else {
                    // Get all component instance to call $fetch
                    var _iterator = _createForOfIteratorHelper(Object(utils["e" /* getChildrenComponentInstancesUsingFetch */])(page.$vnode.componentInstance)),
                        _step;

                    try {
                      for (_iterator.s(); !(_step = _iterator.n()).done;) {
                        var component = _step.value;
                        p.push(component.$fetch());
                      }
                    } catch (err) {
                      _iterator.e(err);
                    } finally {
                      _iterator.f();
                    }
                  }

                  if (page.$options.asyncData) {
                    p.push(Object(utils["q" /* promisify */])(page.$options.asyncData, _this2.context).then(function (newData) {
                      for (var key in newData) {
                        vue_runtime_esm["a" /* default */].set(page.$data, key, newData[key]);
                      }
                    }));
                  }

                  return Promise.all(p);
                });
                _context2.prev = 5;
                _context2.next = 8;
                return Promise.all(promises);

              case 8:
                _context2.next = 15;
                break;

              case 10:
                _context2.prev = 10;
                _context2.t0 = _context2["catch"](5);

                _this2.$loading.fail(_context2.t0);

                Object(utils["k" /* globalHandleError */])(_context2.t0);

                _this2.error(_context2.t0);

              case 15:
                _this2.$loading.finish();

              case 16:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[5, 10]]);
      }))();
    },
    errorChanged: function errorChanged() {
      if (this.nuxt.err) {
        if (this.$loading) {
          if (this.$loading.fail) {
            this.$loading.fail(this.nuxt.err);
          }

          if (this.$loading.finish) {
            this.$loading.finish();
          }
        }

        var errorLayout = (nuxt_error.options || nuxt_error).layout;

        if (typeof errorLayout === 'function') {
          errorLayout = errorLayout(this.context);
        }

        this.setLayout(errorLayout);
      }
    },
    setLayout: function setLayout(layout) {
      if (!layout || !layouts['_' + layout]) {
        layout = 'default';
      }

      this.layoutName = layout;
      this.layout = layouts['_' + layout];
      return this.layout;
    },
    loadLayout: function loadLayout(layout) {
      if (!layout || !layouts['_' + layout]) {
        layout = 'default';
      }

      return Promise.resolve(layouts['_' + layout]);
    }
  },
  components: {
    NuxtLoading: nuxt_loading
  }
});
// CONCATENATED MODULE: ./.nuxt/store.js


vue_runtime_esm["a" /* default */].use(vuex_esm["a" /* default */]);
var store_store = {};

(function updateModules() {
  store_store = normalizeRoot(__webpack_require__(249), 'store/index.js'); // If store is an exported method = classic mode (deprecated)
  // Enforce store modules

  store_store.modules = store_store.modules || {}; // If the environment supports hot reloading...
})(); // createStore


var createStore = store_store instanceof Function ? store_store : function () {
  return new vuex_esm["a" /* default */].Store(Object.assign({
    strict: "production" !== 'production'
  }, store_store));
};

function normalizeRoot(moduleData, filePath) {
  moduleData = moduleData.default || moduleData;

  if (moduleData.commit) {
    throw new Error("[nuxt] ".concat(filePath, " should export a method that returns a Vuex instance."));
  }

  if (typeof moduleData !== 'function') {
    // Avoid TypeError: setting a property that has only a getter when overwriting top level keys
    moduleData = Object.assign({}, moduleData);
  }

  return normalizeModule(moduleData, filePath);
}

function normalizeModule(moduleData, filePath) {
  if (moduleData.state && typeof moduleData.state !== 'function') {
    console.warn("'state' should be a method that returns an object in ".concat(filePath));

    var _state = Object.assign({}, moduleData.state); // Avoid TypeError: setting a property that has only a getter when overwriting top level keys


    moduleData = Object.assign({}, moduleData, {
      state: function state() {
        return _state;
      }
    });
  }

  return moduleData;
}
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.includes.js
var es_array_includes = __webpack_require__(95);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.includes.js
var es_string_includes = __webpack_require__(96);

// CONCATENATED MODULE: ./.nuxt/components/index.js






var PeerClient = function PeerClient() {
  return Promise.all(/* import() | components/peer-client */[__webpack_require__.e(0), __webpack_require__.e(2), __webpack_require__.e(8)]).then(__webpack_require__.bind(null, 256)).then(function (c) {
    return wrapFunctional(c.default || c);
  });
};
var PeerController = function PeerController() {
  return Promise.all(/* import() | components/peer-controller */[__webpack_require__.e(1), __webpack_require__.e(0), __webpack_require__.e(9)]).then(__webpack_require__.bind(null, 257)).then(function (c) {
    return wrapFunctional(c.default || c);
  });
};
var Receiver = function Receiver() {
  return Promise.all(/* import() | components/receiver */[__webpack_require__.e(0), __webpack_require__.e(2), __webpack_require__.e(10)]).then(__webpack_require__.bind(null, 263)).then(function (c) {
    return wrapFunctional(c.default || c);
  });
};
var Sender = function Sender() {
  return Promise.all(/* import() | components/sender */[__webpack_require__.e(1), __webpack_require__.e(0), __webpack_require__.e(12)]).then(__webpack_require__.bind(null, 264)).then(function (c) {
    return wrapFunctional(c.default || c);
  });
};
var RemoteSkyRenderer = function RemoteSkyRenderer() {
  return Promise.all(/* import() | components/remote-sky-renderer */[__webpack_require__.e(3), __webpack_require__.e(4), __webpack_require__.e(11)]).then(__webpack_require__.bind(null, 328)).then(function (c) {
    return wrapFunctional(c.default || c);
  });
};
var WaveRenderer = function WaveRenderer() {
  return Promise.all(/* import() | components/wave-renderer */[__webpack_require__.e(5), __webpack_require__.e(13)]).then(__webpack_require__.bind(null, 329)).then(function (c) {
    return wrapFunctional(c.default || c);
  });
}; // nuxt/nuxt.js#8607

function wrapFunctional(options) {
  if (!options || !options.functional) {
    return options;
  }

  var propKeys = Array.isArray(options.props) ? options.props : Object.keys(options.props || {});
  return {
    render: function render(h) {
      var attrs = {};
      var props = {};

      for (var key in this.$attrs) {
        if (propKeys.includes(key)) {
          props[key] = this.$attrs[key];
        } else {
          attrs[key] = this.$attrs[key];
        }
      }

      return h(options, {
        on: this.$listeners,
        attrs: attrs,
        props: props,
        scopedSlots: this.$scopedSlots
      }, this.$slots.default);
    }
  };
}
// CONCATENATED MODULE: ./.nuxt/components/plugin.js



for (var plugin_name in components_namespaceObject) {
  vue_runtime_esm["a" /* default */].component(plugin_name, components_namespaceObject[plugin_name]);
  vue_runtime_esm["a" /* default */].component('Lazy' + plugin_name, components_namespaceObject[plugin_name]);
}
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.pad-start.js
var es_string_pad_start = __webpack_require__(251);

// EXTERNAL MODULE: ./node_modules/colormap/colorScale.js
var colorScale = __webpack_require__(133);
var colorScale_default = /*#__PURE__*/__webpack_require__.n(colorScale);

// CONCATENATED MODULE: ./plugins/default.js






/* harmony default export */ var plugins_default = (function (_ref, inject) {
  var app = _ref.app;

  function shadeHexColor(color, percent) {
    var f = parseInt(color.slice(1), 16),
        t = percent < 0 ? 0 : 255,
        p = percent < 0 ? percent * -1 : percent,
        R = f >> 16,
        G = f >> 8 & 0x00FF,
        B = f & 0x0000FF;
    return "#" + (0x1000000 + (Math.round((t - R) * p) + R) * 0x10000 + (Math.round((t - G) * p) + G) * 0x100 + (Math.round((t - B) * p) + B)).toString(16).slice(1);
  }

  function getKey() {
    return Math.floor(Math.random() * Math.pow(2, 18)).toString(36).padStart(4, 0).toString();
  }

  inject('shadeHexColor', shadeHexColor);
  inject('colors', Object.keys(colorScale_default.a));
  inject('shades', 40);
  inject('getKey', getKey);
});
;
// CONCATENATED MODULE: ./.nuxt/index.js










function _nuxt_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _nuxt_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? _nuxt_ownKeys(Object(source), !0).forEach(function (key) { Object(defineProperty["a" /* default */])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : _nuxt_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }


















/* Plugins */

 // Source: ./components/plugin.js (mode: 'all')

 // Source: ../plugins/default.js (mode: 'all')
// Component: <ClientOnly>

vue_runtime_esm["a" /* default */].component(vue_client_only_common_default.a.name, vue_client_only_common_default.a); // TODO: Remove in Nuxt 3: <NoSsr>

vue_runtime_esm["a" /* default */].component(vue_no_ssr_common_default.a.name, _nuxt_objectSpread(_nuxt_objectSpread({}, vue_no_ssr_common_default.a), {}, {
  render: function render(h, ctx) {
    if ( true && !vue_no_ssr_common_default.a._warned) {
      vue_no_ssr_common_default.a._warned = true;
      console.warn('<no-ssr> has been deprecated and will be removed in Nuxt 3, please use <client-only> instead');
    }

    return vue_no_ssr_common_default.a.render(h, ctx);
  }
})); // Component: <NuxtChild>

vue_runtime_esm["a" /* default */].component(nuxt_child.name, nuxt_child);
vue_runtime_esm["a" /* default */].component('NChild', nuxt_child); // Component NuxtLink is imported in server.js or client.js
// Component: <Nuxt>

vue_runtime_esm["a" /* default */].component(components_nuxt.name, components_nuxt);
Object.defineProperty(vue_runtime_esm["a" /* default */].prototype, '$nuxt', {
  get: function get() {
    var globalNuxt = this.$root.$options.$nuxt;

    if ( true && !globalNuxt && typeof window !== 'undefined') {
      return window.$nuxt;
    }

    return globalNuxt;
  },
  configurable: true
});
vue_runtime_esm["a" /* default */].use(vue_meta_esm_browser["a" /* default */], {
  "keyName": "head",
  "attribute": "data-n-head",
  "ssrAttribute": "data-n-head-ssr",
  "tagIDKeyName": "hid"
});
var defaultTransition = {
  "name": "page",
  "mode": "out-in",
  "appear": true,
  "appearClass": "appear",
  "appearActiveClass": "appear-active",
  "appearToClass": "appear-to"
};
var originalRegisterModule = vuex_esm["a" /* default */].Store.prototype.registerModule;

function registerModule(path, rawModule) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var preserveState =  true && (Array.isArray(path) ? !!path.reduce(function (namespacedState, path) {
    return namespacedState && namespacedState[path];
  }, this.state) : path in this.state);
  return originalRegisterModule.call(this, path, rawModule, _nuxt_objectSpread({
    preserveState: preserveState
  }, options));
}

function createApp(_x) {
  return _createApp.apply(this, arguments);
}

function _createApp() {
  _createApp = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(ssrContext) {
    var config,
        router,
        store,
        app,
        next,
        route,
        path,
        inject,
        _args2 = arguments;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            inject = function _inject(key, value) {
              if (!key) {
                throw new Error('inject(key, value) has no key provided');
              }

              if (value === undefined) {
                throw new Error("inject('".concat(key, "', value) has no value provided"));
              }

              key = '$' + key; // Add into app

              app[key] = value; // Add into context

              if (!app.context[key]) {
                app.context[key] = value;
              } // Add into store


              store[key] = app[key]; // Check if plugin not already installed

              var installKey = '__nuxt_' + key + '_installed__';

              if (vue_runtime_esm["a" /* default */][installKey]) {
                return;
              }

              vue_runtime_esm["a" /* default */][installKey] = true; // Call Vue.use() to install the plugin into vm

              vue_runtime_esm["a" /* default */].use(function () {
                if (!Object.prototype.hasOwnProperty.call(vue_runtime_esm["a" /* default */].prototype, key)) {
                  Object.defineProperty(vue_runtime_esm["a" /* default */].prototype, key, {
                    get: function get() {
                      return this.$root.$options[key];
                    }
                  });
                }
              });
            };

            config = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : {};
            _context2.next = 4;
            return createRouter(ssrContext, config);

          case 4:
            router = _context2.sent;
            store = createStore(ssrContext); // Add this.$router into store actions/mutations

            store.$router = router; // Create Root instance
            // here we inject the router and store to all child components,
            // making them available everywhere as `this.$router` and `this.$store`.

            app = _nuxt_objectSpread({
              head: {
                "title": "draw",
                "htmlAttrs": {
                  "lang": "en"
                },
                "meta": [{
                  "charset": "utf-8"
                }, {
                  "name": "viewport",
                  "content": "width=device-width, initial-scale=1"
                }, {
                  "hid": "description",
                  "name": "description",
                  "content": ""
                }, {
                  "name": "format-detection",
                  "content": "telephone=no"
                }],
                "link": [{
                  "rel": "icon",
                  "type": "image/x-icon",
                  "href": "/favicon.ico"
                }],
                "style": [],
                "script": []
              },
              store: store,
              router: router,
              nuxt: {
                defaultTransition: defaultTransition,
                transitions: [defaultTransition],
                setTransitions: function setTransitions(transitions) {
                  if (!Array.isArray(transitions)) {
                    transitions = [transitions];
                  }

                  transitions = transitions.map(function (transition) {
                    if (!transition) {
                      transition = defaultTransition;
                    } else if (typeof transition === 'string') {
                      transition = Object.assign({}, defaultTransition, {
                        name: transition
                      });
                    } else {
                      transition = Object.assign({}, defaultTransition, transition);
                    }

                    return transition;
                  });
                  this.$options.nuxt.transitions = transitions;
                  return transitions;
                },
                err: null,
                dateErr: null,
                error: function error(err) {
                  err = err || null;
                  app.context._errored = Boolean(err);
                  err = err ? Object(utils["p" /* normalizeError */])(err) : null;
                  var nuxt = app.nuxt; // to work with @vue/composition-api, see https://github.com/nuxt/nuxt.js/issues/6517#issuecomment-573280207

                  if (this) {
                    nuxt = this.nuxt || this.$options.nuxt;
                  }

                  nuxt.dateErr = Date.now();
                  nuxt.err = err; // Used in src/server.js

                  if (ssrContext) {
                    ssrContext.nuxt.error = err;
                  }

                  return err;
                }
              }
            }, App); // Make app available into store via this.app

            store.app = app;
            next = ssrContext ? ssrContext.next : function (location) {
              return app.router.push(location);
            }; // Resolve route

            if (ssrContext) {
              route = router.resolve(ssrContext.url).route;
            } else {
              path = Object(utils["f" /* getLocation */])(router.options.base, router.options.mode);
              route = router.resolve(path).route;
            } // Set context to app.context


            _context2.next = 13;
            return Object(utils["t" /* setContext */])(app, {
              store: store,
              route: route,
              next: next,
              error: app.nuxt.error.bind(app),
              payload: ssrContext ? ssrContext.payload : undefined,
              req: ssrContext ? ssrContext.req : undefined,
              res: ssrContext ? ssrContext.res : undefined,
              beforeRenderFns: ssrContext ? ssrContext.beforeRenderFns : undefined,
              ssrContext: ssrContext
            });

          case 13:
            // Inject runtime config as $config
            inject('config', config);

            if (true) {
              // Replace store state before plugins execution
              if (window.__NUXT__ && window.__NUXT__.state) {
                store.replaceState(window.__NUXT__.state);
              }
            } // Add enablePreview(previewData = {}) in context for plugins


            if (true) {
              app.context.enablePreview = function () {
                var previewData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
                app.previewData = Object.assign({}, previewData);
                inject('preview', previewData);
              };
            } // Plugin execution


            if (!(typeof /* Cannot get final name for export "default" in "./.nuxt/components/plugin.js" (known exports: , known reexports: ) */ undefined === 'function')) {
              _context2.next = 19;
              break;
            }

            _context2.next = 19;
            return /* Cannot get final name for export "default" in "./.nuxt/components/plugin.js" (known exports: , known reexports: ) */ undefined(app.context, inject);

          case 19:
            if (!(typeof plugins_default === 'function')) {
              _context2.next = 22;
              break;
            }

            _context2.next = 22;
            return plugins_default(app.context, inject);

          case 22:
            // Lock enablePreview in context
            if (true) {
              app.context.enablePreview = function () {
                console.warn('You cannot call enablePreview() outside a plugin.');
              };
            } // Wait for async component to be resolved first


            _context2.next = 25;
            return new Promise(function (resolve, reject) {
              // Ignore 404s rather than blindly replacing URL in browser
              if (true) {
                var _router$resolve = router.resolve(app.context.route.fullPath),
                    _route = _router$resolve.route;

                if (!_route.matched.length) {
                  return resolve();
                }
              }

              router.replace(app.context.route.fullPath, resolve, function (err) {
                // https://github.com/vuejs/vue-router/blob/v3.4.3/src/util/errors.js
                if (!err._isRouter) return reject(err);
                if (err.type !== 2
                /* NavigationFailureType.redirected */
                ) return resolve(); // navigated to a different route in router guard

                var unregister = router.afterEach( /*#__PURE__*/function () {
                  var _ref = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regeneratorRuntime.mark(function _callee(to, from) {
                    return regeneratorRuntime.wrap(function _callee$(_context) {
                      while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            if (false) {}

                            _context.next = 3;
                            return Object(utils["j" /* getRouteData */])(to);

                          case 3:
                            app.context.route = _context.sent;
                            app.context.params = to.params || {};
                            app.context.query = to.query || {};
                            unregister();
                            resolve();

                          case 8:
                          case "end":
                            return _context.stop();
                        }
                      }
                    }, _callee);
                  }));

                  return function (_x2, _x3) {
                    return _ref.apply(this, arguments);
                  };
                }());
              });
            });

          case 25:
            return _context2.abrupt("return", {
              store: store,
              app: app,
              router: router
            });

          case 26:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _createApp.apply(this, arguments);
}



/***/ }),

/***/ 62:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * vue-no-ssr v1.1.1
 * (c) 2018-present egoist <0x142857@gmail.com>
 * Released under the MIT License.
 */


var index = {
  name: 'NoSsr',
  functional: true,
  props: {
    placeholder: String,
    placeholderTag: {
      type: String,
      default: 'div'
    }
  },
  render: function render(h, ref) {
    var parent = ref.parent;
    var slots = ref.slots;
    var props = ref.props;

    var ref$1 = slots();
    var defaultSlot = ref$1.default; if ( defaultSlot === void 0 ) defaultSlot = [];
    var placeholderSlot = ref$1.placeholder;

    if (parent._isMounted) {
      return defaultSlot
    }

    parent.$once('hook:mounted', function () {
      parent.$forceUpdate();
    });

    if (props.placeholderTag && (props.placeholder || placeholderSlot)) {
      return h(
        props.placeholderTag,
        {
          class: ['no-ssr-placeholder']
        },
        props.placeholder || placeholderSlot
      )
    }

    // Return a placeholder element for each child in the default slot
    // Or if no children return a single placeholder
    return defaultSlot.length > 0 ? defaultSlot.map(function () { return h(false); }) : h(false)
  }
};

module.exports = index;


/***/ })

},[[193,18,7]]]);