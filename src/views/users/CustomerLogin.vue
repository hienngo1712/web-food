<script setup>
import { ref, computed, watch } from "vue";
import Banner from "../../components/Banner.vue";
import apiClient from "../../api/axiosClient";
const phone_number = ref("");
const customer_name = ref("");
const customer = ref(null);
const showNotFound = ref(false);
const togglePhone = ref(false);
const err = ref("");
//Validate số đt
const isPhoneValid = computed(
  () => phone_number.value.length === 10 && /^\d+$/.test(phone_number.value)
);
//theo dõi sự thay đổi của ô input số đt (validate realtime)
watch(phone_number, (newValue) => {
  err.value =
    newValue && !isPhoneValid.value
      ? "Số điện thoại không hợp lệ. Vui lòng nhập lại."
      : "";
});

const fetchCustomer = async () => {
  try {
    const res = await apiClient.get("/kitchen/customers", {
      params: {
        phone_number: phone_number.value,
      },
    });
    if (res.data.length > 0) {
      customer.value = res.data[0];
      showNotFound.value = false;
    } else {
      customer.value = null;
      showNotFound.value = true;
    }
  } catch (error) {
    console.error("Lỗi lấy dữ liệu customer:", error);
    customer.value = null;
    showNotFound.value = true;
  }
};

const createCustomer = async () => {
  try {
    await apiClient.post("/kitchen/customers", {
      phone_number: phone_number.value,
      customer_name: customer_name.value,
    });
    await fetchCustomer();
  } catch (error) {
    console.error("Lỗi tạo khách hàng:", error);
    alert("Không thể tạo khách hàng mới. Vui lòng thử lại sau.");
  }
};
</script>
<template>
  <Banner />
  <div class="min-h-screen flex justify-center">
    <div class="space-y-4 w-full p-4">
      <!-- toggle dùng để ẩn hiện ô nhập số đt -->
      <div
        @click="togglePhone = !togglePhone"
        class="bg-blue-100 p-3 rounded-lg"
      >
        <p class="text-blue-700 font-semibold text-center">
          Nhập số điện thoại để tích điểm
        </p>
      </div>
      <div v-if="togglePhone" class="text-center w-full">
        <input
          type="text"
          v-model="phone_number"
          placeholder="Nhập số điện thoại"
          class="border px-4 py-2 rounded mb-4"
        />
        <div>
          <button
            @click="fetchCustomer"
            :disabled="!isPhoneValid"
            class="bg-green-500 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            Kiểm tra
          </button>
          <p v-if="!!err" class="text-red-500 mt-2">
            {{ err }}
          </p>
        </div>
      </div>

      <div v-if="customer" class="max-w-sm text-left">
        <h2 class="text-sm text-center sm:text-xl font-bold mb-4">
          Thông tin khách hàng
        </h2>
        <p class="text-sm sm:text-xl">
          <strong>Số điện thoại:</strong> {{ customer.phone_number }}
        </p>
        <p class="text-sm sm:text-xl">
          <strong>Tên đăng nhập:</strong> {{ customer.customer_name }}
        </p>
        <p class="text-sm sm:text-xl">
          <strong>Thời gian tạo:</strong> {{ customer.created_at }}
        </p>
        <p class="text-sm sm:text-xl">
          <strong>Thời gian cập nhật:</strong> {{ customer.updated_at }}
        </p>
        <p class="text-sm sm:text-xl">
          <strong>Điểm của quý khách:</strong> {{ customer.points }}
        </p>
      </div>

      <div v-else-if="showNotFound" class="text-center mb-4">
        <p class="text-red-500 mb-4">
          Không tìm thấy khách hàng với thông tin đã nhập.
        </p>
        <div>
          <input
            v-model="customer_name"
            placeholder="Tên khách hàng mới"
            class="w-2/3 border px-4 py-2 rounded"
          />
        </div>
        <div class="text-center mt-4">
          <button
            @click="createCustomer"
            class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Tạo khách hàng mới
          </button>
        </div>
      </div>
      <div class="grid grid-cols-3 gap-2">
        <div
          class="bg-gray-100 rounded-lg p-4 sm:p-6 flex flex-col items-center justify-center"
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/833/833472.png"
            class="w-8 h-8"
            alt="pay"
          />
          <p class="text-[10px] mt-1 font-semibold text-center">
            Gọi thanh toán
          </p>
        </div>
        <div
          @click="$router.push('/call-staff')"
          class="bg-gray-100 rounded-lg p-4 sm:p-6 flex flex-col items-center justify-center"
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/1946/1946429.png"
            class="w-8 h-8"
            alt="staff"
          />
          <p class="text-[10px] mt-1 font-semibold text-center">
            Gọi nhân viên
          </p>
        </div>
        <div
          @click="$router.push('/feedback')"
          class="bg-gray-100 rounded-lg p-4 sm:p-6 flex flex-col items-center justify-center"
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/2107/2107957.png"
            class="w-8 h-8"
            alt="rate"
          />
          <p class="text-[10px] mt-1 font-semibold text-center">Đánh giá</p>
        </div>
      </div>
      <div
        class="bg-orange-400 text-white rounded-lg p-4 text-center font-semibold text-sm"
      >
        <button @click="$router.push('/menu')">Xem Menu - Gọi món</button>
      </div>
    </div>
  </div>
</template>
