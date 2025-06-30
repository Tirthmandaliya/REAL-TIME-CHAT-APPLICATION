import { useChatStore } from "../store/useChatStore";
import { useEffect, useRef } from "react";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import useAuthStore from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils";

const ChatContainer = () => {
    const {
        message,
        selectedUser,
        getMessages,
        isMessageLoading,
        subscribeToMessages,
        unsubscribeFromMessages,
    } = useChatStore();

    const { authUser } = useAuthStore();
    const messageEndRef = useRef(null);

    // Fetch messages and subscribe on user change
    useEffect(() => {
        if (!selectedUser?._id) return;

        getMessages(selectedUser);
        subscribeToMessages();

        return () => {
            unsubscribeFromMessages();
        };
    }, [selectedUser?._id]);

    // Auto-scroll on new message
    useEffect(() => {
        if (messageEndRef.current) {
            messageEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [message]);

    if (isMessageLoading) {
        return (
            <div className="flex-1 flex flex-col overflow-auto">
                <ChatHeader />
                <MessageSkeleton />
                <MessageInput />
            </div>
        );
    }

    if (!selectedUser) {
        return (
            <div className="flex-1 flex items-center justify-center text-zinc-500">
                <p>Select a conversation to start chatting</p>
            </div>
        );
    }

    return (
        <div className="flex-1 flex flex-col overflow-auto">
            <ChatHeader />

            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
                {message.map((msg, index) => (
                    <div
                        key={msg._id}
                        className={`flex ${msg.senderId === authUser._id ? "justify-end" : "justify-start"}`}
                        ref={index === message.length - 1 ? messageEndRef : null}
                    >
                        <div className="flex items-end gap-2 max-w-[70%]">
                            {msg.senderId !== authUser._id && (
                                <div className="w-10 h-10 rounded-full overflow-hidden border">
                                    <img
                                        src={selectedUser.profilePic || "/avatar.jpeg"}
                                        alt="profile"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            )}

                            <div
                                className={`p-3 rounded-lg ${
                                    msg.senderId === authUser._id ? "bg-blue-500 text-white" : "bg-gray-700 text-white"
                                }`}
                            >
                                {msg.image && (
                                    <img src={msg.image} alt="Attachment" className="max-w-[200px] rounded mb-2" />
                                )}
                                {msg.text && <p>{msg.text}</p>}
                                <p className="text-xs text-gray-300 text-right mt-1">
                                    {formatMessageTime(msg.createdAt)}
                                </p>
                            </div>

                            {msg.senderId === authUser._id && (
                                <div className="w-10 h-10 rounded-full overflow-hidden border">
                                    <img
                                        src={authUser.profilePic || "/avatar.jpeg"}
                                        alt="profile"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <MessageInput />
        </div>
    );
};

export default ChatContainer;
