import axios from "axios";

const apiClient = axios.create({
    baseURL : "https://ducgiday-o2o-backend.onrender.com/api",
    headers : {
        "Content-Type" : "application/json",
    },
})
// Thêm interceptors vào request
apiClient.interceptors.request.use(
  (config) =>{
    // const token = localStorage.getItem("accessToken")
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo3LCJ1c2VybmFtZSI6ImR1Y2dpZGF5Iiwicm9sZXMiOltdLCJleHAiOjE3NTE0Mjk2NjZ9.mcR5I9BnHhNVmfFIq8I_RSqxRpT8NOVtrfJW6RLznbI"
    console.log("Token", token);
    if(token){
      //thêm token vào header Authorization
      config.headers.Authorization = `Bearer ${token}`;
    };
    return config; // Trả về config đã chỉnh sửa
  },
  (error) =>{
    //Xử lý lỗi trong quá trình gửi request
    return Promise.reject(error);
  }
)

//Thêm interceptors vào response
apiClient.interceptors.response.use(
  (response) => response, // Trả về response nếu thành công
  (error) => {
    if(error.response?.status === 401){
      console.warn("Yêu cầu không hợp lệ hoặc token đã hết hạn ")
    }
    console.error("Lỗi từ API:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default apiClient;