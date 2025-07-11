<script setup>
import { ref } from "vue";
import { useAuthStore } from "../../stores/auth";
import { useRouter } from "vue-router";

const router = useRouter();
const auth = useAuthStore();
const handleLogout = () => {
  auth.logout();
  router.push("/admin/login");
};
const showMenu = ref(false);
</script>

<template>
  <header
    class="w-full h-16 bg-white border-b shadow flex items-center justify-between px-4"
  >
    <!-- left -->
    <div class="flex items-center space-x-4">
      <div class="relative">
        <input
          type="text"
          placeholder="Search..."
          class="border rounded px-3 py-1 text-sm focus:outline-orange-400"
        />
      </div>
    </div>

    <!-- right -->
    <div class="flex items-center space-x-4">
      <button class="relative hover:text-orange-500">
        <svg
          class="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 17h5l-1.405-1.405M19 13v-2a7 7 0 00-14 0v2m3 4h8a3 3 0 01-6 0"
          />
        </svg>
        <span
          class="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"
        ></span>
      </button>

      <div class="relative">
        <button
          @click="showMenu = !showMenu"
          class="flex items-center space-x-2"
        >
          <img
            class="w-8 h-8 rounded-full object-cover"
            src="https://scontent.fhan14-5.fna.fbcdn.net/v/t39.30808-1/474193369_2059487117825305_8477156851900558352_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=106&ccb=1-7&_nc_sid=1d2534&_nc_eui2=AeH58vp1xfPLNkMBbXHdvZfYWqEQQOR0w2ZaoRBA5HTDZuuiS3L6llF02daoxFdDlqmOoPh2Y8Dp-VI82UFKOgND&_nc_ohc=h07E25WZRgsQ7kNvwEVRdjc&_nc_oc=AdmLGr2iDszf4w9r3_7l3k8cktZue9Nnqy8unHxE0fb2sybxLO9aTQJ0J80ImGshA18&_nc_zt=24&_nc_ht=scontent.fhan14-5.fna&_nc_gid=04UidZ08vRcSsXZnRxaVTw&oh=00_AfP0jlQB561Pc9V3vsgpKfwZ0H_v-VmM2ag5xEb3EkanYg&oe=686D17AC"
            alt="avatar"
          />
          <span class="hidden md:inline text-sm font-medium">Hiển Ngô</span>
        </button>
        <div
          v-if="showMenu"
          class="absolute right-0 mt-2 w-40 bg-white rounded shadow border py-1 text-sm"
        >
          <button class="w-full px-4 py-2 hover:bg-gray-100">Profile</button>
          <button
            @click="handleLogout"
            class="w-full px-4 py-2 hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  </header>
</template>
