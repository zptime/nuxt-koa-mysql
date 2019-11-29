const router = require('koa-router')()
const jwt = require('jsonwebtoken')
const sqlModel = require('../db/model/user')
const ApiErrorNames = require('../db/error/ApiErrorNames')
const { secret } = require('../db/config')

/* 路由前缀 */
router.prefix('/api')

/* 用户登录 */
router.post('/login', async (ctx) => {
  try {
    const { account, password } = ctx.request.body
    const result = await sqlModel.findUser(account)
    if (!result) {
      ctx.body = ApiErrorNames.getErrorInfo(ApiErrorNames.USER_LOGIN_ERROR)
      return
    }
    const body = JSON.parse(JSON.stringify(result))
    // 匹配密码是否相等
    if (password === body.user_pwd) {
      const data = {
        user: body.user_id,
        // jsonwebtoken在服务端生成token返回给客户端
        token: jwt.sign(
          {
            data: body.user_id,
            // 设置 token 过期时间，一小时后，秒为单位
            exp: Math.floor(Date.now() / 1000) + 60 * 60
          },
          secret
        )
      }
      ctx.body = ApiErrorNames.getSuccessInfo(data)
    } else {
      ctx.body = ApiErrorNames.getErrorInfo(ApiErrorNames.USER_LOGIN_ERROR)
    }
  } catch (error) {
    ctx.throw(500)
  }
})

/* 退出登录 */
router.post('/logout', (ctx) => {
  try {
    // ctx.status = 200
    ctx.body = ApiErrorNames.getSuccessInfo()
  } catch (error) {
    ctx.throw(500)
  }
})

module.exports = router
