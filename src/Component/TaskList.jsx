import { RiDeleteBin5Line } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import { useState, useEffect } from "react";
import { GoTasklist } from "react-icons/go";
import { CiSaveDown2 } from "react-icons/ci";
import { MdOutlineCancel } from "react-icons/md";

function TaskList({
  tasks,
  handleDeleteTask,
  updateTask,
  filter,
  handleToggleComplete,
  toggleMode,
}) {
  const [message, setMessage] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editedTask, setEditedTask] = useState({ title: "", description: "" });

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true; // All
  });

  const handleDelete = (index) => {
    handleDeleteTask(index);
  };

  const handleEditClick = (index) => {
    setEditIndex(index);
    setEditedTask({
      title: tasks[index].title,
      description: tasks[index].description,
    });
  };

  const handleSave = (index) => {
    if (
      editedTask.title.trim() !== "" &&
      editedTask.description.trim() !== ""
    ) {
      updateTask(index, editedTask);
      setEditIndex(null);
    }
  };

  const handleCancel = () => {
    setEditIndex(null);
    setEditedTask({ title: "", description: "" });
  };

  useEffect(() => {
    if (tasks.length === 0) {
      setMessage("No tasks available. Please add a task.");
    } else if (filter === "completed" && filteredTasks.length === 0) {
      setMessage("No completed tasks.");
    } else if (filter === "pending" && filteredTasks.length === 0) {
      setMessage("No pending tasks.");
    } else {
      setMessage("");
    }
  }, [tasks, filteredTasks, filter]);

  return (
    <div
      className={`${filteredTasks.length > 0 ? "tasklist" : ""} ${
        toggleMode ? "dark-mode" : "light-mode"
      }`}
    >
      {message && (
        <div className="message">
          <p>{message}</p>
          <GoTasklist className="tasklist-icon" />
        </div>
      )}

      {filteredTasks.map((task) => {
        const originalIndex = tasks.findIndex((t) => t === task);
        return (
          <div key={originalIndex} className="task-item">
            <div className="task-content">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleToggleComplete(originalIndex)}
              />
              <div>
                {editIndex === originalIndex ? (
                  <div className="edit-buttons">
                    <input
                      className="edit-input"
                      type="text"
                      value={editedTask.title}
                      onChange={(e) =>
                        setEditedTask({ ...editedTask, title: e.target.value })
                      }
                    />
                    <input
                      className="edit-input"
                      type="text"
                      value={editedTask.description}
                      onChange={(e) =>
                        setEditedTask({
                          ...editedTask,
                          description: e.target.value,
                        })
                      }
                    />
                  </div>
                ) : (
                  <>
                    <h3>{task.title}</h3>
                    <p>{task.description}</p>

                    {(filter === "all" || filter === "pending") && (
                      <div className="date">
                        <i >Created: {task.date}</i>
                      </div>
                    )}

                    {task.completed &&
                      task.completedAt &&
                      (filter === "all" || filter === "completed") && (
                        <div className="date">
                          <i>Completed on: {task.completedAt}</i>
                        </div>
                      )}
                  </>
                )}
              </div>
            </div>

            <div className="icons">
              {editIndex === originalIndex ? (
                <>
                  <CiSaveDown2
                    onClick={() => handleSave(originalIndex)}
                    title="Save"
                  />
                  <MdOutlineCancel
                    onClick={handleCancel}
                    className="cancel-icon"
                    title="Cancel"
                  />
                </>
              ) : (
                <>
                  <FaRegEdit
                    onClick={() => handleEditClick(originalIndex)}
                    className="edit-icon"
                    title="Edit"
                  />
                  <RiDeleteBin5Line
                    onClick={() => handleDelete(originalIndex)}
                    className="delete-icon"
                    title="Delete"
                  />
                </>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default TaskList;
