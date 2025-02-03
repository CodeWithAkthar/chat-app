export const createChatSlice = (set, get) => ({
  selectedChatType: undefined,
  selectedChatData: undefined,
  selectedChatMessages: [],
  directMessagesContacts: [],
  isUploading: false,
  isDownloading: false,
  fileUploadProgress: 0,
  fileDownloadProgress: 0,
  channels: [],
  setChannels: (channels) => set({ channels }),
  setIsUploading: (isUploading) => set({ isUploading }),
  setIsDownloading: (isDownloading) => set({ isDownloading }),
  setFileUploadProgress: (fileUploadProgress) => set({ fileUploadProgress }),
  setFileDownloadProgress: (fileDownloadProgress) =>
    set({ fileDownloadProgress }),

  setSelectedChatType: (selectedChatType) => set({ selectedChatType }),
  setSelectedChatData: (selectedChatData) => set({ selectedChatData }),
  setSelectedChatMessages: (selectedChatMessages) =>
    set({ selectedChatMessages }),
  setDirectMessagesContacts: (directMessagesContacts) =>
    set({ directMessagesContacts }),
  closeChat: () =>
    set({
      selectedChatType: undefined,
      selectedChatData: undefined,
      selectedChatMessages: [],
    }),

  addChannel: (channel) => {
    const channels = get().channels;
    set({ channels: [channel, ...channels] });
  },

  addMessage: (message) => {
    const selectedChatMessages = get().selectedChatMessages;
    const selectedChatType = get().selectedChatType;

    set({
      selectedChatMessages: [
        ...selectedChatMessages,
        {
          ...message,
          recipient:
            selectedChatType === "channel"
              ? message.recipient
              : message.recipient._id,
          sender:
            selectedChatType === "channel"
              ? message.sender
              : message.sender._id,
        },
      ],
    });
  },
  // Using Zustand store
  addChannelInChannelList: (message) => {
    set((state) => {
      const channels = [...state.channels];
      const channelToMove = channels.find(
        (channel) => channel._id === message.channelId
      );
  
      if (channelToMove) {
        // Update the channel with new message data
        const updatedChannel = {
          ...channelToMove,
          lastMessage: message.content,
          timestamp: message.timestamp || new Date().toISOString(),
          unreadCount: channelToMove._id !== state.selectedChatData?._id 
            ? (channelToMove.unreadCount || 0) + 1 
            : 0
        };
  
        // Remove the channel from its current position
        const filteredChannels = channels.filter(
          (channel) => channel._id !== message.channelId
        );
  
        // Return new state with updated channels
        return {
          channels: [updatedChannel, ...filteredChannels]
        };
      }
  
      return { channels }; // Return unchanged if channel not found
    });
  },
});
