const mysql = require('mysql')
const config = require('./config.js')
// const { createTables } = require('./create.js')

const pool = mysql.createPool(config.database)

const query = (sql, values) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        console.log('数据库连接错误: ' + err.message)
        reject(err)
      } else {
        console.log('数据库 ' + config.database.database + ' 连接成功!');
        connection.query(sql, values, (err, rows) => {
          if (err) {
            reject(err)
          } else {
            resolve(rows)
          }
          connection.release()
        })
      }
    })
  })
}

// const createTable = function (sql) {
//   return query(sql, [])
// }

// 建表
// createTable(createTables.user)
// createTable(createTables.role)
// createTable(createTables.auth)
// createTable(createTables.userRole)
// createTable(createTables.roleAuth)
// createTable(createTables.loginLog)

module.exports = query
