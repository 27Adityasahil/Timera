export interface Task {
  id: string;
  title: string;
  priority: 'high' | 'medium' | 'low';
  completed: boolean;
  createdAt: number;
  pointsAwarded?: boolean;
}

export interface TimerSettings {
  duration: number;
  isRunning: boolean;
  timeLeft: number;
  customDuration?: number;
}

export interface Profile {
  points: number;
  tasksCompleted: number;
  highPriorityCompleted: number;
  mediumPriorityCompleted: number;
  lowPriorityCompleted: number;
}

export interface AppState {
  tasks: Task[];
  timerSettings: TimerSettings;
  darkMode: boolean;
  profile: Profile;
}