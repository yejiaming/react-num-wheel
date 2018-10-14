import React, { Component } from 'react';
import PropTypes from 'prop-types';

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      _defineProperty(target, key, source[key]);
    });
  }

  return target;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css = "";
styleInject(css);

var css$1 = ".number {\n  position: relative;\n  overflow: hidden;\n  display: inline-block;\n  width: 5.333vw;\n  height: 5.333vw;\n}\n.number ul {\n  overflow: hidden;\n  -webkit-transition: -webkit-transform;\n  transition: -webkit-transform;\n  -o-transition: -o-transform;\n  transition: transform;\n  transition: transform, -webkit-transform, -o-transform;\n  position: absolute;\n  will-change: transform;\n  left: 0;\n  margin: 0;\n  z-index: 100;\n  top: 0;\n  padding: 0;\n}\n.number ul li {\n  width: 5.333vw;\n  height: 5.333vw;\n  display: block;\n  text-align: center;\n}\n.number ul li:before {\n  content: '';\n  display: inline-block;\n  vertical-align: middle;\n  width: 0;\n  height: 100%;\n  margin-top: 1px;\n}\n.number ul li span {\n  display: inline-block;\n  list-style: none;\n  vertical-align: middle;\n}\n";
styleInject(css$1);

var Num =
/*#__PURE__*/
function (_Component) {
  _inherits(Num, _Component);

  function Num(props) {
    var _this;

    _classCallCheck(this, Num);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Num).call(this, props));
    _this.arr = _this.props.counterArr || [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]; // 轮询数组

    _this.counterArr = _this.arr.concat(_this.arr); // 为了无限轮训加长轮训数组

    _this.counterLen = _this.counterArr.length; // 轮训数组的长度

    _this.counterNum = _this.arr.length / _this.counterLen; // 无限轮训数组的一半

    _this.lastNumber = 0; // 上一个传递进来的数字

    _this.lastPercent = 0.0; // 上一个数字对应的移动百分比

    _this.second = _this.props.animation || 0.3; // 动画时间

    return _this;
  }

  _createClass(Num, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.listenerTrasition();
    } // 为了直接可以实现直接调用MessageBoxEl方式

  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(next) {
      this.setState(_objectSpread({}, next));
    } // 监听动画结束事件，复位translateY值

  }, {
    key: "listenerTrasition",
    value: function listenerTrasition() {
      var that = this;
      var transitionEvent = this.whichTransitionEvent();
      transitionEvent && this.refs.counter.addEventListener(transitionEvent, function () {
        if (that.lastPercent > -that.counterNum) return;
        that.lastPercent = that.lastPercent + 0.5;
        that.refs.counter.style.transition = '0s';
        that.refs.counter.style.transform = "translateY(".concat(that.lastPercent * 100, "%) translate3d(0, 0, 0)");
      });
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var transitionEvent = this.whichTransitionEvent();
      this.refs.counter.removeEventListener(transitionEvent, function () {
        console.log('移除动画监听事件');
      });
    } // transition 监听动画结束时事件

  }, {
    key: "whichTransitionEvent",
    value: function whichTransitionEvent() {
      var t;
      var el = document.createElement('fakeelement');
      var transitions = {
        'transition': 'transitionend',
        'OTransition': 'oTransitionEnd',
        'MozTransition': 'transitionend',
        'WebkitTransition': 'webkitTransitionEnd',
        'animationstart': 'animationend',
        'webkitAnimationStart': 'webkitAnimationEnd',
        'MSAnimationStart': 'MSAnimationEnd'
      };

      for (t in transitions) {
        if (el.style[t] !== undefined) {
          return transitions[t];
        }
      }
    } // 自定义单个节点

  }, {
    key: "renderSingle",
    value: function renderSingle(number, index) {
      return React.createElement("li", {
        key: index
      }, React.createElement("span", null, number));
    } // 将传进来的数字转换成高度的百分比以控制显示正确的数字

  }, {
    key: "formatNumberToPercent",
    value: function formatNumberToPercent(number) {
      var percent = 0.0;
      number = Number(number);
      if (typeof number !== "number" || number !== number || number < 0 || number > 9) return percent;

      if (number > this.lastNumber) {
        percent = -(number / this.counterLen);
      } else {
        percent = -(number / this.counterLen) - this.counterNum;
      }

      this.lastNumber = number;
      return percent;
    }
  }, {
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(pre, now) {
      if (pre.value === this.props.value) {
        return false;
      }

      return true;
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var value = this.props.value;
      var counterArr = this.counterArr,
          lastPercent = this.lastPercent;
      this.lastPercent = this.formatNumberToPercent(value) || lastPercent;
      this.refs.counter && (this.refs.counter.style.transition = this.second + 's');
      return React.createElement("div", {
        className: css$1.number
      }, React.createElement("ul", {
        ref: "counter",
        style: {
          transform: "translateY(".concat(this.lastPercent * 100, "%) translate3d(0, 0, 0)"),
          transition: "".concat(this.second, "s")
        }
      }, counterArr.map(function (item, index) {
        return _this2.renderSingle(item, index);
      })));
    }
  }]);

  return Num;
}(Component);

var NumWheel =
/*#__PURE__*/
function (_Component) {
  _inherits(NumWheel, _Component);

  function NumWheel() {
    _classCallCheck(this, NumWheel);

    return _possibleConstructorReturn(this, _getPrototypeOf(NumWheel).apply(this, arguments));
  }

  _createClass(NumWheel, [{
    key: "separateData",
    // 将数字以,分隔开
    value: function separateData(number) {
      var separate = this.props.separate;
      return number && number.toString().replace(/^\d+/g, function (m) {
        return m.replace(/(?=(?!^)(\d{3})+$)/g, separate);
      });
    } // 为了直接可以实现直接调用MessageBoxEl方式

  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(next) {
      this.setState(_objectSpread({}, next));
    } // 渲染分割符

  }, {
    key: "renderSeparator",
    value: function renderSeparator(index) {
      return React.createElement("span", {
        key: index
      }, ",");
    }
  }, {
    key: "render",
    value: function render() {
      var _this = this;

      var value = this.props.value;
      var valueArr = [];
      value = this.separateData(value);
      valueArr = (value + '').split('');
      return React.createElement("div", {
        className: css.numberWheel
      }, valueArr.map(function (item, index) {
        if (item === ",") {
          return _this.renderSeparator(index);
        }

        return React.createElement(Num, {
          key: index,
          value: item
        });
      }));
    }
  }]);

  return NumWheel;
}(Component); // 设置参数类型

NumWheel.propTypes = {
  className: PropTypes.string,
  // 自定义样式名称
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  // 滚动的数字值
  separate: PropTypes.string // 数字千分位分隔符，默认是，
  // 设置参数默认值

};
NumWheel.defaultProps = {
  value: 0,
  className: '',
  separate: ','
};

export { NumWheel };
