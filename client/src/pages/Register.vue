<template>
  <div class="auth-wrapper">
    <form class="auth-form d-flex flex-column gap-3 border mt-5 rounded" @submit.prevent="handleSubmit">
      <div class="d-flex justify-content-center">
        <h3>Регистрация</h3>
      </div>
      <div class="form-group">
        <label for="login">Логин</label>
        <input type="text" name="login" v-model="form.login" class="form-control" id="login" aria-describedby="emailHelp" />
      </div>
      <div class="form-group">
        <label for="email">Почта</label>
        <input type="email" name="email" v-model="form.email" class="form-control" id="email" aria-describedby="emailHelp" />
      </div>
      <div class="form-group">
        <label for="password">Пароль</label>
        <input type="password" name="password" v-model="form.password" class="form-control" id="password" />
      </div>
      <div class="d-flex justify-content-center">
        <span>Есть аккаунт?</span>
        <router-link to="register">Вход</router-link>
      </div>
      <button type="submit" class="btn btn-primary">Регистрация</button>
    </form>
  </div>
</template>

<script>
import {ref, reactive} from 'vue'
import {useRouter} from 'vue-router'
import {registration} from '../../http/userApi.js'

export default {
  name: 'Register',
  setup() {
    const router = useRouter()

    const form = reactive({
      login: '',
      password: '',
      email: ''
    })

    const handleSubmit = async () => {

    try {
      const result = await registration(
        form.email,
        form.password,
        form.login
      )
        console.log('Регистрация успешна:', result)
        router.push('/auth')

    } catch (e) {
      console.log(e)
    }
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
