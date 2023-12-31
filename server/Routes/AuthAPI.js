const express = require("express");
const User = require("../Models/User.js");
const bcrypt = require("bcrypt");

const router = express.Router();

router.post("/register", async(req, res) => {
    const { username, password, firstname, lastname } = req.body;
    const userExists = await User.findOne({username});

    if(userExists) {
        res.status(406).json("user already exists, try with another mail");
        return
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User(
        {
            firstname,
            lastname,
            password: hashedPassword, 
            username,
        }
    )

    await user.save();
    res.status(201).json({"message" : "user is created"});
})

module.exports = router;