const router = require("express").Router();
let userModel = require("../models/User.js");
const bcrypt = require("bcrypt");
const generateToken = require("../models/generateToken.js");

router.route("/signup").post(async (req, res) => {
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const address = req.body.address;
  const mobileno = Number(req.body.mobileno);
  const email = req.body.email;
  const password = req.body.password;

  if (
    firstname == "" ||
    lastname == "" ||
    address == "" ||
    mobileno == "" ||
    email == "" ||
    password == ""
  ) {
    res.json({
      status: "FAILED",
      message: "Empty input faields",
    });
  } else if (!/^[a-zA-Z ]*$/.test(firstname)) {
    res.json({
      status: "FAILED",
      message: "Invalid firstname entered",
    });
  } else if (!/^[a-zA-Z ]*$/.test(lastname)) {
    res.json({
      status: "FAILED",
      message: "Invalid lastname entered",
    });
  } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
    res.json({
      status: "FAILED",
      message: "Invalid email entered",
    });
  } else if (password.length < 8) {
    res.json({
      status: "FAILED",
      message: "Password is too short",
    });
  } else {
    // checking if user already exist
    userModel
      .find({ email })
      .then((result) => {
        if (result.length) {
          res.json({
            status: "FAILED",
            message: "User with the provided email already exists",
          });
        } else {
          // password handling
          const saltRounds = 10;
          bcrypt
            .hash(password, saltRounds)
            .then((hashedPassword) => {
              const newuser = new userModel({
                firstname,
                lastname,
                address,
                mobileno,
                email,
                password: hashedPassword,
              });

              newuser
                .save()
                .then((result) => {
                  res.json({
                    status: "SUCCESS",
                    message: "Signup Successfull",
                    data: result,
                  });
                })
                .catch((err) => {
                  console.log(err);
                  res.json({
                    status: "FAILED",
                    message: "An error occurred while saving user account",
                  });
                });
            })
            .catch((err) => {
              console.log(err);
              res.json({
                status: "FAILED",
                message: "An error occurred while hashing password",
              });
            });
        }
      })
      .catch((err) => {
        console.log(err);
        res.json({
          status: "FAILED",
          message: "An error occurred while checking for existing user",
        });
      });
  }
});

router.route("/signin").post(async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  if (email == "" || password == "") {
    res.json({
      status: "FAILED",
      message: "Empty input email or password",
    });
  } else {
    try {
      const user = await userModel.findOne({ email });

      if (user) {
        const hashedPassword = user.password;
        const result = await bcrypt.compare(password, hashedPassword);

        if (result) {
          const userInfo = {
            _id: user._id,
            email: user.email,
            name: user.name,
            isAdmin: user.isAdmin,
          };
          userInfo.token = generateToken(user._id);

          res.json({
            status: "SUCCESS",

            data: userInfo,
          });
        } else {
          res.json({
            status: "FAILED",
            message: "Invalid password",
          });
        }
      } else {
        res.json({
          status: "FAILED",
          message: "Invalid email",
        });
      }
    } catch (error) {
      console.error("An error occurred while processing signin:", error);
      res.json({
        status: "FAILED",
        message: "An error occurred while processing signin",
      });
    }
  }
});

router.route("/logout").post((req, res) => {
  res.json({
    status: "SUCCESS",
    message: "Logout successful",
  });
});

module.exports = router;
