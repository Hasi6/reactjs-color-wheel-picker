"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "GradientPicker", {
  enumerable: true,
  get: function get() {
    return _GradientPicker.default;
  }
});
exports.default = void 0;

var _ColorPicker = _interopRequireDefault(require("./ColorPicker"));

var _GradientPicker = _interopRequireDefault(require("./gradient/GradientPicker"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = _ColorPicker.default;
exports.default = _default;