// config/index.js
// module.exports = {
//   host: '127.0.0.1',
//   port: 3000,
// }
//


const { env } = process;
console.log(env)
module.exports = {
  host: env.HOST,
  port: env.PORT,
  jwtSecret: env.JWT_SECRET,
  wxSecret: env.WX_SECRET,
  wxAppid: env.WX_APPID,
}


