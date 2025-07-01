<script setup>
import { ref } from "vue";
const rating = ref(0);
const comment = ref("");
const phone = ref("");
const ratingLabels = {
  1: "Rất thất vọng",
  2: "Thất vọng",
  3: "Bình thường",
  4: "Hài lòng",
  5: "Rất hài lòng",
};
const submitFeedback = () => {
  if (
    rating.value === 0 ||
    comment.value.trim() === "" ||
    phone.value.trim() === ""
  ) {
    alert("Vui lòng điền đầy đủ thông tin đánh giá.");
    return;
  }

  alert("Cảm ơn bạn đã đánh giá!");
  rating.value = 0;
  comment.value = "";
  phone.value = "";
};
</script>
<template>
  <div class="min-h-screen flex flex-col items-center justify-center p-4">
    <div class="w-full bg-amber-50 p-4 rounded-lg shadow-md mb-4">
      <h2 class="text-xl font-bold mb-2">
        Trải nghiệm của bạn ở nhà hàng hôm nay thế nào?
      </h2>

      <div class="flex mb-4">
        <span
          v-for="i in 5"
          :key="i"
          @click="rating = i"
          class="text-4xl"
          :class="i <= rating ? 'text-yellow-400' : 'text-gray-200'"
        >
          ★</span
        >
      </div>
      <div class="text-lg font-semibold text-gray-600 mb-4 italic">
        {{ ratingLabels[rating] || "Chưa đánh giá" }}
      </div>
      <!-- Góp ý -->
      <textarea
        v-model="comment"
        class="w-full border rounded p-2 mb-4"
        placeholder="Viết góp ý cho nhà hàng..."
      ></textarea>
      <!-- Số điện thoại -->
      <div class="grid grid-cols-2 gap-2 mb-4">
        <input
          type="tel"
          v-model="phone"
          placeholder="Nhập số điện thoại"
          class="border rounded-lg px-4 py-2"
        />
        <button
          @click="submitFeedback"
          class="bg-orange-400 text-white font-semibold border py-2 rounded-lg"
        >
          Gửi đánh giá
        </button>
      </div>
      <button
        @click="$router.push('/')"
        class="bg-orange-400 w-full text-white font-semibold border py-2 rounded-lg"
      >
        Trang chủ
      </button>
    </div>
  </div>
</template>
