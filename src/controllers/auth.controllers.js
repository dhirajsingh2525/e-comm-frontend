const userModel = require("../models/users.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


async function registerUser(req, res) {

    const { username, email, gender, mobile, fullname: { firstname, lastname }, password } = req.body
    console.log(req.body,"jjnjn")

    const isUserAlreadyExists = await userModel.findOne({
        $or: [ { username }, { email } ]
    })

    if (isUserAlreadyExists) {
        return res.status(422).json({
            message: isUserAlreadyExists.username == username ? "username already exists" : "email already exists"
        })
    }

    const hash = await bcrypt.hash(password, 10)

    const user = await userModel.create({
        username,
        email,
        fullname: {
            firstname,
            lastname
        },
        password: hash,
        gender,
        mobile
    })

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

    res.cookie("token", token)

    res.status(201).json({
        message: "user registered successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
            fullname: user.fullname,
            gender,
            mobile
        }
    })

}

async function loginuser(req, res) {

    const { identifier, password } = req.body

    const user = await userModel.findOne({
        $or: [ { username: identifier  }, { email: identifier  } ],
        role: "user"
    })
    console.log(user, "user")

    if (!user) {
        return res.status(400).json({
            message: "Invalid credentials"
        })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)


    if (!isPasswordValid) {
        return res.status(400).json({
            message: "Invalid credentials"
        })
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

    res.cookie("token", token,  {
  httpOnly: true,
  secure: true,     // production me
  sameSite: "none", // agar frontend/backend alag domain pe hain
})

    res.status(200).json({
        message: "user logged in successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
            fullname: user.fullname,
            role: user.role
        }
    })


}

async function registerSeller(req, res) {

    const { username, email, fullname: { firstname, lastname }, password } = req.body


    const isSellerAlreadyExists = await userModel.findOne({
        $or: [ { username }, { email } ]
    })

    if (isSellerAlreadyExists) {
        return res.status(422).json({
            message: isSellerAlreadyExists.username == username ? "username already exists" : "email already exists"
        })
    }

    const hash = await bcrypt.hash(password, 10)

    const seller = await userModel.create({
        username,
        email,
        fullname: {
            firstname,
            lastname
        },
        password: hash,
        role: "seller"
    })

    const token = jwt.sign({ id: seller._id }, process.env.JWT_SECRET)

    res.cookie("token", token)

    res.status(201).json({
        message: "seller registered successfully",
        seller: {
            id: seller._id,
            username: seller.username,
            email: seller.email,
            fullname: seller.fullname
        }
    })

}

async function loginSeller(req, res) {

    const { identifier,  password } = req.body

    const seller = await userModel.findOne({
        $or: [ { username: identifier }, { email: identifier } ],
        role: "seller"
    })

    if (!seller) {
        return res.status(400).json({
            message: "Invalid credentials"
        })
    }

    const isPasswordValid = await bcrypt.compare(password, seller.password)

    if (!isPasswordValid) {
        return res.status(400).json({
            message: "Invalid credentials"
        })
    }

    const token = jwt.sign({ id: seller._id }, process.env.JWT_SECRET)


    res.cookie("token", token,  {
  httpOnly: true,
  secure: true,     // production me
  sameSite: "none", // agar frontend/backend alag domain pe hain
})

    res.status(200).json({
        message: "seller logged in successfully",
        seller: {
            id: seller._id,
            username: seller.username,
            email: seller.email,
            fullname: seller.fullname,
            role: seller.role
        }
    })

}

async function updateUser(req,res) {
     const { email, gender, mobile, fullname: { firstname, lastname }} = req.body
     const userId = req.user._id


     const updatedUser = await userModel.findByIdAndUpdate(userId, {
        email, gender, mobile, fullname: { firstname, lastname }
     })

      if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
        updatedUser
    })
}

async function getMe(req,res) {
       res.json({ user: req.user });
} 
  // authMiddleware ne cookie verify karke req.user set kar diya

async function logoutUser(req,res) {
    res.clearCookie("token")
    res.send("logout user")
}




module.exports = {
    registerUser,
    loginuser,
    registerSeller,
    loginSeller,
    getMe,
    updateUser,
    logoutUser
}