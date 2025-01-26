import { useAppStore } from "@/store/Store"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import ContactsContainer from "./chat-components/contacts-container";
import EmptyChatContainer from "./chat-components/empty-chat-container";
import ChatContainer from "./chat-components/chat-container";

const Chat = () => {
  const {userInfo} = useAppStore();
  const navigate=useNavigate();

  
  useEffect(()=>{
      console.log("this is  from chat page ",userInfo);
      if(!userInfo.profileSetup){
        toast("Please setup profile to countinue");
        navigate("/profile");
      }
    },[userInfo,navigate])
  return (
    <div className="flex h-[100vh] text-white overflow-hidden">
      <ContactsContainer/>
      {/* <EmptyChatContainer/> */}
      {/* <ChatContainer/> */}
    </div>
  )
}

export default Chat
