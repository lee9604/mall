import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/login/login'
import Register from '../components/login/register'
import Index from '../components/login/index'
import Home from '../components/Home'
import ProductList from '../components/pms/productList'
import AddProduct from '../components/pms/addProduct'
import ProductBaseInfo from '../components/pms/productBaseInfo'
import ProductOtherAttr from '../components/pms/productOtherAttr'

// 测试
import Table from '../components/demo/table'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    component: Home,
    children: [
      { path: '/product', component: ProductList },
      {
        path: '/addProduct',
        component: AddProduct,
        children: [
          { path: '/productBaseInfo', component: ProductBaseInfo },
          { path: '/productOtherAttr', component: ProductOtherAttr }
        ]
      }
    ]
  },
  {
    path: '/',
    component: Index,
    children: [
      { path: '/login', name: 'login', component: Login },
      { path: '/register', name: 'register', component: Register }
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
