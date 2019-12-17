const query = require('../mysql')

// 查询单个用户是否存在
const findUser = async function (account) {
  const _sql = `SELECT * FROM user WHERE user_account="${account}" limit 1;`
  let result = await query(_sql)

  if (Array.isArray(result) && result.length > 0) {
    result = result[0]
  } else {
    result = null
  }
  return result
}

// 查询所有用户及用户角色
const findAllUser = async function () {
  const _sql = 'SELECT u.user_id, u.user_account, u.user_name, u.user_pwd, u.user_avatar, r.role_name, r.role_description FROM user u,userrole ur, role r WHERE ur.user_id=u.user_id AND r.role_id=ur.role_id ORDER BY u.user_id;'

  const result = await query(_sql)

  if (Array.isArray(result) && result.length > 0) {
    return result
  } else {
    return null
  }
}

// 查询用户以及用户角色（by id）
const findUserAndRole = async function (id) {
  const _sql = `SELECT u.*, r.role_name, r.role_description FROM user u,userrole ur,role r where u.user_id=(SELECT user_id FROM user where user_id="${id}" limit 1) and ur.user_id=u.user_id and ur.role_id=r.role_id limit 1;`
  let result = await query(_sql)

  if (Array.isArray(result) && result.length > 0) {
    result = result[0]
  } else {
    result = null
  }
  return result
}

// 新增用户
const addUser = async function (body) {
  const _sql = `INSERT INTO user(user_account, user_name, user_pwd) VALUES ('${body.user_account}', '${body.user_name}', '123456');`
  let result = await query(_sql)

  if (Array.isArray(result) && result.length > 0) {
    result = result[0]
  } else {
    result = null
  }
  return result
}

// 更新用户登录次数和登录时间
const updateUserInfo = function (value) {
  const _sql = 'UPDATE user_info SET user_count = ?, user_login_time = ? WHERE id = ?;'
  return query(_sql, value)
}

module.exports = {
  findUser,
  findAllUser,
  findUserAndRole,
  addUser,
  updateUserInfo
}
