webpackJsonp([1],{"/0ox":function(e,t,n){"use strict";var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("Uploader")],1)},i=[],s={render:a,staticRenderFns:i};t.a=s},"/iIO":function(e,t){},"2NuV":function(e,t){},M93x:function(e,t,n){"use strict";function a(e){n("/iIO")}var i=n("xJD8"),s=n("/0ox"),l=n("VU/8"),o=a,u=l(i.a,s.a,!1,o,null,null);t.a=u.exports},NHnr:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n("7+uW"),i=n("mtWM"),s=n.n(i),l=n("Rf8U"),o=n.n(l),u=n("M93x");a.a.use(o.a,s.a),a.a.config.productionTip=!1,new a.a({el:"#app",template:"<App/>",components:{App:u.a}})},gyMJ:function(e,t,n){"use strict";var a=void 0;a="http://127.0.0.1:5000/qiniu/token",t.a={APPLY_QINIUUPLOADTOKEN_API:a,QINIU_UPLOAD_HTTP_API:"http://up.qiniu.com",QINIU_UPLOAD_HTTPS_API:"https://up.qbox.me"}},mXEl:function(e,t,n){"use strict";var a=n("gyMJ");t.a={name:"Uploader",data:function(){return{msg:"Vue 上传文件到七牛",error:null,buttonAvailable:!0,autoUpload:!1,file:{self:null,size:null,type:null,suffix:null},serverToken:{token:null,expire:null,key:null,url:null},successImages:[]}},methods:{uploadButtonOnClick:function(){this.buttonAvailable=!1;var e=function(e){this.serverToken=e,this.uploadFileToQiniu()},t=function(e){this.buttonAvailable=!0,this.error=e};this.applyUploadToken(this.file.suffix,e.bind(this),t.bind(this))},fileInputOnChange:function(e){var t=e.currentTarget,n=t.files[0];null!=n?(this.showPreview=!0,this.file={self:n,size:n.size,type:n.type,suffix:n.name.substring(n.name.lastIndexOf(".")+1,n.name.length).toLowerCase()},this.previewImage(n),this.autoUpload&&this.uploadButtonOnClick()):this.reset()},reset:function(){this.file={self:null,size:null,type:null,suffix:null},this.error=null,this.buttonAvailable=!0},previewImage:function(e){if(window.FileReader){var t=new FileReader;t.onloadend=function(e){document.querySelector(".preview #image").src=e.target.result},t.readAsDataURL(e)}else console.warn("不支持 FileReader")},applyUploadToken:function(e,t,n){var i={suffix:e};this.$http.post(a.a.APPLY_QINIUUPLOADTOKEN_API,i).then(function(e){200===e.status?t(e.data):n("向服务器请求上传 token 失败")},function(){n("检查您的网络连接")})},uploadFileToQiniu:function(){var e=this;if(null!=this.file.self){console.log("uploadFileToQiniu");var t=new FormData;t.append("token",this.serverToken.token),t.append("file",this.file.self),t.append("key",this.serverToken.key),this.axios({method:"post",url:a.a.QINIU_UPLOAD_HTTPS_API,headers:{"Content-Type":"multipart/form-data"},data:t}).then(function(t){200===t.status&&(console.log(t),e.successImages.push(e.serverToken.url),e.reset())},function(){e.error="上传文件到七牛异常"})}else this.error="上传文件到七牛异常"}}}},nsbK:function(e,t,n){"use strict";var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"uploader"},[null!=e.successImages&&e.successImages.length>0?n("div",{staticClass:"success-images"},[n("p",[e._v("上传列表")]),e._v(" "),n("ul",e._l(e.successImages,function(t,a){return n("li",{key:a},[n("p",[e._v(e._s(t))])])}))]):e._e(),e._v(" "),null!=e.error?n("p",{staticClass:"error-color"},[e._v("错误信息："+e._s(e.error))]):e._e(),e._v(" "),n("h1",[e._v(e._s(e.msg))]),e._v(" "),null!=e.file.size?n("div",{staticClass:"preview"},[n("img",{attrs:{id:"image"}}),e._v(" "),n("h3",[e._v("文件大小："+e._s(e.file.size/1024)+" KB")]),e._v(" "),n("h3",[e._v("文件类型："+e._s(e.file.type))])]):e._e(),e._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:e.autoUpload,expression:"autoUpload"}],attrs:{type:"checkbox"},domProps:{checked:Array.isArray(e.autoUpload)?e._i(e.autoUpload,null)>-1:e.autoUpload},on:{change:function(t){var n=e.autoUpload,a=t.target,i=!!a.checked;if(Array.isArray(n)){var s=e._i(n,null);a.checked?s<0&&(e.autoUpload=n.concat([null])):s>-1&&(e.autoUpload=n.slice(0,s).concat(n.slice(s+1)))}else e.autoUpload=i}}}),e._v(" "),n("label",{staticStyle:{"font-size":"14px","padding-right":"1rem"}},[e._v("自动上传")]),e._v(" "),n("input",{attrs:{type:"file",accept:"image/*",name:"file"},on:{change:function(t){e.fileInputOnChange(t)}}}),e._v(" "),e.autoUpload?e._e():n("button",{attrs:{disabled:null!=e.file.size&&e.buttonAvailable?null:"disabled"},on:{click:function(t){e.uploadButtonOnClick()}}},[e._v("上传")])])},i=[],s={render:a,staticRenderFns:i};t.a=s},uHkJ:function(e,t,n){"use strict";function a(e){n("2NuV")}var i=n("mXEl"),s=n("nsbK"),l=n("VU/8"),o=a,u=l(i.a,s.a,!1,o,"data-v-01a1d8e0",null);t.a=u.exports},xJD8:function(e,t,n){"use strict";var a=n("uHkJ");t.a={name:"app",components:{Uploader:a.a}}}},["NHnr"]);
//# sourceMappingURL=app.0eeb7fe86b0e28f333f9.js.map