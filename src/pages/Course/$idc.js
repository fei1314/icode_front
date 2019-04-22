import React, { PureComponent } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Row, Col, Form, Card, Rate,Select,Input,Button, Comment,List,Avatar, Tag,Icon ,message,Tooltip} from 'antd';
import { FormattedMessage } from 'umi-plugin-react/locale';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import TagSelect from '@/components/TagSelect';
import AvatarList from '@/components/AvatarList';
import Ellipsis from '@/components/Ellipsis';
import StandardFormRow from '@/components/StandardFormRow';

import styles from './BasicCourse.less';
import Xgplayer from './byted-react-xgplayer';
const { Option } = Select;
const FormItem = Form.Item;
let Player = null;


const TextArea = Input.TextArea;

const CommentList = ({ comments }) => (
  <List
    dataSource={comments}
    header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
    itemLayout="horizontal"
    renderItem={props => <Comment {...props} />}
  />
);

const Editor = ({
  onChange, onSubmit, submitting, value,
}) => (
  <div>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button
        htmlType="submit"
        loading={submitting}
        onClick={onSubmit}
        type="primary"
      >
        添加评论
      </Button>
    </Form.Item>
  </div>
);
/* eslint react/no-array-index-key: 0 */

@connect(({ course, loading }) => ({
    course,
  loading: loading.models.course,
}))
@Form.create({
  onValuesChange({ dispatch }, changedValues, allValues) {
    // 表单项变化时请求数据
    // eslint-disable-next-line
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
    constructor(props){
        super(props)
        this.state = {
            like:"",
            id:'',
            bool:true,
            favorite:'',
            action: null,
            comments: [],
            submitting: false,
            value: '',
            commentsData:[],
            starVal:''
        }
    }
  componentDidMount() {
      const id = window.location.pathname.substring(10)
      this.setState({
          id
      })
    const { dispatch } = this.props;
    dispatch({
      type: 'course/fetchContent',
      payload:{
        "course_id":id,
        "option":'get'
      }
    }).then(()=>{
      const {
        course: { courseContent },
      } = this.props;
      let msg='';
      if(courseContent.status == 'ok'){
        msg = courseContent.msg;
        if(msg.i_favorite){
          this.setState({
            favorite:'twoTone'
          })
        }else{
          this.setState({
            favorite:''
          })
        }
        if(msg.i_like){
          this.setState({
            like:'twoTone'
          })
        }else{
          this.setState({
            like:''
          })
        }
      }
    })
    // 获取评论列表
    dispatch({
        type: 'course/fetchComments',
        payload:id
      }).then(()=>{
          const {course:{courseComments}} = this.props;
        if(courseComments.status == 'ok'){
            var commentsData = courseComments && courseComments.msg && courseComments.msg.comments;
            this.setState({
                commentsData
            })
        }
      })
  }
  componentWillUnmount() {
    this.destroy(Player);
  }
  destroy (player) {
    if (!player) {
      return;
    }
    let parentNode;
    if (player.root) {
      parentNode = player.root.parentNode;
    }
    for (let k in player._interval) {
      clearInterval(player._interval[k]);
      player._interval[k] = null;
    }
    if (player.ev) {
      player.ev.forEach((item) => {
        let evName = Object.keys(item)[0];
        let evFunc = this[item[evName]];
        if (evFunc) {
          player.off(evName, evFunc);
        }
      });
    }
    ['focus', 'blur'].forEach(item => {
      player.off(item, player['on' + item.charAt(0).toUpperCase() + item.slice(1)]);
    });
    if (!player.paused) {
      player.pause();
      player.once('pause', () => {
        player.emit('destroy');
        if (player.root) {
          player.root.id = player.root.id + '_del';
          parentNode.insertBefore(player.rootBackup, player.root);
          parentNode.removeChild(player.root);
        }
        for (let k in player) {
          if (k !== 'config') {
            delete player[k];
          }
        }
      });
    } else {
      player.emit('destroy');
      if (player.root) {
        player.root.id = player.root.id + '_del';
        if (player.rootBackup) {
          parentNode.insertBefore(player.rootBackup, player.root);
        }
        parentNode.removeChild(player.root);
      }
      for (let k in player) {
        if (k !== 'config') {
          delete player[k];
        }
      }
    }
    setTimeout(()=>{
      player = null;
    }, 200);
  }
//   like
  clickLike = () => {
    const { dispatch } = this.props;
    const {bool,id} = this.state;
    dispatch({
        type:'course/like',
        payload:{
            'course_id':  id,
            'option':'like',
        }
    }).then(()=>{
        const { course:{courseLike}} = this.props;
        const msg = courseLike && courseLike.msg;
        msg == 'like' ?
        this.setState({
            like:'twoTone'
        }):
        this.setState({
            like:''
        })
    })
  }
  favorite = () =>{
    const { dispatch } = this.props;
    const {bool,id} = this.state;
    dispatch({
        type:'course/favorite',
        payload:{
            'course_id':  id,
            'option':'favorite',
        }
    }).then(()=>{
        const { course:{courseFavorite}} = this.props;
        const msg = courseFavorite && courseFavorite.msg;
        console.log('msg',msg)
        msg == 'add favorite success' ?
        this.setState({
            favorite:'twoTone'
        }):
        this.setState({
          favorite:''
        })
    })
  }
  handleSubmit = () => {
    if (!this.state.value) {
      return;
    }
    const {id,starVal} = this.state;
    const {dispatch} = this.props;
    this.setState({
        submitting: true,
      });
    dispatch({
        type:'course/comment',
        payload:{
            'course_id':  id,
            'option':'comment',
            "comment":this.state.value,
            "star":starVal
        }
    }).then(()=>{
        // const {course:{commentData}} = this.props;
        // console.log('commentData',commentData)
        const { dispatch } = this.props;
        const {id} = this.state;
        dispatch({
        type: 'course/fetchComments',
        payload:id
        }).then(()=>{
            const {course:{courseComments}} = this.props;
            if(courseComments.status == 'ok'){
                var commentsData = courseComments && courseComments.msg && courseComments.msg.comments;
                this.setState({
                    commentsData
                })
            }
        })
        this.setState({
            submitting: false,
          });
    })
  }

  handleChange = (e) => {
    this.setState({
      value: e.target.value,
    });
  }

  // 打分
  changeStar = (val) =>{
    this.setState({
      starVal:val
    })
  }
  // 禁止下载视频
  changeMenu = () => {
    return false;
  }
  render() {
    const {
      course: { courseContent,courseComments },
      loading,
      form,
    } = this.props;
    const {comments, submitting, value ,commentsData,favorite,like} = this.state;
    const { getFieldDecorator } = form;
    let courseData = [];
    if(courseContent.status == 'ok'){
        courseData = courseContent.msg;
    }
    // if(courseComments.status == 'ok'){
    //     commentsData = courseComments && courseComments.msg && courseComments.msg.comments;
    // }
    console.log('commentsData',commentsData)
    const IconText = ({ type, text }) => (
      <span>
        <Icon type={type} style={{ marginRight: 8 }} />
        {text}
      </span>
    );
    
    console.log('comments',comments)
    const formItemLayout = {
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
  
    let config = {
        id: 'mse',
        url: `https://www.icode121.com/media/${courseData.content}`,
        playbackRate: [0.5, 0.75, 1, 1.5, 2],
        fluid: true,
        poster:'https://sf1-ttcdn-tos.pstatp.com/obj/ttfe/stc_video/Lark20181122-110704.png'
      }
      let format = 'mp4';
    return (
        <PageHeaderWrapper>
            <Card bordered={false} actions={[<Icon onClick={this.favorite} theme={favorite} type="star-o" />, <Icon theme={like} type='like-o' onClick={this.clickLike.bind(this,true)} />,]}>
                {/* <Xgplayer config={config} format={format} playerInit={(player)=>{ Player = player; }} /> */}
                <video onContextMenu={this.changeMenu} controlslist="nodownload" poster="https://sf1-ttcdn-tos.pstatp.com/obj/ttfe/stc_video/Lark20181122-110704.png" width="100%" height="640" controls="controls" src={`https://www.icode121.com/media/${courseData.content}`}></video>
            </Card>
            <Card bordered={false} style={{marginTop:20}}>
                <div>
                <List
    className="comment-list"
    header={`${commentsData.length} 个评论`}
    pagination={{
      onChange: (page) => {
        console.log(page);
      },
      pageSize: 3,
    }}
    itemLayout="horizontal"
    dataSource={commentsData}
    renderItem={item => (
      <Comment
      author={<a>{item.user__user_name}</a>}
      avatar={(
      <Avatar
          src={`https://www.icode121.com/${item.user__user_avatar}`}
          alt="头像"
      />
      )}
      content={(
      <p>{item.comment}</p>
      )}
      datetime={(
          <span>
            <span>{moment(item.create_time).format('YYYY-MM-DD HH:mm:ss')}</span>
            <Rate style={{marginLeft:40}} value={item.star} />
          </span>
      )}
  />
    )}
  />
                    {/* {commentsData.length > 0 &&
                        commentsData.map(item=>{
                            return (
                                <Comment
                                    author={<a>{item.user__user_name}</a>}
                                    avatar={(
                                    <Avatar
                                        src={`https://www.icode121.com/${item.user__user_avatar}`}
                                        alt="头像"
                                    />
                                    )}
                                    content={(
                                    <p>{item.comment}</p>
                                    )}
                                    datetime={(
                                        <span>
                                          <span>{moment(item.create_time).format('YYYY-MM-DD HH:mm:ss')}</span>
                                          <Rate style={{marginLeft:40}} value={item.star} />
                                        </span>
                                    )}
                                />
                            )
                        })
                    } */}
                    
                    <Comment
                    avatar={(
                        <Avatar
                        src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                        alt="Han Solo"
                        />
                    )}
                    content={(
                        <div>
                          <Rate onChange={this.changeStar} />
                          <Editor
                        onChange={this.handleChange}
                        onSubmit={this.handleSubmit}
                        submitting={submitting}
                        value={value}
                        />
                        </div>
                        
                    )}
                    />
                   
                </div>
            </Card>
        </PageHeaderWrapper>
    );
  }
}

export default CourseDetail;