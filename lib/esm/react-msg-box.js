import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

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

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
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

// MessageBox组件的prop的默认值
var DEFAULT_PROP = {
  show: false,
  // 控制弹窗是否显示
  children: null,
  className: '',
  // 自定义样式名字符串，可以是多个样式名称的集合
  type: 'alert',
  // 弹窗类型
  title: '提示',
  // 弹窗title
  message: '主人未填写任何提示信息',
  // 弹窗的提示信息
  timeout: 0,
  // 弹窗自动关闭时间，0表示默认永久显示
  opacity: 'black',
  // 弹窗黑色背景的颜色，分为两种，【black,transparent】
  lockScroll: true,
  // 是否禁用弹窗滚动事件的穿透，默认是不禁用的
  backgroundFn: false,
  // 点击背景弹窗所需要调用的方法，可能为true,false,fn三种情况，如果是fn，可以返回bool值决定是否点击背景关闭
  formatFn: noop,
  // 用于一些弹窗需要让外部控制格式化处理显示的情况
  showConfirmButton: true,
  // 默认展示confirm的btn
  showCancelButton: false,
  // 默认不展示cancel的btn
  confirmButtonText: '确定',
  // 确定按钮的text文案
  cancelButtonText: '取消' // 取消按钮的text文案
  // prop入参中opacity的对应关系

};
var OPACITY_MAP = {
  black: '0.4',
  transparent: '0.0001' // 空函数

};

function noop() {}

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

var css = ".m-messagebox-container {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  z-index: 1000;\n}\n.m-confirm,\n.m-alert {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  -webkit-transform: translate(-50%, -50%);\n      -ms-transform: translate(-50%, -50%);\n       -o-transform: translate(-50%, -50%);\n          transform: translate(-50%, -50%);\n  background-color: #fff;\n  width: 85%;\n  border-radius: 0.8vw;\n  font-size: 2.133vw;\n  -webkit-user-select: none;\n  overflow: hidden;\n  -webkit-backface-visibility: hidden;\n          backface-visibility: hidden;\n  -webkit-transition: 0.2s;\n  -o-transition: 0.2s;\n  transition: 0.2s;\n}\n.m-confirm .m-msgbox-header,\n.m-alert .m-msgbox-header {\n  padding: 4vw 0 0;\n}\n.m-confirm .m-msgbox-title,\n.m-alert .m-msgbox-title {\n  color: #191F25;\n  text-align: center;\n  padding-left: 0;\n  margin-bottom: 0;\n  font-size: 4.533vw;\n  font-weight: 700;\n}\n.m-confirm .m-msgbox-content,\n.m-alert .m-msgbox-content {\n  padding: 2.667vw 5.333vw 4vw;\n  min-height: 9.6vw;\n  position: relative;\n}\n.m-confirm .m-msgbox-message,\n.m-alert .m-msgbox-message {\n  color: #A3A4A6;\n  margin: 0;\n  font-size: 3.733vw;\n  text-align: center;\n  line-height: 4.8vw;\n  word-break: break-all;\n}\n.m-confirm .m-msgbox-btn,\n.m-alert .m-msgbox-btn {\n  width: 100%;\n  position: relative;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n      -ms-flex-align: center;\n          align-items: center;\n  height: 12.533vw;\n}\n.m-confirm .m-msgbox-btn::before,\n.m-alert .m-msgbox-btn::before {\n  content: \" \";\n  position: absolute;\n  left: 0;\n  top: 0;\n  right: 0;\n  border-top: 1px solid #DCDEE3;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  color: #DCDEE3;\n  -webkit-transform-origin: 0 0;\n      -ms-transform-origin: 0 0;\n       -o-transform-origin: 0 0;\n          transform-origin: 0 0;\n  -webkit-transform: scaleY(0.5);\n      -ms-transform: scaleY(0.5);\n       -o-transform: scaleY(0.5);\n          transform: scaleY(0.5);\n}\n.m-confirm .m-confirm-btn,\n.m-alert .m-confirm-btn,\n.m-confirm .m-cancel-btn,\n.m-alert .m-cancel-btn {\n  -webkit-box-flex: 1;\n  -webkit-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n  text-align: center;\n  font-size: 4.533vw;\n}\n.m-confirm .m-cancel-btn,\n.m-alert .m-cancel-btn {\n  color: #3296FA;\n  position: relative;\n}\n.m-confirm .m-cancel-btn::after,\n.m-alert .m-cancel-btn::after {\n  position: absolute;\n  right: 0;\n  top: 50%;\n  width: 1px;\n  height: 6.4vw;\n  content: '';\n  display: inline-block;\n  background: #DCDEE3;\n  -webkit-transform: translateY(-50%) scaleX(0.5);\n      -ms-transform: translateY(-50%) scaleX(0.5);\n       -o-transform: translateY(-50%) scaleX(0.5);\n          transform: translateY(-50%) scaleX(0.5);\n}\n.m-confirm .m-confirm-btn,\n.m-alert .m-confirm-btn {\n  color: #3296FA;\n}\n.m-confirm .m-confirm-btn.disable,\n.m-alert .m-confirm-btn.disable {\n  opacity: 0.5;\n}\n.m-toast {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  -webkit-transform: translate(-50%, -50%);\n      -ms-transform: translate(-50%, -50%);\n       -o-transform: translate(-50%, -50%);\n          transform: translate(-50%, -50%);\n  background-color: rgba(0, 0, 0, 0.6);\n  min-width: 32vw;\n  border-radius: 2.667vw;\n  font-size: 2.133vw;\n  -webkit-user-select: none;\n  overflow: hidden;\n  -webkit-backface-visibility: hidden;\n          backface-visibility: hidden;\n  -webkit-transition: 0.2s;\n  -o-transition: 0.2s;\n  transition: 0.2s;\n  padding: 4.8vw 1.333vw;\n  text-align: center;\n  color: #fff;\n}\n.m-toast .gou {\n  color: #fff;\n  font-size: 13.333vw;\n}\n.m-toast .m-content {\n  font-size: 4vw;\n  word-break: break-all;\n}\n";
styleInject(css);

var _this5 = undefined;
var MessageBoxEl =
/*#__PURE__*/
function (_Component) {
  _inherits(MessageBoxEl, _Component);

  function MessageBoxEl(props) {
    var _this;

    _classCallCheck(this, MessageBoxEl);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(MessageBoxEl).call(this, props));
    _this.timer = null;
    _this.state = _objectSpread({}, _this.props);
    return _this;
  }

  _createClass(MessageBoxEl, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.changeLockScroll();
      this.timeOutFn();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      window.clearTimeout(this.timer);
    } // 为了直接可以实现直接调用MessageBoxEl方式

  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(next) {
      this.setState(_objectSpread({}, next));
    } // 锁住屏幕，不让滚动

  }, {
    key: "changeLockScroll",
    value: function changeLockScroll() {
      var lockScroll = this.state.lockScroll;

      if (lockScroll) {
        if (document.body.style.overflow !== 'hidden') {
          document.body.style.overflow = 'hidden';
        } else {
          document.body.style.overflow = '';
        }
      }
    } // 定时关闭

  }, {
    key: "timeOutFn",
    value: function timeOutFn() {
      var _this2 = this;

      var timeout = this.state.timeout;

      if (timeout) {
        this.timer = setTimeout(function () {
          _this2.handleAction('confirm');
        }, timeout);
      }
    } // 确定/取消回调

  }, {
    key: "handleAction",
    value: function handleAction(action, data) {
      var _this3 = this;

      var callback = this.state.callback;
      this.close(function () {
        _this3.changeLockScroll();

        typeof callback === 'function' && callback(action, data);
      });
    } // 更新弹窗内容

  }, {
    key: "update",
    value: function update(options) {
      var _this4 = this;

      this.open();
      this.setState(_objectSpread({}, options), function () {
        _this4.changeLockScroll();

        _this4.timeOutFn();
      });
    } // 打开弹窗

  }, {
    key: "open",
    value: function open(cb) {
      this.setState({
        show: true
      }, function () {
        typeof cb === 'function' && cb();
      });
    } // 关闭弹窗

  }, {
    key: "close",
    value: function close(cb) {
      this.setState({
        show: false
      }, function () {
        typeof cb === 'function' && cb();
      });
    } // 背景弹窗的事件

  }, {
    key: "backgroundFunc",
    value: function backgroundFunc(e) {
      var backgroundFn = this.state.backgroundFn;

      if (e.target === e.currentTarget && backgroundFn) {
        if (backgroundFn === true) {
          this.handleAction('cancel');
          return;
        }

        var flag = typeof backgroundFn === "function" && backgroundFn();

        if (flag === true) {
          this.handleAction('cancel');
        }
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$state = this.state,
          className = _this$state.className,
          type = _this$state.type,
          show = _this$state.show,
          opacity = _this$state.opacity;
      var clsN = 'm-messagebox-container ' + (className || '');
      var styles = {
        display: show ? 'block' : 'none',
        background: "rgba(0, 0, 0, ".concat(OPACITY_MAP[opacity], ")")
      };
      return React.createElement("div", {
        onClick: this.backgroundFunc.bind(this),
        className: clsN,
        style: styles
      }, type === "confirm" && React.createElement(Confirm, _extends({}, this.state, {
        handleAction: this.handleAction.bind(this)
      })), type === "alert" && React.createElement(Alert, _extends({}, this.state, {
        handleAction: this.handleAction.bind(this)
      })), type === "toast" && React.createElement(Toast, this.state), type === "custom" && React.createElement(Custom, _extends({}, this.state, {
        instance: this
      })));
    }
  }]);

  return MessageBoxEl;
}(Component);
/**
 * alert组件
 */

var Alert = function Alert(props) {
  var showConfirmButton = props.showConfirmButton,
      handleAction = props.handleAction,
      title = props.title,
      message = props.message,
      confirmButtonText = props.confirmButtonText,
      children = props.children;
  return React.createElement("div", {
    className: "m-alert"
  }, React.createElement("div", {
    className: "m-msgbox-header"
  }, React.createElement("div", {
    className: "m-msgbox-title"
  }, title)), React.createElement("div", {
    className: "m-msgbox-content"
  }, React.createElement("div", {
    className: "m-msgbox-message"
  }, children || message)), React.createElement("div", {
    className: "m-msgbox-btn"
  }, showConfirmButton && React.createElement("div", {
    className: "m-confirm-btn",
    onClick: handleAction.bind(_this5, 'confirm')
  }, confirmButtonText)));
};
/**
 * confirm组件
 */

var Confirm = function Confirm(props) {
  var cancelButtonText = props.cancelButtonText,
      showCancelButton = props.showCancelButton,
      showConfirmButton = props.showConfirmButton,
      handleAction = props.handleAction,
      title = props.title,
      message = props.message,
      confirmButtonText = props.confirmButtonText,
      children = props.children;
  return React.createElement("div", {
    className: "m-confirm"
  }, React.createElement("div", {
    className: "m-msgbox-header"
  }, React.createElement("div", {
    className: "m-msgbox-title"
  }, title)), React.createElement("div", {
    className: "m-msgbox-content"
  }, React.createElement("div", {
    className: "m-msgbox-message"
  }, children || message)), React.createElement("div", {
    className: "m-msgbox-btn"
  }, showCancelButton && React.createElement("div", {
    className: "m-cancel-btn",
    onClick: handleAction.bind(_this5, 'cancel')
  }, cancelButtonText), showConfirmButton && React.createElement("div", {
    className: "m-confirm-btn",
    onClick: handleAction.bind(_this5, 'confirm')
  }, confirmButtonText)));
};
/**
 * Toast组件
 */

var Toast = function Toast(props) {
  var message = props.message,
      children = props.children;
  return React.createElement("div", {
    className: "m-toast"
  }, React.createElement("div", {
    className: "m-content"
  }, children || message));
};
/**
 * Custom自定义组件
 */

var Custom = function Custom(props) {
  var message = props.message,
      instance = props.instance,
      children = props.children;
  return React.createElement("div", {
    className: "m-custom"
  }, children || (typeof message === 'function' ? message(instance) : message));
}; // 设置参数类型

MessageBoxEl.propTypes = {
  show: PropTypes.bool,
  children: PropTypes.element,
  className: PropTypes.string,
  type: PropTypes.oneOf(['alert', 'confirm', 'toast', 'custom']),
  title: PropTypes.string,
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.element, PropTypes.func]),
  timeout: PropTypes.number,
  opacity: PropTypes.oneOf(['black', 'transparent']),
  lockScroll: PropTypes.bool,
  backgroundFn: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  formatFn: PropTypes.func,
  showConfirmButton: PropTypes.bool,
  showCancelButton: PropTypes.bool,
  confirmButtonText: PropTypes.string,
  cancelButtonText: PropTypes.string,
  customCallback: PropTypes.func // 设置参数默认值

};
MessageBoxEl.defaultProps = _objectSpread({}, DEFAULT_PROP);

var MessageBoxInstance = {
  // 目的是为了存储多个实例弹窗，如果为空就建一个新的实例，如果为1，并且
  boxs: [],
  // 获取一个实例
  getInstance: function getInstance() {
    var boxs = this.boxs; // 当只有一个实例，并且该实例还是隐藏的时候就取出来，否则都是去新建新的实例

    if (boxs.length === 1 && boxs[0].isShowing === false) {
      return boxs[0];
    }

    return {};
  },
  // 创建一个新的实例
  setInstance: function setInstance(instance, domEl) {
    this.boxs.push({
      isShowing: true,
      domEl: domEl,
      instance: instance
    });
    return this.boxs.length - 1;
  },
  // 创建之后就需要移除才行
  removeInstance: function removeInstance(index) {
    // 保留一个实例，这样就不需要经常创建新的节点了
    if (this.boxs.length === 1) {
      this.boxs[0].isShowing = false;
      return;
    }

    var box = this.boxs[index];
    document.body.removeChild(box.domEl);
    this.boxs.splice(index, 1);
  },
  render: function render(options) {
    var _this = this;

    var _this$getInstance = this.getInstance(),
        instance = _this$getInstance.instance;

    var that = this;
    return new Promise(function (resolve, reject) {
      var currentIndex;

      var callback = function callback(action, data) {
        that.removeInstance(currentIndex);

        if (action === 'confirm') {
          resolve(data);
        } else {
          reject(data);
        }
      };

      options.callback = callback;

      if (instance) {
        // 如果找到未使用的实例，那就直接更新实例的参数即可
        instance.update(options);
        currentIndex = 0;
      } else {
        // 如果没有在弹窗实例数组中找到，那就创建一个
        var domEl = document.createElement('div');
        document.body.appendChild(domEl);
        instance = ReactDOM.render(React.createElement(MessageBoxEl, _extends({
          ref: function ref(t) {
            instance = t;
          }
        }, options)), domEl); // 存储实例

        currentIndex = _this.setInstance(instance, domEl);
      }
    });
  }
};
/**
 * 该组件是用于公共弹窗组件，JS直接调用形式
 */

var MessageBox = {
  // alert 弹窗
  alert: function alert(message) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    if (!React.isValidElement(message) && _typeof(message) === 'object') {
      options = message;
    }

    return MessageBoxInstance.render(Object.assign({}, DEFAULT_PROP, {
      message: message,
      type: 'alert',
      showCancelButton: true,
      show: true
    }, options));
  },
  // confirm 弹窗
  confirm: function confirm(message) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    if (!React.isValidElement(message) && _typeof(message) === 'object') {
      options = message;
    }

    return MessageBoxInstance.render(Object.assign({}, DEFAULT_PROP, {
      message: message,
      type: 'confirm',
      showCancelButton: true,
      show: true
    }, options));
  },
  // toast 弹窗
  toast: function toast(message) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    if (!React.isValidElement(message) && _typeof(message) === 'object') {
      options = message;
    }

    return MessageBoxInstance.render(Object.assign({}, DEFAULT_PROP, {
      message: message,
      timeout: 2000,
      opacity: 'transparent',
      type: 'toast',
      show: true
    }, options));
  },
  // 自定义弹窗
  custom: function custom(message) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    if (!React.isValidElement(message) && typeof message !== 'function' && _typeof(message) === 'object') {
      options = message;
    }

    return MessageBoxInstance.render(Object.assign({}, DEFAULT_PROP, {
      message: message,
      type: 'custom',
      show: true
    }, options));
  }
};

export { MessageBox, MessageBoxEl };
