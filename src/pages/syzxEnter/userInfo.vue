<template>
	<div class="userInfo">
		<div style="display: flex;flex-direction: row;">
			<span style="height: 30px;width: 4px;background-color: #2C8DF1;display: inline-block;border-radius: 10px;margin-right: 5px;"></span>
			<h1>报名信息</h1>
		</div>
		<div>
			<el-row :span="24" class="userInfoStyle">
				<el-col :span="6" >姓名:{{userInfo.name}}</el-col>
				<el-col :span="6">身份证号:{{userInfo.idCard}}</el-col>
				<el-col :span="6">性别:{{userInfo.sex}}</el-col>
				<el-col :span="6">年龄（岁）:{{userInfo.age}}</el-col>
				<el-col :span="6">注册电话:{{userInfo.phone}}</el-col>
				<el-col :span="6">微信ID:{{userInfo.wechatId}}</el-col>
				<el-col :span="6">报名时间:{{userInfo.createTime}}</el-col>
				<el-col :span="6">资料简介:{{userInfo.remark}}</el-col>
			</el-row>
		</div>
		<div>
			<el-row :span="24" v-for="item in videoList" style="text-align: center;margin-bottom: 10px;">
					<img :src="item.url" style="width: 80%;" controls="controls"/>
			</el-row>
		</div>
		<el-row :span="24" class="userInfoImageStyle">
			<el-col :span="4" v-for="item in imageList">
				<img :src="item.url" style="width: 80px;height: 80px;" />
			</el-col>
		</el-row>
		<div style="text-align: center;">
			<el-button @click="$router.go(-1)" type="primary">关闭</el-button>
		</div>
	</div>
</template>

<script>
	import {
	mapState,
	mapActions
	} from 'vuex';
	export default {
		data() {
			return {
				imageList:[],
				videoList:[]
			};
		},
		mounted(){
			this.init()
		},
		computed: {
			...mapState("syzxEnter", ['userInfo']) //使用对象展开 混入 computed 对象中
		},
		methods:{
			...mapActions('syzxEnter', ['userInfoAction']),
			init(){
				this.getUserInfo()
			},
			async getUserInfo(){
				await this.userInfoAction({id:this.$route.query.id}),
				this.imageList=this.userInfo.mediaInfoList.filter((item)=>{
					return item.fileType == 'image'
				})
				this.videoList=this.userInfo.mediaInfoList.filter((item)=>{
					return item.fileType == 'video'
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	@import 'css/element-variables.scss';
		.userInfo{
			.userInfoStyle{
				.el-col{
					height: 40px;
					line-height: 40px;
					border-left: 1px #d6d6d6 solid;
					border-bottom: 1px #d6d6d6 solid;

					padding: 0px 10px;
				};
				margin:20px 20px;
				border-top: 1px #d6d6d6 solid;
				border-right: 1px #d6d6d6 solid;
			}
			.userInfoImageStyle{
				.el-col{
					margin-bottom: 10px;
				}
			}
		}
</style>
