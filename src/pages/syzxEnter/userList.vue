<template>
	<div>
		<el-main>
			<el-row style="margin-bottom:20px;padding:20px">
				<el-row style="margin-top:10px">
					<el-form :inline="true" :model="selectUserList" ref="selectForm" >
						<el-row :span="24">
							<el-col :span="8">
								<el-form-item label="活动时间">
									<!-- <el-col :span="11">
										<el-date-picker type="date" placeholder="选择日期" value-format="yyyy-MM-dd" v-model="selectUserList.startDate" clearable style="width: 100%;"></el-date-picker>
									</el-col>
									<el-col class="line" :span="2">-</el-col>
									<el-col :span="11">
										<el-date-picker type="date" placeholder="选择日期" value-format="yyyy-MM-dd" v-model="selectUserList.endDate" clearable style="width: 100%;"></el-date-picker>
									</el-col> -->
									<el-date-picker
										v-model="dataOption"
										type="daterange"
										start-placeholder="开始日期"
										end-placeholder="结束日期"
										value-format="yyyy-MM-dd"
										@change="changeDataOption"
										:default-time="['', '']">
									</el-date-picker>
								</el-form-item>
							</el-col>
							<el-col :span="5">
								<el-form-item label="审核结果：">
									<el-select v-model="selectUserList.auditFlag" placeholder="请选择活动区域" clearable>
										<el-option 
										v-for="item in auditFlagList" 
										:key="item.value" 
										:label="item.label"
										:value="item.value"></el-option>
									</el-select>
								</el-form-item>
							</el-col>
							<el-col :span="4">
								<el-form-item label="性别">
									<el-select v-model="selectUserList.sex" placeholder="请选择活动区域" clearable>
										<el-option label="男" value="1"></el-option>
										<el-option label="女" value="2"></el-option>
									</el-select>
								</el-form-item>
							</el-col>
							<el-col :span="4">
								<el-form-item label="年龄">
									<el-input v-model="selectUserList.age" clearable></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="4">
								<el-button type="primary" @click="getUserList">查询</el-button>
								<el-button type="primary" @click="clearUserForm">重置</el-button>
							</el-col>
						</el-row>
					</el-form>	
				</el-row>
			</el-row>
			<el-row>
					<el-table :data="userList">
							<el-table-column prop="name" label="参赛者姓名"></el-table-column>
							<el-table-column prop="idCard" label="身份证号"></el-table-column>
							<el-table-column prop="sex" label="性别" :formatter="formatterSex" ></el-table-column>
							<el-table-column prop="age" label="年龄(岁)"></el-table-column>
							<el-table-column prop="auditFlag" label="审核结果" :formatter="formatteruditFlag"></el-table-column>
							<el-table-column prop="createTime" label="报名时间"></el-table-column>
							<el-table-column  label="操作">
									<template slot-scope="scope">
											<el-button type="warning" size="mini" @click="goToInfo(scope)">详情</el-button>
											<el-button v-if="scope.row.auditFlag == 0" type="danger" size="mini" @click="chooseAuditEnterInfo(scope)">审核</el-button>
											<el-button v-if="scope.row.auditFlag != 0" type="danger" size="mini" disabled>审核</el-button>
									</template>
							</el-table-column>
					</el-table>
			</el-row>
			 <div class="block">
				<span class="demonstration"></span>
				<el-pagination
					@size-change="handleSizeChange"
					@current-change="handleCurrentChange"
					:page-sizes="[5,10,15]"
					:page-size="5"
					layout="total, sizes, prev, pager, next"
					:total="userTotal">
				</el-pagination>
			</div>
		</el-main>
		<el-dialog title="审核" :visible.sync="dialogFormVisible" width="400px">
			<div style="text-align: center;">
				  <el-radio-group  v-model="chooseAuditFlag">
						<el-radio-button label="通过"  style="margin-right: 30px;"></el-radio-button>
						<el-radio-button label="未通过" style="border-left: rgb(220, 223, 230) 1px solid;"></el-radio-button>
					</el-radio-group>
			</div>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="auditEnterInfo">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>
</template>
<script>
  import {
	mapState,
	mapActions
  } from 'vuex';
  export default {
    data() {
      return {
        selectUserList:{
            auditFlag:'',
            sex:'',
            age:'',
            startDate:'',
						endDate:'',
						pageSize:5,
						pageNo:1
        },
				dataOption:[],
				auditFlagList:[
					{label:'未审核',value:0},
					{label:'审核通过',value:1},
					{label:'未通过',value:2}
				],
				chooseAuditFlag:'',
				auditForm:{
					auditFlag:'',
					id:''
				},
				dialogFormVisible:false
      };
    },
    mounted(){
			this.init()
    },
	computed: {
		...mapState("syzxEnter", ['userList','userTotal']) //使用对象展开 混入 computed 对象中
	},
    methods:{
        ...mapActions('syzxEnter', ['userListAction', 'userInfoAction','auditEnterInfoAction']),
				init(){
					this.getUserList()
				},
				async getUserList(){
					await this.userListAction(this.selectUserList)
				},
				async auditEnterInfo(){
					if(this.chooseAuditFlag == '通过'){
						this.auditForm.auditFlag=1
					}else{
						this.auditForm.auditFlag=2
					}
					await this.auditEnterInfoAction(this.auditForm)
					this.getUserList()
					this.dialogFormVisible = false
				},
				chooseAuditEnterInfo(scope){
					this.dialogFormVisible=true
					this.auditForm.id=scope.row.id 
				},
				clearUserForm(){
					this.selectUserList.auditFlag=''
					this.selectUserList.sex=''
					this.selectUserList.age=''
					this.selectUserList.startDate=''
					this.selectUserList.endDate=''
				},
				goToInfo(scope){
					this.$router.push({path:'/userInfo',query:{ id: scope.row.id }})
				},
				changeDataOption(val){
					if(val == null){
						this.selectUserList.startDate=''
						this.selectUserList.endDate=''
					}else{
						this.selectUserList.startDate=this.dataOption[0]
						this.selectUserList.endDate=this.dataOption[1]
					}
				},
				handleSizeChange(val){
					this.selectUserList.pageSize=val
					this.getUserList()
				},
				handleCurrentChange(val){
					this.selectUserList.pageNo=val
					this.getUserList()
				},
				formatteruditFlag(row, column){
					switch(row.auditFlag){
						case 0:
							return '未审核'
						case 1:
							return '审核通过'
						case 2:
							return '未通过'
						default:
							return '未知'
					}
				},
				formatterSex(row, column){
					switch(row.sex){
						case 1:
							return '男'
						case 2:
							return '女'
						default:
							return '未知'
					}
				}
    }
  };
</script>
<style scoped>
	.el-pagination{
		margin-top: 10px;
		text-align: right;
	}
</style>