import Vue from 'vue';
import Router from 'vue-router';
import Login from './pages/login/index'
import NotFound from './pages/404.vue'
import Home from './pages/Home.vue'
import Main from './pages/Main.vue'
import Table from './pages/nav1/Table.vue'
import Form from './pages/nav1/Form.vue'
import user from './pages/nav1/user.vue'
import Page4 from './pages/nav2/Page4.vue'
import Page5 from './pages/nav2/Page5.vue'
import userList from './pages/syzxEnter/userList.vue'
import userInfo from './pages/syzxEnter/userInfo.vue'
import Store from './store'

Vue.use(Router)

let routes = [{
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    /* {
        path: '/',
        component: Home,
        name: '导航一',
        children: [{
                path: '/main',
                component: Main,
                name: '主页',
                hidden: true,
                iconCls: 'fa fa-id-card-o', //图标icon
            },
            {
                path: '/table',
                component: Table,
                name: 'Table',
                iconCls: 'fa fa-book', //图标icon

            },
            {
                path: '/form',
                component: Form,
                name: 'Form',
                iconCls: 'fa fa-folder' //图标icon
            },
            {
                path: '/user',
                component: user,
                name: '列表',
                iconCls: 'fa fa-id-card-o' //图标icon

            },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '导航二',
        iconCls: 'fa fa-bar-chart',
        children: [{
                path: '/page4',
                component: Page4,
                name: '页面4',
                iconCls: 'fa fa-compass' //图标icon
            },
            {
                path: '/page5',
                component: Page5,
                name: '页面5',
                iconCls: 'fa fa-comment' //图标icon
            }
        ]
    }, */
    {
        path: '/',
        component: Home,
        name: '',
        leaf: true, //只有一个节点
        iconCls: 'fa fa-address-card',
        children: [{
            path: '/userList',
            component: userList,
            name: '报名信息'
        },
		{
			path: '/userInfo',
			component: userInfo,
			name: '用户信息'
		}]
    },
    {
        path: '*',
        hidden: true,
        redirect: {
            path: '/404'
        }
    }
];

const router = new Router({
    mode: 'history',
    routes
})

router.beforeEach((to, from, next) => {
    console.log("store", router.options.routes[2].name="导航")

    if (to.path == '/login') {
        sessionStorage.removeItem('user');
    }
    let user = JSON.parse(sessionStorage.getItem('user'));
    if (!user && to.path != '/login') {
        next({
            path: '/login'
        })
    } else {
        next()
    }
})

export default router