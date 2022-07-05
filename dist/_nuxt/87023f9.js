(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[13],{

/***/ 329:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2-0!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./components/wave/Renderer.vue?vue&type=template&id=651c887d&
var render = function render() {
  var _vm = this,
      _c = _vm._self._c,
      _setup = _vm._self._setupProxy;

  return _c('div', [_c('main', {
    ref: "main"
  })]);
};

var staticRenderFns = [];

// CONCATENATED MODULE: ./components/wave/Renderer.vue?vue&type=template&id=651c887d&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.keys.js
var es_object_keys = __webpack_require__(27);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.symbol.js
var es_symbol = __webpack_require__(29);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.filter.js
var es_array_filter = __webpack_require__(49);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.to-string.js
var es_object_to_string = __webpack_require__(14);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.get-own-property-descriptor.js
var es_object_get_own_property_descriptor = __webpack_require__(73);

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom-collections.for-each.js
var web_dom_collections_for_each = __webpack_require__(28);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.get-own-property-descriptors.js
var es_object_get_own_property_descriptors = __webpack_require__(74);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/defineProperty.js
var defineProperty = __webpack_require__(30);

// EXTERNAL MODULE: ./node_modules/vue/dist/vue.runtime.esm.js
var vue_runtime_esm = __webpack_require__(1);

// EXTERNAL MODULE: ./node_modules/vuex/dist/vuex.esm.js
var vuex_esm = __webpack_require__(63);

// EXTERNAL MODULE: ./node_modules/three/build/three.module.js
var three_module = __webpack_require__(325);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2-0!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./components/wave/Renderer.vue?vue&type=script&lang=js&









function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { Object(defineProperty["a" /* default */])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }




/* harmony default export */ var Renderervue_type_script_lang_js_ = (vue_runtime_esm["a" /* default */].extend({
  computed: _objectSpread({}, Object(vuex_esm["d" /* mapState */])(['settings', 'stopMultiplicator'])),
  methods: _objectSpread(_objectSpread({}, Object(vuex_esm["c" /* mapMutations */])(['SET_STOP_MULTIPLICATOR'])), {}, {
    getVisibleScreenSize: function getVisibleScreenSize(camera, cameraDistance) {
      var vFOV = three_module["b" /* MathUtils */].degToRad(camera.fov);
      var height = 2 * Math.tan(vFOV / 2) * cameraDistance;
      var width = height * camera.aspect;
      return {
        x: width,
        y: height
      };
    },
    initThree: function initThree() {
      var _this = this;

      var CAMERA_DISTANCE = 5;
      var scene = new three_module["g" /* Scene */]();
      var camera = new three_module["e" /* PerspectiveCamera */](75, window.innerWidth / window.innerHeight, 0.1, 1000);
      scene.background = new three_module["a" /* Color */](0x131200);
      var renderer = new three_module["h" /* WebGLRenderer */]();
      renderer.setSize(window.innerWidth, window.innerHeight);
      this.$refs.main.appendChild(renderer.domElement);
      var geometry = new three_module["f" /* PlaneGeometry */](1, 1);
      var material = new three_module["d" /* MeshBasicMaterial */]({
        color: 0xffffff
      });
      var cube = new three_module["c" /* Mesh */](geometry, material);
      camera.position.z = CAMERA_DISTANCE;
      camera.position.x = -(this.getVisibleScreenSize(camera, CAMERA_DISTANCE).x / 4);

      var animate = function animate() {
        requestAnimationFrame(animate);

        if (_this.stopMultiplicator !== 0) {
          updateContent();
        }

        renderer.render(scene, camera);
      };

      var keyframe = 0;
      var lastCube = cube.clone();

      var updateContent = function updateContent() {
        keyframe++;

        if (keyframe % (11 - Math.floor(10 * _this.settings.speed)) === 0) {
          var newCube = cube.clone();
          newCube.scale.x = _this.settings.lineWidth;
          newCube.scale.y = _this.settings.lineHeight;
          newCube.position.set(lastCube.position.x + (_this.settings.lineWidth + _this.settings.lineDistance), 0.5 - _this.settings.lineYOffset, 0);
          scene.add(newCube);
          camera.position.x = camera.position.x + (_this.settings.lineWidth + _this.settings.lineDistance);
          lastCube = newCube;
        }
      };

      animate();
    }
  }),
  mounted: function mounted() {
    var _this2 = this;

    this.initThree();
    document.addEventListener('keyup', function (event) {
      if (event.keyCode === 32 && _this2.stopMultiplicator !== 0) {
        _this2.SET_STOP_MULTIPLICATOR(0);
      } else {
        _this2.SET_STOP_MULTIPLICATOR(1);
      }
    });
  }
}));
// CONCATENATED MODULE: ./components/wave/Renderer.vue?vue&type=script&lang=js&
 /* harmony default export */ var wave_Renderervue_type_script_lang_js_ = (Renderervue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(48);

// CONCATENATED MODULE: ./components/wave/Renderer.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  wave_Renderervue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var Renderer = __webpack_exports__["default"] = (component.exports);

/***/ })

}]);