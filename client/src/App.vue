<template>
  <Header />
  <router-view></router-view>
</template>

<script setup>
import { onMounted } from 'vue'
import Header from './components/Header.vue'
import { useUserStore } from './stores/userStore.ts'

const userStore = useUserStore()

onMounted(() => {
  userStore.checkAuth()
})
</script>


