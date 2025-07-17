<script setup>
import SideBar from "../components/admin/SideBar.vue";
import TopNav from "../components/admin/TopNav.vue";
</script>
<template>
  <div class="flex">
    <SideBar />
    <div class="flex-1">
      <TopNav />
      <router-view />
    </div>
  </div>
</template>
