<script setup>
import { ref, onMounted } from "vue";
import HeaderSearch from "../components/HeaderSearch.vue";
import CategoryTabs from "../components/CategoryTabs.vue";
import ProductCart from "../components/ProductCart.vue";
import CartBar from "../components/CartBar.vue";
// import apiClient from "../api/axiosClient";
import axios from "axios";
const products = ref([]);
onMounted(async () => {
  try {
    const res = await axios.get(
      "https://685a05679f6ef9611154cb93.mockapi.io/menu"
    );
    products.value = res.data;
  } catch (error) {
    console.error("Lỗi lấy menu:", error);
  }
});
</script>
<template>
  <div class="space-y-2">
    <HeaderSearch />
    <CategoryTabs />
    <div class="grid grid-cols-2 gap-2 p-2">
      <ProductCart v-for="(p, i) in products" :key="i" :product="p" />
    </div>
    <CartBar />
  </div>
</template>
