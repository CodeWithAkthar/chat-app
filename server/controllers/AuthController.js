import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";
import { compare } from "bcrypt";
import { renameSync, unlinkSync } from "fs";

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
    //checking if there have email & password
    if (!email || !password) {
      return response.status(400).send("Email and Password is required.");
    }
    //checking user in db
    const user = await User.findOne({ email });
    if (!user) {
      return response.status(404).send("User not found");
    }
    //checking password
    const auth = await compare(password, user.password);
    if (!auth) {
      return response.status(400).send("Password is incorrect.");
    }

    //seting cookie
    response.cookie("jwt", createToken(email, user.id), {
      maxAge,
      secure: true,
      sameSite: "None",
    });

    //sending response
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
    //checking user exists
    const userData = await User.findById(request.userId);
    if (!userData) {
      return response.status(404).send("User with the given id not found.");
    }

    //sending user data
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

//update-profile-data
export const updateProfile = async (request, response, next) => {
  try {
    //taking userid
    const { userId } = request;
    // destructring data from body
    const { firstName, lastName, color } = request.body;
    //sending response
    if (!firstName || !lastName) {
      return response
        .status(400)
        .send("Firt namae, last name color is required.");
    }
    //updating data in db
    const userData = await User.findByIdAndUpdate(
      userId,
      {
        lastName,
        firstName,
        color,
        profileSetup: true,
      },
      { new: true, runValidators: true }
    );

    //sending response
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

//add-Profile-Image
export const addProfileImage = async (request, response, next) => {
  try {
    //checking file
    if (!request.file) {
      return response.status(400).send("File is required");
    }
    //setting date for rename
    const date = Date.now();
    let fileName = "uploads/profiles/" + date + request.file.originalname;
    //renaming using fs module
    renameSync(request.file.path, fileName);

    //updating image
    const updatedUser = await User.findByIdAndUpdate(
      request.userId,
      {
        image: fileName,
      },
      { new: true, runValidators: true }
    );
    //sending response
    return response.status(200).json({
      image: updatedUser.image,
    });
  } catch (error) {
    console.log({ error });
    return response.status(500).send("internal Server Error");
  }
};

//remove-Profile-Image
export const removeProfileImage = async (request, response, next) => {
  try {
    const { userId } = request;
    //finding user
    const user = await User.findById(userId);
    //checking user
    if (!user) {
      return response.status(404).send("user not found.");
    }
    //delete image using fs module from server
    if (user.image) {
      unlinkSync(user.image);
    }
    //set image null in db and save
    user.image = null;
    await user.save();
    //sending response
    return response.status(200).send("Profile image is successfulll.");
  } catch (error) {
    console.log({ error });
    return response.status(500).send("internal Server Error");
  }
};

//Logout controller
export const logout = async (request, response, next) => {
  try {
    //set cookie
    response.cookie("jwt", "", {
      maxAge: 1,
      secure: true,
      sameSite: "None",
    });
    // sending response
    return response.status(200).send("Logout successfull.");
  } catch (error) {
    console.log({ error });
    return response.status(500).send("internal Server Error");
  }
};
