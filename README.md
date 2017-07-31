# webapp

精融汇 移动端

## 主要的技术构架

    react + alt(flux的实现) + react-router + webpack  + bower + es6(babel)

-   react <http://facebook.github.io/react/>
-   alt <http://alt.js.org/>
-   react-router <https://github.com/reactjs/react-router>
-   webpack <http://webpack.github.io/>
-   bower <http://bower.io/>
-   es6(babel) <https://babeljs.io/>

*如果正在使用 windows, 建议使用 vagrant 运行 Linux 虚拟机减少蛋疼程度(不知道说什么的请 Google)*


## build 构建


项目主要依赖于 nodejs 进行构建:

### nvm

为了保持 nodejs 版本一致性，项目中使用 nvm 作为 nodejs 版本管理工具，关于安装 nvm 请查看 <https://github.com/creationix/nvm>

项目使用 nodejs v5, 所以请安装 nvm install 5, 之后安装 npm 依赖包：

    npm install -g webpack
    npm install -g gulp
    npm install -g bower
    npm install
    bower install

安装新的模块时，请带上 --save 参数，使其自动加入依赖文件, 例如: <code>npm install react --save</code>


## 开发模式

### 自动刷新

项目采用了 webpack-dev-server 作为默认调试服务器，在本地把项目构建过一次以后可以执行 <code>npm run start</code> 来启动服务，这时打开 <code>http://localhost:5555</code>，任何已引入项目的文件修改时，页面会自动更新，如出现意外情况请手动刷新页面。

### Nginx 代理

因为需要请求后端 api 接口，为了避免跨域问题，我们需要使用 Nginx 做简单的转发处理， 请在 Nginx 配置文件加入以下配置

    server {
        server_name mdev.iafclub.com;

        location /api {
            proxy_pass http://m-tehualoan.iafclub.com;
        }

        location /sockjs-node {
            proxy_pass http://127.0.0.1:7575;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection "upgrade";
        }

        location / {
            proxy_pass http://127.0.0.1:3333;
        }
    }


其中 <code>/api</code> 的代理地址为后端提供的地址， 请根据实际情况更改

这时项目开发地址更改为 <http://mdev.iafclub.com> ，记得更改 hosts 文件。


## 开发规范

项目采用 react 作为主框架，编码中采用一些常见的规范约束：

1.  所有组件名(component) 必须采用大驼峰写法(所有单词首字母大写，eg: IndexProducts)，是必须，否则会进天坑(不要问我怎么知道...)
2.  所有类名同样采用大驼峰写法
3.  方法名、对象名、变量名等一律采用小驼峰写法(首单词小写，其他单词首字母大写， eg: productCount)
4.  文件命名使用横杠作为连接符(eg: index-product.js)
5.  独立的模块请在 app 文件内新建文件目录，作为独立的项目模块，目录名为复数形式(eg: users)
6.  每个独立目录内包含三个功能文件目录 <code>actions</code><code>stores</code><code>components</code>(项目采用 flux 构架，关于 flux 请参考<https://facebook.github.io/flux/docs/overview.html>，<http://alt.js.org/>)
7.  所有路由的页面引用采用异步方式，具体请参考 <code>app/routes.coffee</code> 文件


## 注意事项

1.  react 中，所有自闭合标签必须在末端加上<code>/</code>, 例如常见的<code>img</code>标签，错误的写法: <code>&lt;img src=@state.data.img&gt;</code>, 正确的写法: <code>&lt;img src=@state.data.img /&gt;</code>
2.  数据验证请在<code>action</code>中完成，所有的请求请在<code>store</code>完成
3.  网络请求请调用根目录 utils 中的 request.js 文件，如：<code>import request from '../../../utils/request'</code>
4.  网站所有字体图标都是在<http://www.iconfont.cn>上进行管理，纯色的可以在已有库中去筛选，也可和有色图标一样，通过SVG上传的方式添加到项目，请先注册账号并联系我<mailto:wangchao@iafclub.com>添加至项目组
5.  未完,待续...


## 发布

当一个版本完成后，我们需要打包发布到线上，不建议在开发本地打包，开发本地只需提交源文件(甚至不包括编译后的版本)，请在线上配置基本的开发环境，发布时执行 <code>npm run publish</code>，这时会自动压缩JS文件，给文件名生成 hash，并且替换 index.html 中的引用。至于怎样运行 http 服务，请随意，但务必使所有的入口路由都能加载项目目录下的<code>index.html</code>

## 参考资料

1.  React - Getting Started <https://facebook.github.io/react/docs/getting-started.html>
2.  alt - Getting Started <http://alt.js.org/guide/>

***如果不知道怎样入手，请把上面的示例全部完成一遍***
