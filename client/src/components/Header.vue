<template>
  <div>
    <b-navbar toggleable="lg" type="dark" class="bg-dark border-bottom border-secondary">
      <b-navbar-brand href="#" class="fw-bold">
        <i class="bi bi-chat-square-text me-2 text-primary"></i>
        <span class="text-white">Xtade</span><span class="text-primary">Chat</span>
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse" class="border-0">
        <span class="navbar-toggler-icon"></span>
      </b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ms-auto d-flex gap-3 align-items-center">
          <b-nav-item v-if="isAuth" to="/" class="nav-link-custom px-3 py-2 rounded">
            <i class="bi bi-house me-1"></i>
            <span>Главная</span>
          </b-nav-item>

          <b-nav-item v-if="!isAuth" to="/auth" class="nav-link-custom px-3 py-2 rounded">
            <i class="bi bi-box-arrow-in-right me-1"></i>
            <span>Вход</span>
          </b-nav-item>

          <b-nav-item v-if="!isAuth" to="/register" class="nav-link-custom px-3 py-2 rounded">
            <i class="bi bi-person-plus me-1"></i>
            <span>Регистрация</span>
          </b-nav-item>

          <b-nav-item v-if="isAuth" @click="handleLogout()" class="nav-link-custom px-3 py-2 rounded">
            <i class="bi bi-box-arrow-right me-1"></i>
            <span>Выход</span>
          </b-nav-item>

          <b-avatar variant="primary" size="md" class="ms-2" text="U"></b-avatar>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import { useUserStore } from '@/stores/userStore'
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
export default {
  name: 'Header',
  setup() {
    const userStore = useUserStore()
    const router = useRouter()
    const {_isAuth} = storeToRefs(userStore)

    userStore.checkAuth()

    const handleLogout = async () => {
      await userStore.logout()
      router.push('/auth')
      userStore.checkAuth()
    }

    return {
      isAuth: _isAuth,
      handleLogout
    }
  },
}
</script>

<style scoped>
.nav-link-custom,
span {
  color: rgba(255, 255, 255, 0.7) !important;
  transition: all 0.3s ease;
  text-decoration: none;
  font-weight: 500;
}

.nav-link-custom:hover {
  color: white !important;
  background-color: rgba(255, 255, 255, 0.1);
  transform: translateY(-2px);
}

.nav-link-custom.active {
  color: white !important;
  background-color: #0d6efd !important;
}

@media (max-width: 992px) {
  .nav-link-custom {
    padding: 10px 15px !important;
  }
}
</style>
