const userModel = require("../models/user.model")

/**
 * @name RegisterUserController 
 * @description Register a new User, expects username , email, password in the require
 * @access Public
 */

async function registerUserController(req, res){
    const { username, email, password } = req.body

    if (!username || !email || !password) {
        return res.status(400).json({
            message: "please provide the username, email, and password"
        })
    }

    try {
        const existingUser = await userModel.findOne({
            $or: [{ email }, { username }]
        })

        if (existingUser) {
            return res.status(409).json({
                message: "A user with that email or username already exists"
            })
        }

        const user = await userModel.create({ username, email, password })

        return res.status(201).json({
            message: "User registered successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        })
    }
}

module.exports = {
    registerUserController
}