<script setup>
import { ref } from "vue";
const categories = [
  "MÓN CHÍNH",
  "MÓN GỌI THÊM",
  "ĐỒ UỐNG PHA CHẾ",
  "KHAI VỊ",
  "KHÁC",
  "NƯỚC GIẢI KHÁT",
  "BIA",
];
const selected = ref("MÓN CHÍNH");
const selectCategory = (cat) => {
  selected.value = cat;
};
</script>
<template>
  <div
    class="max-w-[450px] md:max-w-full grid grid-cols-4 md:grid-cols-8 gap-2 p-2 bg-gray-100"
  >
    <button
      v-for="(cat, i) in categories"
      :key="i"
      @click="selectCategory(cat)"
      :class="selected === cat ? 'bg-orange-400 text-white' : 'bg-white'"
      class="rounded px-1 py-1 text-sm font-semibold line-clamp-1"
    >
      {{ cat }}
    </button>
  </div>
</template>
