const getters = {

  userInfo: state => state.user.userInfo,
  roleIds: state => state.user.roleIds,
  menus: state => state.user.menus,
  permissions: state => state.user.permissions,

  permission_routers: state => state.permission.routers,
  addRouters: state => state.permission.addRouters,

  popupList: state => state.common.popupList,
  orientation: state => state.common.orientation,
  filterVer: state => state.common.filterVer
}
export default getters


