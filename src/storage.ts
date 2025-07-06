// src/storage.ts

import { InProgressWorkout, HistorySession, CalculatorState, Session } from './types';

const IN_PROGRESS_WORKOUT_KEY = 'inProgressWorkout';
const WORKOUT_HISTORY_KEY = 'workoutHistory';
const CALCULATOR_STATE_KEY = 'calculatorState';
const THEME_KEY = 'theme';

// --- In-Progress Workout ---

export function getInProgressWorkout(): InProgressWorkout | null {
  const data = localStorage.getItem(IN_PROGRESS_WORKOUT_KEY);
  return data ? JSON.parse(data) : null;
}

export function saveInProgressWorkout(workoutData: InProgressWorkout): void {
  localStorage.setItem(IN_PROGRESS_WORKOUT_KEY, JSON.stringify(workoutData));
}

export function clearInProgressWorkout(): void {
  localStorage.removeItem(IN_PROGRESS_WORKOUT_KEY);
}

// --- Workout History ---

export function getHistory(): HistorySession[] {
  const data = localStorage.getItem(WORKOUT_HISTORY_KEY);
  return data ? JSON.parse(data) : [];
}

export function saveHistory(history: HistorySession[]): void {
  localStorage.setItem(WORKOUT_HISTORY_KEY, JSON.stringify(history));
}

// --- Calculator State ---

export function getCalculatorState(): CalculatorState | null {
    const data = localStorage.getItem(CALCULATOR_STATE_KEY);
    return data ? JSON.parse(data) : null;
}

export function saveCalculatorState(calculatorState: CalculatorState): void {
    localStorage.setItem(CALCULATOR_STATE_KEY, JSON.stringify(calculatorState));
}

// --- Theme ---

export function getTheme(): string | null {
    return localStorage.getItem(THEME_KEY);
}

export function saveTheme(theme: 'light' | 'dark'): void {
    localStorage.setItem(THEME_KEY, theme);
}
