<!-- src/App.vue -->
<template>
  <div class="container-fluid">
    <div class="row main-block">
      <div class="col-md-3 col-lg-2 p-0">
        <Navigation />
      </div>
      <div class="col-md-9 col-lg-10 p-3">
        <Chat />
      </div>
    </div>
  </div>
</template>

<style scoped>
.main-block {
  min-height: 100vh;
  height: 100vh;
  overflow: hidden;
}

@media (max-width: 768px) {
  .main-block {
    height: auto;
    min-height: 100vh;
  }

  .col-md-9 {
    padding: 10px !important;
  }
}
</style>

<script setup>
import Navigation from '../components/Navigation.vue'
import Chat from '../components/Chat.vue'
</script>