import { useState, useEffect } from "react";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");  //  State for new task input
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return;

    fetch("http://localhost:5000/api/tasks", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.error(" Error fetching tasks:", err));
  }, [token]);

  //  Function to add a new task
  const handleAddTask = async () => {
    if (!newTask.trim()) return alert("Task cannot be empty!"); 

    try {
      const response = await fetch("http://localhost:5000/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title: newTask }),
      });

      if (!response.ok) throw new Error("Failed to add task");

      const task = await response.json();
      setTasks([...tasks, task]); //  Update UI with new task
      setNewTask(""); //  Clear input field
    } catch (error) {
      console.error(" Error adding task:", error);
    }
  };

  return (
    <div>
      <h2>Your Tasks</h2>
      {token ? (
        <>
          {/*  Input field to add tasks */}
          <input
            type="text"
            placeholder="Enter a new task..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <button onClick={handleAddTask}> Add Task</button>

          {/*  Display existing tasks */}
          <ul>
            {tasks.map((task) => (
              <li key={task._id}>{task.title}</li>
            ))}
          </ul>
        </>
      ) : (
        <p> Please log in to see tasks</p>
      )}
    </div>
  );
};

export default Tasks;
