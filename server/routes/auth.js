const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

//REGISTER
router.post("/register", async (req, res) => {
    try {
        //generate hashed password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        //Create a new user object
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
            isMentor: req.body.isMentor,
            areasOfExpertise: req.body.areasOfExpertise,
            company: req.body.company || "", // Optional field, default to an empty string if not provided
            title: req.body.title || "", // Optional field, default to an empty string if not provided
          });          
        //Save user to database and return response
        const user = await newUser.save();
        //Success
        res.status(200).json(user)
    } catch(err) {
        //res.status(500).json(err);
        console.log("register new user Error", err)
    }

});

//LOGIN 
router.post("/login", async (req, res) => {
    try {
      // Find user by email
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.status(404).json("User does not exist");
      }
  
      // Compare provided password with the hashed password in the database
      const validPassword = await bcrypt.compare(req.body.password, user.password);
      if (!validPassword) {
        return res.status(400).json("Wrong password");
      }
  
      // Success - user logged in
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  

module.exports = router;