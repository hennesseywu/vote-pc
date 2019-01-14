//审核用户报名信息
export  function auditEnterInfo(params) {
  return  $http.post(`/syzxEnterInfo/audit`, params);
}

//获取所有报名用户列表
export  function getAllEnterList(params) {
  return  $http.post(`/syzxEnterInfo/getAll`, params);
}

//获取用户报名信息
export  function getEnterInfo(params) {
		return  $http.post(`/syzxEnterInfo/getInfo`, {params:params});
	}

