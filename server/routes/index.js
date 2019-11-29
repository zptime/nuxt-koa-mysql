const user = require('./user')
const role = require('./role')
const log = require('./log')
const login = require('./login')

module.exports = function (app) {
  app.use(user.routes(), user.allowedMethods())
  app.use(role.routes(), role.allowedMethods())
  app.use(log.routes(), log.allowedMethods())
  app.use(login.routes(), login.allowedMethods())
}
