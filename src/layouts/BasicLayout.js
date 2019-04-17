import React, { Suspense } from 'react';
import { Layout } from 'antd';
import DocumentTitle from 'react-document-title';
import { connect } from 'dva';
import { ContainerQuery } from 'react-container-query';
import classNames from 'classnames';
import Media from 'react-media';
import logo from '../assets/logo.svg';
import Footer from './Footer';
import Header from './Header';
import Context from './MenuContext';
import SiderMenu from '@/components/SiderMenu';
import getPageTitle from '@/utils/getPageTitle';
import styles from './BasicLayout.less';

// lazy load SettingDrawer
const SettingDrawer = React.lazy(() => import('@/components/SettingDrawer'));

const { Content } = Layout;

const query = {
  'screen-xs': {
    maxWidth: 575,
  },
  'screen-sm': {
    minWidth: 576,
    maxWidth: 767,
  },
  'screen-md': {
    minWidth: 768,
    maxWidth: 991,
  },
  'screen-lg': {
    minWidth: 992,
    maxWidth: 1199,
  },
  'screen-xl': {
    minWidth: 1200,
    maxWidth: 1599,
  },
  'screen-xxl': {
    minWidth: 1600,
  },
};

class BasicLayout extends React.Component {
  componentDidMount() {
    const {
      dispatch,
      route: { routes, path, authority },
    } = this.props;
    dispatch({
      type: 'user/fetchCurrent',
    });
    dispatch({
      type: 'setting/getSetting',
    });
    dispatch({
      type: 'menu/getMenuData',
      payload: { routes, path, authority },
    });
    // var canvas = document.getElementById("c");
    //     var ctx = canvas.getContext("2d");
    //     var c = document.getElementById('c');
    //     var x, y, w, h, cx, cy, l;
    //     var y = [];
    //     var b = {
    //       n: 100,
    //       c: false,
    //       //  颜色  如果是false 则是随机渐变颜色
    //       bc: '#fff',
    //       //  背景颜色
    //       r: 0.9,
    //       o: 0.05,
    //       a: 1,
    //       s: 20,
    //     }
    //     var bx = 0,
    //     by = 0,
    //     vx = 0,
    //     vy = 0;
    //     var td = 0;
    //     var p = 0;
    //     var hs = 0;
    //     re();
    //     var color, color2;
    //     if (b.c) {
    //       color2 = b.c;
    //     } else {
    //       color = Math.random() * 360;
    //     }
    //     window.onresize = function(){
    //         re();
    //     }
    //     var tp0 = true;
    //     function begin() {
    //     if (tp0) {
    //         if (!b.c) {
    //           color += .1;
    //           color2 = 'hsl(' + color + ',100%,80%)';
    //         }
    //         ctx.globalAlpha = 0.2;
    //         ctx.fillStyle = b.bc;
    //         ctx.fillRect(0, 0, w, h);
    //         ctx.fillStyle = color2;
    //         y.push({
    //           x: cx,
    //           y: cy,
    //           xv: 2,
    //           yv: 1,
    //           o: 1
    //         });

    //         for (var i = 0; i < y.length; i++) {
    //           y[i].o -= b.o / 10;
    //           ctx.globalAlpha = y[i].o;
    //           y[i].x += (Math.random() - .5) * 4;
    //           y[i].y -= 1;
    //           ctx.fillRect(y[i].x, y[i].y, 2, 2);
    //           if (y[i].o <= 0) {
    //             y.splice(i, 1);
    //             i--;
    //           };
    //         }
    //       }
    //       window.requestAnimationFrame(begin);
    //     }
    //     function re() {
    //       w = window.innerWidth;
    //       h = window.innerHeight;
    //       canvas.width = w;
    //       canvas.height = h;
    //       cx = w / 2;
    //       cy = h / 2;
    //     };
    //     c.onmousemove = function(e){
    //         cx = e.pageX - c.offsetLeft;
    //         cy = e.pageY - c.offsetTop;
    //     }
    //     begin();
  }

  getContext() {
    const { location, breadcrumbNameMap } = this.props;
    return {
      location,
      breadcrumbNameMap,
    };
  }

  getLayoutStyle = () => {
    const { fixSiderbar, isMobile, collapsed, layout } = this.props;
    if (fixSiderbar && layout !== 'topmenu' && !isMobile) {
      return {
        paddingLeft: collapsed ? '80px' : '256px',
      };
    }
    return null;
  };

  handleMenuCollapse = collapsed => {
    const { dispatch } = this.props;
    dispatch({
      type: 'global/changeLayoutCollapsed',
      payload: collapsed,
    });
  };

  renderSettingDrawer = () => {
    // Do not render SettingDrawer in production
    // unless it is deployed in preview.pro.ant.design as demo
    if (process.env.NODE_ENV === 'production' && APP_TYPE !== 'site') {
      return null;
    }
    return <SettingDrawer />;
  };

  render() {
    const {
      navTheme,
      layout: PropsLayout,
      children,
      location: { pathname },
      isMobile,
      menuData,
      breadcrumbNameMap,
      fixedHeader,
    } = this.props;
    if(window.location.pathname.indexOf('dashboard/analysis')>-1){

    }
    const isTop = PropsLayout === 'topmenu';
    const contentStyle = !fixedHeader ? { paddingTop: 0 } : {};
    const layout = (
      <Layout>
        {isTop && !isMobile ? null : (
          <SiderMenu
            logo={logo}
            theme={navTheme}
            onCollapse={this.handleMenuCollapse}
            menuData={menuData}
            isMobile={isMobile}
            {...this.props}
          />
        )}
        <Layout
          style={{
            ...this.getLayoutStyle(),
            minHeight: '100vh',
          }}
        >
          <Header
            menuData={menuData}
            handleMenuCollapse={this.handleMenuCollapse}
            logo={logo}
            isMobile={isMobile}
            {...this.props}
          />
          {
           window.location.pathname.indexOf('form')>-1|| window.location.pathname.indexOf('dashboard/analysis')>-1?
            <Content className={styles.content1} style={contentStyle}>
             {children}
            
          </Content>:
          <Content className={styles.content} style={contentStyle}>
           {children}
        </Content>
          }
          
          <Footer />
        </Layout>
      </Layout>
    );
    return (
      <React.Fragment>
        <DocumentTitle title={getPageTitle(pathname, breadcrumbNameMap)}>
          <ContainerQuery query={query}>
            {params => (
              <Context.Provider value={this.getContext()}>
                <div className={classNames(params)}>{layout}</div>
              </Context.Provider>
            )}
          </ContainerQuery>
        </DocumentTitle>
        <Suspense fallback={null}>{this.renderSettingDrawer()}</Suspense>
      </React.Fragment>
    );
  }
}

export default connect(({ global, setting, menu: menuModel }) => ({
  collapsed: global.collapsed,
  layout: setting.layout,
  menuData: menuModel.menuData,
  breadcrumbNameMap: menuModel.breadcrumbNameMap,
  ...setting,
}))(props => (
  <Media query="(max-width: 599px)">
    {isMobile => <BasicLayout {...props} isMobile={isMobile} />}
  </Media>
));
