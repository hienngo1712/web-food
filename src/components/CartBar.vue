<script setup>
import { ref, computed, onMounted } from "vue";
import axios from "axios";
const cartItems = ref([]);
onMounted(async () => {
  try {
    const res = await axios.get(
      "https://685a05679f6ef9611154cb93.mockapi.io/cart"
    );
    cartItems.value = res.data.items;
  } catch (error) {
    console.error("Lỗi lấy cart:", error);
  }
});
const totalPrice = computed(() => {
  return cartItems.value.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
});
</script>
<template>
  <div class="w-full fixed bottom-0 left-0 right-0 text-white bg-white p-4">
    <div class="flex justify-around rounded-xl items-center h-12 bg-orange-400">
      <p class="text-lg font-semibold">{{ totalPrice.toLocaleString() }} đ</p>
      <p class="px-4 py-2 text-lg text-right font-semibold">Xem và xác nhận</p>
    </div>
  </div>
</template>
