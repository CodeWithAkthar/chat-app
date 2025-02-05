import Lottie from "react-lottie";
import { animationDefaultOptions } from "@/lib/utils";
const EmptyChatContainer = () => {
  return (
    <div className="flex-1 md:bg-[#1c1d25] md:flex flex-col justify-center items-center hidden duration-1000 transition-all">
      <Lottie
        isClickToPauseDisabled={true}
        height={200}
        width={200}
        options={animationDefaultOptions}
      />
      <div className="flex flex-col items-center gap-5 mt-10 text-3xl text-center text-white transition-all duration-300 text-opacity-80 lg:text-4xl"></div>
      <h3 className="poppins-medium">
        Hi<span className="text-purple-500">! </span>
         Welcome to <span className="text-purple-500">QuickTalk</span><span className="text-purple-500">.</span>
      </h3>
    </div>
  );
};

export default EmptyChatContainer;
