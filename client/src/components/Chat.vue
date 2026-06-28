<template>
  <div v-if="chatStore.messageToUser">
      <h3>В чате с {{ chatStore.messageToUser.login }}</h3>
    </div>
    <div v-else>
      <h3>Выберите собеседника</h3>
    </div>
  <div class="chat-wrapper">
    <div class="messages-block bg-light rounded p-3">
      <div>
        <i class="bi bi-chat-dots display-1 text-muted"></i>
        <p class="text-muted mt-3">Нет сообщений. Начните диалог!</p>
      </div>
    </div>

    <div class="input-area mt-3">
      <div class="input-group">
        <input
          type="text"
          v-model="messageInput"
          class="form-control rounded-start"
          placeholder="Введите сообщение..."
          aria-describedby="button-addon2"/>
        <button
          class="btn btn-primary"
          type="button"
          id="button-addon2"
          @click="send(messageInput)"
          >
          <i class="bi bi-send me-2"></i>
          Отправить
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useChatStore } from '@/stores/chatStore';
import { useUserStore } from '@/stores/userStore';
import { sendMessage } from '@/plugins/useSocket';
import { ref } from 'vue';


const chatStore = useChatStore();
const userStore = useUserStore();
const messageInput = ref('');

const send = async (message) => {
    sendMessage(message, userStore.user.id, chatStore.messageToUser.chat_id)
    messageInput.value = '';
}

</script>

<style scoped>
.chat-wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.messages-block {
  flex: 1;
  min-height: 500px;
  max-height: calc(100vh - 200px);
  overflow-y: auto;
  background: #f8f9fa;
  border-radius: 12px;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  min-height: 300px;
}

.messages-list {
  padding: 10px;
}

.message-item {
  display: flex;
  margin-bottom: 12px;
}

.message-own {
  justify-content: flex-end;
}

.message-bubble {
  max-width: 70%;
  padding: 10px 15px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.message-own .message-bubble {
  background: #0d6efd;
  color: white;
}

.message-own .message-bubble .text-muted {
  color: rgba(255, 255, 255, 0.7) !important;
}

.message-own .message-bubble .message-author {
  color: white;
}

.message-header {
  margin-bottom: 5px;
}

.message-author {
  font-size: 0.9rem;
}

.message-text {
  font-size: 0.95rem;
  word-wrap: break-word;
}

/* Поле ввода */
.input-area {
  margin-top: 15px;
}

.input-group {
  background: white;
  border-radius: 12px;
  padding: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.input-group .form-control {
  border: none;
  padding: 12px 15px;
  font-size: 0.95rem;
}

.input-group .form-control:focus {
  box-shadow: none;
  border-color: transparent;
}

.input-group .btn {
  border-radius: 8px;
  padding: 10px 25px;
  font-weight: 600;
  border: none;
}

/* Скроллбар */
.messages-block::-webkit-scrollbar {
  width: 6px;
}

.messages-block::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.messages-block::-webkit-scrollbar-thumb {
  background: #c1c7cd;
  border-radius: 3px;
}

.messages-block::-webkit-scrollbar-thumb:hover {
  background: #a8b0b8;
}

/* Анимация появления сообщений */
.message-item {
  animation: slideIn 0.3s ease;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Адаптивность */
@media (max-width: 768px) {
  .messages-block {
    min-height: 400px;
    max-height: calc(100vh - 180px);
  }

  .message-bubble {
    max-width: 85%;
  }

  .input-group .btn {
    padding: 10px 15px;
    font-size: 0.9rem;
  }
}
</style>


