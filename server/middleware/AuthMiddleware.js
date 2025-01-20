import jwt from "jsonwebtoken";
export const verifyToken = (request, response, next) => {
  //   console.log(request.cookies);
  const token = request.cookies.jwt;
  //   console.log({ token });
  jwt.verify(token, process.env.JWT_KEY, async (err, payload) => {
    if (err) return response.status(403).send("Token is not Valid!");
    request.userId = payload.userId;
    console.log("this is payload ", payload);
    next();
  });
};
