import React, { PureComponent } from 'react';
import moment from 'moment';
import { connect } from 'dva';
import { Row, Col, Form, Card, Select, List, Tag, message,Icon,Badge } from 'antd';
import { FormattedMessage } from 'umi-plugin-react/locale';
import router from 'umi/router';
import TagSelect from '@/components/TagSelect';
import AvatarList from '@/components/AvatarList';
import Ellipsis from '@/components/Ellipsis';
import StandardFormRow from '@/components/StandardFormRow';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
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


class CoursePay extends PureComponent {
  componentDidMount() {
  
  }

  render() {
    const {
      loading,
      form,
    } = this.props;
    const { getFieldDecorator } = form;

    const formItemLayout = {
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };

  

    return (
        <PageHeaderWrapper
      >
        <Card bordered={false}>
     1232
          
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default CoursePay;