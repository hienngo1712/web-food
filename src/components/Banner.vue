<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
const banners = ref([]);
const currentBanner = ref(0);
let startX = 0; // ghi nhớ vị trí X khi người dùng bắt đầu chạm vào màn hình
let endX = 0; // ghi nhớ vị trí X khi người dùng kết thúc chạm vào màn hình

onMounted(async () => {
  try {
    const res = await axios.get(
      "https://685a05679f6ef9611154cb93.mockapi.io/banners"
    );
    banners.value = res.data;
    startSlider();
  } catch (error) {
    console.error("Lỗi lấy hình ảnh banner:", error);
  }
});
const startSlider = () => {
  setInterval(() => {
    currentBanner.value = (currentBanner.value + 1) % banners.value.length;
  }, 5000); // Chuyển banner mỗi 5 giây
};
// e.touches thuộc TouchEvent có sẵn trong JS
const startTouch = (e) => {
  startX = e.touches[0].clientX; // lấy vị trí X khi người dùng bắt đầu chạm vào màn hình
};

const moveTouch = (e) => {
  endX = e.touches[0].clientX;
  const diff = startX - endX; //tính khoảng cách vuốt
  if (Math.abs(diff) > 50) {
    if (diff > 0) {
      nextSlide(); //nếu khoảng cách vuốt lớn hơn 0, nghĩa là người dùng vuốt sang trái -> sang banner tiếp theo
    } else {
      prevSlide(); //nếu khoảng cách vuốt nhỏ hơn 0, nghĩa là người dùng vuốt sang phải -> quay lại banner trước đó
    }
    startX = endX; // reset để không bị lặp lại liên tục
  }
};
//% banners.value.length: giúp vòng lặp lại từ đầu hoặc cuối.
const nextSlide = () => {
  currentBanner.value = (currentBanner.value + 1) % banners.value.length;
};

const prevSlide = () => {
  currentBanner.value =
    (currentBanner.value - 1 + banners.value.length) % banners.value.length;
};
</script>

<template>
  <div class="w-full px-4 py-2 flex items-center justify-between">
    <!-- Sau này sẽ sửa tên quán, địa chỉ ở dạng get dữ liệu từ admin nếu có thể -->
    <div class="p-2">
      <h1 class="text-lg font-semibold">Bánh Mỳ Suiuoi</h1>
      <p class="text-sm text-gray-600">
        635 Ngọc Hồi, Khu ga Văn Điển, Thanh Trì, Hà Nội
      </p>
    </div>
  </div>
  <div
    class="w-11/12 mx-auto h-45 flex justify-center items-center rounded-2xl overflow-hidden relative mt-4 mb-4 touch-pan-x"
    @touchstart="startTouch"
    @touchmove="moveTouch"
  >
    <transition-group name="fade" tag="div">
      <img
        v-for="(img, index) in banners"
        :key="index"
        v-show="index === currentBanner"
        :src="img.image"
        alt="Banner Image"
        class="w-full h-full absolute inset-0 object-cover transition-all duration-500 ease-in-out"
      />
    </transition-group>
    <div
      class="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex gap-1"
    >
      <!--Phân biệt index bằng cách thêm 'dot-' để sau nhìn lại tránh bị nhầm(có thể bỏ qua vì ko ah trực tiếp đến code)-->
      <span
        v-for="(img, index) in banners"
        :key="'dot-' + index"
        class="w-2 h-2 rounded-full"
        :class="index === currentBanner ? 'bg-white' : 'bg-gray-400'"
      ></span>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
