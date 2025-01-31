import { apiClient } from "@/lib/api-client";
import { useAppStore } from "@/store/Store";
import { GET_ALL_MESSAGES_ROUTE, HOST } from "@/utils/constants";
import moment from "moment";
import React, { useEffect, useRef } from "react";
import { MdFolderZip } from "react-icons/md";
import { MdDownload } from "react-icons/md";

const MessageContainer = () => {
  const scrollRef = useRef();
  const {
    selectedChatType,
    selectedChatData,
    selectedChatMessages,
    setSelectedChatMessages,
  } = useAppStore();

  // Fetch messages when chat or type changes
  useEffect(() => {
    const getMessages = async () => {
      if (!selectedChatData?._id) return;

      try {
        const response = await apiClient.post(
          GET_ALL_MESSAGES_ROUTE,
          { id: selectedChatData._id },
          { withCredentials: true }
        );

        if (response.data.messages) {
          setSelectedChatMessages(response.data.messages);
        }
      } catch (error) {
        console.error("Failed to fetch messages:", error);
      }
    };

    if (selectedChatData._id && selectedChatType === "contact") {
      getMessages();
    }
  }, [selectedChatData, selectedChatType, setSelectedChatMessages]);

  // Auto-scroll to bottom when messages update
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedChatMessages]);

  const MessageBubble = ({ message, isSender }) => (
    <div className={`${isSender ? "text-right" : "text-left"}`}>
      {message.messageType === "text" && (
        <div
          className={`
            border inline-block p-4 rounded my-1 max-w-[50%] break-words
            ${
              isSender
                ? "bg-[#8417ff]/5 text-[#8417ff]/90 border-[#8417ff]/50"
                : "bg-[#2a2b33]/5 text-white/80 border-[#ffffff]/20"
            }
          `}
        >
          {message.content}
        </div>
      )}
      {message.messageType === "file" && (
        <div
          className={`${
            message.sender !== selectedChatData._id
              ? "bg-[#8417ff]/5 text-[#8417ff]/90 border-[#8417ff]/50"
              : "bg-[#2a2b33]/5 text-white/80 border-[#ffffff]/20"
          }border inline-block p-4 rounded my-1 max-w-[50%] break-words`}
        >
          {checkIfImage(message.fileUrl) ? (
            <div className="cursor-pointer">
              <img
                src={`${HOST}/${message.fileUrl}`}
                height={300}
                width={300}
              />
            </div>
          ) : (
            <div className="flex items-center justify-center gap-4">
              <span className="p-3 text-3xl rounded bg-black/20 text-rounded-full">
                <MdFolderZip />
              </span>
              <span>{message.fileUrl.split("/").pop()}</span>
              <span className="p-3 text-2xl transition-all duration-300 rounded-full cursor-pointer bg-black/20 hover:bg-black/50">
                <MdDownload />
              </span>
            </div>
          )}
        </div>
      )}
      <div className="text-xs text-gray-600">
        {moment(message.timestamp).format("LT")}
      </div>
    </div>
  );

  const DateDivider = ({ date }) => (
    <div className="my-2 text-center text-gray-500">
      {moment(date).format("LL")}
    </div>
  );

  const checkIfImage = (filePath) => {
    const imageRegex =
      /\.(jpg|jpeg|png|gif|bmp|tiff|tif|webq|svg|ico|heic|heif)$/i;
    return imageRegex.test(filePath);
  };

  const renderMessages = () => {
    let lastDate = null;
    return selectedChatMessages.map((message, index) => {
      const messageDate = moment(message.timestamp).format("YYYY-MM-DD");
      const showDate = messageDate !== lastDate;
      lastDate = messageDate;

      return (
        <div key={`${message._id || index}`}>
          {showDate && <DateDivider date={message.timestamp} />}
          {selectedChatType === "contact" && (
            <MessageBubble
              message={message}
              isSender={message.sender !== selectedChatData._id}
            />
          )}
        </div>
      );
    });
  };

  return (
    <div className="flex-1 p-4 px-8 overflow-y-auto scrollbar-hidden md:w-[65vw] lg:w-[70vw] xl:w-[80vw] w-full">
      {renderMessages()}
      <div ref={scrollRef} />
    </div>
  );
};

export default MessageContainer;
