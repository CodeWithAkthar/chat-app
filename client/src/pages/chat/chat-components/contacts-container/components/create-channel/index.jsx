import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FaPlus } from "react-icons/fa";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { apiClient } from "@/lib/api-client";
import {
  CREATE_CHANNEL_ROUTE,
  GET_ALL_CONTACTS_ROUTES,
} from "@/utils/constants";
import { useAppStore } from "@/store/Store";

import { Button } from "@/components/ui/button";
import MultipleSelector from "@/components/ui/multipleselect";
import { Contact } from "lucide-react";
const CreateChannel = () => {
  const { setSelectedChatType, setSelectedChatData,addChannel } = useAppStore();
  const [newChannelModal, setNewChannelModal] = useState(false);
  const [allContacts, setAllContacts] = useState([]);
  const [selectedContacts, setselectedContacts] = useState([]);
  const [channelName, setChannelName] = useState("");

  useEffect(() => {
    const getData = async () => {
      const response = await apiClient.get(GET_ALL_CONTACTS_ROUTES, {
        withCredentials: true,
      });
      setAllContacts(response.data.contacts);
    };

    getData();
  }, []);

  const createChannel = async () => {
    
    
    try {
        if (channelName.length > 0 && selectedContacts.length > 0) {
            
            const response = await apiClient.post(
                CREATE_CHANNEL_ROUTE,
                {
                    name: channelName,
                    members: selectedContacts.map((contact) => contact.value),
                },
                { withCredentials: true }
            );
        if (response.status === 201) {
            setChannelName("");
            setselectedContacts([]);
            setNewChannelModal(false);
            addChannel(response.data.channel);
        }
      }
    } catch(error) {
      console.log({ error });
    }
  };

  return (
    <div>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <FaPlus
              className="font-light transition-all duration-300 cursor-pointer text-neutral-500 text-opacity-90 text-start hover:text-neutral-100"
              onClick={() => setNewChannelModal(true)}
            />
          </TooltipTrigger>
          <TooltipContent className="text-white bg-[#1b1b1e] mb-2 p-3 border-none">
            <p>Create a Channel</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <Dialog open={newChannelModal} onOpenChange={setNewChannelModal}>
        <DialogContent className="w-[400px] h-[400px] text-white bg-[#181920] flex flex-col  ">
          <DialogHeader>
            <DialogTitle>fill up the details for new channel</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div>
            <Input
              placeholder="Channel Name"
              className="p-6 border-white border-none rounded-lg bg-[#2c2e3b]"
              onChange={(e) => setChannelName(e.target.value)}
              value={channelName}
            />
          </div>
          <div>
            <MultipleSelector
              className="py-2 text-white border-none rounded-lg bg-[#2c2e3b]"
              defaultOptions={allContacts}
              placeholder="Search Contacts"
              value={selectedContacts}
              onChange={setselectedContacts}
              emptyIndicator={
                <p className="text-lg leading-10 text-center text-gray-600">
                  No results found.
                </p>
              }
            />
          </div>
          <div>
            <Button
              className="w-full transition-all duration-300 bg-purple-700 hover:bg-purple-900"
              onClick={createChannel}
            >
              {" "}
              Create Channel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateChannel;
