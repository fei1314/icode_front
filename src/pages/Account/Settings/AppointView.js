import React, { Component, Fragment } from 'react';
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';
import { connect } from 'dva';
import moment from 'moment'
import { Form,Card, Button, Icon, List,Row,Col,Tabs,Input,Select } from 'antd';
// import { getTimeDistance } from '@/utils/utils';
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const { Option } = Select;
const { TextArea } = Input;

@connect(({ appoint }) => ({
    appoint
  // currentUser: user.currentUser,
}))
@Form.create()
class AppointView extends Component {
  componentDidMount(){
    const { dispatch } = this.props;
    dispatch({
      type:'appoint/fetch'
    })
    dispatch({
      type:'appoint/fetchForm'
    })
    // 获取课程
    dispatch({
        type:'appoint/fetchSkills'
    })
  }

  handleSubmit = e => {
    const { dispatch, form } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      console.log('values',values)
      if (!err) {
        dispatch({
          type: 'appoint/submitRegularForm',
          payload: values,
        });
      }
    });
  };
  render() {
    const { appoint:{appointData,skillData},form: { getFieldDecorator, getFieldValue },} = this.props;
    console.log('skillData',skillData)
    let data = [],skillArr=[];
    if(appointData.status == 'ok'){
      data = appointData.msg;
    }
    if(skillData.status == 'ok'){
        skillArr = skillData.msg;
      }
    const formItemLayout = {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 7 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 12 },
          md: { span: 10 },
        },
      };
  
      const submitFormLayout = {
        wrapperCol: {
          xs: { span: 24, offset: 0 },
          sm: { span: 10, offset: 7 },
        },
      };
    return (
      <Fragment>
          <Tabs defaultActiveKey="1">
            <TabPane tab="预约课程" key="1">
            <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
            <FormItem {...formItemLayout} label='课程名称'>
              {getFieldDecorator('skill', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'validation.title.required' }),
                  },
                ],
              })(
                  <Select>
                      {
                          skillArr && skillArr.map(item=>{
                              return (
                                  <Select.Option value={item.skill_name} key={item.skill_name}>{item.skill_name}</Select.Option>
                              )
                          })
                      }
                  </Select>
              )}
            </FormItem>
            {/* <FormItem {...formItemLayout} label='课程类型'>
              {getFieldDecorator('type', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'validation.title.required' }),
                  },
                ],
              })(
                  <Select>
                       <Select.Option key='online' ''>线上</Select.Option>
                       <Select.Option>线下</Select.Option>
                  </Select>
              )}
            </FormItem> */}
        
            <FormItem {...formItemLayout} label='预约留言'>
              {getFieldDecorator('content', {
                // rules: [
                //   {
                //     required: true,
                //     message: formatMessage({ id: 'validation.goal.required' }),
                //   },
                // ],
              })(
                <TextArea
                  style={{ minHeight: 32 }}
                  placeholder='请输入您的预约留言'
                  rows={4}
                />
              )}
            </FormItem>
            
           
            <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
              <Button type="primary" htmlType="submit" >
                <FormattedMessage id="form.submit" />
              </Button>
              {/* <Button style={{ marginLeft: 8 }}>
                <FormattedMessage id="form.save" />
              </Button> */}
            </FormItem>
          </Form>
            </TabPane>
            <TabPane tab="我的预约" key="2">
                <List
                itemLayout="horizontal"
                dataSource={data}
                renderItem={item => (
                    <List.Item actions={[<a>{item.status=='ing'?'预约中':'预约成功'}</a>]}>
                    <List.Item.Meta
                        avatar={<img style={{maxWidth:50,borderRadius:'50%'}} src={item.course_pic} />}
                        title={
                            <div>{item.course_name}</div>
                        }
                        description={
                            <div>预约时间：{moment(item.create_time).format('YYYY-MM-DD HH:mm:ss')}</div>
                        }
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

export default AppointView;
