(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[2],{BOD2:function(e,t,a){e.exports={container:"antd-pro-layouts-user-layout-container",lang:"antd-pro-layouts-user-layout-lang",content:"antd-pro-layouts-user-layout-content",top:"antd-pro-layouts-user-layout-top",header:"antd-pro-layouts-user-layout-header",logo:"antd-pro-layouts-user-layout-logo",title:"antd-pro-layouts-user-layout-title",desc:"antd-pro-layouts-user-layout-desc"}},jH8a:function(e,t,a){"use strict";a.r(t);var n=a("2Taf"),r=a.n(n),o=a("vZ4D"),l=a.n(o),s=a("l4Ni"),u=a.n(s),c=a("ujKo"),i=a.n(c),m=a("MhPg"),p=a.n(m),y=(a("Pwec"),a("CtXQ")),d=a("q1tI"),h=a.n(d),g=a("Y2fQ"),f=a("MuoO"),b=a("mOP9"),v=a("ggcP"),E=a("ZFw/"),N=a.n(E),k=a("bfXr"),M=a("BOD2"),D=a.n(M),O=a("mxmt"),w=a.n(O),j=a("tGQQ"),P=[{key:"help",title:Object(g["formatMessage"])({id:"layout.user.link.help"}),href:""},{key:"privacy",title:Object(g["formatMessage"])({id:"layout.user.link.privacy"}),href:""},{key:"terms",title:Object(g["formatMessage"])({id:"layout.user.link.terms"}),href:""}],Q=h.a.createElement(d["Fragment"],null,"Copyright ",h.a.createElement(y["a"],{type:"copyright"})," 2018 \u8682\u8681\u91d1\u670d\u4f53\u9a8c\u6280\u672f\u90e8\u51fa\u54c1"),C=function(e){function t(){return r()(this,t),u()(this,i()(t).apply(this,arguments))}return p()(t,e),l()(t,[{key:"componentDidMount",value:function(){var e=this.props,t=e.dispatch,a=e.route,n=a.routes,r=a.authority;t({type:"menu/getMenuData",payload:{routes:n,authority:r}})}},{key:"render",value:function(){var e=this.props,t=e.children,a=e.location.pathname,n=e.breadcrumbNameMap;return h.a.createElement(N.a,{title:Object(j["a"])(a,n)},h.a.createElement("div",{className:D.a.container},h.a.createElement("div",{className:D.a.lang},h.a.createElement(k["a"],null)),h.a.createElement("div",{className:D.a.content},h.a.createElement("div",{className:D.a.top},h.a.createElement("div",{className:D.a.header},h.a.createElement(b["a"],{to:"/"},h.a.createElement("img",{alt:"logo",className:D.a.logo,src:w.a}),h.a.createElement("span",{className:D.a.title},"Ant Design"))),h.a.createElement("div",{className:D.a.desc},"Ant Design \u662f\u897f\u6e56\u533a\u6700\u5177\u5f71\u54cd\u529b\u7684 Web \u8bbe\u8ba1\u89c4\u8303")),t),h.a.createElement(v["a"],{links:P,copyright:Q})))}}]),t}(d["Component"]);t["default"]=Object(f["connect"])(function(e){var t=e.menu;return{menuData:t.menuData,breadcrumbNameMap:t.breadcrumbNameMap}})(C)}}]);