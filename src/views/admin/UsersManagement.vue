<script setup>
import { ref, onMounted, reactive } from "vue";
import apiClient from "../../api/axiosClient";

const users = ref([]);
const newUser = reactive({
  username: "",
  full_name: "",
  email: "",
  password: "",
  roles: [],
});
const editingUserID = ref(null);

const fetchUser = async () => {
  try {
    const res = await apiClient.get("/accounts");
    users.value = res.data.results;
  } catch (error) {
    console.error("Lỗi lấy danh sách user:", error);
  }
};

const handleAddOrUpdateUser = async () => {
  try {
    const formData = new FormData();
    formData.append("username", newUser.username);
    formData.append("full_name", newUser.full_name);
    formData.append("email", newUser.email);

    if (!editingUserID.value && newUser.password) {
      formData.append("password", newUser.password);
    }

    // Sửa: gửi toàn bộ mảng roles dưới dạng JSON string
    newUser.roles.forEach((role) => {
      const parsed = JSON.parse(role);
      formData.append("roles", parsed.code);
    });
    // Log dữ liệu gửi đi để debug
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }
    if (editingUserID.value) {
      if (formData.has("password")) {
        formData.delete("password");
      }
      await apiClient.patch(`/accounts/${editingUserID.value}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    } else {
      await apiClient.post("/accounts", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    }

    resetForm();
    await fetchUser();
  } catch (error) {
    console.error("Lỗi thêm/cập nhật user:", error);
    alert("Thêm/Cập nhật user thất bại");
  }
};

const resetForm = () => {
  Object.assign(newUser, {
    username: "",
    full_name: "",
    email: "",
    password: "",
    roles: [],
  });
  editingUserID.value = null;
};
//
const editUser = (user) => {
  newUser.username = user.username;
  newUser.full_name = user.full_name;
  newUser.email = user.email;
  newUser.password = ""; // Không hiển thị mật khẩu khi chỉnh sửa
  newUser.roles = user.roles.map((r) => JSON.stringify({ code: r.code }));
  editingUserID.value = user.id;
};

const cancelEdit = () => resetForm();

const deleteUser = async (id) => {
  if (!confirm("Bạn có chắc muốn xoá?")) return;
  try {
    await apiClient.delete(`/accounts/${id}`);
    await fetchUser();
  } catch (error) {
    console.error("Lỗi xoá user:", error);
    alert("Xoá thất bại");
  }
};

onMounted(fetchUser);
</script>

<template>
  <div class="flex-1">
    <div class="min-h-screen p-8 bg-gray-100">
      <h2 class="text-3xl font-bold mb-6 text-center uppercase">
        Quản lý User
      </h2>

      <div class="max-w-3xl mx-auto">
        <h3 class="text-xl font-semibold mb-4 text-center">Thêm/Sửa User</h3>
        <div class="space-y-4">
          <input
            v-model="newUser.username"
            type="text"
            placeholder="Tên người dùng"
            class="w-full p-2 border rounded"
          />
          <input
            v-model="newUser.full_name"
            type="text"
            placeholder="Tên đầy đủ"
            class="w-full p-2 border rounded"
          />
          <input
            v-model="newUser.email"
            type="text"
            placeholder="Email"
            class="w-full p-2 border rounded"
          />
          <input
            v-if="!editingUserID"
            v-model="newUser.password"
            type="password"
            placeholder="Mật khẩu"
            class="w-full p-2 border rounded"
          />

          <div>
            <label class="block font-semibold mb-2">Chọn vai trò:</label>
            <div class="flex gap-4 flex-wrap">
              <label class="flex items-center gap-2">
                <input
                  type="checkbox"
                  :value="JSON.stringify({ code: 'USER' })"
                  v-model="newUser.roles"
                />
                User
              </label>
              <label class="flex items-center gap-2">
                <input
                  type="checkbox"
                  :value="JSON.stringify({ code: 'ADMIN' })"
                  v-model="newUser.roles"
                />
                Quyền Admin
              </label>
              <label class="flex items-center gap-2">
                <input
                  type="checkbox"
                  :value="JSON.stringify({ code: 'KITCHEN' })"
                  v-model="newUser.roles"
                />
                Quyền Kitchen
              </label>
            </div>
          </div>

          <button
            @click="handleAddOrUpdateUser"
            class="w-full bg-orange-500 text-white p-2 rounded hover:bg-orange-600"
          >
            {{ editingUserID ? "Cập nhật User" : "Thêm User" }}
          </button>

          <button
            v-if="editingUserID"
            @click="cancelEdit"
            class="w-full bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
          >
            Huỷ
          </button>
        </div>
      </div>

      <div class="mt-8">
        <h3 class="text-xl font-semibold mb-4 text-center">Danh sách User</h3>
        <table class="w-full">
          <thead>
            <tr class="bg-gray-200 text-center">
              <th class="p-2 border">Tên người dùng</th>
              <th class="p-2 border">Tên đầy đủ</th>
              <th class="p-2 border">Email</th>
              <th class="p-2 border">Vai trò</th>
              <th class="p-2 border">Hành động</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.id" class="text-center">
              <td class="p-2 border">{{ user.username }}</td>
              <td class="p-2 border">{{ user.full_name }}</td>
              <td class="p-2 border">{{ user.email }}</td>
              <td class="p-2 border">
                {{ user.roles.map((r) => r.roleName).join(", ") || "-" }}
              </td>
              <td class="p-2 border">
                <button
                  @click="editUser(user)"
                  class="bg-yellow-500 text-white px-2 py-1 rounded mr-2 hover:bg-yellow-600"
                >
                  Cập nhật
                </button>
                <button
                  @click="deleteUser(user.id)"
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
