import { useAppStore } from "@/store/Store";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { Avatar } from "@/components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { useState } from "react";
import { getColor } from "@/lib/utils";
import { FaTrash, FaPlus } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { colors } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const Profile = () => {
  const navigate = useNavigate();
  const { userInfo, setUserInfo } = useAppStore();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [image, setImage] = useState(null);
  const [hovered, setHovered] = useState(false);
  const [selectedColor, setSelectedColor] = useState(0);

  const saveChanges = async () => {};

  if (!userInfo) {
    return <div>Loading user information...</div>;
  }

  return (
    <div className="bg-[#1b1c24] h-[100vh] flex items-center justify-center flex-col gap-10">
      <div className="flex flex-col gap-10 w-[80vw] md:w-max">
        <div >
          <IoArrowBack className="text-4xl cursor-pointer text-white/90 lg:text-6xl" />
        </div>
        <div className="grid grid-cols-2 ">
          <div className="flex items-center justify-center">
            <div
              className="relative w-32 h-full md:w-48 md:h-48"
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
            >
              <Avatar className="w-32 h-32 overflow-hidden rounded-full md:w-48 md:h-48">
                {image ? (
                  <AvatarImage
                    src={image}
                    alt="profile"
                    className="object-cover w-full h-full bg-black"
                  />
                ) : (
                  <div
                    className={`flex items-center justify-center w-32 h-32 text-5xl uppercase border-[1px] md:w-48 md:h-48 rounded-full ${getColor(
                      selectedColor
                    )}`}
                  >
                    {firstName
                      ? firstName.split("").shift()
                      : userInfo.email.split("").shift()}
                  </div>
                )}
              </Avatar>
              {hovered && (
                <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/50 ring-fuchsia-500">
                  {image ? (
                    <FaTrash className="text-3xl text-white cursor-pointer" />
                  ) : (
                    <FaPlus className="text-3xl text-white cursor-pointer" />
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col items-center justify-center gap-5 text-white min-w-32 md:min-w-64">
            <div className="w-full">
              <Input
                placeholder="Email"
                type="email"
                disabled
                value={userInfo.email}
                className="p-6 rounded-lg bg-[#2c2e3b] border-none"
              />
            </div>
            <div className="w-full">
              <Input
                placeholder="First Name"
                type="text"
                onChange={(e) => setFirstName(e, Target.value)}
                value={firstName}
                className="p-6 rounded-lg bg-[#2c2e3b] border-none"
              />
            </div>
            <div className="w-full">
              <Input
                placeholder="Last Name"
                type="email"
                onChange={(e) => setLastName(e, Target.value)}
                value={lastName}
                className="p-6 rounded-lg bg-[#2c2e3b] border-none"
              />
            </div>
            <div className="flex w-full gap-5">
              {colors.map((color, index) => (
                <div
                  className={` ${color} h-8 w-8 rounded-full cursor-pointer transition-all duration-300 
                   ${
                     selectedColor === index
                       ? " outline outline-white/50 outline-1"
                       : ""
                   }`}
                  key={index}
                  onClick={() => setSelectedColor(index)}
                ></div>
              ))}
            </div>
          </div>
        </div>
        <div className="w-full">
          <Button
            className="w-full h-16 transition-all duration-300 bg-purple-700 hover:bg-purple-900"
            onClick={saveChanges}
          >
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
