<script setup>
import SideBar from "../../components/admin/SideBar.vue";
import TopNav from "../../components/admin/TopNav.vue";
import HeroBanner from "../../components/admin/HeroBanner.vue";
import CategoryTabs from "../../components/admin/CategoryTabs.vue";
</script>
<template>
  <div class="flex">
    <SideBar />
    <div class="flex-1">
      <TopNav />
      <div class="p-4">
        <HeroBanner />
        <CategoryTabs />
      </div>
    </div>
  </div>
</template>
