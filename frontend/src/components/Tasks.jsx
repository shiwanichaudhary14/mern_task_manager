import { useState, useEffect } from "react";

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");  
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return;

    fetch(`${API_BASE_URL}/api/tasks`, {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Authorization: `Bearer ${token}`,
      },
      
    })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        return res.json();
      })
      .then((data) => setTasks(data))
      .catch((err) => console.error("Error fetching tasks:", err.message));
  }, [token]);

  const handleAddTask = async () => {
    if (!newTask.trim()) return alert("Task cannot be empty!"); 

    try {
      const response = await fetch(`${API_BASE_URL}/api/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title: newTask }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to add task: ${errorText}`);
      }

      const task = await response.json();
      setTasks([...tasks, task]);
      setNewTask("");  
    } catch (error) {
      console.error("Error adding task:", error.message);
    }
  };

  return (
    <div>
      <h2>Your Tasks</h2>
      {token ? (
        <>
          <input
            type="text"
            id="task-input"
            name="task"
            placeholder="Enter a new task..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <button onClick={handleAddTask}>Add Task</button>

          <ul>
            {tasks.map((task) => (
              <li key={task._id}>{task.title}</li>
            ))}
          </ul>
        </>
      ) : (
        <p>Please log in to see tasks</p>
      )}
    </div>
  );
};

export default Tasks;
