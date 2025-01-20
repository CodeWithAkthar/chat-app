import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";
import { compare } from "bcrypt";

const maxAge = 3 * 24 * 60 * 60 * 1000;

//creating token
const createToken = (email, userId) => {
  console.log("this is userid from creating token", userId, email);
  return jwt.sign({ email, userId }, process.env.JWT_KEY, {
    expiresIn: maxAge,
  });
};

//signup controller
export const signup = async (request, response, next) => {
  try {
    const { email, password } = request.body;
    if (!email || !password) {
      return response.status(400).send("Email and Password is required.");
    }

    const user = await User.create({ email, password });

    console.log("this is user.. ", user);
    console.log("this is user id ", user.id);

    response.cookie("jwt", createToken(email, user.id), {
      maxAge,
      secure: true,
      sameSite: "None",
    });
    return response.status(201).json({
      user: {
        id: user.id,
        email: user.email,
        profileSetup: user.profileSetup,
      },
    });
  } catch (error) {
    console.log({ error });
    return response.status(500).send("internal Server Error");
  }
};

//login controller
export const login = async (request, response, next) => {
  try {
    const { email, password } = request.body;
    // console.log("this is email",email);
    // console.log("this is password",password);
    if (!email || !password) {
      return response.status(400).send("Email and Password is required.");
    }

    const user = await User.findOne({ email });
    if (!user) {
      return response.status(404).send("User not found");
    }

    const auth = await compare(password, user.password);
    if (!auth) {
      return response.status(400).send("Password is incorrect.");
    }

    // console.log("this is user.. ", user);
    // console.log("this is user id ", user.id);

    response.cookie("jwt", createToken(email, user.id), {
      maxAge,
      secure: true,
      sameSite: "None",
    });
    return response.status(200).json({
      user: {
        id: user.id,
        email: user.email,
        profileSetup: user.profileSetup,
        firstName: user.firstName,
        lastName: user.lastName,
        image: user.image,
        color: user.color,
      },
    });
  } catch (error) {
    console.log({ error });
    return response.status(500).send("internal Server Error");
  }
};

//get-user-info
export const getUserInfo = async (request, response, next) => {
  try {
    console.log("this is userid from get userinfo controller.", request.userId);

    const userData = await User.findById(request.userId);
    if (!userData) {
      return response.status(404).send("User with the given id not found.");
    }

    console.log("response for userinfo controller ",response.json);
    return response.status(200).json({
      id: userData.id,
      email: userData.email,
      profileSetup: userData.profileSetup,
      firstName: userData.firstName,
      lastName: userData.lastName,
      image: userData.image,
      color: userData.color,
    });

    
  } catch (error) {
    console.log({ error });
    return response.status(500).send("internal Server Error");
  }
};
