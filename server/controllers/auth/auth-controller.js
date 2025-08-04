const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");

//register
const registerUser = async (req, res) => {
  const { userName, email, password } = req.body;

  console.log("username:", userName)

  try {
    const hashPassword = await bcrypt.hash(password, 12);
    const newUser = new User({ username: userName, email, password: hashPassword });

    console.log("new user:", newUser)

    await newUser.save();
    res.status(200).json({
      success: true,
      message: "Rgeistration succesful!",
    });
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

module.exports = { registerUser };
