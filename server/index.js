const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const authRouter = require("./routers/auth")
const postRouter = require("./routers/post")
const dotenv = require("dotenv");

dotenv.config();
const {database} = require("./config/database")
database()
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true }));

const port = process.env.PORT


app.use("/" , authRouter)
app.use("/" , postRouter)

app.listen(port, () => {
  console.log(port);
});