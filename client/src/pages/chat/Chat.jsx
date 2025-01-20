import { useAppStore } from "@/store/Store"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

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
    <div>
      Chat
    </div>
  )
}

export default Chat
