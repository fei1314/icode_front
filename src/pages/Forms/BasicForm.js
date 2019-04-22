import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';
import {
  Form,
  Input,
  DatePicker,
  Select,
  Button,
  Card,
  InputNumber,
  Radio,
  Icon,
  Tooltip,
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './style.less';
import { OverPack } from 'rc-scroll-anim';
import TweenOne from 'rc-tween-one';
import QueueAnim from 'rc-queue-anim';
import { enquireScreen } from 'enquire-js';

import Banner3 from './AntComponent/Banner3';
import Content8 from './AntComponent/Content8';
import Content9 from './AntComponent/Content9';
import Content10 from './AntComponent/Content10';
import Content11 from './AntComponent/Content11';
import Content12 from './AntComponent/Content12';
import Footer2 from './AntComponent/Footer2';

import {
  Nav20DataSource,
  Banner30DataSource,
  Content80DataSource,
  Content90DataSource,
  Content100DataSource,
  Content110DataSource,
  Content120DataSource,
  Footer20DataSource,
} from './AntComponent/data.source';
import './AntComponent/less/antMotionStyle.less';

let isMobile;
enquireScreen((b) => {
  isMobile = b;
});

const { location } = window;



const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

@connect(({ concat,loading }) => ({
  concat,
  submitting: loading.effects['concat/submitRegularForm'],
}))


@Form.create()
class BasicForms extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isMobile,
      show: !location.port, // 如果不是 dva 2.0 请删除
    };
  }

  componentDidMount() {
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
    const {dispatch} = this.props;
    dispatch({
      type:'concat/fetchTeacher'
    })
    /* 如果不是 dva 2.0 请删除 end */
  }


  handleSubmit = e => {
    const { dispatch, form } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        dispatch({
          type: 'concat/submitRegularForm',
          payload: values,
        });
      }
    });
  };

  render() {
    const { submitting } = this.props;
    const {
      form: { getFieldDecorator, getFieldValue },
      concat:{dataTeacher}
    } = this.props;
    let newChildren=[];
    if(dataTeacher && dataTeacher.status =='ok'){
      dataTeacher && dataTeacher.msg && dataTeacher.msg.map((item,index)=>{
        newChildren.push({
          name: `block${index}`,
          md: 6,
          xs: 24,
          className: 'content8-block-wrapper',
          children: {
            className: 'content8-block',
            img: {
              className: 'content8-img',
              children:item.lec_avatar,
            },
            title: { className: 'content8-title', children: item.lec_name },
            content: {
              className: 'content8-content',
              children: item.lec_desc,
            },
          },
        })
      })
      
    }
    Content80DataSource.block.children = [...newChildren]
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
    const children = [
     
      <Banner3
        id="Banner3_0"
        key="Banner3_0"
        dataSource={Banner30DataSource}
        isMobile={this.state.isMobile}
      />,
      <Content8
        id="Content8_0"
        key="Content8_0"
        dataSource={Content80DataSource}
        isMobile={this.state.isMobile}
      />,
      <Content9
        id="Content9_0"
        key="Content9_0"
        dataSource={Content90DataSource}
        isMobile={this.state.isMobile}
      />,
      <Content10
        id="Content10_0"
        key="Content10_0"
        dataSource={Content100DataSource}
        isMobile={this.state.isMobile}
      />,
      <Content11
        id="Content11_0"
        key="Content11_0"
        dataSource={Content110DataSource}
        isMobile={this.state.isMobile}
      />,
      <Content12
        id="Content12_0"
        key="Content12_0"
        dataSource={Content120DataSource}
        isMobile={this.state.isMobile}
      />,
      <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
            <FormItem {...formItemLayout} label='姓名'>
              {getFieldDecorator('name', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'validation.title.required' }),
                  },
                ],
              })(<Input placeholder='请输入姓名' />)}
            </FormItem>
            <FormItem {...formItemLayout} label={formatMessage({ id: 'app.settings.basic.phone' })}>
              {getFieldDecorator('phone', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'app.settings.basic.phone-message' }, {}),
                  },
                  // { validator: validatorPhone },
                ],
              })(<Input placeholder='请输入电话' />)}
            </FormItem>
            <FormItem {...formItemLayout} label={formatMessage({ id: 'app.settings.basic.email' })}>
              {getFieldDecorator('email', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'app.settings.basic.email-message' }, {}),
                  },
                ],
              })(<Input placeholder='请输入邮箱' />)}
            </FormItem>
            <FormItem {...formItemLayout} label={<FormattedMessage id="form.goal.label" />}>
              {getFieldDecorator('message', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'validation.goal.required' }),
                  },
                ],
              })(
                <TextArea
                  style={{ minHeight: 32 }}
                  placeholder={formatMessage({ id: 'form.goal.placeholder' })}
                  rows={4}
                />
              )}
            </FormItem>
            
           
            <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
              <Button type="primary" htmlType="submit" loading={submitting}>
                <FormattedMessage id="form.submit" />
              </Button>
              {/* <Button style={{ marginLeft: 8 }}>
                <FormattedMessage id="form.save" />
              </Button> */}
            </FormItem>
          </Form>
      // <Footer2
      //   id="Footer2_0"
      //   key="Footer2_0"
      //   dataSource={Footer20DataSource}
      //   isMobile={this.state.isMobile}
      // />,
    ];


    return (
      <PageHeaderWrapper
      className='asd'
        // title={<FormattedMessage id="app.forms.basic.title" />}
        // content={<FormattedMessage id="app.forms.basic.description" />}
      >
        <Card bordered={false} className='ddd'>
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
    
          
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default BasicForms;
