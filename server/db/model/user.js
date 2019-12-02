const query = require('../mysql')

// 查询单个用户是否存在
const findUser = async function (account) {
  const _sql = `select * from user where user_account="${account}"  limit 1;`
  let result = await query(_sql)

  if (Array.isArray(result) && result.length > 0) {
    result = result[0]
  } else {
    result = null
  }
  return result
}

// 查询所有用户
const findAllUser = async function () {
  const _sql = `select * from user;`
  const result = await query(_sql)

  if (Array.isArray(result) && result.length > 0) {
    return result
  } else {
    return null
  }
}

// 查询用户以及用户角色
const findUserAndRole = async function (id) {
  const _sql = `
      SELECT u.*,r.role_name FROM user_info u,user_role ur,role_info r where u.id=(SELECT id FROM user_info where user_id="${id}" limit 1) and ur.user_id=u.id and r.id=ur.user_id limit 1;
    `
  let result = await query(_sql)

  if (Array.isArray(result) && result.length > 0) {
    result = result[0]
  } else {
    result = null
  }
  return result
}

// 更新用户登录次数和登录时间
const UpdataUserInfo = function (value) {
  const _sql =
    'UPDATE user_info SET user_count = ?, user_login_time = ? WHERE id = ?;'
  return query(_sql, value)
}

module.exports = {
  findUser,
  findAllUser,
  findUserAndRole,
  UpdataUserInfo
}
