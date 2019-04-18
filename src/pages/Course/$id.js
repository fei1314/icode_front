  import React, { PureComponent } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Row, Col, Form, Card, Select, List, Tag,Icon,message,Avatar } from 'antd';
import { FormattedMessage } from 'umi-plugin-react/locale';
import router from 'umi/router';
import TagSelect from '@/components/TagSelect';
import AvatarList from '@/components/AvatarList';
import Ellipsis from '@/components/Ellipsis';
import StandardFormRow from '@/components/StandardFormRow';

import styles from './BasicCourse.less';
import { cpus } from 'os';

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


class CourseDetail extends PureComponent {
  componentDidMount() {
      const id = window.location.pathname.substring(9)
      console.log('id',id)
    const { dispatch } = this.props;
    dispatch({
      type: 'course/fetchDetail',
      payload:{
        "system_id":id
      }
    });
  }
//   进入详情页
  getContent = (item) => {
    console.log('asd')
    const { dispatch } = this.props;
    dispatch({
        type:'course/fetchStatus',
        payload:{
            "course_id":item && item.id,
        }
    }).then(()=>{
        const { course:{statusData}} = this.props;
        console.log('courseContent',statusData)
        if(statusData.status == 'no_login'){
            router.push(`/user/login?redirect=${window.location.href}`)
        }else if(statusData.status == 'no_pay'){
          router.push(`/asd/pay?redirect=${window.location.href}`)
        }else if(statusData.status == 'ok'){
          router.push(`/coursedc/${item.id}`)
        }else{
            message.error('错误')
        }
    })
  }

 
  render() {
    const {
      course: { courseDetail },
      loading,
      form,
    } = this.props;
    const { getFieldDecorator } = form;
    let courseData = [];
    if(courseDetail.status == 'ok'){
        courseData = courseDetail.msg;
    }

    const IconText = ({ type, text }) => (
      <span>
        <Icon type={type} style={{ marginRight: 8 }} />
        {text}
      </span>
    );
    const cardList = courseData ? (
      <List
    itemLayout="vertical"
    size="small"
    // pagination={{
    //   onChange: (page) => {
    //     console.log(page);
    //   },
    //   pageSize: 3,
    // }}
    dataSource={courseData}
    renderItem={(item,index) => (
      <List.Item
        key={item.title}
        actions={[<IconText type="star-o" text={item.count} />, <IconText type="like-o" text={item.like} />]}
        // extra={<img width={272} alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" />}
      >
        <List.Item.Meta
          // avatar={<Avatar src={item.avatar} />}
          title={
          <a onClick={this.getContent.bind(this,item)}>
            <Row gutter={16}>
              <Col span={20}>
                {index+1}.{item.name}
              </Col>
              <Col span={4}>
                <Tag style={{marginLeft:20}} color="#108ee9">经验值：{item.exp}</Tag>
              </Col>
            </Row>
          </a>
          }
          // description={item.desc}
        />
        {/* {item.content} */}
      </List.Item>
    )}
  />
      // <List
      //   rowKey="id"
      //   loading={loading}
      //   grid={{ gutter: 24, xl: 4, lg: 3, md: 3, sm: 2, xs: 1 }}
      //   dataSource={courseData}
      //   renderItem={item => (
      //     <List.Item onClick={this.getContent.bind(this,item)}>
      //       <Card
      //         className={styles.card}
      //         hoverable
      //         cover={<img alt={item.name} src={item.picture} />}
      //       >
      //         <Card.Meta
      //           title={<a>{item.name}</a>}
      //           // description={<Ellipsis lines={2}>{item.desc}</Ellipsis>}
      //         />
      //         <div className={styles.cardItemContent}>
      //           <span>{moment(item.create_time).format('YYYY-MM-DD HH:mm:ss')}</span>
      //           <div className={styles.avatarList}>
      //               <IconText type="gift" text={item.count} />
      //               <IconText style={{display:'inlineBlock',marginLeft:10}} type="like-o" text={item.like} />
      //           </div>
      //         </div>
      //       </Card>
      //     </List.Item>
      //   )}
      // />
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
      <Row gutter={16}>
        <Col span={16} key='a' style={{marginBottom:20}}>
          <Card>
            <div className={styles.coverCardList}>
              <div className={styles.cardList}>{cardList}</div>
            </div>
          </Card>
        </Col>
        <Col span={8} key='b' style={{marginBottom:20}}>
          <Card>
            
          </Card>
        </Col>
      </Row>
      
      
    );
  }
}

export default CourseDetail;