(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/my/my"],{"491e":function(n,e,t){"use strict";var r=t("4ce1"),a=t.n(r);a.a},"4ce1":function(n,e,t){},"589c":function(n,e,t){"use strict";var r;t.d(e,"b",(function(){return a})),t.d(e,"c",(function(){return u})),t.d(e,"a",(function(){return r}));var a=function(){var n=this,e=n.$createElement;n._self._c},u=[]},"8a39":function(n,e,t){"use strict";(function(n){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r=u(t("a34a")),a=u(t("d9ae"));u(t("5614"));function u(n){return n&&n.__esModule?n:{default:n}}function o(n,e,t,r,a,u,o){try{var c=n[u](o),i=c.value}catch(f){return void t(f)}c.done?e(i):Promise.resolve(i).then(r,a)}function c(n){return function(){var e=this,t=arguments;return new Promise((function(r,a){var u=n.apply(e,t);function c(n){o(u,r,a,c,i,"next",n)}function i(n){o(u,r,a,c,i,"throw",n)}c(void 0)}))}}var i={data:function(){return{avatarUrl:"",nickName:"",userInfo:null}},onLoad:function(){var n=this;return c(r.default.mark((function e(){return r.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,a.default.login();case 2:n.userInfo=e.sent,console.log(n.userInfo),n.avatarUrl=n.userInfo.avatarUrl||"/static/icon_dog.jpg",n.nickName=n.userInfo.nickName||"Hello";case 6:case"end":return e.stop()}}),e)})))()},methods:{test:function(){},updateUserProfile:function(){var e=this;""===this.userInfo.avatarUrl&&n.getUserProfile({desc:"用于完善会员资料",success:function(n){e.userInfo=Object.assign(e.userInfo,n.userInfo),e.avatarUrl=e.userInfo.avatarUrl||"/static/icon_dog.jpg",e.nickName=e.userInfo.nickName||"Hello",a.default.updateUserInfo(e.userInfo)}})}}};e.default=i}).call(this,t("543d")["default"])},"8d90":function(n,e,t){"use strict";t.r(e);var r=t("8a39"),a=t.n(r);for(var u in r)"default"!==u&&function(n){t.d(e,n,(function(){return r[n]}))}(u);e["default"]=a.a},aab8:function(n,e,t){"use strict";(function(n){t("9ebf");r(t("66fd"));var e=r(t("b379"));function r(n){return n&&n.__esModule?n:{default:n}}wx.__webpack_require_UNI_MP_PLUGIN__=t,n(e.default)}).call(this,t("543d")["createPage"])},b379:function(n,e,t){"use strict";t.r(e);var r=t("589c"),a=t("8d90");for(var u in a)"default"!==u&&function(n){t.d(e,n,(function(){return a[n]}))}(u);t("491e");var o,c=t("f0c5"),i=Object(c["a"])(a["default"],r["b"],r["c"],!1,null,null,null,!1,r["a"],o);e["default"]=i.exports}},[["aab8","common/runtime","common/vendor"]]]);