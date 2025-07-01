import {createRouter, createWebHistory} from 'vue-router';
import CustomerLogin from '../views/users/CustomerLogin.vue';
import CustomerMenu from '../views/users/CustomerMenu.vue';
import CallStaff from '../views/users/CallStaff.vue';
import Feedback from '../views/users/Feedback.vue';
const routes = [
  {
    path: '/',
    name: 'CustomerLogin',
    component: CustomerLogin,
  },
  {
    path: '/menu',
    name: 'CustomerMenu',
    component: CustomerMenu,
  },
  {
    path: '/call-staff',
    name: 'CallStaff',
    component: CallStaff,
  },
  {
    path: '/feedback',
    name: 'Feedback',
    component: Feedback,
  },
]
const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;