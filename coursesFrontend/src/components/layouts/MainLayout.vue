<template>
    <div class="layout-main tw-grid tw-h-screen">
      <!-- sidebar -->
      <NavigationMenu class="sidebar-main" />
  
      <!-- wrapper -->
      <!-- <div> -->
  
      <!-- Header -->
      <div ref="headerRef" class="header-main tw-mr-6 tw-pt-6">
        <slot name="header" />
      </div>
  
      <!-- Main -->
      <main
        class="content-main custom-scroll tw--mb-6 tw--mt-6 tw-scroll-smooth"
      >
        <slot />
      </main>
  
      <!-- Footer -->
      <footer v-if="$slots.footer" ref="footerRef" class="footer-main tw-mr-6 tw-pb-6">
        <slot name="footer" />
      </footer>
      <!-- </div> -->
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  import NavigationMenu from '@/components/nav/NavigationMenu.vue'
  
  const headerRef = ref(null)
  
  const footerRef = ref(null)
  </script>
  
  <style lang="scss" scoped>
  .layout-main {
    grid-template-columns: 84px auto;
    grid-template-rows: fit-content(100%) auto fit-content(100%);
    gap: 24px;
    grid-template-areas:
      'sidebar header'
      'sidebar content'
      'sidebar footer';
  }
  
  .sidebar-main {
    grid-area: sidebar;
  }
  
  .header-main {
    grid-area: header;
  }
  
  .content-main {
    grid-area: content;
  }
  
  .footer-main {
    grid-area: footer;
  }
  </style>
  