const express = require("express");
const router = express.Router();
const users = require("../models/userSchema");

// PORT="8003"
// DATABASE="mongodb+srv://ariv98:LcRPkfY2GQoDgSMt@cluster0.m9ahjxy.mongodb.net/mern?retryWrites=true&w=majority"
// register user

router.post("/api/register", async (req, res) => {
  // console.log(req.body);
  const { name, email, age, mobile, work, location, gender } = req.body;

  if (!name || !email || !age || !mobile || !work || !location || !gender) {
    res.status(422).json("plz fill the data");
  }

  try {
    const preuser = await users.findOne({ email: email });
    console.log(preuser);

    if (preuser) {
      res.status(422).json("this is user is already present");
    } else {
      const adduser = new users({
        name,
        email,
        age,
        mobile,
        work,
        location,
        gender,
      });

      await adduser.save();
      res.status(201).json(adduser);
      console.log(adduser);
    }
  } catch (error) {
    res.status(422).json(error);
  }
});

// get userdata

router.get("/api/getusers", async (req, res) => {
  try {
    const userdata = await users.find();
    res.status(201).json(userdata);
    console.log(userdata);
  } catch (error) {
    res.status(422).json(error);
  }
});

// get individual user

router.get("/api/getuser/:id", async (req, res) => {
  try {
    console.log(req.params);
    const { id } = req.params;

    const userindividual = await users.findById({ _id: id });
    console.log(userindividual);
    res.status(201).json(userindividual);
  } catch (error) {
    res.status(422).json(error);
  }
});

// update user data

router.patch("/api/updateuser/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const updateduser = await users.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    console.log(updateduser);
    res.status(201).json(updateduser);
  } catch (error) {
    res.status(422).json(error);
  }
});

// delete user
router.delete("/api/deleteuser/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletuser = await users.findByIdAndDelete({ _id: id });
    console.log(deletuser);
    res.status(201).json(deletuser);
  } catch (error) {
    res.status(422).json(error);
  }
});

module.exports = router;
