import { X } from 'lucide-react'
import { useChatStore } from '../store/useChatStore.js';
import useAuthStore from '../store/useAuthStore.js';

const ChatHeader = () => {
    const { selectedUser, setSelectedUser } = useChatStore();
    const { onlineUsers } = useAuthStore();

    return (
        <div className='p-2.5 border-b border-base-300'>
            <div className='flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                    {/* Avatar */}
                    <div className='avatae'>
                        <div className='size-10 rounded-full relative'>
                            <img src={selectedUser.profilePic || "/avatar.jpeg"} alt={selectedUser.fullName} />
                        </div>
                    </div>
                    {/* User info */}
                    <div className='font-medium'>
                        <h3 className='text-sm text-base-content/70'>{selectedUser.fullName}</h3>
                        <p>{onlineUsers.includes(selectedUser._id) ? "Online" : "Offline" }</p>
                    </div>
                </div>
                {/* Close Button */}
                <button onClick={() => setSelectedUser(null)}><X /></button>
            </div>
        </div>
    )
}

export default ChatHeader;