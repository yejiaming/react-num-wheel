import React, { Component } from 'react';
import styles from './style.less';
import PropTypes from 'prop-types';
import Num from './num.jsx'

export class NumWheel extends Component {
  // 将数字以,分隔开
  separateData(number) {
    let { separate } = this.props;
    return number && number.toString().replace(/^\d+/g, (m) => m.replace(/(?=(?!^)(\d{3})+$)/g, separate));
  }
  // 为了直接可以实现直接调用MessageBoxEl方式
  componentWillReceiveProps(next) {
    this.setState({
      ...next
    })
  }
  // 渲染分割符
  renderSeparator(index) {
    return <span key={index}>,</span>
  }
  render() {
    let { value } = this.props;
    let valueArr = [];
    value = this.separateData(value);
    valueArr = (value + '').split('');
    return (
      <div className={styles.numberWheel}>
        {
          valueArr.map((item, index) => {
            if (item === ",") {
              return this.renderSeparator(index)
            }
            return <Num key={index} value={item} />
          })
        }
      </div>
    );
  }
}

// 设置参数类型
NumWheel.propTypes = {
  className: PropTypes.string,                                      // 自定义样式名称
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), // 滚动的数字值
  separate: PropTypes.string,                                       // 数字千分位分隔符，默认是，
}
// 设置参数默认值
NumWheel.defaultProps = {
  value: 0,
  className: '',
  separate: ','
}