import React, { Component } from 'react';
import { connect } from 'dva';
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';
import Link from 'umi/link';
import { Checkbox, Alert, Icon,Form,Row,Col,Input } from 'antd';
import Login from '@/components/Login';
import router from 'umi/router';
import styles from './Login.less';
const FormItem = Form.Item;

const { Tab, UserName, Password, Mobile, Captcha, Submit } = Login;

@connect(({ login, loading }) => ({
  login,
  submitting: loading.effects['login/login'],
}))
@Form.create()
class LoginPage extends Component {
  state = {
    type: 'user_phone',
    autoLogin: true,
    verifyImg:"https://www.icode121.com/api/common/captcha",
    btnText:'获取验证码',
    isClick:false
  };

  componentDidMount(){
    console.log('asd',window.location)
  }

  onTabChange = type => {
    this.setState({ type });
  };

  onGetCaptcha = () =>
    new Promise((resolve, reject) => {
      this.loginForm.validateFields(['user_phone'], {}, (err, values) => {
        console.log('va',values)
        if (err) {
          reject(err);
        } else {
          const { dispatch } = this.props;
          const { captcha,user_phone } = this.state;
          dispatch({
            type: 'login/fetchImgVerify',
            payload: {
              captcha,user_phone
            },
          })
            .then(()=>{
              console.log('qwe',this.props)
              const {login:{verifyData}} = this.props;
              if(verifyData.status == 'ok'){
                console.log('123')
                this.numTime()
              }
              console.log('verifyData',verifyData)
            })
            .catch(reject);
        }
      });
    });

  handleSubmit = (err, values) => {
    const { type,user_phone } = this.state;
    if (!err) {
      values.user_phone = user_phone;
      const { dispatch } = this.props;
      dispatch({
        type: 'login/submitRegularForm',
        payload: {
          ...values,
          // type,
        },
      }).then(()=>{
        const {login:{loginData}} = this.props;
        
        if(loginData.status == 'ok'){
          let url = decodeURIComponent(window.location.search.substring(10))
          window.open(url,'_blank')
        }
      })
    }
  };

  changeAutoLogin = e => {
    this.setState({
      autoLogin: e.target.checked,
    });
  };

  renderMessage = content => (
    <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon />
  );
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
      type:'login/fetchImgVerify',
      payload:{
        captcha,user_phone
      }
    }).then(()=>{
      console.log('qwe',this.props)
      const {login:{verifyData}} = this.props;
      console.log('verifyData',verifyData)
    })
  }
  render() {
    const { login, submitting,form:{getFieldDecorator} } = this.props;
    const { type, autoLogin } = this.state;
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
    return (
      <div className={styles.main}>
        <Login
          defaultActiveKey={type}
          onTabChange={this.onTabChange}
          onSubmit={this.handleSubmit}
          ref={form => {
            this.loginForm = form;
          }}
        >
          {/* <Tab key="account" tab={formatMessage({ id: 'app.login.tab-login-credentials' })}>
            {login.status === 'error' &&
              login.type === 'account' &&
              !submitting &&
              this.renderMessage(formatMessage({ id: 'app.login.message-invalid-credentials' }))}
            <UserName
              name="userName"
              placeholder={`${formatMessage({ id: 'app.login.userName' })}: admin or user`}
              rules={[
                {
                  required: true,
                  message: formatMessage({ id: 'validation.userName.required' }),
                },
              ]}
            />
            <Password
              name="password"
              placeholder={`${formatMessage({ id: 'app.login.password' })}: ant.design`}
              rules={[
                {
                  required: true,
                  message: formatMessage({ id: 'validation.password.required' }),
                },
              ]}
              onPressEnter={e => {
                e.preventDefault();
                this.loginForm.validateFields(this.handleSubmit);
              }}
            />
          </Tab> */}
          <Tab key="user_phone" tab={formatMessage({ id: 'app.login.tab-login-mobile' })}>
            {login.status === 'error' &&
              login.type === 'user_phone' &&
              !submitting &&
              this.renderMessage(
                formatMessage({ id: 'app.login.message-invalid-verification-code' })
              )}
            {/* <Mobile
              name="user_phone"
              placeholder={formatMessage({ id: 'form.phone-number.placeholder' })}
              rules={[
                {
                  required: true,
                  message: formatMessage({ id: 'validation.phone-number.required' }),
                },
                {
                  pattern: /^1\d{10}$/,
                  message: formatMessage({ id: 'validation.phone-number.wrong-format' }),
                },
              ]}
            /> */}
            <FormItem>
                  {getFieldDecorator('user_phone', {
                    rules: [
                      {
                        required: true,
                        message:'请输入手机号'
                      },
                    ],
                  })(
                    <Input style={{height:40}} onChange={this.inputPhone} placeholder="请输入手机号" />
                  )}
                </FormItem>
            <FormItem>
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
                      <Input style={{height:40}} placeholder="请输入图片验证码" onChange={this.inputVerify} />
                      </Col>
                      <Col md={8} xs={24}>
                      <img onClick={this.changeVerify} src={this.state.verifyImg} style={{height:'33px',cursor: 'pointer',}} />
                      </Col>
                  </Row>
                )}
              </FormItem>
            <Captcha
              name="code"
              placeholder={formatMessage({ id: 'form.verification-code.placeholder' })}
              countDown={120}
              onGetCaptcha={this.onGetCaptcha}
              getCaptchaButtonText={this.state.btnText}
              getCaptchaSecondText={formatMessage({ id: 'form.captcha.second' })}
              // style={{disabled}}
              rules={[
                {
                  required: true,
                  message: formatMessage({ id: 'validation.verification-code.required' }),
                },
              ]}
            />
          </Tab>
          {/* <div>
            <Checkbox checked={autoLogin} onChange={this.changeAutoLogin}>
              <FormattedMessage id="app.login.remember-me" />
            </Checkbox>
            <a style={{ float: 'right' }} href="">
              <FormattedMessage id="app.login.forgot-password" />
            </a>
          </div> */}
          <Submit loading={submitting}>
            <FormattedMessage id="app.login.login" />
          </Submit>
          <div className={styles.other}>
            <FormattedMessage id="app.login.sign-in-with" />
            <Icon type="alipay-circle" className={styles.icon} theme="outlined" />
            <Icon type="taobao-circle" className={styles.icon} theme="outlined" />
            <Icon type="weibo-circle" className={styles.icon} theme="outlined" />
            <Link className={styles.register} to="/user/register">
              <FormattedMessage id="app.login.signup" />
            </Link>
          </div>
        </Login>
      </div>
    );
  }
}

export default LoginPage;
