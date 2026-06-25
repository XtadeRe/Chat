<template>
  <b-modal v-model="localShow" :title="title">
    <div v-if="users && users.length > 0">
      <p class="mb-2">Найдено пользователей: {{ users.length }}</p>
      <ul class="list-unstyled">
        <li v-for="user in users" :key="user.id" class="py-1 d-grid border rounded mt-2" style="grid-template-columns: 1fr auto; align-items: center; gap: 12px;">
          <div style="display: flex; align-items: center; overflow: hidden;">
            <i class="bi bi-person-circle me-2" style="flex-shrink: 0;"></i>
            <span style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">{{ user.login }}</span>
          </div>
          <b-button style="white-space: nowrap; padding: 4px 12px;" variant="outline-primary" @click="chatStore.addNavUser(userStore.user.id, user.id)">Создать чат</b-button>
        </li>
      </ul>
    </div>
    <div v-else>
      <p class="my-4 text-center text-muted">Пользователи не найдены</p>
    </div>
  </b-modal>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useUserStore } from '@/stores/userStore';
import { useChatStore } from '@/stores/chatStore';

const userStore = useUserStore();
const chatStore = useChatStore();

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: 'Модальное окно'
  },
  users: {
    type: Array,
    default: () => []
  }
});

const emit = defineEmits(['update:show']);

const localShow = ref(props.show);

watch(() => props.show, (newVal) => {
  localShow.value = newVal;
});

watch(localShow, (newVal) => {
  emit('update:show', newVal);
});
</script>