import React, { Component, Suspense } from 'react';
import { connect } from 'dva';
import { Row, Col, Icon, Menu, Dropdown } from 'antd';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import PageLoading from '@/components/PageLoading';


import { enquireScreen } from 'enquire-js';

let isMobile;
enquireScreen((b) => {
  isMobile = b;
});

const { location } = window;
@connect(({ chart, loading }) => ({
  chart,
  loading: loading.effects['chart/fetch'],
}))
class FishCom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMobile,
      show: !location.port, // 如果不是 dva 2.0 请删除
    };
  }
  state = {
    
  };

  componentDidMount() {
    const { dispatch } = this.props;
  //   dispatch({
  //     type:'chart/fetchParents'
  // })

  // 适配手机屏幕;
  enquireScreen((b) => {
    this.setState({ isMobile: !!b });
  });
  // dva 2.0 样式在组件渲染之后动态加载，导致滚动组件不生效；线上不影响；
  /* 如果不是 dva 2.0 请删除 start */
  if (location.port) {
    // 样式 build 时间在 200-300ms 之间;
    setTimeout(() => {
      this.setState({
        show: true,
      });
    }, 500);
  }
  /* 如果不是 dva 2.0 请删除 end */
  }



  render() {
    const { chart, loading } = this.props;
 
    return (
        <canvas id="c1" width="800" height="600"></canvas>
    );
  }
}

export default FishCom;
