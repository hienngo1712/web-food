<script setup>
import TopNav from "../../components/admin/TopNav.vue";
</script>
<template>
  <div class="flex-1">
    <TopNav />
    <main class="p-4 space-y-4">
      <section class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div class="bg-white rounded-xl shadow p-4">
          <p class="text-sm text-gray-500">Total User</p>
          <p class="text-2xl font-bold text-orange-500">40,689</p>
          <p class="text-green-600 text-xs">+8.5% Up from yesterday</p>
        </div>
        <div class="bg-white rounded-xl shadow p-4">
          <p class="text-sm text-gray-500">Total Order</p>
          <p class="text-2xl font-bold text-orange-500">10,293</p>
          <p class="text-green-600 text-xs">+1.3% Up from past week</p>
        </div>
        <div class="bg-white rounded-xl shadow p-4">
          <p class="text-sm text-gray-500">Total Sales</p>
          <p class="text-2xl font-bold text-orange-500">$89,000</p>
          <p class="text-red-600 text-xs">-4.3% Down from yesterday</p>
        </div>
        <div class="bg-white rounded-xl shadow p-4">
          <p class="text-sm text-gray-500">Total Pending</p>
          <p class="text-2xl font-bold text-orange-500">2,040</p>
          <p class="text-green-600 text-xs">+1.8% Up from yesterday</p>
        </div>
      </section>
      <section class="bg-white rounded-xl shadow p-4">
        <h2 class="font-semibold mb-2">Sales Details</h2>
        <!-- bạn có thể nhúng biểu đồ chart.js tại đây -->
        <div
          class="h-64 bg-orange-100 flex justify-center items-center text-orange-500"
        >
          [Chart Placeholder]
        </div>
      </section>
      <section class="bg-white rounded-xl shadow p-4">
        <h2 class="font-semibold mb-2">Deals Details</h2>
        <table class="w-full text-left">
          <thead>
            <tr>
              <th class="p-2">Product</th>
              <th class="p-2">Location</th>
              <th class="p-2">Date</th>
              <th class="p-2">Amount</th>
              <th class="p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="p-2">Apple Watch</td>
              <td class="p-2">6096 Marjolaine Landing</td>
              <td class="p-2">12.09.2019 - 12:53 PM</td>
              <td class="p-2">$34,295</td>
              <td class="p-2 text-green-600">Delivered</td>
            </tr>
          </tbody>
        </table>
      </section>
    </main>
  </div>
</template>
