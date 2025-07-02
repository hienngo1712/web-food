import {createRouter, createWebHistory} from 'vue-router';
import CustomerLogin from '../views/users/CustomerLogin.vue';
import CustomerMenu from '../views/users/CustomerMenu.vue';
import CallStaff from '../views/users/CallStaff.vue';
import Feedback from '../views/users/Feedback.vue';
import Dashboard from '../views/admin/Dashboard.vue';
import UserLayout from '../layouts/UserLayout.vue';
import AdminLayout from '../layouts/AdminLayout.vue';
import { h } from 'vue';
const routes = [
  {
    path: '/',
    name: 'CustomerLogin',
    component: CustomerLogin,
  },
  {
    path: '/menu',
    name: 'CustomerMenu',
    component: withDefaultLayout(CustomerMenu),
  },
  {
    path: '/call-staff',
    name: 'CallStaff',
    component: withDefaultLayout(CallStaff),
  },
  {
    path: '/feedback',
    name: 'Feedback',
    component: withDefaultLayout(Feedback),
  },
  {
    path: '/dashboard',
    component: Dashboard,
  },
  // {
  //   path: '/admin',
  //   name: 'Admin',
  //   component: AdminLayout,
  //   children:[
  //     {
  //       path: 'dashboard',
  //       component: Dashboard,
  //     },
  //   ]
  // }
]
const router = createRouter({
  history: createWebHistory(),
  routes,
});
const getCurrentUser = () =>{
  return JSON.parse(localStorage.getItem("users"))
}
//Viết hoa đầu dòng
function capitalizeFirstLetter(str){
  if(!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

//Hàm bọc 1 component (page) vào layout mặc định
function withDefaultLayout(PageComponent){
  return{
    render() {
      return h(UserLayout,null,{
        default: () => h(PageComponent),
      });
    },
  };
}

//Middleware router - chặn truy cập không đúng quyền
router.beforeEach((to,from,next) =>{
  const user = getCurrentUser();
  //Nếu đường dẫn bắt đầu bằng /admin
  if(to.path.startsWith("/admin")){
    //Nếu chưa đăng nhập hoặc không phải admin
    if(!user || user.role !== "admin"){
      //Chuyển hướng về trang phù hợp với vai trò 
      return next({ name: capitalizeFirstLetter(user?.role || "login") })
    }
  }else if(to.path.startsWith("/kitchen")){
    if(!user || user.role !== "/kitchen"){
      return next({ name: capitalizeFirstLetter(user?.role || "login")})
    }
  }
  next();
});
export default router;