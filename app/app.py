import uuid
from flask_cors import CORS
from flask import Flask, request, jsonify, render_template
from qiniu import Auth

# 设置跨域域名
allow_origin = '127.0.0.1:8081'

# 密钥 如下
access_key = "ak"
secret_key = "sk"

# 空间名和空间外链
bucket_name = 'vue-upload'
bucket_domian = 'http://oz6lwq4hy.bkt.clouddn.com'

# token 过期时间
token_expire_time = 3600

# 构建鉴权对象
auth = Auth(access_key, secret_key)

app = Flask(__name__)

# 注意设置跨域域名
CORS(app, resources={r"/qiniu/token": {"Access-Control-Allow-Origin": allow_origin}})

@app.route('/', methods=['GET'])
def index():
    return render_template('index.html')

@app.route('/qiniu/token', methods=['POST'])
def get_upload_token():
    values = request.get_json()
    required = ['suffix']
    if not all(k in values for k in required):
        return 'Missing values', 200
    key = str(uuid.uuid4()).replace('-', '') + '.' + values['suffix']
    response_data = {
        "token": auth.upload_token(bucket_name, key, token_expire_time),
        "key": key,
        "url": bucket_domian + "/" + key,
        "expire": token_expire_time
    }
    return jsonify(response_data), 200


if __name__ == '__main__':
    app.run()
