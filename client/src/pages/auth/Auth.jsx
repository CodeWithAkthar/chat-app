import { Tabs, TabsTrigger, TabsContent, TabsList } from "@radix-ui/react-tabs";
import Backgropund from "../../assets/login2.png";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Victory from "../../assets/victory.svg";
import { useState } from "react";
import { toast } from "sonner";
import { apiClient } from "@/lib/api-client";
import { LOGIN_ROUTE, SIGNUP_ROUTE } from "@/utils/constants";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "@/store/Store";

const Auth = () => {
  const navigate = useNavigate();
  const { userInfo, setUserInfo } = useAppStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  //login validation
  const validationLogin = () => {
    if (!email.length) {
      toast.error("Email is required.");
      return false;
    }
    if (!password.length) {
      toast.error("Password is required.");
      return false;
    }
    return true;
  };

  //validation signup
  const validationSignup = () => {
    if (!email.length) {
      toast.error("Email is required.");
      return false;
    }
    if (!password.length) {
      toast.error("Password is required.");
      return false;
    }
    if (password !== confirmPassword) {
      toast.error("Password and confirm password should be same.");
      return false;
    }
    return true;
  };

  //api login handling
  const handleLogin = async () => {
    if (validationLogin()) {
      const response = await apiClient.post(
        LOGIN_ROUTE,
        { email, password },
        { withCredentials: true }
      );
      console.log("this is response from handlelogin", response);

      if (response.data.user.id) {
        console.log("response.data.user.id", response.data.user.id);
        setUserInfo(response.data.user);
        // console.log(
        //   "this is userinfo from handlelogin , here 1st time setting userinfo ",
        //   userInfo
        // );
        console.log("before navigate ....");
        console.log(
          "response.data.user.profileSetup",
          response.data.user.profileSetup
        );

        navigate("/chat");
      }
      // console.log({ response });
    }
  };

  //handling signup api
  const handleSignup = async () => {
    if (validationSignup()) {
      const response = await apiClient.post(
        SIGNUP_ROUTE,
        { email, password },
        { withCredentials: true }
      );
      if (response.status === 201) {
        setUserInfo(response.data.user);
        navigate("/profile");
      }
      console.log({ response });
    }
  };

  return (
    <div className="w-[100wh] h-[100vh] flex justify-center items-center">
      <div className="w-[80vw] h-[80vh] border-2 border-white text-opacity-90 shadow-2xl md:w-[90vw] lg:w-[70vw] xl:w-[60vw] rounded-3xl  grid xl:grid-cols-2 ">
        <div className="flex flex-col items-center justify-center gap-10">
          <div className="flex flex-col items-center justify-center ">
            <div className="flex items-center justify-center">
              <h1 className="text-5xl font-bold md:text-6xl">Welcome</h1>
              <img src={Victory} alt="victory emoji" className="h-[100px]" />
            </div>
            <p className="font-medium text-center">
              Fill in the details to get started with the best chat app!
            </p>
          </div>
          <div className="flex items-center justify-center w-full">
            <Tabs className="w-3/4" defaultValue="login">
              <TabsList className="flex w-full bg-transparent rounded-none">
                <TabsTrigger
                  value="login"
                  className="data-[state=active]:bg-transparent  text-black text-opacity-90  border-b-2  rounded-none w-full data-[state=active]:text-black data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all duration-300"
                >
                  Login
                </TabsTrigger>
                <TabsTrigger
                  value="signup"
                  className="data-[state=active]:bg-transparent  text-black text-opacity-90  border-b-2  rounded-none w-full data-[state=active]:text-black data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all duration-300"
                >
                  Signup
                </TabsTrigger>
              </TabsList>
              <TabsContent className="flex flex-col gap-5 mt-10" value="login">
                <Input
                  placeholder="Email"
                  type="email"
                  className="p-6 rounded-full"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  placeholder="Password"
                  type="Password"
                  className="p-6 rounded-full"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button className="p-6 rounded-full" onClick={handleLogin}>
                  Login
                </Button>
              </TabsContent>
              <TabsContent className="flex flex-col gap-5" value="signup">
                <Input
                  placeholder="Email"
                  type="email"
                  className="p-6 rounded-full"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  placeholder="Password"
                  type="password"
                  className="p-6 rounded-full"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Input
                  placeholder="Confirm Password"
                  type="password"
                  className="p-6 rounded-full"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <Button className="p-6 rounded-full" onClick={handleSignup}>
                  Signup
                </Button>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        <div className="items-center justify-center hidden xl:flex">
          <img src={Backgropund} alt="bakground image" className="h-[500px]" />
        </div>
      </div>
    </div>
  );
};

export default Auth;
