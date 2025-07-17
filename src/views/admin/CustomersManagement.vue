<script setup>
import { ref, onMounted, reactive } from "vue";
import apiClient from "../../api/axiosClient";

const customers = ref([]);
const newCustomer = reactive({
  customer_name: "",
  phone_number: "",
  points: "",
});
const editingCustomerID = ref(null);

const fetchCustomer = async () => {
  try {
    const res = await apiClient.get("/kitchen/customers");
    customers.value = res.data;
  } catch (error) {
    console.error("Lỗi lấy danh sách customer:", error);
  }
};

const handleAddOrUpdateCustomer = async () => {
  try {
    const formData = new FormData();
    formData.append("customer_name", newCustomer.customer_name);
    formData.append("phone_number", newCustomer.phone_number);
    formData.append("points", newCustomer.points);

    if (editingCustomerID.value) {
      await apiClient.patch(
        `/kitchen/customers/${editingCustomerID.value}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
    } else {
      await apiClient.post("/kitchen/customers", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    }

    resetForm();
    await fetchCustomer();
  } catch (error) {
    console.error("Lỗi thêm/cập nhật customer:", error);
    alert("Thêm/Cập nhật customer thất bại");
  }
};

const resetForm = () => {
  Object.assign(newCustomer, {
    customer_name: "",
    phone_number: "",
    points: "",
  });
  editingCustomerID.value = null;
};

const editCustomer = (customer) => {
  newCustomer.customer_name = customer.customer_name;
  newCustomer.phone_number = customer.phone_number;
  newCustomer.points = customer.points;

  editingCustomerID.value = customer.id;
};

const cancelEdit = () => resetForm();

const deleteCustomer = async (phone_number) => {
  if (!confirm("Bạn có chắc muốn xoá?")) return;
  try {
    await apiClient.delete(`/kitchen/accounts/${phone_number}`);
    await fetchCustomer();
  } catch (error) {
    console.error("Lỗi xoá customer:", error);
    alert("Xoá thất bại");
  }
};

onMounted(fetchCustomer);
</script>

<template>
  <div class="flex-1">
    <div class="min-h-screen p-8 bg-gray-100">
      <h2 class="text-3xl font-bold mb-6 text-center uppercase">
        Quản lý Khách hàng
      </h2>

      <div class="max-w-3xl mx-auto">
        <h3 class="text-xl font-semibold mb-4 text-center">
          Thêm/Sửa Khách hàng
        </h3>
        <div class="space-y-4">
          <input
            v-model="newCustomer.customer_name"
            type="text"
            placeholder="Tên người dùng"
            class="w-full p-2 border rounded"
          />
          <input
            v-model="newCustomer.phone_number"
            type="text"
            placeholder="Số điện thoại"
            class="w-full p-2 border rounded"
          />
          <input
            v-model="newCustomer.points"
            type="text"
            placeholder="Điểm"
            class="w-full p-2 border rounded"
          />
          <button
            @click="handleAddOrUpdateCustomer"
            class="w-full bg-orange-500 text-white p-2 rounded hover:bg-orange-600"
          >
            {{ editingCustomerID ? "Cập nhật Khách hàng" : "Thêm Khách hàng" }}
          </button>

          <button
            v-if="editingCustomerID"
            @click="cancelEdit"
            class="w-full bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
          >
            Huỷ
          </button>
        </div>
      </div>

      <div class="mt-8">
        <h3 class="text-xl font-semibold mb-4 text-center">
          Danh sách Khách hàng
        </h3>
        <table class="w-full">
          <thead>
            <tr class="bg-gray-200 text-center">
              <th class="p-2 border">Tên khách hàng</th>
              <th class="p-2 border">Số điện thoại</th>
              <th class="p-2 border">Điểm</th>
              <th class="p-2 border">Hành động</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="customer in customers"
              :key="customer.id"
              class="text-center"
            >
              <td class="p-2 border">{{ customer.customer_name }}</td>
              <td class="p-2 border">{{ customer.phone_number }}</td>
              <td class="p-2 border">{{ customer.points }}</td>
              <td class="p-2 border">
                <button
                  @click="editCustomer(customer)"
                  class="bg-yellow-500 text-white px-2 py-1 rounded mr-2 hover:bg-yellow-600"
                >
                  Cập nhật
                </button>
                <button
                  @click="deleteCustomer(customer.phone_number)"
                  class="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                >
                  Xoá
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
