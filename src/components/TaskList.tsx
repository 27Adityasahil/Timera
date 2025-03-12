import React from 'react';
import { Flame, Zap, Circle, Check, Trash2 } from 'lucide-react';
import { Task } from '../types';

interface TaskListProps {
  tasks: Task[];
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
}

const priorityIcons = {
  high: <Flame className="w-5 h-5 text-red-500" />,
  medium: <Zap className="w-5 h-5 text-yellow-500" />,
  low: <Circle className="w-5 h-5 text-green-500" />
};

export default function TaskList({ tasks, onToggleTask, onDeleteTask }: TaskListProps) {
  const completedTasks = tasks.filter(task => task.completed).length;
  const progress = tasks.length > 0 ? (completedTasks / tasks.length) * 100 : 0;

  return (
    <div className="space-y-4">
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
        <div
          className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      
      <div className="space-y-2">
        {tasks.map(task => (
          <div
            key={task.id}
            className={`flex items-center justify-between p-4 rounded-lg ${
              task.completed
                ? 'bg-gray-100 dark:bg-gray-800'
                : 'bg-white dark:bg-gray-700'
            } shadow-sm transition-all duration-200`}
          >
            <div className="flex items-center space-x-3">
              <button
                onClick={() => onToggleTask(task.id)}
                className={`p-1 rounded-full transition-colors ${
                  task.completed
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 dark:bg-gray-600'
                }`}
              >
                <Check className="w-4 h-4" />
              </button>
              <span className="flex items-center space-x-2">
                {priorityIcons[task.priority]}
                <span
                  className={`${
                    task.completed ? 'line-through text-gray-500' : ''
                  }`}
                >
                  {task.title}
                </span>
              </span>
            </div>
            <button
              onClick={() => onDeleteTask(task.id)}
              className="text-gray-500 hover:text-red-500 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}