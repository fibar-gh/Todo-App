import { useState } from "react";
function TodoList({ filter, setFilter,toggleMode, completedCount, pendingCount }) {


  const handleFilterChange=(newFilter)=>{
    setFilter(newFilter);
  }
  return (
    <div className={`todo-container ${toggleMode ? "dark-mode" : ""}`}>
      <div>
        <button
        className={`${filter==="all" ? "filter-color" : "active"}`}
          onClick={()=>handleFilterChange("all")}
        >
          All
        </button>
        <button 
        className={`${filter==="completed" ? "filter-color" : "active"}`}
        onClick={()=>handleFilterChange("completed")}
        >
          Completed: <span>{completedCount}</span>
        </button>
        <button
        className={`${filter==="pending" ? "filter-color" : "active"}`}
          onClick={()=>handleFilterChange("pending")}
        >
          Pending: <span>{pendingCount}</span>
        </button>
      </div>
    </div>
    
  )
}

export default TodoList
