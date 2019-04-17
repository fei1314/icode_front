import React, { Component, Suspense } from 'react';
import { connect } from 'dva';
import { Row, Col, Icon, Menu, Dropdown } from 'antd';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import { getTimeDistance } from '@/utils/utils';
import styles from './Analysis.less';
import PageLoading from '@/components/PageLoading';
import Banner from './Banner';
import Important from './Important';
import Parents from './Parents';

import FishCom from './fish/FishCom'
import { enquireScreen } from 'enquire-js';
import Page4 from './Page4';
import Page1 from './Page1';
import Page2 from './Page2';
import Banner0 from './Banner0';
import Content0 from './Content0';
// import Content5 from './Content5';
import Content3 from './Content3';
import Footer1 from './Footer1';
import {
  Nav00DataSource,
  Banner01DataSource,
  Content00DataSource,
  Content50DataSource,
  Content30DataSource,
  Footer10DataSource,
} from './data.source';
import './less/antMotionStyle.less';

let isMobile;
enquireScreen((b) => {
  isMobile = b;
});

const { location } = window;
@connect(({ chart, loading }) => ({
  chart,
  loading: loading.effects['chart/fetch'],
}))
class Analysis extends Component {
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
    const children = [
     
      <Banner0
        id="Banner0_1"
        key="Banner0_1"
        dataSource={Banner01DataSource}
        isMobile={this.state.isMobile}
      />,
      <Page1 key="page1" isMobile={this.state.isMobile} />,
      <Page2 key="page2" isMobile={this.state.isMobile} />,
      <Content0
        id="Content0_0"
        key="Content0_0"
        dataSource={Content00DataSource}
        isMobile={this.state.isMobile}
      />,
      // <Content5
      //   id="Content5_0"
      //   key="Content5_0"
      //   dataSource={Content50DataSource}
      //   isMobile={this.state.isMobile}
      // />,
      <Page4 key="page4" isMobile={this.state.isMobile} />,
      // <FishCom />
      // <Content3
      //   id="Content3_0"
      //   key="Content3_0"
      //   dataSource={Content30DataSource}
      //   isMobile={this.state.isMobile}
      // />,
    ];
    return (
      <GridContent>
        <div
        className="templates-wrapper"
        ref={(d) => {
          this.dom = d;
        }}
      >
        {/* 如果不是 dva 2.0 替换成 {children} start */}
        {this.state.show && children}
        {/* 如果不是 dva 2.0 替换成 {children} end */}
      </div>
       {/* <div className="banner——div">
       <Banner />
       </div>
       <Important />
       <Parents  /> */}
      </GridContent>
    );
  }
}

export default Analysis;
