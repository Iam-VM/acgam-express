(this["webpackJsonpacgam-react-app"]=this["webpackJsonpacgam-react-app"]||[]).push([[0],{191:function(e,t,n){},563:function(e,t,n){},597:function(e,t,n){"use strict";n.r(t);var c=n(29),r=n(1),a=n.n(r),i=n(55),s=n.n(i),o=n(124),u=n(28),l=n(88),j=n(12),d=n(186),b=n.n(d),O=n(295),p=n(13),h=n(15),f=n(47),v=n.n(f),x=n(4),m=function(e){var t=e.userState,n=e.signOut;return Object(x.jsxs)("div",{children:[Object(x.jsxs)("div",{children:["Hello, ",t.name,"."]}),Object(x.jsx)("button",{onClick:n,children:"Sign Out"})]})},S=n(296),g=n.n(S),y=(n(475),function(e){var t=e.setBodyState,n=Object(r.useRef)(""),c=Object(r.useState)(new Date),a=Object(p.a)(c,2),i=a[0],s=a[1],o=Object(r.useState)(!1),u=Object(p.a)(o,2),l=u[0],j=u[1],d=Object(r.useState)(null),b=Object(p.a)(d,2),O=b[0],h=b[1],f=Object(r.useState)(!0),m=Object(p.a)(f,2),S=m[0],y=m[1];return Object(x.jsxs)("div",{children:[Object(x.jsxs)("div",{children:[Object(x.jsx)("input",{type:"text",ref:n,placeholder:"enter event name"}),Object(x.jsx)(g.a,{selected:i,onChange:function(e){return s(e)}}),l?Object(x.jsx)("div",{children:"Loading"}):!1===S?Object(x.jsx)("div",{children:"Sorry, Couldn't reach server.. !!"}):!0===O?Object(x.jsx)("div",{children:"Event Added Successfully"}):!1===O?Object(x.jsx)("div",{children:"Event not added, there was some issues."}):null,Object(x.jsx)("button",{type:"submit",onClick:function(e){e.preventDefault();j(!0),v.a.post("/private/event/add",JSON.stringify({startDate:i,eventName:n.current.value}),{headers:{"Content-Type":"application/JSON"}}).then((function(e){j(!1),200===e.status?h(!0):h(!1)})).catch((function(e){j(!1),y(!1)}))},children:"Add"})]}),Object(x.jsx)("button",{onClick:function(){return t("root")},children:"Back"})]})}),C=n(299),T=n.n(C),k=function(e){var t=e.setBodyState,n=function(e){v()({method:"get",url:"/private/csv-template/".concat(e),responseType:"blob"}).then((function(t){T()(t.data,"".concat(e,".csv"))}))};return Object(x.jsxs)("div",{children:[Object(x.jsxs)("div",{children:[Object(x.jsx)("button",{onClick:function(){return n("coordinators")},children:"Download coordinators CSV Template"}),Object(x.jsx)("button",{onClick:function(){return n("participants")},children:"Download participants CSV Template"}),Object(x.jsx)("button",{onClick:function(){return n("winners")},children:"Download winners CSV Template"})]}),Object(x.jsx)("div",{children:Object(x.jsx)("button",{onClick:function(){return t("eventAdd")},children:"Add an Event"})}),Object(x.jsx)("div",{children:Object(x.jsx)("button",{onClick:function(){return t("sendCerts")},children:"Mail Certificates"})})]})},w=n(300),I=n.n(w),B=function(e){var t=e.setBodyState;return Object(x.jsxs)("div",{children:[Object(x.jsx)("div",{children:"Sorry, Couldn't reach server !!"}),Object(x.jsx)("button",{onClick:function(){return t("root")},children:"Back"})]})},E=function(e){var t=e.socket,n=Object(r.useState)(null),c=Object(p.a)(n,2),a=c[0],i=c[1];return Object(r.useEffect)((function(){t.on("log",(function(e){i(e)}))})),Object(x.jsxs)("div",{children:[Object(x.jsx)("div",{children:"Loading..."}),Object(x.jsx)("div",{children:a})]})},A=function(e){var t=e.setBodyState,n=Object(r.useRef)(null),c=Object(r.useRef)(null),a=Object(r.useRef)(null),i=Object(r.useState)([]),s=Object(p.a)(i,2),o=s[0],u=s[1],l=Object(r.useState)(null),j=Object(p.a)(l,2),d=j[0],b=j[1],O=Object(r.useState)(0),h=Object(p.a)(O,2),f=h[0],m=h[1],S=Object(r.useState)(null),g=Object(p.a)(S,2),y=g[0],C=g[1],T=Object(r.useState)(!0),k=Object(p.a)(T,2),w=k[0],A=k[1],D=Object(r.useState)(!0),P=Object(p.a)(D,2),F=P[0],W=P[1],N=I()("http://localhost:4000/");Object(r.useEffect)((function(){b(!0),v.a.get("private/event/fetch-all").then((function(e){200===e.status?(u(e.data),A(!0),b(!1)):(A(!1),b(!1))})).catch((function(e){console.log("get error"),W(!1),A(!1),b(!1)}))}),[]);return d?Object(x.jsx)(E,{socket:N}):F?w?Object(x.jsxs)("div",{children:[Object(x.jsxs)("form",{onSubmit:function(e){e.preventDefault(),null===a.current.files[0]&&m(1),m(0);var t=new FormData;t.append("eventID",n.current.value),t.append("templateType",c.current.value),t.append("file",a.current.files[0]),v.a.post("/private/send",t).then((function(e){switch(e.status){case 415:case 500:C(e.data);break;default:C(null)}})).catch((function(e){console.log("error occurred while sending form")}))},children:[Object(x.jsxs)("label",{children:["Choose the event:",Object(x.jsx)("select",{ref:n,name:"eventName",disabled:d,children:null!==o?o.map((function(e){return Object(x.jsx)("option",{value:e.id,children:e.eventName},e.id)})):Object(x.jsx)("option",{children:"loading"})})]}),Object(x.jsxs)("label",{children:["Choose a Template:",Object(x.jsxs)("select",{ref:c,name:"templateName",children:[Object(x.jsx)("option",{value:"SB Template - Coordinator",children:"SB Template - Coordinators"}),Object(x.jsx)("option",{value:"SB Template - Participants",children:"SB Template - Participants"}),Object(x.jsx)("option",{value:"SB Template - Volunteers",children:"SB Template - Volunteers"}),Object(x.jsx)("option",{value:"SB Template - Winners",children:"SB Template - Winners"}),Object(x.jsx)("option",{value:"CS Template - Participants",children:"CS Template - Participants"}),Object(x.jsx)("option",{value:"CS Template - Winners",children:"CS Template - Winners"}),Object(x.jsx)("option",{value:"IAS Template - Participants",children:"IAS Template - Participants"}),Object(x.jsx)("option",{value:"IAS Template - Winners",children:"IAS Template - Winners"}),Object(x.jsx)("option",{value:"WIE Template - Participants",children:"WIE Template - Participants"}),Object(x.jsx)("option",{value:"WIE Template - Winners",children:"WIE Template - Winners"})]})]}),Object(x.jsxs)("label",{children:[Object(x.jsx)("input",{type:"file",name:"uploadedFile",ref:a,onChange:function(){m(0),console.log(a.current.files[0].type),["text/csv","text/comma-separated-values","application/csv"].includes(a.current.files[0].type)||(m(2),a.current.value="")}}),Object(x.jsx)("p",{children:2===f?"Unsupported file format":null})]}),y?Object(x.jsx)("p",{children:"CSV File Poorly formatted"}):null,Object(x.jsx)("input",{type:"submit",name:"Send",disabled:[1,2].includes(f)})]}),Object(x.jsx)("button",{onClick:function(){return t("root")},children:"Back"})]}):Object(x.jsx)("div",{children:"Sorry, there was a problem while fetching events!!"}):Object(x.jsx)(B,{setBodyState:t})},D=function(){var e=Object(r.useState)("root"),t=Object(p.a)(e,2),n=t[0],c=t[1];return"eventAdd"===n?Object(x.jsx)(y,{setBodyState:c}):"root"===n?Object(x.jsx)(k,{setBodyState:c}):Object(x.jsx)(A,{setBodyState:c})},P=function(){var e=Object(u.c)((function(e){return e.firebase.auth}));Object(h.useFirestoreConnect)({collection:"users",doc:e.uid});var t=Object(j.g)(),n=Object(h.useFirebase)(),c=Object(u.c)((function(e){return e.firestore})),a=Object(r.useState)({name:"",role:"",picture:""}),i=Object(p.a)(a,2),s=i[0],o=i[1];Object(r.useEffect)((function(){if(console.log("insiude useEffect"),c&&c.data&&c.data.users&&c.data.users[e.uid]){var t=c.data.users[e.uid];o({name:t.name,role:t.role,picture:t.picture})}}),[]),v.a.interceptors.request.use(function(){var e=Object(O.a)(b.a.mark((function e(t){return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,n.auth().currentUser.getIdToken();case 2:return t.headers.idToken=e.sent,e.abrupt("return",t);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),(function(e){return Promise.reject(e)})),Object(h.useFirestoreConnect)({collection:"users",doc:e.uid});return Object(x.jsxs)("div",{children:[Object(x.jsx)(m,{userState:s,signOut:function(){n.logout().then((function(){t.push("/login")})).catch((function(e){}))}}),Object(x.jsx)(D,{})]})},F=function(){return Object(x.jsx)(P,{})},W=n(191),N=n.n(W),R=function(){var e=Object(r.useState)(!1),t=Object(p.a)(e,2),n=t[0],c=t[1],a=Object(r.useState)(null),i=Object(p.a)(a,2),s=i[0],o=i[1],l=Object(r.useRef)(null),d=Object(r.useRef)(null),b=Object(j.g)(),O=Object(h.useFirebase)();Object(u.c)((function(e){return e.firebase.auth}));return Object(x.jsxs)("div",{className:N.a.container,children:[Object(x.jsx)("div",{className:N.a.loginTextHeader,children:"Login"}),Object(x.jsx)("input",{type:"text",ref:l,placeholder:"email",required:!0}),Object(x.jsx)("input",{type:"password",ref:d,placeholder:"password",required:!0}),Object(x.jsx)("div",{children:s}),Object(x.jsx)("button",{disabled:n,onClick:function(e){return function(e){e.preventDefault(),c(!0),O.login({email:"vishnumohanantheking@gmail.com",password:"hellohello123"}).then((function(e){b.push("/")})).catch((function(e){o(e),l.current.value="",d.current.value="",c(!1)}))}(e)},children:"Log In"})]})},V=function(){return Object(x.jsx)(R,{})},L=(n(563),function(){return Object(x.jsx)("div",{children:"error 404 Not found"})}),J=n(192),U=function(e){var t=e.children,n=Object(J.a)(e,["children"]),r=Object(u.c)((function(e){return e.firebase.auth}));return console.log(Object(h.isLoaded)(r)?"Auth is loaded":"auth is not loaded"),console.log(Object(h.isEmpty)(r)?"user is not authenticated":"User is authenticated"),Object(x.jsx)(j.b,Object(c.a)(Object(c.a)({},n),{},{render:function(){return Object(h.isLoaded)(r)?(console.log("reached here"),Object(h.isEmpty)(r)?Object(x.jsx)(j.a,{to:"/login"}):t):Object(x.jsx)("div",{children:"loading"})}}))},M=function(e){var t=e.children,n=Object(J.a)(e,["children"]),r=Object(u.c)((function(e){return e.firebase.auth}));return console.log(Object(h.isLoaded)(r)?"Auth is loaded":"auth is not loaded"),console.log(Object(h.isEmpty)(r)?"user is not authenticated":"User is authenticated"),Object(x.jsx)(j.b,Object(c.a)(Object(c.a)({},n),{},{render:function(){return Object(h.isLoaded)(r)?Object(h.isEmpty)(r)?t:Object(x.jsx)(j.a,{to:"/"}):Object(x.jsx)("div",{children:"loading"})}}))},q=n(91);n(564),n(602);q.a.initializeApp({apiKey:"AIzaSyAtgVeRMwtPBwZ8fwtnVyVF4MlQnQ4KX6Q",authDomain:"acgam-ieeecs.firebaseapp.com",projectId:"acgam-ieeecs",storageBucket:"acgam-ieeecs.appspot.com",messagingSenderId:"393652456887",appId:"1:393652456887:web:0adbc8ff570f03f8006c32",measurementId:"G-0JXMYVLTSD"}),q.a.auth(),q.a.firestore();var Q=q.a;var z=function(){var e=Object(u.b)();return Object(r.useEffect)((function(){Q.auth().onAuthStateChanged((function(t){e({type:"SET_UID",uid:t?t.uid:null})}))}),[]),Object(x.jsx)(l.a,{children:Object(x.jsxs)(j.d,{children:[Object(x.jsx)(U,{exact:!0,path:"/",children:Object(x.jsx)(j.b,{component:F})}),Object(x.jsx)(M,{path:"/login",children:Object(x.jsx)(j.b,{component:V})}),Object(x.jsx)(j.b,{component:L})]})})},H=n(122),K={uid:null},X=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:K,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SET_UID":return Object(c.a)(Object(c.a)({},e),{},{uid:t.uid});default:return Object(c.a)({},e)}},_=Object(o.a)({auth:X,firebase:h.firebaseReducer,firestore:H.firestoreReducer}),G=function(){try{var e=localStorage.getItem("state");if(null===e)return;return JSON.parse(e)}catch(t){}}(),Y=Object(o.b)(_,G);Y.subscribe((function(){return function(e){try{var t=JSON.stringify(e);return localStorage.setItem("state",t),e}catch(n){}}(Y.getState())}));var Z={firebase:Q,config:{userProfile:"users",useFirestoreForProfile:!0},dispatch:Y.dispatch,createFirestoreInstance:H.createFirestoreInstance};s.a.render(Object(x.jsx)(u.a,{store:Y,children:Object(x.jsx)(h.ReactReduxFirebaseProvider,Object(c.a)(Object(c.a)({},Z),{},{children:Object(x.jsx)(a.a.StrictMode,{children:Object(x.jsx)(z,{})})}))}),document.getElementById("root"))}},[[597,1,2]]]);
//# sourceMappingURL=main.b4b68cc3.chunk.js.map