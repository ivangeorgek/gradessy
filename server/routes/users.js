const User = require("../models/User");
const router = require("express").Router();
const bcrypt = require("bcrypt");

router.get("/mentors", async (req, res) => {
  try {
    const users = await User.find({ isMentor: true });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//update user
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (err) {
        return res.status(500).json(err);
      }
    }
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json("Account has been updated");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You can update only your account!");
  }
});

//delete user
router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("Account has been deleted");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You can delete only your account!");
  }
});

//get a user by username
router.get("/username/:username", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const userResponse = {
      _id: user._id,
      username: user.username,
      email: user.email,
      isMentor: user.isMentor,
      connections: user.connections,
      areasOfExpertise: user.areasOfExpertise,
      bio: user.bio,
      company: user.company,
      title: user.title,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    };

    res.status(200).json(userResponse);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong, please try again later" });
  }
});

// Get a user by ID
router.get("/userid/:userid", async (req, res) => {
  try {
    const user = await User.findById(req.params.userid);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const userResponse = {
      _id: user._id,
      username: user.username,
      email: user.email,
      isMentor: user.isMentor,
      connections: user.connections,
      areasOfExpertise: user.areasOfExpertise,
      bio: user.bio,
      company: user.company,
      title: user.title,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    };

    res.status(200).json(userResponse);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong, please try again later" });
  }
});


//get connections
router.get("/connections/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const connections = await Promise.all(
      user.connections.map((connId) => {
        return User.findById(connId);
      })
    );
    let connList = [];
    connections.map((friend) => {
      const { _id, username } = friend;
      friendList.push({ _id, username, profilePicture });
    });
    res.status(200).json(friendList)
  } catch (err) {
    res.status(500).json(err);
  }
});

//connect to a user
router.put("/:id/connect", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (!user.connections.includes(req.body.userId)) {
        await user.updateOne({ $push: { connections: req.body.userId } });
        await currentUser.updateOne({ $push: { connections: req.params.id } });
        res.status(200).json("Connected to user");
      } else {
        res.status(403).json("you are already connected to this user");
      }
    } catch (err) {
      console.error("Error in /:id/connect route:", err);
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You cannot connect to yourself");
  }
});

//Disconnect with a user
router.put("/:id/disconnect", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (user.connections.includes(req.body.userId)) {
        await user.updateOne({ $pull: { connections: req.body.userId } });
        await currentUser.updateOne({ $pull: { connections: req.params.id } });
        res.status(200).json("Disconnected from user");
      } else {
        res.status(403).json("you are not connected to this user");
      }
    } catch (err) {
      console.error("Error in /:id/disconnect route:", err);
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You cannot connect to yourself");
  }
});


module.exports = router;