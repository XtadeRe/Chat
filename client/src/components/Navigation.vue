<template>
  <div class="bg-dark text-white p-3 vh-100">
    <div
      class="d-flex align-items-center justify-content-between mb-4 pb-2 border-bottom border-secondary"
    >
      <p class="fw-bold fs-5 mb-0">
        <i class="bi bi-chat-dots me-2"></i>
        Ваши чаты
      </p>
      <span class="badge bg-primary rounded-pill">3</span>
    </div>

    <b-nav vertical class="w-100">
      <b-nav-item class="nav-item-custom text-white py-2 px-3 rounded">
        <i class="bi bi-person-circle me-2"></i>
        Пользователь 1
        <span class="badge bg-success rounded-pill ms-2">онлайн</span>
      </b-nav-item>
      <b-nav-item class="nav-item-custom text-white-50 py-2 px-3 rounded">
        <i class="bi bi-person-circle me-2"></i>
        Пользователь 2
      </b-nav-item>
      <b-nav-item class="nav-item-custom text-white-50 py-2 px-3 rounded">
        <i class="bi bi-person-circle me-2"></i>
        Пользователь 3
      </b-nav-item>
    </b-nav>
  </div>
</template>

<style scoped>
.nav-item-custom {
  transition: all 0.3s ease;
  cursor: pointer;
  border-radius: 8px !important;
}

.nav-item-custom:hover {
  background-color: rgba(255, 255, 255, 0.1);
  transform: translateX(5px);
  color: white !important;
}

.nav-item-custom.active {
  background-color: #0d6efd !important;
  color: white !important;
}
</style>

<script>
export default {
  name: 'Navigation',
}
</script>
