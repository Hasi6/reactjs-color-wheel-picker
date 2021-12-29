"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/web.dom.iterable.js");

var _react = _interopRequireWildcard(require("react"));

require("./styles/ColorPicker.css");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _ColorWheel = _interopRequireDefault(require("./ColorWheel"));

var _utils = require("./helpers/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const ColorPicker = _ref => {
  let {
    size,
    initialColor,
    onChange
  } = _ref;
  const [pickedColor, setPickedColor] = (0, _react.useState)({
    hex: '#FF0000',
    rgb: {
      r: 255,
      g: 0,
      b: 0
    },
    hsl: {
      h: 0,
      s: 100,
      l: 50
    }
  });
  (0, _react.useEffect)(() => {
    if (/^#[0-9A-F]{6}$/i.test(initialColor)) {
      const hex = initialColor.toUpperCase();
      const rgb = (0, _utils.hexToRGB)(initialColor);
      const hsl = (0, _utils.rgbToHsl)(rgb.r, rgb.g, rgb.b);
      setPickedColor({
        hex,
        rgb,
        hsl
      });
    } else if (Number.isInteger(initialColor.r) && Number.isInteger(initialColor.g) && Number.isInteger(initialColor.b)) {
      const hex = (0, _utils.rgbToHex)(initialColor.r, initialColor.g, initialColor.b);
      const rgb = initialColor;
      const hsl = (0, _utils.rgbToHsl)(initialColor.r, initialColor.g, initialColor.b);
      setPickedColor({
        hex,
        rgb,
        hsl
      });
    } else {
      setPickedColor({
        hex: '#FF0000',
        rgb: {
          r: 255,
          g: 0,
          b: 0
        },
        hsl: {
          h: 0,
          s: 100,
          l: 50
        }
      });
    }
  }, [initialColor]);
  const setColorFromWheel = (0, _react.useCallback)(hsl => {
    const h = parseFloat((hsl.h === undefined ? pickedColor.hsl.h : hsl.h).toFixed(2));
    const s = parseFloat((hsl.s === undefined ? pickedColor.hsl.s : hsl.s).toFixed(2));
    const l = parseFloat((hsl.l === undefined ? pickedColor.hsl.l : hsl.l).toFixed(2));
    const rgb = (0, _utils.hslToRgb)(h, s, l);
    const hex = (0, _utils.rgbToHex)(rgb.r, rgb.g, rgb.b);
    setPickedColor({
      hex,
      rgb,
      hsl: {
        h,
        s,
        l
      }
    });
    onChange({
      hex,
      rgb,
      hsl: {
        h,
        s,
        l
      }
    });
  }, [onChange, pickedColor.hsl]);
  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("div", {
    className: "outerContainer",
    style: {
      height: size,
      width: size
    }
  }, /*#__PURE__*/_react.default.createElement(_ColorWheel.default, {
    color: pickedColor.hsl,
    size: size * (5 / 6),
    setColor: setColorFromWheel
  })));
};

ColorPicker.propTypes = {
  /** Size of the container in pixels (Container is a square). */
  size: _propTypes.default.number,

  /** Color to render onto color wheel. It can be hex(#ffffff) or rgb object({r:0, g:0, b:0}). */
  initialColor: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.shape({
    h: _propTypes.default.number,
    s: _propTypes.default.number,
    l: _propTypes.default.number
  }), _propTypes.default.shape({
    r: _propTypes.default.number,
    g: _propTypes.default.number,
    b: _propTypes.default.number
  })]),

  /** Function which will be called when color change occurs. Parameter is a hsl object */
  onChange: _propTypes.default.func
};
ColorPicker.defaultProps = {
  size: 100,
  initialColor: '#FF0000',
  onChange: () => {}
};
var _default = ColorPicker;
exports.default = _default;