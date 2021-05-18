(this["webpackJsonpacgam-react-app"]=this["webpackJsonpacgam-react-app"]||[]).push([[0],{177:function(e,t,n){},505:function(e,t,n){},539:function(e,t,n){"use strict";n.r(t);var c=n(29),r=n(2),a=n.n(r),i=n(50),s=n.n(i),o=n(114),u=n(28),l=n(80),j=n(12),d=n(172),b=n.n(d),O=n(267),p=n(20),f=n(14),h=n(41),x=n.n(h),v=n(4),m=function(e){var t=e.userState,n=e.signOut;return Object(v.jsxs)("div",{children:[Object(v.jsxs)("div",{children:["Hello, ",t.name,"."]}),Object(v.jsx)("button",{onClick:n,children:"Sign Out"})]})},g=n(268),S=n.n(g),y=(n(446),function(e){var t=e.setBodyState,n=Object(r.useRef)(""),c=Object(r.useState)(new Date),a=Object(p.a)(c,2),i=a[0],s=a[1];return Object(v.jsxs)("div",{children:[Object(v.jsxs)("div",{children:[Object(v.jsx)("input",{type:"text",ref:n,placeholder:"enter event name"}),Object(v.jsx)(S.a,{selected:i,onChange:function(e){return s(e)}}),Object(v.jsx)("button",{type:"submit",onClick:function(e){var t,c;e.preventDefault(),t="/private/event/add",c={startDate:i,eventName:n.current.value},x.a.post(t,JSON.stringify(c),{headers:{"Content-Type":"application/JSON"}}).then((function(){console.log("POST JSON request sent")})).catch((function(e){console.log("POST JSON unable to send request")}))},children:"Add"})]}),Object(v.jsx)("button",{onClick:function(){return t("root")},children:"Back"})]})}),C=n(271),T=n.n(C),w=function(e){var t=e.setBodyState,n=function(e){x()({method:"get",url:"/private/csv-template/".concat(e),responseType:"blob"}).then((function(t){T()(t.data,"".concat(e,".csv"))}))};return Object(v.jsxs)("div",{children:[Object(v.jsxs)("div",{children:[Object(v.jsx)("button",{onClick:function(){return n("coordinators")},children:"Download coordinators CSV Template"}),Object(v.jsx)("button",{onClick:function(){return n("participants")},children:"Download participants CSV Template"}),Object(v.jsx)("button",{onClick:function(){return n("winners")},children:"Download winners CSV Template"})]}),Object(v.jsx)("div",{children:Object(v.jsx)("button",{onClick:function(){return t("eventAdd")},children:"Add an Event"})}),Object(v.jsx)("div",{children:Object(v.jsx)("button",{onClick:function(){return t("sendCerts")},children:"Mail Certificates"})})]})},k=function(e){var t=e.setBodyState,n=Object(r.useRef)(null),c=Object(r.useRef)(null),a=Object(r.useRef)(null),i=Object(r.useRef)(null),s=Object(r.useState)(null),o=Object(p.a)(s,2),u=o[0],l=o[1],j=Object(r.useState)(!0),d=Object(p.a)(j,2),b=d[0],O=d[1],f=Object(r.useState)(0),h=Object(p.a)(f,2),m=h[0],g=h[1],S=Object(r.useState)(null),y=Object(p.a)(S,2),C=y[0],T=y[1];Object(r.useEffect)((function(){x.a.get("private/event/fetch-all").then((function(e){l(e.data),O(!1)})).catch((function(e){console.log("Error occurred"+e)}))}),[]);return Object(v.jsxs)("div",{children:[Object(v.jsxs)("form",{onSubmit:function(e){e.preventDefault(),null===a.current.files[0]&&g(1),g(0);var t=new FormData;t.append("eventID",n.current.value),t.append("templateType",c.current.value),t.append("recipientType",i.current.value),t.append("file",a.current.files[0]),x.a.post("/private/send",t).then((function(e){switch(e.status){case 415:case 500:T(e.data);break;default:T(null)}})).catch((function(e){console.log("error occurred while sending form")}))},children:[Object(v.jsxs)("label",{children:["Choose the event:",Object(v.jsx)("select",{ref:n,name:"eventName",disabled:b,children:null!==u?u.map((function(e){return Object(v.jsx)("option",{value:e.id,children:e.eventName},e.id)})):Object(v.jsx)("option",{children:"loading"})})]}),Object(v.jsxs)("label",{children:["Choose a Template:",Object(v.jsxs)("select",{ref:c,name:"templateName",children:[Object(v.jsx)("option",{value:"SB Template",children:"SB Template"}),Object(v.jsx)("option",{value:"CS Template",children:"CS Template"}),Object(v.jsx)("option",{value:"IAS Template",children:"IAS Template"}),Object(v.jsx)("option",{value:"WIE Template",children:"WIE Template"})]})]}),Object(v.jsxs)("label",{children:["Certificate for:",Object(v.jsxs)("select",{ref:i,name:"recipientType",children:[Object(v.jsx)("option",{value:"Coordinators",children:"Coordinators"}),Object(v.jsx)("option",{value:"Volunteers",children:"Volunteers"}),Object(v.jsx)("option",{value:"Participants",children:"Participants"}),Object(v.jsx)("option",{value:"Winners",children:"Winners"})]})]}),Object(v.jsxs)("label",{children:[Object(v.jsx)("input",{type:"file",name:"uploadedFile",ref:a,onChange:function(){g(0),console.log(a.current.files[0].type),["text/csv","text/comma-separated-values","application/csv"].includes(a.current.files[0].type)||(g(2),a.current.value="")}}),Object(v.jsx)("p",{children:2===m?"Unsupported file format":null})]}),C?Object(v.jsx)("p",{children:"CSV File Poorly formatted"}):null,Object(v.jsx)("input",{type:"submit",name:"Send",disabled:[1,2].includes(m)})]}),Object(v.jsx)("button",{onClick:function(){return t("root")},children:"Back"})]})},I=function(){var e=Object(r.useState)("root"),t=Object(p.a)(e,2),n=t[0],c=t[1];return"eventAdd"===n?Object(v.jsx)(y,{setBodyState:c}):"root"===n?Object(v.jsx)(w,{setBodyState:c}):Object(v.jsx)(k,{setBodyState:c})},E=function(){var e=Object(u.c)((function(e){return e.firebase.auth}));Object(f.useFirestoreConnect)({collection:"users",doc:e.uid});var t=Object(j.g)(),n=Object(f.useFirebase)(),c=Object(u.c)((function(e){return e.firestore})),a=Object(r.useState)({name:"",role:"",picture:""}),i=Object(p.a)(a,2),s=i[0],o=i[1];Object(r.useEffect)((function(){if(console.log("insiude useEffect"),c&&c.data&&c.data.users&&c.data.users[e.uid]){var t=c.data.users[e.uid];o({name:t.name,role:t.role,picture:t.picture})}}),[]),x.a.interceptors.request.use(function(){var e=Object(O.a)(b.a.mark((function e(t){return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,n.auth().currentUser.getIdToken();case 2:return t.headers.idToken=e.sent,e.abrupt("return",t);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),(function(e){return Promise.reject(e)})),Object(f.useFirestoreConnect)({collection:"users",doc:e.uid});return Object(v.jsxs)("div",{children:[Object(v.jsx)(m,{userState:s,signOut:function(){n.logout().then((function(){t.push("/login")})).catch((function(e){}))}}),Object(v.jsx)(I,{})]})},D=function(){return Object(v.jsx)(E,{})},B=n(177),F=n.n(B),N=function(){var e=Object(r.useState)(!1),t=Object(p.a)(e,2),n=t[0],c=t[1],a=Object(r.useState)(null),i=Object(p.a)(a,2),s=i[0],o=i[1],l=Object(r.useRef)(null),d=Object(r.useRef)(null),b=Object(j.g)(),O=Object(f.useFirebase)();Object(u.c)((function(e){return e.firebase.auth}));return Object(v.jsxs)("div",{className:F.a.container,children:[Object(v.jsx)("div",{className:F.a.loginTextHeader,children:"Login"}),Object(v.jsx)("input",{type:"text",ref:l,placeholder:"email",required:!0}),Object(v.jsx)("input",{type:"password",ref:d,placeholder:"password",required:!0}),Object(v.jsx)("div",{children:s}),Object(v.jsx)("button",{disabled:n,onClick:function(e){return function(e){e.preventDefault(),c(!0),O.login({email:"vishnumohanantheking@gmail.com",password:"hellohello123"}).then((function(e){b.push("/")})).catch((function(e){o(e),l.current.value="",d.current.value="",c(!1)}))}(e)},children:"Log In"})]})},A=function(){return Object(v.jsx)(N,{})},R=(n(505),function(){return Object(v.jsx)("div",{children:"error 404 Not found"})}),P=n(178),V=function(e){var t=e.children,n=Object(P.a)(e,["children"]),r=Object(u.c)((function(e){return e.firebase.auth}));return console.log(Object(f.isLoaded)(r)?"Auth is loaded":"auth is not loaded"),console.log(Object(f.isEmpty)(r)?"user is not authenticated":"User is authenticated"),Object(v.jsx)(j.b,Object(c.a)(Object(c.a)({},n),{},{render:function(){return Object(f.isLoaded)(r)?(console.log("reached here"),Object(f.isEmpty)(r)?Object(v.jsx)(j.a,{to:"/login"}):t):Object(v.jsx)("div",{children:"loading"})}}))},J=function(e){var t=e.children,n=Object(P.a)(e,["children"]),r=Object(u.c)((function(e){return e.firebase.auth}));return console.log(Object(f.isLoaded)(r)?"Auth is loaded":"auth is not loaded"),console.log(Object(f.isEmpty)(r)?"user is not authenticated":"User is authenticated"),Object(v.jsx)(j.b,Object(c.a)(Object(c.a)({},n),{},{render:function(){return Object(f.isLoaded)(r)?Object(f.isEmpty)(r)?t:Object(v.jsx)(j.a,{to:"/"}):Object(v.jsx)("div",{children:"loading"})}}))},L=n(83);n(506),n(544);L.a.initializeApp({apiKey:"AIzaSyAtgVeRMwtPBwZ8fwtnVyVF4MlQnQ4KX6Q",authDomain:"acgam-ieeecs.firebaseapp.com",projectId:"acgam-ieeecs",storageBucket:"acgam-ieeecs.appspot.com",messagingSenderId:"393652456887",appId:"1:393652456887:web:0adbc8ff570f03f8006c32",measurementId:"G-0JXMYVLTSD"}),L.a.auth(),L.a.firestore();var U=L.a;var q=function(){var e=Object(u.b)();return Object(r.useEffect)((function(){U.auth().onAuthStateChanged((function(t){e({type:"SET_UID",uid:t?t.uid:null})}))}),[]),Object(v.jsx)(l.a,{children:Object(v.jsxs)(j.d,{children:[Object(v.jsx)(V,{exact:!0,path:"/",children:Object(v.jsx)(j.b,{component:D})}),Object(v.jsx)(J,{path:"/login",children:Object(v.jsx)(j.b,{component:A})}),Object(v.jsx)(j.b,{component:R})]})})},M=n(112),W={uid:null},Q=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:W,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SET_UID":return Object(c.a)(Object(c.a)({},e),{},{uid:t.uid});default:return Object(c.a)({},e)}},z=Object(o.a)({auth:Q,firebase:f.firebaseReducer,firestore:M.firestoreReducer}),H=function(){try{var e=localStorage.getItem("state");if(null===e)return;return JSON.parse(e)}catch(t){}}(),K=Object(o.b)(z,H);K.subscribe((function(){return function(e){try{var t=JSON.stringify(e);return localStorage.setItem("state",t),e}catch(n){}}(K.getState())}));var X={firebase:U,config:{userProfile:"users",useFirestoreForProfile:!0},dispatch:K.dispatch,createFirestoreInstance:M.createFirestoreInstance};s.a.render(Object(v.jsx)(u.a,{store:K,children:Object(v.jsx)(f.ReactReduxFirebaseProvider,Object(c.a)(Object(c.a)({},X),{},{children:Object(v.jsx)(a.a.StrictMode,{children:Object(v.jsx)(q,{})})}))}),document.getElementById("root"))}},[[539,1,2]]]);
//# sourceMappingURL=main.3a1a2d60.chunk.js.map