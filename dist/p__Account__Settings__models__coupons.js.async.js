(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[7],{doxu:function(e,n,a){"use strict";a.r(n);var t=a("p0pE"),s=a.n(t),o=a("d6i3"),c=a.n(o),p=a("bxm5");n["default"]={namespace:"coupons",state:{isLoading:!1,couponsData:[]},effects:{fetch:c.a.mark(function e(n,a){var t,s,o;return c.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t=a.call,s=a.put,e.next=3,t(p["a"]);case 3:return o=e.sent,e.next=6,s({type:"saveCoupons",payload:o});case 6:case"end":return e.stop()}},e)})},reducers:{saveCoupons:function(e,n){return s()({},e,{couponsData:n.payload})}}}}}]);