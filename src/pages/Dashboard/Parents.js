import React, { PureComponent, Suspense } from 'react';
import { connect } from 'dva';
import { Card, Col, Row } from 'antd';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import { getTimeDistance } from '@/utils/utils';
import styles from './Analysis.less';
import PageLoading from '@/components/PageLoading';
@connect(({ chart, loading }) => ({
  chart,
  loading: loading.effects['chart/fetch'],
}))
class Parents extends PureComponent {
  state = {
    
  };




  render() {
    const { chart:{parentsData} } = this.props;
    let parentsArr = [];
    if(parentsData.status == 'ok'){
      parentsArr = parentsData.msg;
    }
    return (
        <div style={{ background: '#ECECEC', padding: '30px' }}>
        <Row gutter={16}>
            <Col span={8} key='a' style={{marginBottom:20}}>
                <Card title="Card title" bordered={false}>Card content</Card>
            </Col>
            <Col span={8} key='b' style={{marginBottom:20}}>
                <Card title="Card title" bordered={false}>Card content</Card>
            </Col>
            <Col span={8} key='c' style={{marginBottom:20}}>
                <Card title="Card title" bordered={false}>Card content</Card>
            </Col>
            <Col span={8} key='d' style={{marginBottom:20}}>
                <Card title="Card title" bordered={false}>Card content</Card>
            </Col>
            <Col span={8} key='e' style={{marginBottom:20}}>
                <Card title="Card title" bordered={false}>Card content</Card>
            </Col>
            <Col span={8} key='f' style={{marginBottom:20}}>
                <Card title="Card title" bordered={false}>Card content</Card>
            </Col>
        </Row>
      </div>
    );
  }
}

export default Parents;
