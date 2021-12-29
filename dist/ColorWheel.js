"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/web.dom.iterable.js");

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

require("./styles/ColorWheel.css");

var _utils = require("./helpers/utils");

var _LevelBar = _interopRequireDefault(require("./LevelBar"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const ColorWheel = _ref => {
  let {
    color,
    size,
    setColor
  } = _ref;
  const wheel = (0, _react.useRef)(null);
  const [editing, setEditing] = (0, _react.useState)(false);
  (0, _react.useEffect)(() => {
    const mouseDown = event => {
      var _wheel$current;

      if (wheel !== null && wheel !== void 0 && (_wheel$current = wheel.current) !== null && _wheel$current !== void 0 && _wheel$current.contains(event === null || event === void 0 ? void 0 : event.target)) {
        setEditing(true);
      }
    };

    const mouseUp = () => {
      setEditing(false);
    };

    const mouseMove = event => {
      var _event$touches, _event$touches$, _event$touches2, _event$touches2$;

      const clientX = event.clientX || ((_event$touches = event.touches) === null || _event$touches === void 0 ? void 0 : (_event$touches$ = _event$touches[0]) === null || _event$touches$ === void 0 ? void 0 : _event$touches$.clientX);
      const clientY = event.clientY || ((_event$touches2 = event.touches) === null || _event$touches2 === void 0 ? void 0 : (_event$touches2$ = _event$touches2[0]) === null || _event$touches2$ === void 0 ? void 0 : _event$touches2$.clientY);

      if (editing) {
        setColor((0, _utils.coordinatesToHS)((clientX - wheel.current.getBoundingClientRect().x) / size, (clientY - wheel.current.getBoundingClientRect().y) / size));
      }
    };

    window.addEventListener('mousemove', mouseMove);
    window.addEventListener('touchmove', mouseMove);
    window.addEventListener('mousedown', mouseDown);
    window.addEventListener('touchstart', mouseDown);
    window.addEventListener('touchend', mouseUp);
    window.addEventListener('mouseup', mouseUp);
    return () => {
      window.removeEventListener('mousedown', mouseDown);
      window.removeEventListener('mouseup', mouseUp);
      window.removeEventListener('mousemove', mouseMove);
      window.removeEventListener('touchmove', mouseMove);
      window.removeEventListener('touchstart', mouseDown);
      window.removeEventListener('touchend', mouseUp);
    };
  }, [editing, setColor, size]);
  const {
    x,
    y
  } = (0, _utils.hsToCoordinates)(color.h, color.s);
  const onMouseDown = (0, _react.useCallback)(event => {
    setColor((0, _utils.coordinatesToHS)((event.clientX - event.currentTarget.getBoundingClientRect().x) / size, (event.clientY - event.currentTarget.getBoundingClientRect().y) / size));
  }, [setColor, size]);
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "colorWheel"
  }, /*#__PURE__*/_react.default.createElement(_LevelBar.default, {
    className: "saturationBar",
    size: size,
    background: "linear-gradient(hsl(".concat(color.h, ",100%,").concat(color.l, "%),hsl(").concat(color.h, ",0%,").concat(color.l, "%))"),
    onChange: saturation => setColor({
      s: saturation
    }),
    value: color.s
  }), /*#__PURE__*/_react.default.createElement("div", {
    ref: wheel,
    className: "wheel",
    onMouseDown: onMouseDown,
    role: "button",
    tabIndex: -5,
    style: {
      margin: "0 ".concat(size / 10, "px")
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "handle",
    style: {
      background: color.s,
      top: y * size,
      left: x * size,
      width: size / 15,
      height: size / 15,
      border: "2px solid white"
    }
  })), /*#__PURE__*/_react.default.createElement(_LevelBar.default, {
    alignRight: true,
    className: "lightnessBar",
    size: size,
    background: "linear-gradient(white,hsl(".concat(color.h, ",").concat(color.s, "%,50%), black)"),
    onChange: lightness => setColor({
      l: lightness
    }),
    value: color.l
  }));
};

ColorWheel.propTypes = {
  /** Current picked color */
  color: _propTypes.default.shape({
    h: _propTypes.default.number,
    s: _propTypes.default.number,
    l: _propTypes.default.number
  }),

  /** Size of color wheel */
  size: _propTypes.default.number.isRequired,

  /** Callback function to set color */
  setColor: _propTypes.default.func.isRequired
};
ColorWheel.defaultProps = {
  color: {
    h: 0,
    s: 100,
    l: 50
  }
};
var _default = ColorWheel;
exports.default = _default;