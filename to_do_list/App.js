....App.js.....

import { useState, useEffect } from "react";
import "./App.css";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState("");
  const [filter, setFilter] = useState("all");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("tasks"));
    if (saved) setTasks(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!text.trim()) return;
    if (editId) {
      setTasks(tasks.map(t => t.id === editId ? { ...t, text } : t));
      setEditId(null);
    } else {
      setTasks([...tasks, { id: Date.now(), text, completed: false }]);
    }
    setText("");
  };

  const toggleTask = id => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = id => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const editTask = task => {
    setText(task.text);
    setEditId(task.id);
  };

  const filteredTasks = tasks.filter(t =>
    filter === "all" ? true :
    filter === "active" ? !t.completed :
    t.completed
  );

  return (
    <div className="container">
      <h2>To-Do List</h2>

      <div className="input-box">
        <input
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Enter task"
        />
        <button onClick={addTask}>{editId ? "Update" : "Add"}</button>
      </div>

      <div className="filters">
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("active")}>Active</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
      </div>

      {filteredTasks.length === 0 ? (
        <p className="empty">No Tasks</p>
      ) : (
        <ul>
          {filteredTasks.map(task => (
            <li key={task.id} className={task.completed ? "done" : ""}>
  <span>{task.text}</span>
  <div>
    <button onClick={() => toggleTask(task.id)}>
      {task.completed ? "Undo" : "Complete"}
    </button>
    <button onClick={() => editTask(task)}>Edit</button>
    <button onClick={() => deleteTask(task.id)}>Delete</button>
  </div>
</li>

          ))}
        </ul>
      )}
    </div>
  );
}
