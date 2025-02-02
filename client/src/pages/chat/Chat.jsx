import { useAppStore } from "@/store/Store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import ContactsContainer from "./chat-components/contacts-container";
import EmptyChatContainer from "./chat-components/empty-chat-container";
import ChatContainer from "./chat-components/chat-container";

const Chat = () => {
  const {
    userInfo,
    selectedChatType,
    isUploading,
    isDownloading,
    fileUploadProgress,
    fileDownloadProgress,
  } = useAppStore();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("this is  from chat page ", userInfo);
    if (!userInfo.profileSetup) {
      toast("Please setup profile to countinue");
      navigate("/profile");
    }
  }, [userInfo, navigate]);
  return (
    <div className="flex h-[100vh] text-white overflow-hidden">
      {isUploading && (
        <div className="h-[100vh] w-[100vw] fixed top-0 z-0 left-0 bg-black/80 flex items-center justify-center flex-col backdrop-blur-lg">
          <h5 className="text-5xl animate-pulse">Uploading files</h5>
          {fileUploadProgress}%
        </div>
      )}
      {isDownloading && (
        <div className="h-[100vh] w-[100vw] fixed top-0 z-0 left-0 bg-black/80 flex items-center justify-center flex-col backdrop-blur-lg">
          <h5 className="text-5xl animate-pulse">Downloading files</h5>
          {fileDownloadProgress}%
        </div>
      )}
      <ContactsContainer />
      {selectedChatType === undefined ? (
        <EmptyChatContainer />
      ) : (
        <ChatContainer />
      )}
      {/* <EmptyChatContainer/> */}
      {/* <ChatContainer/> */}
    </div>
  );
};

export default Chat;
