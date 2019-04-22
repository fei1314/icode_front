import React, { PureComponent, Fragment } from 'react';
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';
import { Form, Input, Upload, Select, Button,Tag,Spin,message,Row,Col } from 'antd';
import { connect } from 'dva';
import styles from './BaseView.less';
import GeographicView from './GeographicView';
import PhoneView from './PhoneView';
// import { getTimeDistance } from '@/utils/utils';
const { TextArea } = Input;
const FormItem = Form.Item;
const { Option } = Select;

const nullSlectItem = {
  label: '',
  key: '',
};
const props = {
  name: 'user_avatar',
  action: '/api/user/ajax/update_user_avatar/',
  headers: {
    authorization: 'authorization-text',
  },
  onChange(info) {
    console.log('info',info)
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};
// 头像组件 方便以后独立，增加裁剪之类的功能
const AvatarView = ({ avatar }) => (
  
  <Fragment>
    <div className={styles.avatar_title}>
      <FormattedMessage id="app.settings.basic.avatar" defaultMessage="Avatar" />
    </div>
    <div className={styles.avatar}>
      <img src={avatar} alt="avatar" />
    </div>
    <Upload {...props}>
      <div className={styles.button_view}>
        <Button icon="upload">
          <FormattedMessage id="app.settings.basic.change-avatar" defaultMessage="Change avatar" />
        </Button>
      </div>
    </Upload>
  </Fragment>
);

const validatorGeographic = (rule, value, callback) => {
  const { province, city } = value;
  if (!province.key) {
    callback('Please input your province!');
  }
  if (!city.key) {
    callback('Please input your city!');
  }
  callback();
};

const validatorPhone = (rule, value, callback) => {
  const values = value.split('-');
  if (!values[0]) {
    callback('Please input your area code!');
  }
  if (!values[1]) {
    callback('Please input your phone number!');
  }
  callback();
};


@connect(({ info }) => ({
  info
}))
@Form.create()
class BaseView extends PureComponent {
  constructor(props){
    super(props)
    this.state = {
      asd:{}
    }
  }
  componentDidMount() {
    this.setBaseInfo();
    const { dispatch } = this.props;
    dispatch({
      type:'info/fetchCurrent'
    }).then(()=>{
      const { info:{currentUser}} = this.props;
      if(currentUser.status == 'ok'){
        dispatch({
          type:'info/fetchInfo'
        })
      }else{
        this.props.history.push(`/user/login?redirect=${window.location.href}`)
      }
    })
    

    // 地址
    dispatch({
      type: 'info/fetchProvince',
    });
  }

  setBaseInfo = () => {
    const { currentUser, form } = this.props;
    // Object.keys(form.getFieldsValue()).forEach(key => {
    //   const obj = {};
    //   obj[key] = currentUser[key] || null;
    //   form.setFieldsValue(obj);
    // });
  };

  getAvatarURL() {
    const { info:{currentInfo} } = this.props;
    const url = `https://www.icode121.com${currentInfo&&currentInfo.msg&&currentInfo.msg.user_avatar}`
    return url;
  }

  getViewDom = ref => {
    this.view = ref;
  };

  // 提交表单
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
        console.log('value111s',values)
        this.props.dispatch({
          type: 'info/submitRegularForm',
          payload: values,
        });
          console.log('222')
    });
}




// 地址
componentDidUpdate(props) {
  const { dispatch, value } = this.props;

  if (!props.value && !!value && !!value.province) {
    dispatch({
      type: 'info/fetchCity',
      payload: value.province.key,
    });
  }
}

getProvinceOption() {
  const { info:{province} } = this.props;
  return this.getOption(province&&province.msg);
}

getCityOption = () => {
  const { info:{city} } = this.props;
  return this.getOption(city);
};

getOption = list => {
  if (!list || list.length < 1) {
    return (
      <Option key={0} value={0}>
        没有找到选项
      </Option>
    );
  }
  return list && list.map(item => (
    <Option key={item.id} value={item.id}>
      {item.name}
    </Option>
  ));
};

selectProvinceItem = item => {
  const { dispatch, onChange } = this.props;
  dispatch({
    type: 'info/fetchCity',
    payload: item,
  });
  // onChange({
  //   province: item,
  //   city: nullSlectItem,
  // });
};

selectCityItem = item => {
  const { value, onChange } = this.props;
  onChange({
    province: value.province,
    city: item,
  });
};

conversionObject() {
  const { value } = this.props;
  if (!value) {
    return {
      province: nullSlectItem,
      city: nullSlectItem,
    };
  }
  const { province, city } = value;
  return {
    province: province || nullSlectItem,
    city: city || nullSlectItem,
  };
}
  render() {
    const {
      form: { getFieldDecorator },
      info:{currentInfo}
    } = this.props;
    const infomsg = currentInfo && currentInfo.msg;
    let addr = infomsg && infomsg.user_address;
  
    // 地址
    const { province, city } = this.conversionObject();
    const { isLoading } = this.props;
    return (
      <div className={styles.baseView} ref={this.getViewDom}>
        <div className={styles.left}>
          <Form layout="vertical" onSubmit={this.handleSubmit} hideRequiredMark>
            <FormItem label={formatMessage({ id: 'app.settings.basic.nickname' })}>
              {getFieldDecorator('user_name', {
                initialValue:infomsg &&infomsg.user_name,
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'app.settings.basic.nickname-message' }, {}),
                  },
                ],
              })(<Input />)}
            </FormItem>
            <FormItem label={formatMessage({ id: 'app.settings.basic.email' })}>
              {getFieldDecorator('user_email', {
                initialValue:infomsg &&infomsg.user_email,
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'app.settings.basic.email-message' }, {}),
                  },
                ],
              })(<Input />)}
            </FormItem>
            <FormItem label='年龄'>
              {getFieldDecorator('user_birth', {
                initialValue:infomsg &&infomsg.user_birth,
                rules: [
                  {
                    required: true,
                    message: '请输入年龄',
                  },
                ],
              })(<Input />)}
            </FormItem>
            <FormItem label='年级'>
              {getFieldDecorator('user_level', {
                initialValue:infomsg &&infomsg.user_level,
                rules: [
                  {
                    required: true,
                    message: '请输入年级',
                  },
                ],
              })(
                <Select style={{ maxWidth: 220 }}>
                  <Option value="primary">小学</Option>
                  <Option value="middle">初中</Option>
                  <Option value="high">高中</Option>
                  <Option value="university">大学</Option>
                  <Option value="master">更高学历</Option>
                  <Option value="social">社会</Option>
                </Select>
              )}
            </FormItem>
            <FormItem label='英语等级'>
              {getFieldDecorator('user_eng_level', {
                initialValue:infomsg &&infomsg.user_eng_level,
                rules: [
                  {
                    required: true,
                    message: '请选择英语等级',
                  },
                ],
              })(
                <Select style={{ maxWidth: 220 }}>
                  <Option value="cet4">英语四级</Option>
                  <Option value="cet6">英语六级</Option>
                  <Option value="master">精通英语</Option>
                  <Option value="normal">普通读写</Option>
                  <Option value="poor">入门基础</Option>
                </Select>
              )}
            </FormItem>
            <Row gutter={24}>
                <Col span={8}>
                <FormItem label={formatMessage({ id: 'app.settings.basic.geographic' })}>
              {getFieldDecorator('province', {
                initialValue:addr&&addr.province,
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'app.settings.basic.geographic-message' }, {}),
                  },
                ],
              })(
                    <Select
                    className={styles.item}
                    showSearch
                    onSelect={this.selectProvinceItem}
                  >
                    {this.getProvinceOption()}
                  </Select>
              )}
            </FormItem>
                </Col>
                <Col span={8}>
                <FormItem label={formatMessage({ id: 'app.settings.basic.geographic' })}>
              {getFieldDecorator('city', {
                initialValue:addr&&addr.city,
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'app.settings.basic.geographic-message' }, {}),
                  },
                  // {
                  //   validator: validatorGeographic,
                  // },
                ],
              })(
                  <Select
                    className={styles.item}
                    // value={addr&&addr.city}
                    // labelInValue
                    showSearch
                    // onSelect={this.selectCityItem}
                  >
                    {this.getCityOption()}
                  </Select>
              )}
            </FormItem>
                </Col>
                <Col span={8}>
                <FormItem label={formatMessage({ id: 'app.settings.basic.address' })}>
              {getFieldDecorator('user_address', {
                initialValue:addr&&addr.address,
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'app.settings.basic.address-message' }, {}),
                  },
                ],
              })(<TextArea rows={4} cols={100} />)}
            </FormItem>
                </Col>
            </Row>
            
            
            
            <Button type="primary" htmlType="submit">
              <FormattedMessage
                id="app.settings.basic.update"
                defaultMessage="Update Information"
              />
            </Button>
          </Form>
        </div>
        <div className={styles.right}>
          <div style={{marginBottom:40,marginTop:10}}>
            <label style={{marginRight:40}} htmlFor="credit">积分：{<Tag color="#108ee9" id="credit">{infomsg&&infomsg.credit}</Tag>}</label>
            <label htmlFor="exp">经验值：{<Tag color="#108ee9" id="exp">{infomsg&&infomsg.exp}</Tag>}</label>
          </div>
          <AvatarView avatar={this.getAvatarURL()} />
        </div>
      </div>
    );
  }
}

export default BaseView;
