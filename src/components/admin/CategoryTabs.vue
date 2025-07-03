<template>
  <div class="flex overflow-x-auto gap-2 pb-2 mb-6">
    <button
      v-for="(cat, index) in categories"
      :key="index"
      @click="selectCategory(cat)"
      :class="[
        'flex-shrink-0 rounded-2xl px-6 py-6 text-sm whitespace-nowrap border hover:bg-orange-400 hover:text-white',
        selected === cat
          ? 'bg-orange-400 text-white'
          : 'bg-white text-gray-800',
      ]"
    >
      {{ cat }}
    </button>
  </div>
</template>

<script setup>
import { ref } from "vue";

const categories = [
  "All Menu",
  "Sushi",
  "Pizza",
  "Chicken",
  "Ramen",
  "Burger",
  "Salad",
];

const selected = ref("All Menu");

const selectCategory = (cat) => {
  selected.value = cat;
};
</script>
