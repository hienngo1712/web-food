<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const isCollapsed = ref(false);
const menuItems = [
  { name: "Dashboard", path: "/admin/dashboard" },
  { name: "Users", path: "/admin/users-management" },
  { name: "Banners", path: "/admin/banners" },
  { name: "Customers", path: "/admin/customners-management" },
  { name: "Stores", path: "/admin/stores" },
  { name: "Shifts", path: "/admin/shifts" },
  { name: "Tables", path: "/admin/tables" },
  { name: "Menu", path: "/admin/menu" },
  { name: "Orders", path: "/admin/orders" },
];
</script>

<template>
  <aside
    class="h-screen border-r border-gray-200 transition-all bg-white"
    :class="isCollapsed ? 'w-16' : 'w-64'"
  >
    <div class="flex justify-between items-center p-4">
      <button
        @click="$router.push('/admin/dashboard')"
        v-if="!isCollapsed"
        class="text-xl font-bold"
      >
        MyApp
      </button>
      <button
        @click="isCollapsed = !isCollapsed"
        class="p-1 text-gray-600 hover:text-orange-500 text-right"
      >
        <svg
          v-if="!isCollapsed"
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M18 12H6"
          />
        </svg>
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 12h12"
          />
        </svg>
      </button>
    </div>
    <nav class="space-y-2 px-2">
      <router-link
        v-for="item in menuItems"
        :key="item.name"
        :to="item.path"
        class="flex items-center rounded px-3 py-2 transition cursor-pointer"
        :class="[
          route.path === item.path
            ? 'bg-orange-400 text-white'
            : 'hover:bg-orange-300 hover:text-white',
        ]"
      >
        <span v-if="!isCollapsed" class="ml-2">{{ item.name }}</span>
      </router-link>
    </nav>
  </aside>
</template>
