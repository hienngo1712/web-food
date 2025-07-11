import {createRouter, createWebHistory} from 'vue-router';
import { useAuthStore } from '../stores/auth';
import { h } from 'vue';

import CustomerLogin from '../views/users/CustomerLogin.vue';
import CustomerMenu from '../views/users/CustomerMenu.vue';
import CallStaff from '../views/users/CallStaff.vue';
import Feedback from '../views/users/Feedback.vue';

import Dashboard from '../views/admin/Dashboard.vue';
import AdminLogin from '../views/admin/AdminLogin.vue';
import UsersManagement from '../views/admin/UsersManagement.vue';

import UserLayout from '../layouts/UserLayout.vue';
import AdminLayout from '../layouts/AdminLayout.vue';

//Viết hoa đầu dòng
// function capitalizeFirstLetter(str){
//   if(!str) return "";
//   return str.charAt(0).toUpperCase() + str.slice(1);
// }

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
    path: '/admin/login',
    name: 'AdminLogin',
    component: AdminLogin,
  },
  {
    path: '/admin',
    name: 'Admin',
    component: AdminLayout,
    children:[
      {
        path: 'dashboard',
        component: Dashboard,
      },
      {
        path: 'users-management',
        component: UsersManagement,
      },
    ]
  }
]
const router = createRouter({
  history: createWebHistory(),
  routes,
});


//Middleware router - chặn truy cập không đúng quyền
router.beforeEach((to,from,next) =>{
  const auth = useAuthStore();
  if(!auth.user && auth.token){
    auth.loadUserFromStorage();
  }
  // Kiểm tra vai trò dựa trên isAdmin
  const isAdmin = auth.isAdmin;
  const isAuthenticated = auth.isAuthenticated;
  //Nếu đường dẫn bắt đầu bằng /admin
  if (to.path.startsWith('/admin') && to.name !== 'AdminLogin') {
    if(!isAuthenticated){// trả về false nếu chưa đăng nhập
      return next({name: "AdminLogin"})
    }
    //Nếu k phải admin thì về CustomerLogin
    if(!isAdmin){
      return next({name: "CustomerLogin"})
    }
  }

  // if (to.path.startsWith('/kitchen') && role !== 'kitchen' && to.name !== 'KitchenLogin') {
  //   return next({ name: capitalizeFirstLetter(role === 'guest' ? 'KitchenLogin' : role) });
  // }
  next();
});
export default router;