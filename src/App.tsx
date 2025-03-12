import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import TaskList from './components/TaskList';
import AddTask from './components/AddTask';
import PomodoroTimer from './components/PomodoroTimer';
import Profile from './components/Profile';
import { Task, TimerSettings, AppState } from './types';

const STORAGE_KEY = 'todo-pomodoro-state';

const POINTS = {
  high: 10,
  medium: 5,
  low: 3
};

function App() {
  const [state, setState] = useState<AppState>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const defaultState = {
      tasks: [],
      timerSettings: {
        duration: 25,
        isRunning: false,
        timeLeft: 25 * 60
      },
      darkMode: prefersDark,
      profile: {
        points: 0,
        tasksCompleted: 0,
        highPriorityCompleted: 0,
        mediumPriorityCompleted: 0,
        lowPriorityCompleted: 0
      }
    };
    
    if (saved) {
      const parsedState = JSON.parse(saved);
      return {
        ...defaultState,
        ...parsedState
      };
    }
    
    return defaultState;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      if (localStorage.getItem('theme') === null) {
        setState(prev => ({ ...prev, darkMode: e.matches }));
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    if (state.darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [state.darkMode]);


  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const handleAddTask = (title: string, priority: 'high' | 'medium' | 'low') => {
    setState(prev => ({
      ...prev,
      tasks: [
        ...prev.tasks,
        {
          id: crypto.randomUUID(),
          title,
          priority,
          completed: false,
          createdAt: Date.now(),
          pointsAwarded: false
        }
      ]
    }));
  };

  const handleToggleTask = (id: string) => {
    setState(prev => {
      const task = prev.tasks.find(t => t.id === id);
      if (!task) return prev;

      const newTasks = prev.tasks.map(t =>
        t.id === id ? { ...t, completed: !t.completed } : t
      );

      if (!task.completed && !task.pointsAwarded) {
        
        const points = POINTS[task.priority];
        const priorityKey = `${task.priority}PriorityCompleted` as keyof typeof prev.profile;
        
        return {
          ...prev,
          tasks: newTasks.map(t =>
            t.id === id ? { ...t, pointsAwarded: true } : t
          ),
          profile: {
            ...prev.profile,
            points: prev.profile.points + points,
            tasksCompleted: prev.profile.tasksCompleted + 1,
            [priorityKey]: prev.profile[priorityKey] + 1
          }
        };
      }

      return {
        ...prev,
        tasks: newTasks
      };
    });
  };

  const handleDeleteTask = (id: string) => {
    setState(prev => ({
      ...prev,
      tasks: prev.tasks.filter(task => task.id !== id)
    }));
  };

  const handleUpdateTimer = (settings: Partial<TimerSettings>) => {
    setState(prev => ({
      ...prev,
      timerSettings: { ...prev.timerSettings, ...settings }
    }));
  };

  const handleTimerComplete = () => {
    const audio = new Audio('https://actions.google.com/sounds/v1/alarms/beep_short.ogg');
    audio.play();
    alert('Time to take a break! 🎉');
  };

  const toggleDarkMode = () => {
    setState(prev => ({ ...prev, darkMode: !prev.darkMode }));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">TaskFlow Timer</h1>
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
            aria-label="Toggle dark mode"
          >
            {state.darkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          <div className="space-y-6 lg:col-span-2 xl:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg transition-colors duration-200">
              <h2 className="text-xl font-semibold mb-4">Tasks</h2>
              <AddTask onAddTask={handleAddTask} />
              <div className="mt-6">
                <TaskList
                  tasks={state.tasks}
                  onToggleTask={handleToggleTask}
                  onDeleteTask={handleDeleteTask}
                />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <Profile profile={state.profile} />
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg transition-colors duration-200">
              <h2 className="text-xl font-semibold mb-4">Pomodoro Timer</h2>
              <PomodoroTimer
                settings={state.timerSettings}
                onUpdateTimer={handleUpdateTimer}
                onTimerComplete={handleTimerComplete}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;