FROM python:3-alpine

# 设置时区并创建工作目录
RUN echo "http://mirrors.aliyun.com/alpine/v3.4/main/" > /etc/apk/repositories && \
    apk update && apk add ca-certificates && \
    apk add tzdata && \
    ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime && \
    echo "Asia/Shanghai" > /etc/timezone && \
    rm -r /var/cache/apk && \
    rm -r /usr/share/man && \
    mkdir -p /var/www

COPY requirements.txt /var/www/requirements.txt
COPY app.py /var/www/app.py

WORKDIR /var/www

RUN pip3 install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple

CMD [ "python3", "app.py" ]