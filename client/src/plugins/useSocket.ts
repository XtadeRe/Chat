import { io } from 'socket.io-client';
import { ref } from 'vue';

const socket = io('http://localhost:3000');


export const sendMessage = async (message: string, userId: number, chatId: number) => {
    socket.emit('chat message', {
        message,
        userId,
        chatId
    });
}

