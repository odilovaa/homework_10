const express = require("express")
const fileUpload = require("express-fileupload")
const cors = require("cors")

const config = require("../config");
const routes = require("./router/index")

const app = express()

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(fileUpload())

app.use("/api", routes)

app.listen(config.port, () =>
{
    console.log(`Server is running on port: ${config.port}`);
})