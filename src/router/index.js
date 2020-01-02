import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/login/login'
import Register from '../components/login/register'
import Index from '../components/login/index'
import Home from '../components/Home'
import productBaseInfo from '../components/pms/product/productBaseInfo'

// 测试
import Table from '../components/demo/table'

Vue.use(VueRouter)

const routes = [

  // TODO 登陆模块路由，需要进行重新设计路由逻辑
  {
    path: '/',
    component: Index,
    children: [
      { path: '/login', name: 'login', component: Login },
      { path: '/register', name: 'register', component: Register }
    ]
  },
  // 商品模块路由
  {
    path: '/pms',
    component: Home,
    // 商品列表作为首页
    redirect: '/pms/product',
    name: 'pms',
    children: [
      // {
      //   path: 'product',
      //   name: 'product',
      //   // 使用工厂函数，import()函数返回一个promise对象，实现路由懒加载
      //   component: () => import('src/components/pms/product/productList.vue')
      // },
      {
        path: 'updateProduct',
        name: 'updateProduct',
        // component: () => import('src/components/pms/product/productBaseInfo.vue')
        component: productBaseInfo
      }
      // {
      //   path: 'updateProductAttr',
      //   name: 'updateProductAttr',
      //   component: () => import('src/components/pms/product/productOtherAttr.vue')
      // }
    ]
  },

  // 测试路由
  { path: '/table', component: Table }
]

const router = new VueRouter({
  routes
})

// // 添加路由导航守卫，对用户路由跳转进行权限控制
// router.beforeEach((to, from, next) => {
//   // 判断用户访问路径
//   if (to.path === '/login' || to.path === '/register') return next()
//   // 用户访问到需要受限制页面时，对用户token身份进行校验
//   const tokenStr = window.sessionStorage.getItem('token')
//   // 用户身份校验失败，跳转到登录界面
//   if (!tokenStr) return next('/login')
// })

export default router
