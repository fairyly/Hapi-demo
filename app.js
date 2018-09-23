// app.js

const Hapi = require('hapi');
require('env2')('./.env')
const config = require('./config/index')

const hello = require('./routes/hello-world.js')
const shops = require('./routes/shops.js')
const orders = require('./routes/orders.js')
const users = require('./routes/users.js')

// 引入自定义的 hapi-swagger 插件配置
const pluginHapiSwagger = require('./plugins/hapi-swagger');

const pluginHapiPagination = require('./plugins/hapi-pagination');

const hapiAuthJWT2 = require('hapi-auth-jwt2');
const pluginHapiAuthJWT2 = require('./plugins/hapi-auth-jwt2');


const server = new Hapi.Server();
// 配置服务器启动 host 与端口
server.connection({
  port: config.port,
  host: config.host,
});

const init = async () => {

  await server.register([
    // 为系统使用 hapi-swagger
    ...pluginHapiSwagger,
    pluginHapiPagination,
    hapiAuthJWT2
  ]);

  pluginHapiAuthJWT2(server);

  server.route([
    // 创建一个简单的 hello hapi 接口
    ...hello,
    ...shops,
    ...orders,
    ...users
  ]);
  // 启动服务
  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();
