import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { NumWheel } from '@components';
// import { NumWheel } from 'react-num-wheel';
require('./style.less');

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: 1000
    }
  }

  componentDidMount() {
    this.onClickAuto();
  }
  onClick() {
    let { value } = this.state;
    this.setState({
      value: value + (Math.random(10) * 100).toFixed(0) * 1
    })
  }
  onClickAuto() {
    setInterval(() => {
      this.onClick();
    }, 1000);
  }
  render() {
    let { value } = this.state;
    return (
      <div className='App' key="app">
        <NumWheel value={value} />
      </div>
    )
  }
};

ReactDOM.render(<App />, document.getElementById('app'));

// react-hot-loader
if (module.hot) {
  module.hot.accept();
}