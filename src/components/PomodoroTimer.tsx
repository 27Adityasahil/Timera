import React, { useEffect, useCallback, useState } from 'react';
import { Play, Pause, RotateCcw, Clock } from 'lucide-react';
import { TimerSettings } from '../types';

interface PomodoroTimerProps {
  settings: TimerSettings;
  onUpdateTimer: (settings: Partial<TimerSettings>) => void;
  onTimerComplete: () => void;
}

export default function PomodoroTimer({
  settings,
  onUpdateTimer,
  onTimerComplete
}: PomodoroTimerProps) {
  const [customMinutes, setCustomMinutes] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = (settings.timeLeft / (settings.duration * 60)) * 100;

  const handleTimerTick = useCallback(() => {
    if (settings.isRunning && settings.timeLeft > 0) {
      onUpdateTimer({ timeLeft: settings.timeLeft - 1 });
    } else if (settings.isRunning && settings.timeLeft === 0) {
      onTimerComplete();
      onUpdateTimer({ isRunning: false });
    }
  }, [settings.isRunning, settings.timeLeft, onUpdateTimer, onTimerComplete]);

  useEffect(() => {
    const timer = setInterval(handleTimerTick, 1000);
    return () => clearInterval(timer);
  }, [handleTimerTick]);

  const handleDurationChange = (minutes: number) => {
    onUpdateTimer({
      duration: minutes,
      timeLeft: minutes * 60,
      isRunning: false
    });
    setShowCustomInput(false);
  };

  const handleCustomDurationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const minutes = parseInt(customMinutes);
    if (!isNaN(minutes) && minutes > 0) {
      handleDurationChange(minutes);
      setCustomMinutes('');
    }
  };

  return (
    <div className="space-y-6">
      <div className="relative w-48 h-48 mx-auto">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="96"
            cy="96"
            r="88"
            className="stroke-current text-gray-200 dark:text-gray-700"
            strokeWidth="12"
            fill="none"
          />
          <circle
            cx="96"
            cy="96"
            r="88"
            className="stroke-current text-blue-500"
            strokeWidth="12"
            fill="none"
            strokeDasharray="553"
            strokeDashoffset={553 - (553 * progress) / 100}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl font-bold">
          {formatTime(settings.timeLeft)}
        </div>
      </div>

      <div className="flex justify-center space-x-4">
        <button
          onClick={() => onUpdateTimer({ isRunning: !settings.isRunning })}
          className="p-3 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors"
        >
          {settings.isRunning ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
        </button>
        <button
          onClick={() => onUpdateTimer({ timeLeft: settings.duration * 60, isRunning: false })}
          className="p-3 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        >
          <RotateCcw className="w-6 h-6" />
        </button>
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        {[15, 25, 45].map((duration) => (
          <button
            key={duration}
            onClick={() => handleDurationChange(duration)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              settings.duration === duration && !showCustomInput
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200'
            }`}
          >
            {duration}m
          </button>
        ))}
        <button
          onClick={() => setShowCustomInput(!showCustomInput)}
          className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${
            showCustomInput
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200'
          }`}
        >
          <Clock className="w-4 h-4" />
          Custom
        </button>
      </div>

      {showCustomInput && (
        <form onSubmit={handleCustomDurationSubmit} className="flex justify-center gap-2">
          <input
            type="number"
            value={customMinutes}
            onChange={(e) => setCustomMinutes(e.target.value)}
            placeholder="Enter minutes"
            min="1"
            className="w-32 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Set
          </button>
        </form>
      )}
    </div>
  );
}