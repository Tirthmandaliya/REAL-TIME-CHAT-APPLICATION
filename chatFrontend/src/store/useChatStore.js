import { create } from 'zustand';
import toast from 'react-hot-toast';
import axiosInstance from '../lib/axios.js';
import useAuthStore from './useAuthStore.js';

export const useChatStore = create((set, get) => ({
    message: [],
    users: [],
    selectedUser: null,
    isUserLoading: false,
    isMessageLoading: false,

    getUsers: async () => {
        set({ isUserLoading: true });
        try {
            const response = await axiosInstance.get('/messages/users');
            set({ users: response.data });
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to fetch users');
        } finally {
            set({ isUserLoading: false });
        }
    },

    getMessages: async (userObj) => {
        if (!userObj?._id) return;
        set({ isMessageLoading: true });

        try {
            const response = await axiosInstance.get(`/messages/${userObj._id}`);
            set({ message: response.data, selectedUser: userObj });
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Failed to fetch messages");
        } finally {
            set({ isMessageLoading: false });
        }
    },

    sendMessage: async (messageData) => {
        const { selectedUser } = get();
        if (!selectedUser?._id) {
            toast.error("No user selected for chat.");
            return;
        }
        try {
            const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);
            set((state) => ({
                message: [...state.message, res.data],
            }));
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to send message");
        }
    },

    subscribeToMessages: () => {
        const { selectedUser } = get();
        const socket = useAuthStore.getState().socket;
        if (!socket || !selectedUser) return;

        socket.off("newMessage");  // Remove previous listener to avoid duplication

        socket.on("newMessage", (newMessage) => {
            const isForCurrentChat = newMessage.senderId === selectedUser._id || newMessage.receiverId === selectedUser._id;
            if (!isForCurrentChat) return;

            set((state) => ({
                message: [...state.message, newMessage],
            }));
        });
    },

    unsubscribeFromMessages: () => {
        const socket = useAuthStore.getState().socket;
        if (socket) socket.off("newMessage");
    },

    setSelectedUser: (selectedUser) => {
        set({ selectedUser });
    },
}));
