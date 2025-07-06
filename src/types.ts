// src/types.ts

/**
 * Represents a single series of an exercise, containing weight and repetitions.
 */
export interface Serie {
  weight: string | number;
  reps: string | number;
}

/**
 * Represents a single exercise within a session.
 */
export interface Exercise {
  name: string;
  rest: string;
  series: Serie[];
  supersetGroup?: boolean;
  supersetWith?: number | null;
}

/**
 * Represents a complete workout session, containing a name and a list of exercises.
 */
export interface Session {
  name: string;
  exercises: Exercise[];
}

/**
 * Represents a historical session record.
 */
export interface HistorySession extends Session {
    id: number;
    date: string;
    totalTonnage: number;
    duration: string;
    notes: string;
    isAutoSave?: boolean;
}

/**
 * Represents the main state of the application.
 */
export interface AppState {
  sessions: Session[];
  currentSessionIndex: number;
  timers: { [key: number]: any }; // Consider defining a more specific timer type
  workoutStartTime: string | null;
  totalWorkoutTimeInterval: number | null;
  isWorkoutTimerPaused: boolean;
  pausedTime: number;
  sessionToLoad: HistorySession | null;
  availableExercises: string[];
  lastDeletedExercise: Exercise | null;
  inactivityTimeout: number | null;
  autoSaveInterval: number | null;
  linkingState: { active: boolean; fromIndex: number | null };
  quickEditIndex: number | null;
  isMobileView: boolean;
  isNotesSectionVisible: boolean;
  deferredPwaPrompt: any | null; // This is for the BeforeInstallPromptEvent
}

/**
 * Represents the data structure for an in-progress workout saved to storage.
 */
export interface InProgressWorkout {
    previousWeek: string;
    sessionIndex: number;
    customSessions: Session[];
    workoutStartTime: string | null;
    isWorkoutTimerPaused: boolean;
    pausedTime: number;
    saveTimestamp: number;
    sessionNotes: string;
}

/**
 * Represents the data structure for calculator state saved to storage.
 */
export interface CalculatorState {
    targetWeight: string;
    barbellWeight: string;
    oneRm: string;
}
