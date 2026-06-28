import { io, Socket } from 'socket.io-client';
import type { App } from 'vue';

const SOCKET_URL = import.meta.env.VITE_SERVER_URL || 'http://localhost:3000';

export const socket: Socket = io(SOCKET_URL, {
  withCredentials: true,
  transports: ['websocket', 'polling']
});

socket.on('connect', () => {
  console.log('Connected to server');
});

export default {
  install(app: App) {
    app.config.globalProperties.$socket = socket;
    app.provide('socket', socket);
  }
};