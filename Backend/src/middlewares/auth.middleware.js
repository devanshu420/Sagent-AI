import jwt from "jsonwebtoken";

export const authUser = async (req, res, next) => {
  try {
    const token =
      req.cookies?.token || req.headers?.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized, token missing",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log("decoded data is => ", decoded);

    req.user = decoded;
    next();
  } catch (error) {
    console.log(error);

    res.status(401).send({ error: "Unauthorized User" });
  }
};
