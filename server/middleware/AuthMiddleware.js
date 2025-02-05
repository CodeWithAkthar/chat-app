import jwt from "jsonwebtoken";
//token verification 
export const verifyToken = (request, response, next) => {
  const token = request.cookies.jwt;
  jwt.verify(token, process.env.JWT_KEY, async (err, payload) => {
    if (err) return response.status(403).send("Token is not Valid!");
    request.userId = payload.userId;
    next();
  });
};
