<template>
  <header
    class="flex justify-between items-center h-16 px-4 border-b bg-white shadow-sm"
  >
    <!-- Search -->
    <div class="flex items-center gap-2 w-full max-w-md">
      <p class="fas fa-search mr-2"></p>
      <input
        type="text"
        placeholder="Search something..."
        class="w-full border rounded px-3 py-1 focus:outline-none"
      />
    </div>

    <!-- User Info -->
    <div class="flex items-center gap-4">
      <span class="text-gray-600 text-sm">Xin chào</span>
      <div class="relative">
        <img
          src="https://scontent.fhan14-5.fna.fbcdn.net/v/t39.30808-6/474193369_2059487117825305_8477156851900558352_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeH58vp1xfPLNkMBbXHdvZfYWqEQQOR0w2ZaoRBA5HTDZuuiS3L6llF02daoxFdDlqmOoPh2Y8Dp-VI82UFKOgND&_nc_ohc=7q9zSu9Eds4Q7kNvwEHLroP&_nc_oc=Adm31PzFHJCBtgrefJ09Nwqpb3ghNkTgjGAQrLYrCerwR-sz46yWPLdp60KXrgTp32g&_nc_zt=23&_nc_ht=scontent.fhan14-5.fna&_nc_gid=X28tfcqIgNmJIk41gkzffQ&oh=00_AfN18gme7DRXvPVXiQUmBtp283r5SzLUMVgjrIj_P8bp0w&oe=686C30AA"
          alt="avatar"
          class="w-8 h-8 rounded-full"
        />
        <span
          class="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center"
          >7</span
        >
      </div>
    </div>
  </header>
</template>

<script setup></script>
