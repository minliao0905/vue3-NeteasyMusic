import {createRouter, createWebHistory} from "vue-router";
import routes from './routes'
const router = createRouter ({
    history: createWebHistory (),
    routes ,
});

// 定义全局守卫，检测是否登录
router.beforeEach((to, from, next) => {
    // 定义网页的title
    document.title = `${to.name} | Execises`
    // 判断是否登录，否则跳转登录界面
    // const account = sessionStorage.getItem('account')
    const token = localStorage.getItem("token")
    if (to.name !== 'Login' && !token) {
      alert("您当前并未登录，将跳转登录界面")
      return next({ name: 'Login', path: '/login' })
    }
    else
      next()
  })
export default router;
