import { useEffect, useState } from "react";
import TaskList from "./Component/TaskList";
import Todo from "./Component/Todo";
import TodoList from "./Component/TodoList";
import "./index.css";
import ToggleMode from "./Component/ToggleMode";

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [filter, setFilter] = useState("all");

  const [toggleMode, setToggleMode] = useState(false);

    const handleToggleMode = () => {
  setToggleMode((prevMode) => !prevMode); 
};

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  });
  const handleAddTask = (task) => {
    setTasks([...tasks, { ...task, completed: false }]);
  };

  const updateTask = (indexToUpdate, updatedTask) => {
    setTasks(
      tasks.map((task, index) => (index === indexToUpdate ? updatedTask : task))
    );
  };

  const handleDeleteTask = (indexToDelete) => {
    setTasks(tasks.filter((_, index) => index !== indexToDelete));
  };

  const handleToggleComplete = (index) => {
  const updatedTasks = tasks.map((task, i) =>
    i === index
      ? {
          ...task,
          completed: !task.completed,
          completedAt: !task.completed ? new Date().toLocaleString() : null,
        }
      : task
  );
  setTasks(updatedTasks);
  localStorage.setItem("tasks", JSON.stringify(updatedTasks));
};


const completedCount = tasks.filter((task) => task.completed).length;
const pendingCount = tasks.length - completedCount;


  return (
    <div className={toggleMode ? "dark-mode" : "light-mode"}>
      <ToggleMode
      toggleMode={toggleMode}
      handleToggleMode={handleToggleMode}
      />
      <Todo handleAddTask={handleAddTask} />
      <TodoList 
       filter={filter}
       setFilter={setFilter}
         toggleMode={toggleMode}
         completedCount={completedCount}
         pendingCount={pendingCount}
      />
      <TaskList
        tasks={tasks}
        filter={filter}
        handleToggleComplete={handleToggleComplete}
        handleDeleteTask={handleDeleteTask}
        updateTask={updateTask}
        toggleMode={toggleMode}
      />
    </div>
  );
}

export default App;
