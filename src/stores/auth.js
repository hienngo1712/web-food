import { defineStore } from "pinia";
import apiClient from "../api/axiosClient";
export const useAuthStore = defineStore("auth",{
  state: () =>({
    user: null,
    // lưu token từ localStorage nếu đã từng login → giúp giữ trạng thái đăng nhập khi F5
    token: localStorage.getItem("accessToken") || "", 
  }),
  getters:{
    //true nếu có token → tức là đã đăng nhập
    isAuthenticated: (state) => !!state.token,
    // Dùng some để ktra có ít nhất 1 role là admin
    isAdmin: (state) => state.user?.roles?.some((r) => r.code === 'ADMIN') || false,
  },
  actions:{
    async login(username, password){
      try{
        const res = await apiClient.post("auth/login", {username, password});
        console.log("check lỗi", res.data)
        this.token = res.data.accessToken;
        localStorage.setItem("accessToken", this.token);

        const profile = await apiClient.get("accounts");
        const userData = profile.data.results.find((u) => u.username === username);
        if(!userData){
          throw new Error("Không tìm thấy thông tin người dùng")
        }
        this.user = userData;
        console.log("Thông tin user:", this.user.roles)
        localStorage.setItem("userInfo", JSON.stringify(this.user));
      }catch(err){
        throw new Error("Tài khoản hoặc mật khẩu sai")
      }
    },
    logout(){
      this.token = "";
      this.user = null;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userInfo");
    },
    loadUserFromStorage(){
      const userInfo = localStorage.getItem("userInfo");
      const token = localStorage.getItem("accessToken");
      if (userInfo && token) {
        this.user = JSON.parse(userInfo);
        this.token = token;
      }else{
        this.logout();
      }
    }
  }
})