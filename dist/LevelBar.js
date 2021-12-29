"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/web.dom.iterable.js");

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

require("./styles/LevelBar.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const LevelBar = _ref => {
  let {
    alignRight,
    className,
    handleClassName,
    size,
    background,
    onChange,
    value
  } = _ref;
  const bar = (0, _react.useRef)(null);
  const [editing, setEditing] = (0, _react.useState)(false);
  (0, _react.useEffect)(() => {
    const mouseDown = event => {
      var _bar$current;

      if (bar !== null && bar !== void 0 && (_bar$current = bar.current) !== null && _bar$current !== void 0 && _bar$current.contains(event === null || event === void 0 ? void 0 : event.target)) {
        setEditing(true);
      }
    };

    const mouseMove = event => {
      var _event$touches, _event$touches$;

      const clientY = event.clientY || ((_event$touches = event.touches) === null || _event$touches === void 0 ? void 0 : (_event$touches$ = _event$touches[0]) === null || _event$touches$ === void 0 ? void 0 : _event$touches$.clientY);

      if (editing) {
        // Y coordinate difference as [0,1] (0 is full saturation)
        const yDifference = clientY - bar.current.getBoundingClientRect().y;
        const s = (1 - Math.min(size, Math.max(0, yDifference)) / size) * 100;
        onChange(parseFloat(s.toFixed(2)));
      }
    };

    const mouseUp = () => setEditing(false);

    window.addEventListener('mousedown', mouseDown);
    window.addEventListener('touchstart', mouseDown);
    window.addEventListener('mousemove', mouseMove);
    window.addEventListener('touchmove', mouseMove);
    window.addEventListener('mouseup', mouseUp);
    window.addEventListener('touchend', mouseUp);
    return () => {
      window.removeEventListener('mousedown', mouseDown);
      window.removeEventListener('mousemove', mouseMove);
      window.removeEventListener('touchmove', mouseMove);
      window.removeEventListener('mouseup', mouseUp);
      window.removeEventListener('touchstart', mouseDown);
      window.removeEventListener('touchend', mouseUp);
    };
  }, [editing, onChange, size]);
  const indicatorPosition = (0, _react.useMemo)(() => {
    const top = size * (0.6 * (1 - Math.sin(Math.asin(3 / 4) * (value / 50 - 1))) - 1 / 10);
    const horizontal = size * 0.65 * (1 - Math.cos(Math.asin(3 / 4) * (value / 50 - 1)));
    return {
      top,
      horizontal
    };
  }, [value, size]);
  return /*#__PURE__*/_react.default.createElement("div", {
    ref: bar,
    className: className,
    style: {
      position: 'absolute',
      height: size,
      width: size * 0.281,
      transform: alignRight ? 'scaleX(-1)' : '',
      cursor: 'grab'
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "barBackground",
    style: {
      background,
      marginTop: size / 20
    }
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: handleClassName,
    style: {
      background: value,
      top: indicatorPosition.top,
      left: indicatorPosition.horizontal,
      width: size * 0.05,
      height: size * 0.05,
      border: "2px solid white"
    }
  }));
};

LevelBar.propTypes = {
  /** Whether bar is aligned to right */
  alignRight: _propTypes.default.bool,

  /** Css class name for outer div */
  className: _propTypes.default.string,

  /** Css class name for handle */
  handleClassName: _propTypes.default.string,

  /** Background in css format */
  background: _propTypes.default.string,

  /** height of the bar */
  size: _propTypes.default.number.isRequired,

  /** zero saturation color string in css hsl format (hsl(0, 5%, 10%)). */
  onChange: _propTypes.default.func,

  /** current value level ([0,100]) */
  value: _propTypes.default.number
};
LevelBar.defaultProps = {
  alignRight: false,
  className: 'levelBar',
  handleClassName: 'defaultHandle',
  background: 'black',
  onChange: () => {},
  value: 100
};
var _default = LevelBar;
exports.default = _default;