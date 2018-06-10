Superman Console
================

-   mock数据放在：`/static/mock/`
-   请求路径：`/static/mock/xxx.json`

config
------

-   修改对应的后端环境`config/superman.json`

这里要特别注意，
`{     "proxy": [       {         "path": "/superman-web",         "target": "http://121.40.31.185:8888/"       }     ]   }`

所有的请求/superman-web的请求都会转向http://121.40.31.185:8888/superman-web

更多可以查看[proxy](doc/proxy.md)

-   修改请求context

修改在`superman-console\src\common\httpUtil.js`中默认的`superman-web`改成当前项目中后端的上下文

-   上述两步的名称必须保持一致

Build Setup
-----------

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build --production
```

启动成功后管理员用户密码admin/\*\*\*\*\*

注： 如果npm报`chromedriver`错误，请使用如下方式安装

``` bash
npm install chromedriver --chromedriver_cdnurl=http://cdn.npm.taobao.org/dist/chromedriver
```
