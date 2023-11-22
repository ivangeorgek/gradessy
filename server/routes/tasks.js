const router = require("express").Router();
const Task = require("../models/Task");
const User = require("../models/User");

//create a task
router.post("/", async (req, res) => {
    const newTask = new Task(req.body);
    try {
        const savedTask = await newTask.save();
        res.status(200).json(savedTask);
    } catch (err) {
        res.status(500).json(err);
    }
});

//update a task
router.put("/:id", async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (task.userId === req.body.userId) {
            await task.updateOne({ $set: req.body });
            res.status(200).json("the task has been updated");
        } else {
            res.status(403).json("you can update only your task");
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

//delete a task
router.delete("/:id", async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (task.userId === req.body.userId) {
            await task.deleteOne();
            res.status(200).json("the task has been deleted");
        } else {
            res.status(403).json("you can delete only your task");
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

//get a task
router.get("/:id", async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        res.status(200).json(task);
    } catch (err) {
        res.status(500).json(err);
    }
});

//get user's tasks
router.get("/profile/:username", async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username });
        const tasks = await Task.find({ userId: user._id });
        res.status(200).json(tasks);
    } catch (err) {
        res.status(500).json(err);
    }
});

//get connected user's tasks
router.get("/connections/:userId", async (req, res) => {
    try {
        const currentUser = await User.findById(req.params.userId);
        const userTasks = await Task.find({ userId: currentUser._id });
        const connectionTasks = await Promise.all(
            currentUser.connections.map((connectionId) => {
                return Task.find({ userId: connectionId });
            })
        );
        res.status(200).json(userTasks.concat(...connectionTasks));
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
