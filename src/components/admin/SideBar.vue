<script setup></script>
<template>
  <aside
    class="w-32 md:w-64 min-h-screen bg-white border-r border-gray-200 flex flex-col shadow-md"
  >
    <div
      class="h-16 flex items-center justify-center rounded shadow bg-orange-500"
    >
      <span class="text-white font-semibold text-xl">Suiuoi</span>
    </div>
    <nav class="flex-1 p-4 space-y-3">
      <router-link
        class="block p-2 text-white font-semibold bg-orange-400 rounded-lg hover:bg-orange-500"
        >Dashboard</router-link
      >
      <router-link
        class="block p-2 text-white font-semibold bg-orange-400 rounded-lg hover:bg-orange-500"
        >Quản lý nhân viên</router-link
      >
      <router-link
        class="block p-2 text-white font-semibold bg-orange-400 rounded-lg hover:bg-orange-500"
        >Quản lý menu</router-link
      >
      <router-link
        class="block p-2 text-white font-semibold bg-orange-400 rounded-lg hover:bg-orange-500"
        >Quản lý đơn hàng</router-link
      >
      <router-link
        class="block p-2 text-white font-semibold bg-orange-400 rounded-lg hover:bg-orange-500"
        >Bàn</router-link
      >
      <router-link
        class="block p-2 text-white font-semibold bg-orange-400 rounded-lg hover:bg-orange-500"
        >Doanh thu</router-link
      >
      <router-link
        class="block p-2 text-white font-semibold bg-orange-400 rounded-lg hover:bg-orange-500"
        >Hóa đơn</router-link
      >
    </nav>
    <div class="border-t border-gray-200 p-4 space-y-3">
      <router-link
        class="block p-2 text-white font-semibold bg-orange-400 rounded-lg hover:bg-orange-500"
        >Settings</router-link
      >
      <router-link
        class="block p-2 text-white font-semibold bg-orange-400 rounded-lg hover:bg-orange-500"
        >Logout</router-link
      >
    </div>
  </aside>
</template>
