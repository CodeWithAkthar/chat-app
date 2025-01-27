import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FaPlus } from "react-icons/fa";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import Lottie from "react-lottie";
import { animationDefaultOptions, getColor } from "@/lib/utils";
import { apiClient } from "@/lib/api-client";
import { HOST, SEARCH_ROUTE } from "@/utils/constants";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAppStore } from "@/store/Store";

const NewDM = () => {
  const { setSelectedChatType, setSelectedChatData } = useAppStore();
  const [openContactModal, setOpenContactModal] = useState(false);
  const [searchedContact, setsearchedContact] = useState([]);

  const searchContacts = async (searchTerm) => {
    console.log("this is searchterm", searchTerm);

    try {
      if (searchTerm.length > 0) {
        const response = await apiClient.post(
          SEARCH_ROUTE,
          { searchTerm },
          { withCredentials: true }
        );

        if (response.status === 200 && response.data.contacts) {
          setsearchedContact(response.data.contacts);
        }
      } else {
        setsearchedContact([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const selectNewContact = (contact) => {
    setOpenContactModal(false);
    setSelectedChatType("contact");
    setSelectedChatData(contact);
    setsearchedContact([]);
  };
  return (
    <div>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <FaPlus
              className="font-light transition-all duration-300 cursor-pointer text-neutral-500 text-opacity-90 text-start hover:text-neutral-100"
              onClick={() => setOpenContactModal(true)}
            />
          </TooltipTrigger>
          <TooltipContent className="text-white bg-[#1b1b1e] mb-2 p-3 border-none">
            <p>Add new contact</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <Dialog open={openContactModal} onOpenChange={setOpenContactModal}>
        <DialogContent className="w-[400px] h-[400px] text-white bg-[#181920] flex flex-col  ">
          <DialogHeader>
            <DialogTitle>Select a contact</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div>
            <Input
              placeholder="Search Contacts"
              className="p-6 border-white border-none rounded-lg bg-[#2c2e3b]"
              onChange={(e) => searchContacts(e.target.value)}
            />
          </div>
          {
          searchedContact.length > 0 && (
            <ScrollArea className="h-[250px]">
              <div className="flex flex-col gap-5">
                {searchedContact.map((contact) => (
                  <div
                    key={contact._id}
                    className="flex items-center gap-3 cursor-pointer"
                    onClick={() => selectNewContact(contact)}
                  >
                    <div className="relative w-12 h-12">
                      <Avatar className="w-12 h-12 overflow-hidden rounded-full">
                        {contact.image ? (
                          <AvatarImage
                            src={`${HOST}/${contact.image}`}
                            alt="profile"
                            className="object-cover w-full h-full bg-black rounded-full"
                          />
                        ) : (
                          <div
                            className={`flex items-center justify-center w-12 h-12 text-lg uppercase border-[1px]  rounded-full ${getColor(
                              contact.selectedColor
                            )}`}
                          >
                            {contact.firstName
                              ? contact.firstName.split("").shift()
                              : contact.email.split("").shift()}
                          </div>
                        )}
                      </Avatar>
                    </div>
                    <div className="flex flex-col">
                      <span>
                        {contact.firstName && contact.lastName
                          ? `${contact.firstName} ${contact.lastName} `
                          : `${contact.email}`}
                      </span>
                      <span className="text-xs">{contact.email}</span>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}

          {searchedContact.length <= 0 && (
            <div className="flex-col items-center justify-center flex-1 hidden duration-1000 md:flex tansition-all">
              <Lottie
                isClickToPauseDisabled={true}
                height={100}
                width={100}
                options={animationDefaultOptions}
              />
              <div className="flex flex-col items-center gap-5 mt-5 text-xl text-center text-white transition-all duration-300 text-opacity-80 lg:text-2xl"></div>
              <h3 className="poppins-medium">
                Select a <span className="text-purple-500"> </span>
                <span className="text-purple-500">Contact</span>
                <span className="text-purple-500">.</span>
              </h3>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default NewDM;
