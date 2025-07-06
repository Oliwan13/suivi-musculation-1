// src/storage.ts
const IN_PROGRESS_WORKOUT_KEY = 'inProgressWorkout';
const WORKOUT_HISTORY_KEY = 'workoutHistory';
const CALCULATOR_STATE_KEY = 'calculatorState';
const THEME_KEY = 'theme';
// --- In-Progress Workout ---
export function getInProgressWorkout() {
    const data = localStorage.getItem(IN_PROGRESS_WORKOUT_KEY);
    return data ? JSON.parse(data) : null;
}
export function saveInProgressWorkout(workoutData) {
    localStorage.setItem(IN_PROGRESS_WORKOUT_KEY, JSON.stringify(workoutData));
}
export function clearInProgressWorkout() {
    localStorage.removeItem(IN_PROGRESS_WORKOUT_KEY);
}
// --- Workout History ---
export function getHistory() {
    const data = localStorage.getItem(WORKOUT_HISTORY_KEY);
    return data ? JSON.parse(data) : [];
}
export function saveHistory(history) {
    localStorage.setItem(WORKOUT_HISTORY_KEY, JSON.stringify(history));
}
// --- Calculator State ---
export function getCalculatorState() {
    const data = localStorage.getItem(CALCULATOR_STATE_KEY);
    return data ? JSON.parse(data) : null;
}
export function saveCalculatorState(calculatorState) {
    localStorage.setItem(CALCULATOR_STATE_KEY, JSON.stringify(calculatorState));
}
// --- Theme ---
export function getTheme() {
    return localStorage.getItem(THEME_KEY);
}
export function saveTheme(theme) {
    localStorage.setItem(THEME_KEY, theme);
}
