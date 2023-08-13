const express = require("express");
const cors = require("cors");
const passport = require("passport");
const { default: mongoose } = require("mongoose");
const LoginAPI = require("./Routes/LoginAPI.js");
const AuthAPI = require("./Routes/AuthAPI.js");
const passportConfig = require("./Config/Passport.js");
const bodyParser = require("body-parser");

const PORT = 4000;
const app = express();

const customMiddleware = (req, res, next) => {
  //console.log("middleware executed");
  next();
};
app.use(customMiddleware);

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(passport.initialize());

passportConfig(passport);

app.use("/auth", AuthAPI);
app.use("/login", LoginAPI);
mongoose
  .connect(
    "mongodb+srv://kdixitji:kratik@cluster0.o6e3aob.mongodb.net/bank-clone?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("connected to mongodb");
    app.listen(PORT, () => {
      console.log(`server is running on http://localhost:${PORT}`);
    });
  });
