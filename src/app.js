
const express = require('express')

const app = express();

app.use(express.json()) // middleware : jo hame req.body me allow krta hai data ko read krne k liye

/**require all the routes here */
const authRouter = require("./routes/auth.routes")

/**using all the routes here */
app.use("/api/auth", authRouter)

module.exports = app