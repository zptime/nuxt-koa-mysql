// 创建数据库
const createDatabase = `create database nodesql;`

// 切换到数据库
const selectDatabase = `use nodesql;`

// 创建数据表
const createTables = {
  // 用户表
  user: `create table if not exists user (
    user_id int primary key not null auto_increment comment '用户ID(自增长)',
    user_account varchar(100) not null comment '账号',
    user_name varchar(100) not null comment '用户名',
    user_pwd varchar(100) not null comment '密码',
    user_avatar varchar(255) comment '头像',
    user_mobile varchar(20) comment '手机',
    user_email varchar(64) comment '邮箱',
    create_time timestamp not null default now() comment '注册时间',
    update_time timestamp comment '更新时间',
    login_time timestamp default now() comment '登录时间',
    count int default '0' comment '登录次数',
    is_delete tinyint default '0' comment '是否删除，0-否，1-是',
    alternate_filed_one varchar(100) comment '备用字段1',
    alternate_filed_two varchar(100) comment '备用字段2',
    alternate_filed_three int comment '备用字段3',
    alternate_filed_four tinyint comment '备用字段4',
    alternate_filed_five timestamp comment '备用字段5'
  )`,
  // 角色表
  role: `create table if not exists role (
    role_id int primary key not null auto_increment comment '角色ID(自增长)',
    role_name varchar(20) not null comment '角色名',
    role_description varchar(255) comment '角色描述',
    is_delete tinyint default '0' comment '是否删除，0-否，1-是',
    alternate_filed_one varchar(100) comment '备用字段1',
    alternate_filed_two varchar(100) comment '备用字段2',
    alternate_filed_three int comment '备用字段3',
    alternate_filed_four tinyint comment '备用字段4',
    alternate_filed_five timestamp comment '备用字段5'
  )`,
  // 权限表
  auth: `create table if not exists auth (
    auth_id int primary key not null auto_increment comment '权限ID(自增长)',
    auth_name varchar(20) not null comment '权限名',
    auth_description varchar(255) comment '角色描述',
    is_delete tinyint default '0' comment '是否删除，0-否，1-是',
    alternate_filed_one varchar(100) comment '备用字段1',
    alternate_filed_two varchar(100) comment '备用字段2',
    alternate_filed_three int comment '备用字段3',
    alternate_filed_four tinyint comment '备用字段4',
    alternate_filed_five timestamp comment '备用字段5'
  )`,
  // 用户角色表
  userRole: `create table if not exists userRole (
    id int primary key not null auto_increment comment '(自增长)',
    user_id int not null comment '关联用户ID',
    role_id int not null comment '关联角色ID',
    alternate_filed_one varchar(100) comment '备用字段1',
    alternate_filed_two varchar(100) comment '备用字段2',
    alternate_filed_three int comment '备用字段3',
    alternate_filed_four tinyint comment '备用字段4',
    alternate_filed_five timestamp comment '备用字段5',
    key fk_userrole_role(role_id),
    key fk_userrole_user(user_id),
    constraint fk_userrole_role foreign key(role_id) references role(role_id) on delete cascade on update cascade,
    constraint fk_userrole_user foreign key(user_id) references user(user_id) on delete cascade on update cascade
  )`,
  // 角色权限表
  roleAuth: `create table if not exists roleAuth (
    id int primary key not null auto_increment comment '(自增长)',
    auth_id int not null comment '关联权限ID',
    role_id int not null comment '关联角色ID',
    alternate_filed_one varchar(100) comment '备用字段1',
    alternate_filed_two varchar(100) comment '备用字段2',
    alternate_filed_three int comment '备用字段3',
    alternate_filed_four tinyint comment '备用字段4',
    alternate_filed_five timestamp comment '备用字段5',
    key fk_roleauth_role(role_id),
    key fk_roleauth_auth(auth_id),
    constraint fk_roleauth_role foreign key(role_id) references role(role_id) on delete cascade on update cascade,
    constraint fk_roleauth_auth foreign key(auth_id) references auth(auth_id) on delete cascade on update cascade
  )`,
  // 登录日志表
  loginLog: `create table if not exists loginLog (
    login_id int primary key not null auto_increment comment '日志ID(自增长)',
    user_id int not null comment '登录用户ID(foreign key)',
    login_time timestamp comment '登录时间',
    login_ip int not null comment '登录ip',
    login_type tinyint not null comment '登录类型：0未成功，1成功',
    alternate_filed_one varchar(100) comment '备用字段1',
    alternate_filed_two varchar(100) comment '备用字段2',
    alternate_filed_three int comment '备用字段3',
    alternate_filed_four tinyint comment '备用字段4',
    alternate_filed_five timestamp comment '备用字段5',
    key fk_log_user(user_id),
    constraint fk_log_user foreign key(user_id) references user(user_id) on delete cascade on update cascade
  )`
}

module.exports = {
  createDatabase,
  selectDatabase,
  createTables
}
