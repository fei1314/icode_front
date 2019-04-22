import React, { PureComponent } from 'react';
import moment from 'moment';
import { connect } from 'dva';
import { Row, Col, Form, Card, Select, List,Badge, Tag, Icon,message,Tooltip } from 'antd';
import { FormattedMessage } from 'umi-plugin-react/locale';
import router from 'umi/router';
import TagSelect from '@/components/TagSelect';
import AvatarList from '@/components/AvatarList';
import Ellipsis from '@/components/Ellipsis';
import StandardFormRow from '@/components/StandardFormRow';

import styles from './BasicCourse.less';

const { Option } = Select;
const FormItem = Form.Item;

/* eslint react/no-array-index-key: 0 */

@connect(({ course, loading }) => ({
    course,
  loading: loading.models.course,
}))
@Form.create({
  onValuesChange({ dispatch }, changedValues, allValues) {
    // 表单项变化时请求数据
    // eslint-disable-next-line
    console.log(changedValues, allValues);
    // 模拟查询表单生效
    dispatch({
      type: 'list/fetch',
      payload: {
        count: 8,
      },
    });
  },
})


class CoverCardList extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'course/fetch',
    });
  }
//   进入详情页
  pushDetail = (item) => {
      const { dispatch } = this.props;
      dispatch({
          type:'course/fetchDetail',
          payload:{
              "system_id":item && item.id
          }
      }).then(()=>{
          const { course:{courseDetail}} = this.props;
          if(courseDetail.status == 'no_login'){
              router.push(`/user/login?redirect=${window.location.href}`)
          }else if(courseDetail.status == 'no_pay'){
            router.push(`/user/pay?redirect=${window.location.href}`)
          }else if(courseDetail.status == 'ok'){
            router.push(`/coursed/${item.id}`)
          }else{
              message.error('错误')
          }
      })
  }
  // 加入购物车
  joinCart = (id) => {
    const { dispatch } = this.props;
    dispatch({
      type:'course/join_cart',
      payload:{
        'system_id':id,
        'option':'add'
      }
    })
  }
  render() {
    const {
      course: { course = {} },
      loading,
      form,
    } = this.props;
    const { getFieldDecorator } = form;
    let courseData = [];
    if(course.status == 'ok'){
        courseData = course.msg;
    }
    const cardList = courseData ? (
      <List
        rowKey="id"
        loading={loading}
        grid={{ gutter: 24, xl: 4, lg: 3, md: 3, sm: 2, xs: 1 }}
        dataSource={courseData}
        renderItem={item => (
         
            <List.Item>
               <Badge count={item&&item.activity&&item.activity[0]&&item.activity[0].sp_name}>
            <Card
              className={styles.card}
              hoverable
              cover={<img alt={item.course_name} src={item.course_picture} />}
            >
              <Card.Meta
               onClick={this.pushDetail.bind(this,item)}
                title={<a>{item.course_name}</a>}
                description={<Ellipsis lines={2}>{item.course_desc}</Ellipsis>}
              />
              <div className={styles.cardItemContent}>
              <Row gutter={24}>
                <Col span={12}>
                  <span>{item.lec_name}</span>
                </Col>
                <Col span={12}>
                  <span>
                      {
                          item.course_total_spend==0?'免费':
                          item.course_total_spend == item.spend_after_activity?
                          `￥${item.spend_after_activity}`:
                          <div>
                            <span style={{fontSize:'15px',color:'red'}}>￥{item.spend_after_activity}</span>
                          <del style={{textDecoration:'linethrough',marginLeft:10}}>￥{item.course_total_spend}</del>
                          </div>
                          
                      }
                  </span>
                </Col>
                
              </Row>
                
                
                
              </div>
              <div className={styles.cardItemContent}>
                <span>定制者:{item.make_user}</span>
                <span>
                  课程数：
                    {
                        item.course_count
                    }
                </span>
                <div className={styles.avatarList}>
                  <AvatarList size="mini">
                    {item.join_users.map((member, i) => (
                      <AvatarList.Item
                        key={`${item.i}-avatar-${i}`}
                        src={`https://www.icode121.com/${member.user_avatar}`}
                        tips={member.user_name}
                      />
                    ))}
                  </AvatarList>
                  {/* 等{item && item.join_users&&item.join_users.length}人 */}
                </div>
              </div>
              <div className={styles.cardItemContent}>
              <Row gutter={24}>
              <Col span={20}>
                  <div className={styles.avatarList}>
                    <AvatarList size="mini">
                      {item.course_label.map((member, i) => (
                        <Tooltip title={member.label_desc}>
                        <Tag color="#108ee9">{member.label_name}</Tag>
                      </Tooltip>
                          
                      //   <AvatarList.Item
                      //     key={`${item.id}-avatar-${i}`}
                      //     src={member.avatar}
                      //     tips={member.name}
                      //   />
                      ))}
                    </AvatarList>
                  </div>
                </Col>
                <Col span={4}>
                <Icon  style={{fontSize:18}} type="shopping-cart" onClick={this.joinCart.bind(this,item.id)}>加入购物车</Icon>
                </Col>
              </Row>
              </div>
            </Card>
            </Badge>
          </List.Item>
         
        )}
      />
    ) : null;

    const formItemLayout = {
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };

    const actionsTextMap = {
      expandText: <FormattedMessage id="component.tagSelect.expand" defaultMessage="Expand" />,
      collapseText: (
        <FormattedMessage id="component.tagSelect.collapse" defaultMessage="Collapse" />
      ),
      selectAllText: <FormattedMessage id="component.tagSelect.all" defaultMessage="All" />,
    };

    return (
      <div className={styles.coverCardList}>
        <div className={styles.cardList}>{cardList}</div>
      </div>
    );
  }
}

export default CoverCardList;