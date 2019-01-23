import {
  auditEnterInfo,
  getAllEnterList,
  getEnterInfo,
} from './service'; //引入调用接口相关
import {
  Message
} from 'element-ui';


const state = {
  userList: [],
	userInfo:{},
	userTotal:0,
}

const actions = {
    //所有报名者数据
    async userListAction({
      commit
    }, params) {
      let {
        data
      } = await getAllEnterList(params);
        commit("SET_USER_LIST", data.data); //用状态管理赋值；
				commit("SET_USER_Count", data.count); //用状态管理赋值；
    },
  //单个报名者信息
  async userInfoAction({
  	commit
  }, params) {
  	let {
  		data
  	} = await getEnterInfo(params);
  		commit("SET_USER_INFO", data); //用状态管理赋值；
  },
  //删除用户
  async auditEnterInfoAction({
    commit
  }, params) {
    let {
      data
    } = await auditEnterInfo(params);
    if (!data.success) {
      Message({
        message: data.msg,
        type: 'error'
      });
    } else {
			Message({
				message: data.msg,
				type: 'success'
			});
      //commit("SET_USER_LIST", data); //用状态管理赋值；
    }
  },




}

const mutations = {
  SET_USER_LIST(state, params) {
    state.userList = params;
  },
	SET_USER_INFO(state, params) {
		state.userInfo = params;
	},
	SET_USER_Count(state, params){
		state.userTotal = params;
	}
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}