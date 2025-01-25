import { apiClient } from "@/lib/api-client";
import { getColor } from "@/lib/utils";
import { useAppStore } from "@/store/Store";
import { HOST, LOGOUT_ROUTE } from "@/utils/constants";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import { FiEdit2 } from "react-icons/fi";
import { IoLogOut } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const ProfileInfo = () => {
  const { userInfo, setUserInfo } = useAppStore();
  const navigate = useNavigate();

  const logout = async () => {
    try {
      const response = await apiClient.post(
        LOGOUT_ROUTE ,
        {},
        { withCredentials: true }
      );
      if (response.status === 200) {
        navigate("/auth");
        setUserInfo(null);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="absolute bottom-0 flex items-center justify-between w-full h-16 px-10 bg-[#2a2b33]">
      <div className="flex items-center justify-center gap-3">
        <div className="relative w-12 h-12">
          <Avatar className="w-12 h-12 overflow-hidden rounded-full">
            {userInfo.image ? (
              <AvatarImage
                src={`${HOST}/${userInfo.image}`}
                alt="profile"
                className="object-cover w-full h-full bg-black rounded-full"
              />
            ) : (
              <div
                className={`flex items-center justify-center w-12 h-12 text-lg uppercase border-[1px]  rounded-full ${getColor(
                  userInfo.selectedColor
                )}`}
              >
                {userInfo.firstName
                  ? userInfo.firstName.split("").shift()
                  : userInfo.email.split("").shift()}
              </div>
            )}
          </Avatar>
        </div>
        <div>
          {userInfo.firstName && userInfo.lastName
            ? `${userInfo.firstName} ${userInfo.lastName} `
            : ""}
        </div>
      </div>
      <div className="flex gap-5">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <FiEdit2
                className="text-xl font-medium text-purple-500"
                onClick={() => navigate("/profile")}
              />
            </TooltipTrigger>
            <TooltipContent className="bg-[#1c1b1e] p-1 border-none text-white">
              Edit Profile
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <IoLogOut
                className="text-xl font-medium text-red-500"
                onClick={logout}
              />
            </TooltipTrigger>
            <TooltipContent className="bg-[#1c1b1e] p-1 border-none text-white">
              Logout
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default ProfileInfo;
