import { getColor } from "@/lib/utils";
import { useAppStore } from "@/store/Store";
import { HOST } from "@/utils/constants";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { RiCloseFill } from "react-icons/ri";
const ChatHeader = () => {
  const { closeChat, selectedChatData, selectedChatType } = useAppStore();

  return (
    <div className="h-[10vh] border-b-2 border-[#2f303b] flex items-center justify-between px-20">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center justify-center gap-3">
          <div className="relative w-12 h-12">
            {selectedChatType === "contact" ? (
              <Avatar className="w-12 h-12 overflow-hidden rounded-full">
                {selectedChatData.image ? (
                  <AvatarImage
                    src={`${HOST}/${selectedChatData.image}`}
                    alt="profile"
                    className="object-cover w-full h-full bg-black rounded-full"
                  />
                ) : (
                  <div
                    className={`flex items-center justify-center w-12 h-12 text-lg uppercase border-[1px]  rounded-full ${getColor(
                      selectedChatData.selectedColor
                    )}`}
                  >
                    {selectedChatData.firstName
                      ? selectedChatData.firstName.split("").shift()
                      : selectedChatData.email.split("").shift()}
                  </div>
                )}
              </Avatar>
            ) : (
              <div className="bg-[#ffffff22] h-10 w-10 flex items-center justify-center rounded-full">
                #
              </div>
            )}
          </div>
          <div>
            {selectedChatType === "channel" && selectedChatData.name}
            {selectedChatType === "contact" && selectedChatData.firstName
              ? `${selectedChatData.firstName}${selectedChatData.lastName} `
              : `${selectedChatData.email} `}
          </div>
        </div>
        <div className="flex items-center justify-center gap-5">
          <button
            className="text=neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all"
            onClick={closeChat}
          >
            <RiCloseFill className="text=3xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
