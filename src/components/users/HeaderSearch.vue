<script setup>
import { ref } from "vue";
const search = ref("");
</script>
<template>
  <!--  -->
  <div class="flex items-center fixed top-0 left-0 right-0 p-2 bg-white shadow">
    <p
      @click="$router.push('/')"
      class="fas fa-home text-xl rounded-xl p-2 bg-gray-100 text-orange-400 mr-2"
    ></p>
    <div class="flex-1 text-sm rounded-xl p-2 bg-gray-100">
      <p class="fas fa-search mr-2"></p>
      <input type="text" v-model="search" placeholder="Bạn muốn tìm món gì?" />
    </div>
  </div>
</template>
