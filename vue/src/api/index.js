export default {
  // 注意运行后端：python3 app.py
  APPLY_QINIUUPLOADTOKEN_API: 'http://127.0.0.1:5000/qiniu/token',
  // 上传服务器域名，上传到华东一区的域名为up.qiniu.com、up-z0.qiniu.com和upload.qiniu.com
  // 上传到华北一区的域名为up-z1.qiniu.com和upload-z1.qiniu.com
  QINIU_UPLOAD_HTTP_API: 'http://up.qiniu.com',
  QINIU_UPLOAD_HTTPS_API: 'https://up.qiniu.com',
};
