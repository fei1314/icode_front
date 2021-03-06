import React from 'react';
import { Button, Icon } from 'antd';
import QueueAnim from 'rc-queue-anim';
import TweenOne from 'rc-tween-one';
import router from 'umi/router';
class Banner extends React.PureComponent {
  constructor(props){
    super(props)
  }
  yuyue = ()=>{
    router.push('/account/settings/appoint')
  }
  render() {
    const { ...currentProps } = this.props;
    const { dataSource } = currentProps;
    delete currentProps.dataSource;
    delete currentProps.isMobile;
    return (
      <div {...currentProps} {...dataSource.wrapper}>
        <QueueAnim
          key="QueueAnim"
          type={['bottom', 'top']}
          delay={200}
          {...dataSource.textWrapper}
        >
          <div key="title" {...dataSource.title}>
            {typeof dataSource.title.children === 'string' &&
            dataSource.title.children.match(
              /\.(svg|gif|jpg|jpeg|png|JPG|PNG|GIF|JPEG)$/
            ) ? (
              <img src={dataSource.title.children} width="100%" alt="img" />
            ) : (
              dataSource.title.children
            )}
          </div>
          <div style={{color:'#fff',marginBottom:20}}>课程简单可定制,初学入门一对一</div>
          <div key="content" {...dataSource.content}>
            {dataSource.content.children}
          </div>
          <Button ghost key="button" {...dataSource.button} onClick={this.yuyue}>
            {dataSource.button.children}
          </Button>
        </QueueAnim>
        <TweenOne
          animation={{
            y: '-=20',
            yoyo: true,
            repeat: -1,
            duration: 1000,
          }}
          className="banner0-icon"
          key="icon"
        >
          <Icon type="down" />
        </TweenOne>
      </div>
    );
  }
}
export default Banner;
