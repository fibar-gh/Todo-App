
import React, { useState } from 'react';
function Todo({handleAddTask,toggleMode}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!title || !description){ 
      alert("please fill all the fields");
      return;
    }
    const newTask={
      title,
      description,
      date: new Date().toLocaleString()

    }
    handleAddTask(newTask);
    setTitle("");
    setDescription("");

    }
  return (
    <div className={`container ${toggleMode ? "dark-mode" : ""}`}> 
    <h1>My Todo App</h1>
    <p>Organize your tasks and boost your productivity</p>
    <form onSubmit={handleSubmit} className="form-field">
      <div>
      <label>Task Title</label>
      <input 
      type="text"
      placeholder="Enter your text" 
      onChange={(e)=>setTitle(e.target.value)}
      value={title}
      />
      </div>
      <div>
      <label>Description</label>
      <input
       type="text" 
       placeholder="Add a description..." 
       onChange={(e)=>setDescription(e.target.value)}
       value={description}
       />
      </div>
      <button type="submit">+ Add Task</button>

    </form>
      
    </div>
  )
}

export default Todo
