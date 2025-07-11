<script setup>
import { ref } from "vue";
import { useAuthStore } from "../../stores/auth";
import { useRouter } from "vue-router";

const auth = useAuthStore();
const router = useRouter();
const username = ref("");
const password = ref("");
const error = ref("");
const handleLogin = async () => {
  try {
    await auth.login(username.value, password.value);
    if (auth.isAdmin) {
      router.push("/admin/dashboard");
    } else {
      error.value = "Bạn không có quyền truy cập.";
      auth.logout();
      // router.push("/admin/login");
      router.push("/");
    }
  } catch (err) {
    error.value = err.message;
  }
};
</script>
<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <form
      @submit.prevent="handleLogin"
      class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
    >
      <h2 class="text-2xl font-bold mb-6 text-center uppercase">Đăng nhập</h2>
      <div class="space-y-4">
        <input
          type="text"
          v-model="username"
          placeholder="Nhập tên người dùng"
          class="w-full p-2 border rounded"
        />
        <input
          type="password"
          v-model="password"
          placeholder="Nhập mật khẩu"
          class="w-full p-2 border rounded"
        />
        <button
          type="submit"
          class="w-full bg-orange-500 text-white p-2 rounded-lg hover:bg-orange-600"
        >
          Đăng nhập
        </button>
      </div>
    </form>
  </div>
</template>
