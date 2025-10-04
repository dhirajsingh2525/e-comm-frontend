// auth.middleware.js
const jwt = require("jsonwebtoken");
const usersModels = require("../models/users.model");

async function authSeller(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await usersModels.findById(decoded.id)
            if (user.role !== "seller") {
            return res.status(403).json({
                message: "Forbidden, you do not have the required role"
            })
        }

    req.seller = user;
    next();
  } catch (error) {
    return  res.status(401).json({
            message: "Unauthorized"
        })
  }
}

async function authUser(req,res,next) {
     const token = req.cookies.token;
      if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
     }

     try {
          const decoded = jwt.verify(token, process.env.JWT_SECRET);
          const user = await usersModels.findById(decoded.id);
            if (!user) {
          return res.status(404).json({ message: "User not found" });
          }
          req.user = user;
          next();
     } catch (error) {
       return  res.status(401).json({
            message: "Unauthorized"
        })
     }
}

module.exports = { authSeller, authUser };
