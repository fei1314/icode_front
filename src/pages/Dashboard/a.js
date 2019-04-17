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


@connect(({ chart, loading }) => ({
  chart,
  loading: loading.effects['chart/fetch'],
}))
class Analysis extends Component {
  state = {
    
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type:'chart/fetchParents'
  })
  }



  render() {
    const { chart, loading } = this.props;
  
    return (
      <GridContent>
       <div className="banner——div">
       <Banner />
       </div>
       {/* 重要性 */}
       <Important />
       {/* 家长 */}
       <Parents  />
      </GridContent>
    );
  }
}

export default Analysis;
