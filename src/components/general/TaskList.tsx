"use client";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { addTask, deleteTask, toggleTask } from "@/store/taskSlice";

const TaskList = () => {
  const [taskInput, setTaskInput] = useState("");
  const tasks = useSelector((state: RootState) => state.tasks.items);
  const dispatch = useDispatch();

  const handleAddTask = () => {
    if (!taskInput.trim()) return;
    dispatch(addTask(taskInput));
    setTaskInput("");
  };

  return (
    <main className="min-h-screen p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold text-center mb-6">Taskify 📝</h1>

      {/* Task Input */}
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1 px-4 py-2 border rounded border-gray-300"
        />
        <button
          onClick={handleAddTask}
          className="px-4 py-2 bg-indigo-600 text-white rounded"
        >
          Add
        </button>
      </div>

      {/* Task List */}
      <ul className="space-y-3">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="flex items-center justify-between px-4 py-2 border rounded"
          >
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => dispatch(toggleTask(task.id))}
              />
              <span
                className={task.completed ? "line-through text-gray-400" : ""}
              >
                {task.title}
              </span>
            </div>
            <button
              onClick={() => dispatch(deleteTask(task.id))}
              className="text-sm text-red-500 hover:underline"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default TaskList;
