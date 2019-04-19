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
  state = {
    verifyImg:"https://www.icode121.com/api/common/captcha",
    btnText:'点击获取验证码',
    isClick:false
  }
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
        delete values.captcha;
        dispatch({
          type: 'appoint/submitRegularForm',
          payload: values,
        });
      }
    });
  };
  // 输入手机号
  inputPhone = e => {
    this.setState({
      user_phone:e.target.value
    })
  }
  // 切换图片验证码
  changeVerify = () => {
    var host = 'https://www.icode121.com'
    this.setState({
      verifyImg:host+'/api/common/captcha?rnd'+ Math.random()
    })
  }
  // 输入图片验证码
  inputVerify = e => {
    this.setState({
      captcha:e.target.value
    })
  }
  numTime = () =>{
    var count = 60;
    this.timer = setInterval(function(){
      count--
      if(count == 0) {
        clearInterval(this.timer)
        this.setState({
          btnText:`重新发送`,
          isClick:false
        })
      }else{
        this.setState({
          btnText:`${count}秒`,
          isClick:true
        })
      }
      
    }.bind(this),1000)
    
  }
  // 获取短信验证码
  getVerify = () => {
    const { dispatch } = this.props;
    const {captcha,user_phone} = this.state;
    this.numTime()
    dispatch({
      type:'appoint/fetchImgVerify',
      payload:{
        captcha,user_phone
      }
    })
  }
  render() {
    const { appoint:{appointData,skillData,formData},form: { getFieldDecorator, getFieldValue },} = this.props;
    console.log('formData',formData)
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
            <FormItem {...formItemLayout} label='预约留言'>
              {getFieldDecorator('content', {
              })(
                <TextArea
                  style={{ minHeight: 32 }}
                  placeholder='请输入您的预约留言'
                  rows={4}
                />
              )}
            </FormItem>
            {
              formData && formData.status == 'no'?
              <div>
                <FormItem {...formItemLayout} label='手机号'>
                  {getFieldDecorator('user_phone', {
                    rules: [
                      {
                        required: true,
                        message:'请输入手机号'
                      },
                    ],
                  })(
                    <Input onChange={this.inputPhone} placeholder="请输入手机号" />
                  )}
                </FormItem>
                <FormItem {...formItemLayout} label='图片验证码'>
                {getFieldDecorator('captcha', {
                  rules: [
                    {
                      required: true,
                      message:'请输入图片验证码'
                    },
                  ],
                })(
                  <Row gutter={24}>
                      <Col md={16} xs={24}>
                      <Input placeholder="请输入图片验证码" onChange={this.inputVerify} />
                      </Col>
                      <Col md={8} xs={24}>
                      <img onClick={this.changeVerify} src={this.state.verifyImg} style={{height:'33px',cursor: 'pointer',}} />
                      </Col>
                  </Row>
                )}
              </FormItem>
              <FormItem {...formItemLayout} label='短信验证码'>
                  {getFieldDecorator('code', {
                    rules: [
                      {
                        required: true,
                        message:'请输入短信验证码'
                      },
                    ],
                  })(
                    <Row gutter={24}>
                      <Col md={16} xs={24}>
                      <Input onChange={this.inputCode} placeholder="请输入短信验证码" />
                      </Col>
                      <Col md={8} xs={24}>
                        <Button onClick={this.getVerify} disabled={this.state.isClick}>{this.state.btnText}</Button>
                      </Col>
                    </Row>
                    
                  )}
                </FormItem>
              </div>
              :''
            }
           
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
