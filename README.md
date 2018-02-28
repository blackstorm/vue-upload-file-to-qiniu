文章地址 [Vue 2 上传图片或文件到七牛][1]

# How to use

## flask app

提供直传七牛 token 支持。

进入 ``app`` 根目录下，执行相关命令。

1. 安装依赖

```shell
pip3 install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
```

2. 运行

```shell
python3 app.py
```

默认端口 ``5000``

### 使用 Docker

```shell
docker build -t blackstorm/flaskapp .
docker run --name app -it -p 5000:500 blackstorm/flaskapp
```

## vue

这里是我们的前端项目。

1. 安装依赖运行

如果您使用的是 ``yarn``

```shell
yarn install && yarn run dev
```

或者 ``npm``

```shell
npm install && npm run dev
```

默认端口 ``8081``

  [1]: https://utf-8.live/fe/vue2-upload-file-to-qiniu.html