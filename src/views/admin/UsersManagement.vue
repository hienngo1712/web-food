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
    console.log("Thông tin người dùng", users.value);
  } catch (error) {
    console.error("Lấy thông tin người dùng bị lỗi", error);
  }
};

onMounted(fetchUser);

const handleAddOrUpdateUser = async () => {
  try {
    const payload = {
      ...newUser,
      roles: newUser.roles.map((r) => JSON.parse(r)),
    };

    if (editingUserID.value) {
      await apiClient.patch(`/accounts/${editingUserID.value}`, payload);
      editingUserID.value = null;
    } else {
      await apiClient.post("/accounts", payload);
    }

    Object.assign(newUser, {
      username: "",
      full_name: "",
      email: "",
      password: "",
      roles: [],
    });

    await fetchUser();
  } catch (error) {
    console.error("Thêm/Cập nhật bị lỗi", error);
    alert("Thêm/Cập nhật thất bại");
  }
};

const editUser = (user) => {
  newUser.username = user.username;
  newUser.full_name = user.full_name;
  newUser.email = user.email;
  newUser.password = "";
  newUser.roles = user.roles.map((r) => JSON.stringify(r));
  editingUserID.value = user.id;
};

const deleteUser = async (id) => {
  if (!confirm("Bạn có chắc muốn xóa người dùng này?")) return;
  try {
    await apiClient.delete(`/accounts/${id}`);
    await fetchUser();
  } catch (error) {
    console.error("Xóa người dùng bị lỗi: ", error);
    alert("Xóa người dùng thất bại");
  }
};
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
            type="text"
            v-model="newUser.username"
            placeholder="Tên người dùng"
            class="w-full p-2 border rounded"
          />
          <input
            type="text"
            v-model="newUser.full_name"
            placeholder="Tên đầy đủ"
            class="w-full p-2 border rounded"
          />
          <input
            type="text"
            v-model="newUser.email"
            placeholder="Email"
            class="w-full p-2 border rounded"
          />
          <input
            v-if="!editingUserID"
            type="password"
            v-model="newUser.password"
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
                Người dùng
              </label>
              <label class="flex items-center gap-2">
                <input
                  type="checkbox"
                  :value="JSON.stringify({ code: 'ADMIN' })"
                  v-model="newUser.roles"
                />
                Quản trị viên
              </label>
              <label class="flex items-center gap-2">
                <input
                  type="checkbox"
                  :value="JSON.stringify({ code: 'KITCHEN' })"
                  v-model="newUser.roles"
                />
                Nhà bếp
              </label>
            </div>
          </div>
          <button
            @click="handleAddOrUpdateUser"
            class="w-full bg-orange-400 text-white p-2 rounded hover:bg-orange-500"
          >
            {{ editingUserID ? "Cập nhật User" : "Thêm User" }}
          </button>
        </div>
      </div>
      <div class="mt-8">
        <h3 class="text-xl font-semibold mb-4 text-center">Danh sách User</h3>
        <table class="w-full">
          <thead>
            <tr class="bg-gray-200">
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
                  Xóa
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
