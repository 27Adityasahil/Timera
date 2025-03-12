import React from 'react';
import { Trophy, Star, Target } from 'lucide-react';
import { Profile as ProfileType } from '../types';

interface ProfileProps {
  profile: ProfileType;
}

export default function Profile({ profile }: ProfileProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Profile</h2>
        <div className="flex items-center gap-2">
          <Trophy className="w-6 h-6 text-yellow-500" />
          <span className="text-2xl font-bold">{profile.points}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Star className="w-5 h-5 text-red-500" />
            <span className="font-semibold">High Priority</span>
          </div>
          <p className="text-2xl font-bold text-red-600 dark:text-red-400">
            {profile.highPriorityCompleted}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">10 points each</p>
        </div>

        <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Star className="w-5 h-5 text-yellow-500" />
            <span className="font-semibold">Medium Priority</span>
          </div>
          <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
            {profile.mediumPriorityCompleted}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">5 points each</p>
        </div>

        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Star className="w-5 h-5 text-green-500" />
            <span className="font-semibold">Low Priority</span>
          </div>
          <p className="text-2xl font-bold text-green-600 dark:text-green-400">
            {profile.lowPriorityCompleted}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">3 points each</p>
        </div>
      </div>

      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <Target className="w-5 h-5 text-blue-500" />
          <span className="font-semibold">Total Tasks Completed</span>
        </div>
        <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
          {profile.tasksCompleted}
        </p>
      </div>
    </div>
  );
}