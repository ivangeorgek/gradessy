import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import SideMenu from "../../components/sideMenu/SideMenu";
import Topbar from "../../components/topbar/Topbar";
import "./tasks.css";

export default function Tasks() {
    const [tasks, setTasks] = useState([]);
    const [description, setDescription] = useState("");
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchTasks = async () => {
            // Fetch user's tasks from the backend
            const res = await axios.get(`http://localhost:8800/api/tasks/profile/${user.username}`);
            setTasks(res.data);
        };
        fetchTasks();
    }, [user.username]);

    const createTaskHandler = async (e) => {
        e.preventDefault();
        try {
            // Create a new task in the backend
            const res = await axios.post("http://localhost:8800/api/tasks/", {
                userId: user._id,
                description: description,
            });
            setTasks([...tasks, res.data]);
            setDescription("");
        } catch (err) {
            console.error(err);
        }
    };

    const updateTaskHandler = async (taskId, completed) => {
        try {
            // Update the task's completion status in the backend
            await axios.put(`http://localhost:8800/api/tasks/${taskId}`, {
                userId: user._id,
                completed: !completed,
            });
            setTasks(
                tasks.map((task) =>
                    task._id === taskId ? { ...task, completed: !completed } : task
                )
            );
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="tasksPage">
            <Topbar />
            <div className="tasksPageContent">
                <SideMenu />
                <div className="tasksContent">
                    <form className="taskCreateForm" onSubmit={createTaskHandler}>
                        <input
                            type="text"
                            className="taskInput"
                            placeholder="Create a new task..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <button type="submit" className="taskSubmitBtn">Add Task</button>
                    </form>
                    <div className="taskTimeline">
                        {tasks.map((task) => (
                            <div key={task._id} className={`task ${task.completed ? "completed" : ""}`}>
                                <p className="taskDescription">{task.description}</p>
                                <button
                                    className="taskCompleteBtn"
                                    onClick={() => updateTaskHandler(task._id, task.completed)}
                                >
                                    {task.completed ? "Undo" : "Mark as completed"}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

