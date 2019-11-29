/**
 * API错误名称
 */
const ApiErrorNames = {};

ApiErrorNames.UNKNOW_ERROR = 'UNKNOW_ERROR';
ApiErrorNames.SUCCESS = 'SUCCESS';

/* 参数错误：10001-19999 */
ApiErrorNames.PARAM_IS_INVALID = 'PARAM_IS_INVALID';
ApiErrorNames.PARAM_IS_BLANK = 'PARAM_IS_BLANK';
ApiErrorNames.PARAM_TYPE_BIND_ERROR = 'PARAM_TYPE_BIND_ERROR';
ApiErrorNames.PARAM_NOT_COMPLETE = 'PARAM_NOT_COMPLETE';

/* 用户错误：20001-29999 */
ApiErrorNames.USER_NOT_LOGGED_IN = 'USER_NOT_LOGGED_IN';
ApiErrorNames.USER_LOGIN_ERROR = 'USER_LOGIN_ERROR';
ApiErrorNames.USER_ACCOUNT_FORBIDDEN = 'USER_ACCOUNT_FORBIDDEN';
ApiErrorNames.USER_NOT_EXIST = 'USER_NOT_EXIST';
ApiErrorNames.USER_HAS_EXISTED = 'USER_HAS_EXISTED';

/* 业务错误：30001-39999 */
ApiErrorNames.SPECIFIED_QUESTIONED_USER_NOT_EXIST = 'SPECIFIED_QUESTIONED_USER_NOT_EXIST';

/* 系统错误：40001-49999 */
ApiErrorNames.SYSTEM_INNER_ERROR = 'SYSTEM_INNER_ERROR';

/* 数据错误：50001-599999 */
ApiErrorNames.RESULE_DATA_NONE = 'RESULE_DATA_NONE';
ApiErrorNames.DATA_IS_WRONG = 'DATA_IS_WRONG';
ApiErrorNames.DATA_ALREADY_EXISTED = 'DATA_ALREADY_EXISTED';

/* 接口错误：60001-69999 */
ApiErrorNames.INTERFACE_INNER_INVOKE_ERROR = 'INTERFACE_INNER_INVOKE_ERROR';
ApiErrorNames.INTERFACE_OUTTER_INVOKE_ERROR = 'INTERFACE_OUTTER_INVOKE_ERROR';
ApiErrorNames.INTERFACE_FORBID_VISIT = 'INTERFACE_FORBID_VISIT';
ApiErrorNames.INTERFACE_ADDRESS_INVALID = 'INTERFACE_ADDRESS_INVALID';
ApiErrorNames.INTERFACE_REQUEST_TIMEOUT = 'INTERFACE_REQUEST_TIMEOUT';
ApiErrorNames.INTERFACE_EXCEED_LOAD = 'INTERFACE_EXCEED_LOAD';

/* 权限错误：70001-79999 */
ApiErrorNames.PERMISSION_NO_ACCESS = 'PERMISSION_NO_ACCESS';
ApiErrorNames.INVALID_TOKEN = 'INVALID_TOKEN';

/**
 * API错误名称对应的错误信息
 */
const errorMap = new Map();

errorMap.set(ApiErrorNames.SUCCESS, { code: 0, message: '成功' });
errorMap.set(ApiErrorNames.UNKNOW_ERROR, { code: -1, message: '未知错误' });
/* 参数错误：10001-19999 */
errorMap.set(ApiErrorNames.PARAM_IS_INVALID, { code: 10001, message: '参数无效' });
errorMap.set(ApiErrorNames.PARAM_IS_BLANK, { code: 10002, message: '参数为空' });
errorMap.set(ApiErrorNames.PARAM_TYPE_BIND_ERROR, { code: 10003, message: '参数类型错误' });
errorMap.set(ApiErrorNames.PARAM_NOT_COMPLETE, { code: 10004, message: '参数缺失' });
/* 用户错误：20001-29999 */
errorMap.set(ApiErrorNames.USER_NOT_LOGGED_IN, { code: 20001, message: '用户未登录' });
errorMap.set(ApiErrorNames.USER_LOGIN_ERROR, { code: 20002, message: '账号不存在或密码错误' });
errorMap.set(ApiErrorNames.USER_ACCOUNT_FORBIDDEN, { code: 20003, message: '账号已被禁用' });
errorMap.set(ApiErrorNames.USER_NOT_EXIST, { code: 20004, message: '用户不存在' });
errorMap.set(ApiErrorNames.USER_HAS_EXISTED, { code: 20005, message: '用户已存在' });
/* 业务错误：30001-39999 */
errorMap.set(ApiErrorNames.SPECIFIED_QUESTIONED_USER_NOT_EXIST, { code: 30001, message: '某业务出现问题' });
/* 系统错误：40001-49999 */
errorMap.set(ApiErrorNames.SYSTEM_INNER_ERROR, { code: 40001, message: '系统繁忙，请稍后重试' });
/* 数据错误：50001-599999 */
errorMap.set(ApiErrorNames.RESULE_DATA_NONE, { code: 50001, message: '数据未找到' });
errorMap.set(ApiErrorNames.DATA_IS_WRONG, { code: 50002, message: '数据有误' });
errorMap.set(ApiErrorNames.DATA_ALREADY_EXISTED, { code: 50003, message: '数据已存在' });
/* 接口错误：60001-69999 */
errorMap.set(ApiErrorNames.INTERFACE_INNER_INVOKE_ERROR, { code: 60001, message: '内部系统接口调用异常' });
errorMap.set(ApiErrorNames.INTERFACE_OUTTER_INVOKE_ERROR, { code: 60002, message: '外部系统接口调用异常' });
errorMap.set(ApiErrorNames.INTERFACE_FORBID_VISIT, { code: 60003, message: '该接口禁止访问' });
errorMap.set(ApiErrorNames.INTERFACE_ADDRESS_INVALID, { code: 60004, message: '接口地址无效' });
errorMap.set(ApiErrorNames.INTERFACE_REQUEST_TIMEOUT, { code: 60005, message: '接口请求超时' });
errorMap.set(ApiErrorNames.INTERFACE_EXCEED_LOAD, { code: 60006, message: '接口负载过高' });
/* 权限错误：70001-79999 */
errorMap.set(ApiErrorNames.PERMISSION_NO_ACCESS, { code: 70001, message: '无访问权限' });
errorMap.set(ApiErrorNames.INVALID_TOKEN, { code: 70002, message: '无效token' });

// 根据错误名称获取错误信息
ApiErrorNames.getErrorInfo = (errorName) => {
  let errorInfo;

  if (errorName) {
    errorInfo = errorMap.get(errorName);
  }

  // 如果没有对应的错误信息，默认'未知错误'
  if (!errorInfo) {
    errorName = ApiErrorNames.UNKNOW_ERROR;
    errorInfo = errorMap.get(errorName);
  }

  return errorInfo;
}

// 返回正确信息
ApiErrorNames.getSuccessInfo = (data) => {
  const successInfo = errorMap.get(ApiErrorNames.SUCCESS);

  if (data) {
    successInfo.data = data
  }

  return successInfo;
}

module.exports = ApiErrorNames;
