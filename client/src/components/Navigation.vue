<template>
  <div class="bg-dark text-white p-3 vh-100">
    <div class="d-flex align-items-center justify-content-between mb-4 pb-2 border-bottom border-secondary flex-column gap-3">
      <p class="fw-bold fs-5 mb-0">
        <i class="bi bi-chat-dots me-2"></i>
        Ваши чаты
      </p>
      <b-button variant="outline-primary" class="w-100" @click="handleGetUsers">Найти</b-button>
    </div>
    <div class="d-flex align-items-center justify-content-between mb-4 pb-2 flex-column gap-3">
      <div v-if="chatStore.navChats && chatStore.navChats.length === 0" class="text-secondary text-center mt-4">
        <i class="bi bi-inbox fs-1 d-block mb-2"></i>
        У вас нет активных чатов
      </div>
      <b-button class="w-100" v-for="(chat, index) in chatStore.navChats" :key="chat.id" @click="chatStore.getOneChatInfo(chat.id, userStore.user.id)">
        {{ chat.name }} {{ index + 1 }}
        {{ console.log(chat.id) }}
      </b-button>
    </div>
    <ChatModal 
      v-model:show="modalShow" 
      title="Список пользователей" 
      :users="chatStore.allUsers?.users || chatStore.allUsers || []" 
    />
  </div>
</template>

<script setup>
import { useChatStore } from '@/stores/chatStore';
import { useUserStore } from '@/stores/userStore.ts';
import { ref, onMounted } from 'vue';
import ChatModal from '@/components/Modal.vue';

const chatStore = useChatStore();
const userStore = useUserStore()

const modalShow = ref(false);

onMounted(async () => {
    await chatStore.getUserChats(userStore.user.id)
})

const handleGetUsers = async () => {
  await chatStore.getUsers();
  modalShow.value = true;
};
</script>

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