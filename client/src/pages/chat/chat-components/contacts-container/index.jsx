import { useEffect } from "react";
import NewDM from "./components/new-dm";
import ProfileInfo from "./components/profile-info/index";
import { apiClient } from "@/lib/api-client";
import { GET_DM_CONTACTS_ROUTES, GET_USER_CHANNELS_ROUTE } from "@/utils/constants";
import { useAppStore } from "@/store/Store";
import ContactList from "@/components/contact-list";
import CreateChannel from "./components/create-channel";

const ContactsContainer = () => {
  const {
    setDirectMessagesContacts,
    directMessagesContacts,
    selectedChatMessages,
    channels,
    setChannels
  } = useAppStore();

  useEffect(() => {
    const getContacts = async () => {
      const response = await apiClient.get(GET_DM_CONTACTS_ROUTES, {
        withCredentials: true,
      });

      if (response.data.contacts) {
        setDirectMessagesContacts(response.data.contacts);
      }
    };
    
    const getChannels = async () => {
      const response = await apiClient.get(GET_USER_CHANNELS_ROUTE, {
        withCredentials: true,
      });
      
      console.log("this is channels",response.data.channels );
      

      if (response.data.channels) {
        setChannels(response.data.channels);
      }
    };
    

    getContacts();
    getChannels();
  }, [selectedChatMessages,setChannels,setDirectMessagesContacts]);

  return (
    <div className="relative md:w-[30vw]  xl:w-[20vw] lg:w-[30vw] bg-[#1b1c24] border-r-2 border-[#2f303b] w-full">
      <div className="pt-3">
        <Logo />
      </div>

      <div className="my-5">
        <div className="flex items-center justify-between pr-10">
          <Title text="Direct messages" />

          <NewDM />
        </div>
        <div className="max-h-[38vh] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <ContactList contacts={directMessagesContacts} />
        </div>
      </div>
      <div className="my-5">
        <div className="flex items-center justify-between pr-10">
          <Title text="channels" />
          <CreateChannel />
        </div>
        <div className="max-h-[38vh] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <ContactList contacts={channels} isChannel={true} />
        </div>
      </div>
      <ProfileInfo />
    </div>
  );
};

export default ContactsContainer;

const Logo = () => {
  return (
    <div className="flex items-center justify-start gap-2 p-5">
      <svg
        id="logo-38"
        width="78"
        height="32"
        viewBox="0 0 78 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {" "}
        <path
          d="M55.5 0H77.5L58.5 32H36.5L55.5 0Z"
          className="ccustom"
          fill="#8338ec"
        ></path>{" "}
        <path
          d="M35.5 0H51.5L32.5 32H16.5L35.5 0Z"
          className="ccompli1"
          fill="#975aed"
        ></path>{" "}
        <path
          d="M19.5 0H31.5L12.5 32H0.5L19.5 0Z"
          className="ccompli2"
          fill="#a16ee8"
        ></path>{" "}
      </svg>
      <span className="text-3xl font-semibold ">QuickTalk</span>
    </div>
  );
};

const Title = ({ text }) => {
  return (
    <h6 className="pl-10 text-sm font-light tracking-widest uppercase text-neutral-400 text-opacity-90">
      {text}
    </h6>
  );
};
