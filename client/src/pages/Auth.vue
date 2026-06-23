<template>
  <div class="auth-wrapper">
    <form class="auth-form d-flex flex-column gap-3 border mt-5 rounded" @submit.prevent="handleSubmit">
      <div class="d-flex justify-content-center">
        <h3>Вход</h3>
      </div>
      <div class="form-group">
        <label for="exampleInputEmail1">Логин</label>
        <input
          type="text"
          v-model="form.login"
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
        />
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Пароль</label>
        <input type="password" v-model="form.password" class="form-control" id="exampleInputPassword1" />
      </div>
      <div class="d-flex justify-content-center">
        <span>Нет аккаунта?</span>
        <router-link to="register">Регистрация</router-link>
      </div>
      <button type="submit" class="btn btn-primary">Войти</button>
    </form>
  </div>
</template>

<script>
import { reactive } from 'vue';
import {loginUser} from '../../http/userApi.js'
import { useUserStore } from '@/stores/userStore.js';
import { useRouter } from 'vue-router';

export default {
  name: 'Auth',
  setup() {

    const userStore = useUserStore()
    const router = useRouter()
    const form = reactive({
      login: '',
      password: ''
    }) 

    const handleSubmit = async () => {
      const result = await loginUser(
        form.login,
        form.password
      )
      userStore.login(result.user)
      router.push('/')
    }

    return {
      form,
      handleSubmit
    }

  }
}
</script>

<style scoped>
.auth-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}

.auth-form {
  width: 100%;
  max-width: 400px;
  padding: 20px;
}
</style>
