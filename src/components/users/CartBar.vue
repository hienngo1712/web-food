<script setup>
import { onMounted } from "vue";
import { useCartStore } from "../../stores/cart";
import axios from "axios";
const cart = useCartStore();
onMounted(() => cart.fetchCart());
const sendOrder = async () => {
  try {
    if (cart.items.length === 0) {
      alert("Giỏ hàng trống ko thể gửi");
      return;
    }
    const orderData = {
      user_id: "123",
      items: cart.items,
      total: cart.total,
      status: "active",
    };
    await axios.post(
      "https://685a05679f6ef9611154cb93.mockapi.io/orders",
      orderData
    );
    alert("Đã gửi order tới bếp");
    cart.items = [];
    cart.updateTotal();
  } catch (err) {
    console.error("Lỗi gửi order", err);
    alert("Gửi order thất bại, thử lại sau");
  }
};

const formatCurrency = (amount) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
    amount
  );
</script>
<template>
  <div
    v-show="cart.total > 0"
    class="w-full fixed bottom-0 left-0 right-0 text-white bg-white p-4"
  >
    <div
      @click="sendOrder"
      class="flex justify-around rounded-xl items-center h-12 bg-orange-400"
    >
      <p class="text-lg text-center font-semibold">
        {{ formatCurrency(cart.total) }}
      </p>
      <p class="px-4 py-2 text-lg text-right font-semibold">Xem và xác nhận</p>
    </div>
  </div>
</template>
