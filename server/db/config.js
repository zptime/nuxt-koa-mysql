// 数据库配置
const config = {
  port: 3000,
  database: {
    database: 'nodesql', // 数据库
    user: 'root', // 用户
    password: 'root123456', // 密码
    port: 3306, // 端口
    host: 'localhost', // 服务ip地址
    connectionLimit: 10,
    multipleStatements: true // 允许多条sql同时执行
  },
  secret: 'jwt_secret'
}

module.exports = config
