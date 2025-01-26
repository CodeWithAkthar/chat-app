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
import { animationDefaultOptions } from "@/lib/utils";

const NewDM = () => {
  const [openContactModal, setOpenContactModal] = useState(false);
  const [searchContact, setsearchContact] = useState([]);

  const searchContacts = async (searchTerm) => {};
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
      <Dialog
        open={openContactModal}
        onOpenChange={setOpenContactModal}
      >
        <DialogContent className="w-[400px] h-[400px] text-white bg-[#181920] flex flex-col  ">
          <DialogHeader>
            <DialogTitle>Select a contact</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div>
            <Input
              placeholder="Search Contacts"
              className="p-6 border-white border-none rounded-lg bg-[#2c2e3b]"
              onChange={(e) => searchContacts(e.traget.value)}
            />
          </div>
          {searchContact.length <= 0 && (
            <div className="flex-col items-center justify-center flex-1 hidden m-4 duration-1000 md:flex tansition-all">
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
