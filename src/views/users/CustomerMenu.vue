<script setup>
import { ref, onMounted } from "vue";
import HeaderSearch from "../../components/users/HeaderSearch.vue";
import CategoryTabs from "../../components/users/CategoryTabs.vue";
import ProductCart from "../../components/users/ProductCart.vue";
import CartBar from "../../components/users/CartBar.vue";
// import apiClient from "../api/axiosClient";
import axios from "axios";
const products = ref([]);
const selectedCategory = ref("MÓN CHÍNH");
const categories = [
  "MÓN CHÍNH",
  "MÓN GỌI THÊM",
  "ĐỒ UỐNG PHA CHẾ",
  "KHAI VỊ",
  "KHÁC",
  "NƯỚC GIẢI KHÁT",
  "BIA",
];
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

const onSelectCategory = (category) => {
  selectedCategory.value = category;

  // chuyển tên category thành id anchor
  const anchorId = category.replace(/\s/g, "").toUpperCase();
  const element = document.getElementById(anchorId);

  if (element) {
    const yOffset = -130; // muốn cách đỉnh 50px
    const y = element.getBoundingClientRect().top + window.scrollY + yOffset;

    window.scrollTo({
      top: y,
      behavior: "smooth",
    });
  }
};
</script>
<template>
  <div class="space-y-2">
    <HeaderSearch />
    <CategoryTabs
      :categories="categories"
      :selected="selectedCategory"
      @select="onSelectCategory"
    />
    <div class="space-y-4 p-2 mt-30 mb-120">
      <template v-for="cat in categories" :key="cat">
        <div
          :id="cat.replace(/\s/g, '').toUpperCase()"
          class="text-sm font-semibold py-2 border-b"
        >
          {{ cat }}
        </div>
        <div class="grid grid-cols-2 gap-2">
          <ProductCart
            v-for="(p, i) in products.filter(
              (prod) => prod.type.toUpperCase() === cat
            )"
            :key="i"
            :product="p"
          />
        </div>
      </template>
    </div>
    <CartBar />
  </div>
</template>
