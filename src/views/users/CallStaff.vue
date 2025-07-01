<script setup>
import { ref } from "vue";
const customerNote = ref("");
const quickOption = [
  "Lấy thêm tương cà",
  "Lấy thêm tương ớt",
  "Lấy thêm sốt chảo",
  "Lấy thêm đá",
  "Lấy thêm giấy ăn",
  "Lấy thêm dao nĩa",
];
const selectQuickOption = (text) => {
  customerNote.value = text;
};
const submitRequest = () => {
  alert(`Yêu cầu ${customerNote.value} của bạn đã được gửi `);
  customerNote.value = ""; // reset input sau khi gửi yêu cầu
};
</script>
<template>
  <div class="min-h-screen flex flex-col items-center justify-center p-4">
    <div class="w-full bg-amber-50 rounded-lg shadow-md p-4">
      <h2 class="text-lg font-semibold mb-2">Gọi nhân viên</h2>
      <p class="text-sm text-gray-500 mb-4">
        Bạn muốn yêu cầu nhân viên làm gì?
      </p>
      <!-- Nhập nội dung -->
      <input
        v-model="customerNote"
        type="text"
        placeholder="Nhập yêu cầu cụ thể"
        class="border px-4 py-2 rounded-lg mb-4 w-full"
      />
      <!-- Chọn nhanh -->
      <p class="text-xl mb-3 uppercase">Chọn nhanh</p>
      <div class="flex flex-wrap gap-4 mb-4">
        <button
          v-for="item in quickOption"
          :key="item"
          @click="selectQuickOption(item)"
          class="bg-gray-100 text-sm px-3 py-1 border rounded-lg hover:bg-blue-100"
        >
          {{ item }}
        </button>
      </div>
      <!-- Gửi yêu cầu -->
      <button
        @click="submitRequest"
        class="bg-orange-400 text-white font-semibold w-full border py-2 rounded-lg mb-4"
      >
        Gửi yêu cầu
      </button>
      <button
        @click="$router.push('/')"
        class="bg-orange-400 text-white font-semibold w-full border py-2 rounded-lg"
      >
        Trang chủ
      </button>
    </div>
  </div>
</template>
