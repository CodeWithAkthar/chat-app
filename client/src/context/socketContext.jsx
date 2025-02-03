import { useAppStore } from "@/store/Store";
import { HOST } from "@/utils/constants";
import { createContext, useContext, useEffect, useRef } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext(null);

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const socket = useRef();
  const { userInfo } = useAppStore();

  useEffect(() => {
    if (userInfo) {
      socket.current = io(HOST, {
        withCredentials: true,
        query: { userId: userInfo.id },
      });

      socket.current.on("connect", () => {
        console.log("Connected to socket server");
      });

      // Move the store access outside the handler
      const store = useAppStore.getState();

      socket.current.on("receiveMessage", (message) => {
        // Get fresh state on each message
        const { selectedChatData, selectedChatType, addMessage} =
          useAppStore.getState();
        console.log("Received message event:", message); // Added for debugging

        if (
          selectedChatType !== undefined &&
          (selectedChatData._id === message.sender._id ||
            selectedChatData._id === message.recipient._id)
        ) {
          console.log("Message matches current chat, adding:", message);
          addMessage(message);
        } else {
          console.log("Message doesn't match current chat:", {
            selectedChatType,
            selectedChatData: selectedChatData?._id,
            messageSender: message.sender._id,
            messageRecipient: message.recipient._id,
          });
        }
      });

      const handleReceiveChannelMessage = (message) => {
        // Destructure only what we need from the store
        const { 
          selectedChatData, 
          selectedChatType, 
          addMessage, 
          addChannelInChannelList 
        } = useAppStore.getState();
      
        // First update the channel list - this should happen for every message
        addChannelInChannelList(message);
      
        // Then handle the message if we're in the correct channel
        if (
          selectedChatType === 'channel' && // Add explicit check for channel type
          selectedChatData?._id === message.channelId
        ) {
          console.log("Adding message to current chat:", message);
          addMessage(message);
        } else {
          console.log("Message received for different channel:", message.channelId);
        }
      };

      socket.current.on("recieve-channel-message", handleReceiveChannelMessage);

      return () => {
        socket.current.disconnect();
      };
    }
  }, [userInfo]);

  return (
    <SocketContext.Provider value={socket.current}>
      {children}
    </SocketContext.Provider>
  );
};
