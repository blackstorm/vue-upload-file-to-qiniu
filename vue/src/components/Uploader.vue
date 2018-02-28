<template>
  <div class="uploader">
    <!--上传成功的图片-->
    <div class="success-images" v-if="successImages != null && successImages.length > 0">
      <!-- <img v-for="(image, index) in successImages" :src="image" :key="index" /> -->
      <p>上传列表</p>
      <ul>
        <li v-for="(image, index) in successImages" :key="index"><p>{{image}}</p></li>
      </ul>
    </div>
    
    <!-- 提示错误信息 -->
    <p class="error-color" v-if="error != null">错误信息：{{error}}</p>
    
    <!-- 标题 -->
    <h1>{{msg}}</h1>

    <!-- 预览窗口 -->
    <div class="preview" v-if="file.size != null">
        <img id="image" />
        <h3>文件大小：{{file.size / 1024}} KB</h3>
        <h3>文件类型：{{file.type}}</h3>
    </div>
    
    <!-- 上传窗口 -->
    <input type="checkbox" v-model="autoUpload">
    <label style="font-size:14px;padding-right:1rem;">自动上传</label>
    <input type="file" accept="image/*" name="file" @change="fileInputOnChange($event)" />
    <button v-if="!autoUpload" @click="uploadButtonOnClick()" :disabled="file.size != null && buttonAvailable ? null :'disabled'">上传</button>
  </div>
</template>

<script>
import url from '../api';

export default {
  name: 'Uploader',
  data() {
    return {
      msg: 'Vue 上传文件到七牛',
      error: null,
      // 按钮可用状态
      buttonAvailable: true,
      // 自动上传
      autoUpload: false,
      file: {
        self: null,
        size: null,
        type: null,
        suffix: null,
      },
      // 服务器返回的令牌和一些信息
      serverToken: {
        token: null,
        expire: null,
        key: null,
        url: null,
      },
      successImages: [],
    };
  },
  methods: {
    // 上传按钮被点击
    uploadButtonOnClick() {
      // 临时禁用上传按钮
      this.buttonAvailable = false;
      // 申请 token 成功回调
      const okCallBack = function (data) {
        this.serverToken = data;
        // 上传到七牛
        this.uploadFileToQiniu();
      };
      // 申请 token 失败回调
      const failCallBack = function (message) {
        this.buttonAvailable = true;
        this.error = message;
      };
      // 获取上传 token
      this.applyUploadToken(this.file.suffix, okCallBack.bind(this), failCallBack.bind(this));
    },
    fileInputOnChange(event) {
      const el = event.currentTarget;
      const file = el.files[0];

      // 判断用户是否选择文件
      if (file != null) {
        // 显示预览
        this.showPreview = true;
        this.file = {
          self: file,
          size: file.size,
          type: file.type,
          suffix: file.name.substring((file.name.lastIndexOf('.') + 1), file.name.length).toLowerCase(),
        };
        this.previewImage(file);

        // 判断自动上传
        if (this.autoUpload) {
          this.uploadButtonOnClick();
        }
      } else {
        this.reset();
      }
    },
    // 恢复默认
    reset() {
      this.file = {
        self: null,
        size: null,
        type: null,
        suffix: null,
      };
      this.error = null;
      this.buttonAvailable = true;
    },
    // 预览图片
    previewImage(file) {
      if (window.FileReader) {
        const fileReader = new FileReader();
        fileReader.onloadend = function (e) {
          const image = document.querySelector('.preview #image');
          image.src = e.target.result;
        };
        fileReader.readAsDataURL(file);
      } else {
        console.warn('不支持 FileReader');
      }
    },
    // 申请上传 token
    applyUploadToken(fileSuffixName, successCallBack, errorCallBack) {
      const requestData = {
        suffix: fileSuffixName,
      };
      // 请求api
      this.$http.post(url.APPLY_QINIUUPLOADTOKEN_API, requestData).then((response) => {
        if (response.status === 200) {
          // 回调
          successCallBack(response.data);
        } else {
          errorCallBack('向服务器请求上传 token 失败');
        }
      }, () => {
        errorCallBack('检查您的网络连接');
      });
    },
    uploadFileToQiniu() {
      if (this.file.self != null) {
        console.log('uploadFileToQiniu');
        // 构建表单
        const formData = new FormData();
        formData.append('token', this.serverToken.token);
        formData.append('file', this.file.self);
        formData.append('key', this.serverToken.key);
        // 上传
        this.axios({
          method: 'post',
          url: url.QINIU_UPLOAD_HTTPS_API,
          // 注意：请求头设置（必须！）
          headers: { 'Content-Type': 'multipart/form-data' },
          data: formData,
        }).then((response) => {
          if (response.status === 200) {
            console.log(response);
            this.successImages.push(this.serverToken.url);
            this.reset();
          }
        }, () => {
          this.error = '上传文件到七牛异常';
        });
      } else {
        this.error = '上传文件到七牛异常';
      }
    },
  },
};
</script>


<style scoped>
.success-images ul{
  list-style: none;
  font-size: 14px;
}
.success-images ul li p {
  margin: 7px 0px;
}
.uploader .preview {
  margin-bottom: 20px;
}

.preview #image {
  max-width: 500px;
  max-height: 400px;
  overflow: hidden;
}

.uploader .error-color {
  color:red;
}

.uploader button, .uploader input {
  outline: none;
}

.uploader button {
  border-radius: 4px;
  cursor: pointer;
}
</style>
