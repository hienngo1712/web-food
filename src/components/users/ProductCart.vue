<script setup>
import { ref, watch } from "vue";
import { useCartStore } from "../../stores/cart";
const cart = useCartStore();
const props = defineProps(["product"]);
const quantity = ref(0);
// const decrease = () => quantity.value > 0 && quantity.value--;
// const increase = () => quantity.value++;
const decrease = () => {
  if (quantity.value > 0) {
    quantity.value--;
    cart.removeItem(props.product);
  }
};
const increase = () => {
  quantity.value++;
  cart.addItem(props.product);
};

//đồng bộ giỏ hàng
watch(
  () => cart.items, //hàm getter trả về cart.items
  () => {
    const q = cart.getItemQuantity(props.product.id);
    quantity.value = q;
  },
  {
    immediate: true, // callback ngay lập tức 1 lần khi component mounted
    deep: true, // theo dõi sâu bên trong mảng cart.items
  }
);
</script>
<template>
  <div class="bg-white rounded-xl shadow p-2 space-y-2">
    <img :src="product.image" class="w-full h-45 md:h-150 rounded-lg" />
    <p class="font-semibold text-sm">{{ product.name_food }}</p>
    <div class="flex items-center justify-between">
      <p class="text-orange-500 text-sm font-semibold">
        {{ product.price.toLocaleString() }} đ
      </p>
      <div class="text-right p-2">
        <button
          @click="decrease"
          :disabled="quantity <= 0"
          v-show="quantity >= 1"
          class="px-2 rounded-xl bg-orange-400 text-white text-lg"
        >
          -
        </button>
        <span v-show="quantity >= 1" class="ml-2 mr-2"> {{ quantity }} </span>
        <button
          @click="increase"
          class="px-2 bg-orange-400 text-white text-lg"
          :class="quantity >= 1 ? 'rounded-xl ' : 'rounded-full'"
        >
          +
        </button>
      </div>
    </div>
  </div>
</template>
