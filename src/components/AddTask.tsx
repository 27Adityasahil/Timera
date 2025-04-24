import React, { useState } from "react";
import { Flame, Zap, Circle } from "lucide-react";

interface AddTaskProps {
  onAddTask: (title: string, priority: "high" | "medium" | "low") => void;
}

export default function AddTask({ onAddTask }: AddTaskProps) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<"high" | "medium" | "low">("medium");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onAddTask(title.trim(), priority);
      setTitle("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex gap-2">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1 px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Add
        </button>
      </div>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setPriority("high")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            priority === "high"
              ? "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
              : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
          }`}
        >
          <Flame className="w-4 h-4" />
          High
        </button>
        <button
          type="button"
          onClick={() => setPriority("medium")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            priority === "medium"
              ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300"
              : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
          }`}
        >
          <Zap className="w-4 h-4" />
          Medium
        </button>
        <button
          type="button"
          onClick={() => setPriority("low")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            priority === "low"
              ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
              : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
          }`}
        >
          <Circle className="w-4 h-4" />
          Low
        </button>
      </div>
    </form>
  );
}
