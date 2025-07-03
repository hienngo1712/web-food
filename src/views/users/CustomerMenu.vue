<script setup>
import { ref, onMounted, computed } from "vue";
import HeaderSearch from "../../components/users/HeaderSearch.vue";
import CategoryTabs from "../../components/users/CategoryTabs.vue";
import ProductCart from "../../components/users/ProductCart.vue";
import CartBar from "../../components/users/CartBar.vue";
// import apiClient from "../api/axiosClient";
import axios from "axios";
const products = ref([]);
const selectedCategory = ref("MÓN CHÍNH");
const searchTerm = ref("");
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
    const yOffset = -130; // muốn cách đỉnh 130px
    const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
    // getBoundingClientRect() -> vị trí của phần tử so với viewpoint
    // window.scrollY vị trí cuộn hiện tại scroll offset
    window.scrollTo({
      top: y,
      behavior: "smooth",
    });
  }
};

const filteredProduct = computed(() => {
  const result = {};
  categories.forEach((cat) => {
    result[cat] = products.value.filter((prod) => {
      const matchType = prod.type.toUpperCase() === cat;
      const matchSearch =
        !searchTerm.value ||
        prod.name_food.toLowerCase().includes(searchTerm.value.toLowerCase());
      return matchType && matchSearch;
    });
  });
  return result;
});
</script>
<template>
  <div class="space-y-2">
    <HeaderSearch v-model:search="searchTerm" />
    <CategoryTabs
      :categories="categories"
      :selected="selectedCategory"
      @select="onSelectCategory"
    />
    <div class="space-y-4 p-2 mt-30 mb-120">
      <!-- v-for trên template dùng để  lặp qua từng category và nhóm các sản phẩm cùng loại -->
      <!-- cho phép lặp qua nhiều phần tử (như header + grid) trong 1 lần mà không tạo thẻ DOM dư -->
      <template v-for="cat in categories" :key="cat">
        <!-- Tiêu đề của từng nhóm món ăn -->
        <!-- Gắn id để có thể cuộn tới -->
        <div
          :id="cat.replace(/\s/g, '').toUpperCase()"
          class="text-sm font-semibold py-2 border-b border-gray-400"
        >
          {{ cat }}
        </div>
        <!-- Hiển thị list món theo từng nhóm món có type === cat -->
        <div class="grid grid-cols-2 gap-2">
          <ProductCart
            v-for="(p, i) in filteredProduct[cat]"
            :key="i"
            :product="p"
          />
        </div>
      </template>
    </div>
    <CartBar />
  </div>
</template>
