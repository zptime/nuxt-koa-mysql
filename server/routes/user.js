const fs = require('fs')
const path = require('path')
const router = require('koa-router')() // 路由中间件
const sqlModel = require('../db/model/user')
const ApiErrorNames = require('../db/error/ApiErrorNames')

/* 路由前缀 */
router.prefix('/api')

// koaJwt中间件会拿着密钥解析JWT是否合法。并且把JWT中的payload的信息解析后放到state中，ctx.state用于中间件的传值。
// GET /api/users 获取所有用户列表
router.get('/users', async (ctx) => {
  try {
    const result = await sqlModel.findAllUser()
    if (!result) {
      ctx.body = ApiErrorNames.getErrorInfo(ApiErrorNames.USER_NOT_EXIST)
      return
    } else {
      ctx.body = ApiErrorNames.getSuccessInfo(result)
    }
  } catch (error) {
    ctx.throw(500)
  }
})

// GET /api/users/:id 获取单个用户信息
router.get('/users/:id', (ctx) => {
  const data = fs.readFileSync(path.join(__dirname, '../mock/', 'user.json'), 'utf8')
  const user = JSON.parse(data).filter((item) => {
    return item.id === Number(ctx.params.id)
  })
  ctx.body = {
    code: 0,
    data: user,
    msg: '查询成功'
  }
})

/**
 * 获取用户信息
 */
// exports.info = async (ctx, next) => {
//   try {
//     const token = ctx.header.authorization
//     let payload
//     if (token) {
//       payload = await jwt.verify(token.split(' ')[1], secret) // 解密，获取payload
//       const user = await sqlModel.findUserAndRole(payload.data)
//       if (!user) {
//         ctx.body = ApiErrorNames.getErrorInfo(ApiErrorNames.USER_NOT_EXIST)
//       } else {
//         const cont = user.user_count + 1
//         const updateInfo = [
//           cont,
//           // moment().format('YYYY-MM-DD HH:mm:ss'),
//           user.id
//         ]
//         await sqlModel
//           .UpdataUserInfo(updateInfo)
//           .then((res) => {
//             const data = {
//               avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
//               name: user.user_id,
//               // roles: [user.user_admin === 0 ? 'admin' : '']
//               roles: [user.role_name]
//             }
//             ctx.body = ApiErrorNames.getSuccessInfo(data)
//           })
//           .catch(() => {
//             ctx.body = ApiErrorNames.getErrorInfo(ApiErrorNames.DATA_IS_WRONG)
//           })
//       }
//     } else {
//       ctx.body = ApiErrorNames.getErrorInfo(ApiErrorNames.INVALID_TOKEN)
//     }
//   } catch (error) {
//     ctx.throw(500)
//   }
// }

// POST /api/users 新增用户数据
router.post('/users', (ctx) => {
  let data = fs.readFileSync(path.join(__dirname, '../mock/', 'user.json'), 'utf8')
  data = JSON.parse(data)
  data.push(ctx.request.body)
  ctx.body = {
    code: 0,
    data,
    msg: '新增成功'
  }
})

// PUT /api/users/:id 修改单个用户信息
router.put('/users/:id', (ctx) => {
  const data = fs.readFileSync(path.join(__dirname, '../mock/', 'user.json'), 'utf8')
  let user = JSON.parse(data).filter((item) => {
    return item.id === Number(ctx.params.id)
  })
  user = Object.assign(user[0], ctx.request.body)
  ctx.body = {
    code: 0,
    data: user,
    msg: '修改成功'
  }
})

// DELETE /api/users/:id 删除单个用户信息
router.delete('/users/:id', (ctx) => {
  let data = fs.readFileSync(path.join(__dirname, '../mock/', 'user.json'), 'utf8')
  data = JSON.parse(data).filter((item) => {
    return item.id !== Number(ctx.params.id)
  })
  ctx.body = {
    code: 0,
    data,
    msg: '删除成功'
  }
})

module.exports = router
