<!-- src/components/Chat.vue -->
<template>
  <div class="chat-wrapper">
    <!-- Сообщения -->
    <div class="messages-block bg-light rounded p-3">
      <div v-if="messages.length === 0" class="empty-state">
        <i class="bi bi-chat-dots display-1 text-muted"></i>
        <p class="text-muted mt-3">Нет сообщений. Начните диалог!</p>
      </div>

      <div v-else class="messages-list">
        <div
          v-for="(message, index) in messages"
          :key="index"
          class="message-item mb-2"
          :class="{ 'message-own': message.isOwn }"
        >
          <div class="message-bubble">
            <div class="message-header d-flex justify-content-between align-items-center">
              <strong class="message-author">{{ message.author }}</strong>
              <small class="text-muted">{{ message.time }}</small>
            </div>
            <p class="message-text mb-0">{{ message.text }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Поле ввода -->
    <div class="input-area mt-3">
      <div class="input-group">
        <input
          v-model="newMessage"
          type="text"
          class="form-control rounded-start"
          placeholder="Введите сообщение..."
          aria-describedby="button-addon2"
          @keyup.enter="sendMessage"
        />
        <button
          class="btn btn-primary"
          type="button"
          id="button-addon2"
          @click="sendMessage"
          :disabled="!newMessage.trim()"
        >
          <i class="bi bi-send me-2"></i>
          Отправить
        </button>
      </div>
    </div>
  </div>
</template>

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

/* Стили для пустого состояния */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  min-height: 300px;
}

/* Стили для сообщений */
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

<script>
export default {
  name: 'Chat',
  data() {
    return {
      newMessage: '',
      messages: [
        {
          author: 'Пользователь 1',
          text: 'Привет! Как дела?',
          time: '10:30',
          isOwn: false,
        },
        {
          author: 'Вы',
          text: 'Привет! Все отлично, спасибо!',
          time: '10:32',
          isOwn: true,
        },
        {
          author: 'Пользователь 1',
          text: 'Отлично! Есть новости по проекту?',
          time: '10:33',
          isOwn: false,
        },
      ],
    }
  },
  methods: {
    sendMessage() {
      const text = this.newMessage.trim()
      if (!text) return

      // Добавляем сообщение
      this.messages.push({
        author: 'Вы',
        text: text,
        time: this.getCurrentTime(),
        isOwn: true,
      })

      // Очищаем поле
      this.newMessage = ''

      // Скроллим вниз
      this.$nextTick(() => {
        const container = this.$el.querySelector('.messages-block')
        container.scrollTop = container.scrollHeight
      })

      // Имитация ответа (опционально)
      this.simulateReply()
    },

    getCurrentTime() {
      const now = new Date()
      const hours = String(now.getHours()).padStart(2, '0')
      const minutes = String(now.getMinutes()).padStart(2, '0')
      return `${hours}:${minutes}`
    },

    simulateReply() {
      // Автоматический ответ для демонстрации
      const replies = [
        'Отлично!',
        'Понял, спасибо!',
        'Хорошо, учту',
        'Будет сделано',
        'Ок, договорились',
      ]

      // Добавляем ответ через 1-2 секунды
      setTimeout(
        () => {
          const randomReply = replies[Math.floor(Math.random() * replies.length)]
          this.messages.push({
            author: 'Пользователь 1',
            text: randomReply,
            time: this.getCurrentTime(),
            isOwn: false,
          })

          this.$nextTick(() => {
            const container = this.$el.querySelector('.messages-block')
            container.scrollTop = container.scrollHeight
          })
        },
        1000 + Math.random() * 1000,
      )
    },
  },
}
</script>
