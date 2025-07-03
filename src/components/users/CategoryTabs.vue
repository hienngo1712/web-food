<script setup>
const props = defineProps({
  categories: Array,
  selected: String,
});
const emit = defineEmits(["select"]);
</script>
<template>
  <div
    class="max-w-[450px] md:max-w-full fixed top-12 left-0 right-0 grid grid-cols-4 md:grid-cols-8 gap-2 p-2 bg-gray-100 border-b"
  >
    <button
      v-for="(cat, i) in categories"
      :key="i"
      @click="emit('select', cat)"
      :class="props.selected === cat ? 'bg-orange-400 text-white' : 'bg-white'"
      class="rounded px-1 py-1 text-sm font-semibold line-clamp-1"
    >
      {{ cat }}
    </button>
  </div>
</template>
