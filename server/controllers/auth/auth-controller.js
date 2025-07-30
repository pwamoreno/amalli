const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/User")

//register
const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const hashPassword = await bcrypt.hash(password, 12);
    const newUser = new User({ username, email, password: hashPassword})

    await newUser.save()
    res.status(200).json({
        success: true,
        message: "Rgeistration succesful!"
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

//login
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

//logout

//middleware


module.exports = { registerUser }