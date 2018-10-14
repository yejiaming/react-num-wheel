import React, { Component } from 'react';
import styles from './num.less';

export default class Num extends Component {
  constructor(props) {
    super(props);
    this.arr = this.props.counterArr || [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];      // 轮询数组
    this.counterArr = this.arr.concat(this.arr);    // 为了无限轮训加长轮训数组
    this.counterLen = this.counterArr.length;       // 轮训数组的长度
    this.counterNum = this.arr.length / this.counterLen;    // 无限轮训数组的一半
    this.lastNumber = 0;                            // 上一个传递进来的数字
    this.lastPercent = 0.0;                         // 上一个数字对应的移动百分比
    this.second = this.props.animation || 0.3;                              // 动画时间
  }

  componentDidMount() {
    this.listenerTrasition();
  }
  // 为了直接可以实现直接调用MessageBoxEl方式
  componentWillReceiveProps(next) {
    this.setState({
      ...next
    })
  }
  // 监听动画结束事件，复位translateY值
  listenerTrasition() {
    var that = this;
    var transitionEvent = this.whichTransitionEvent();
    transitionEvent && this.refs.counter.addEventListener(transitionEvent, () => {
      if (that.lastPercent > -that.counterNum)
        return;
      that.lastPercent = that.lastPercent + 0.5;
      that.refs.counter.style.transition = '0s';
      that.refs.counter.style.transform = `translateY(${that.lastPercent * 100}%) translate3d(0, 0, 0)`;
    })
  }

  componentWillUnmount() {
    var transitionEvent = this.whichTransitionEvent();
    this.refs.counter.removeEventListener(transitionEvent, () => {
      console.log('移除动画监听事件')
    });
  }

  // transition 监听动画结束时事件
  whichTransitionEvent() {
    var t;
    var el = document.createElement('fakeelement');
    var transitions = {
      'transition': 'transitionend',
      'OTransition': 'oTransitionEnd',
      'MozTransition': 'transitionend',
      'WebkitTransition': 'webkitTransitionEnd',
      'animationstart': 'animationend',
      'webkitAnimationStart': 'webkitAnimationEnd',
      'MSAnimationStart': 'MSAnimationEnd',
    }
    for (t in transitions) {
      if (el.style[t] !== undefined) {
        return transitions[t];
      }
    }
  }

  // 自定义单个节点
  renderSingle(number, index) {
    return <li key={index}><span>{number}</span></li>;
  }

  // 将传进来的数字转换成高度的百分比以控制显示正确的数字
  formatNumberToPercent(number) {
    let percent = 0.0;
    number = Number(number);
    if (typeof number !== "number" || number !== number || number < 0 || number > 9)
      return percent;
    if (number > this.lastNumber) {
      percent = -(number / this.counterLen);
    } else {
      percent = -(number / this.counterLen) - this.counterNum;
    }
    this.lastNumber = number;
    return percent;
  }

  shouldComponentUpdate(pre, now) {
    if (pre.value === this.props.value) {
      return false;
    }
    return true;
  }

  render() {
    let { value } = this.props;
    let { counterArr, lastPercent } = this;
    this.lastPercent = this.formatNumberToPercent(value) || lastPercent;
    this.refs.counter && (this.refs.counter.style.transition = this.second + 's');
    return (
      <div className={styles.number}>
        <ul ref="counter" style={{ transform: `translateY(${this.lastPercent * 100}%) translate3d(0, 0, 0)`, transition: `${this.second}s` }}>
          {
            counterArr.map((item, index) => {
              return this.renderSingle(item, index)
            })
          }
        </ul>
      </div>
    );
  }
}