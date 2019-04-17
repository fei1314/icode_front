import React from 'react';
import QueueAnim from 'rc-queue-anim';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import { Row, Col, Icon } from 'antd';

import Tetris from './technology-comp/Tetris';
import Column from './technology-comp/Column';
import Coordinate from './technology-comp/Coordinate';
import Building from './technology-comp/Building';


const pageData = [
  {
    title: '课程简单可定制',
    content: '定制化可以根据用户的问题来获得最佳线上线下讲解，如孩子家长期望孩子掌握什么技术内容，具体问题的细致讲解，可以详细描述需求的内容， 根据用户的选择来定制化课程大纲， 从根本解决困惑， 适用于初学者对技术的概念掌握， 适用于自学者对疑难问题的解惑。',
    // links: [
    //   <a key="0" href="https://ant.design" target="_blank">Web&nbsp;&nbsp;<Icon type="right" /></a>,
    //   <a key="1" href="https://mobile.ant.design" target="_blank">Mobile&nbsp;&nbsp;<Icon type="right" /></a>,
    //   <a key="2" href="https://pro.ant.design" target="_blank">Pro&nbsp;&nbsp;<Icon type="right" /></a>,
    // ],
    Bg: Tetris,
  },
  {
    title: '初学入门一对一',
    content: '一对一可以保证教学的质量， 让定制的内容充分得到解答， 很多初学者对编程领域出于观望状态， 不知道如何入门， 不知道学习什么， 对很多教学题材感到困惑， 对海量的技术词汇感到陌生， 一对一结合定制化的课程体系， 能够直接对击破疑难的根本， 让初学者 认识技术， 了解技术， 掌握编程',
    // links: (<a href="https://antv.alipay.com" target="_blank">查看详情&nbsp;&nbsp;<Icon type="right" /></a>),
    Bg: Column,
  },
  {
    title: '线上线下相结合',
    content: '线上视频答疑解惑， 通过高级讲师的定制视频， 帮助在课程定制过程中的疑问和需求做详细的解释， 从而可以根本的分析用户问题， 学习结果和问题反馈则通过线下一对一的服务， 我们提供一对一的上门授课服务， 也支持老师的线上一对一交流',
    // links: (<a>敬请期待</a>),
    Bg: Coordinate,
  },
  {
    title: '简介',
    content: '我们有强大的讲师阵容，多年的教学经验，丰富的课程体系',
    links: (<a href="/form">关于我们&nbsp;&nbsp;<Icon type="right" /></a>),
    full: true,
    Bg: Building,
  },
];

export default class Design extends React.PureComponent {
  state = {
    hover: null,
  };
  onMouseEnter = (hover) => {
    this.setState({
      hover,
    });
  }
  onMouseLeave = () => {
    this.setState({
      hover: null,
    });
  }
  render() {
    const { isMobile } = this.props;
    const children = pageData.map((item, i) => {
      const colProps = {
        md: item.full ? 24 : 8, xs: 24,
      };
      return (
        <Col {...colProps} key={i.toString()} className="page2-item-wrapper">
          <div
            className={`page2-item${item.full ? ' full' : ''}`}
            onMouseEnter={() => { this.onMouseEnter(item.title); }}
            onMouseLeave={this.onMouseLeave}
          >
            <div className="page2-item-bg">
              {item.Bg && React.createElement(item.Bg, {
                hover: !isMobile && this.state.hover === item.title,
                isMobile,
              })}
            </div>
            <div className="page2-item-desc">
              <h4>{item.title}</h4>
              <p>{item.content}</p>
              <p className="page2-item-links">
                {item.links}
              </p>
            </div>
          </div>
        </Col>
      );
    });
    return (
      <div className="page-wrapper page2">
        <div className="page">
          <h1>课程特色</h1>
          <i />
          <OverPack className="page2-content">
            <QueueAnim component={Row} key="queue" type="bottom" leaveReverse>
              {children}
            </QueueAnim>
          </OverPack>
        </div>
      </div>);
  }
}
