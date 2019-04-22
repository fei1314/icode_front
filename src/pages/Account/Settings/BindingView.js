import React, { Component, Fragment } from 'react';
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';
import { connect } from 'dva';
import { Form,Card, Button, Icon, List,Row,Col,Tabs,Popconfirm } from 'antd';
// import { getTimeDistance } from '@/utils/utils';
const TabPane = Tabs.TabPane;
@connect(({ shop }) => ({
  shop
  // currentUser: user.currentUser,
}))
@Form.create()
class BindingView extends Component {
  componentDidMount(){
    const { dispatch } = this.props;
    dispatch({
      type:'shop/fetch'
    })
  }

  // 删除购物车
  removeCart = id => {
    const { dispatch } = this.props;
    dispatch({
      type:'shop/del_cart',
      payload:{
        'system_id':id,
        'option':'del'
      }
    }).then(()=>{
      dispatch({
        type:'shop/fetch'
      })
    })
  }
  render() {
    const { shop:{shopData}} = this.props;
    let data = [],spendData=[];
    if(shopData.status == 'ok'){
      data = shopData.msg.trolleys;
      spendData = shopData.msg.spend;
    }
    console.log('data',data)
    return (
      <Fragment>
        <Tabs defaultActiveKey="1">
          <TabPane tab="购物车" key="1">
          <List
          itemLayout="horizontal"
          dataSource={data}
          renderItem={item => (
            <List.Item actions={[
            <a onClick={this.removeCart.bind(this,item.id)}>删除</a>
            ]}>
              <List.Item.Meta
                avatar={<img style={{maxWidth:50,borderRadius:'50%'}} src={item.course_picture} />}
                title={item.course_name}
                description={
                  <span>价钱：{item.course_total_spend}</span>
                }
              />
            </List.Item>
          )}
        />
          </TabPane>
          <TabPane tab="购买记录" key="2">
          <List
          itemLayout="horizontal"
          dataSource={spendData}
          renderItem={item => (
            <List.Item> 
              <List.Item.Meta
                avatar={<img style={{maxWidth:50,borderRadius:'50%'}} src={item.course_picture} />}
                title={item.course_name}
                description={item.course_desc}
              />
            </List.Item>
          )}
        />
          </TabPane>
        </Tabs>
        
      </Fragment>
    );
  }
}

export default BindingView;
