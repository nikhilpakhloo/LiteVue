import {default as constantRouterMap} from '../../router/routes';

function hasPermission(menus, route) {
  if (route.menu) {
    return menus.indexOf(route.menu) > -1;
  } else {
    return true
  }
}

const permission = {
  state: {
    routers: constantRouterMap, 
    addRouters: [] 
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers) 
    }
  },
}
export default permission
