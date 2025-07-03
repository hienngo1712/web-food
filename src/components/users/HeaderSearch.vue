<script setup>
import { ref, watch } from "vue";
const search = ref("");
const emit = defineEmits(["update:search"]);
watch(search, (value) => {
  emit("update:search", value);
});
</script>
<template>
  <div class="flex items-center fixed top-0 left-0 right-0 p-2 bg-white shadow">
    <p
      @click="$router.push('/')"
      class="fas fa-home text-lg rounded-xl p-2 bg-gray-100 text-orange-400 mr-2"
    ></p>
    <div class="flex-1 text-sm rounded-xl p-2 bg-gray-100">
      <p class="fas fa-search mr-2"></p>
      <input
        type="text"
        v-model="search"
        placeholder="Bạn muốn tìm món gì?"
        class="w-80"
      />
    </div>
  </div>
</template>
