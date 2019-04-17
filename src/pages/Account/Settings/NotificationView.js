import React, { Component, Fragment } from 'react';
import { formatMessage } from 'umi-plugin-react/locale';
import { Form,Switch, List,Tabs } from 'antd';
import { connect } from 'dva';
// import { getTimeDistance } from '@/utils/utils';
const TabPane = Tabs.TabPane;

@connect(({ collect }) => ({
  collect
  // currentUser: user.currentUser,
}))
@Form.create()
class NotificationView extends Component {
  componentDidMount(){
    const { dispatch } = this.props;
    dispatch({
      type:'collect/fetch'
    })
  }

  render() {
    const { collect:{collectData}} = this.props;
    let favoriteData = [],historyData = [];
    if(collectData.status == 'ok'){
      favoriteData = collectData.msg.favorite;
      historyData = collectData.msg.history;
    }
    console.log('favoriteData',favoriteData)
    return (
      <Fragment>
        <Tabs defaultActiveKey="1">
          <TabPane tab="收藏记录" key="1">
          <List
          itemLayout="horizontal"
          dataSource={favoriteData}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                avatar={<img style={{maxWidth:50,borderRadius:'50%'}} src={item.picture} />}
                title={item.name}
                description={item.desc}
              />
            </List.Item>
          )}
        />
          </TabPane>
          <TabPane tab="观看历史记录" key="2">
          <List
          itemLayout="horizontal"
          dataSource={historyData}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                avatar={<img style={{maxWidth:50,borderRadius:'50%'}} src={item.picture} />}
                title={item.name}
                description={item.desc}
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

export default NotificationView;
