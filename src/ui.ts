// src/ui.ts

import { AppState, HistorySession } from './types';
import *s storage from './storage';
import * as notifications from './notifications';
import * as exercises from './exercises';
import * as timer from './timer';

// --- DOM Elements ---
export const dom = {
    sessionSelect: document.getElementById('sessionSelect') as HTMLSelectElement,
    exerciseListContainer: document.getElementById('exerciseListContainer') as HTMLDivElement,
    totalTonnageEl: document.getElementById('totalTonnage') as HTMLDivElement,
    previousWeekInput: document.getElementById('previousWeek') as HTMLInputElement,
    deltaEl: document.getElementById('delta') as HTMLDivElement,
    totalTimeEl: document.getElementById('totalTime') as HTMLDivElement,
    progressFill: document.getElementById('progressFill') as HTMLDivElement,
    historyModal: document.getElementById('historyModal') as HTMLDivElement,
    closeHistoryModal: document.getElementById('closeHistoryModal') as HTMLButtonElement,
    notificationContainer: document.getElementById('notification-container') as HTMLDivElement,
    customExerciseInput: document.getElementById('customExercise') as HTMLInputElement,
    addExerciseBtn: document.getElementById('addExerciseBtn') as HTMLButtonElement,
    historyList: document.getElementById('historyList') as HTMLDivElement,
    importFileInput: document.getElementById('importFile') as HTMLInputElement,
    themeToggleBtn: document.getElementById('themeToggleBtn') as HTMLButtonElement,
    body: document.body,
    toggleWorkoutTimerBtn: document.getElementById('toggleWorkoutTimerBtn') as HTMLButtonElement,
    newSessionModal: document.getElementById('newSessionModal') as HTMLDivElement,
    closeNewSessionModal: document.getElementById('closeNewSessionModal') as HTMLButtonElement,
    newSessionNameInput: document.getElementById('newSessionNameInput') as HTMLInputElement,
    cancelNewSessionBtn: document.getElementById('cancelNewSessionBtn') as HTMLButtonElement,
    createNewSessionBtn: document.getElementById('createNewSessionBtn') as HTMLButtonElement,
    createNewSessionTypeBtn: document.getElementById('createNewSessionTypeBtn') as HTMLButtonElement,
    deleteCurrentSessionBtn: document.getElementById('deleteCurrentSessionBtn') as HTMLButtonElement,
    loadOptionsModal: document.getElementById('loadOptionsModal') as HTMLDivElement,
    closeLoadOptionsModal: document.getElementById('closeLoadOptionsModal') as HTMLButtonElement,
    loadSessionNameDisplay: document.getElementById('loadSessionName') as HTMLElement,
    openNewSessionBtn: document.getElementById('openNewSessionBtn') as HTMLButtonElement,
    appendToCurrentSessionBtn: document.getElementById('appendToCurrentSessionBtn') as HTMLButtonElement,
    autocompleteSuggestions: document.getElementById('autocompleteSuggestions') as HTMLDivElement,
    plateCalculatorModal: document.getElementById('plateCalculatorModal') as HTMLDivElement,
    closePlateCalculatorModal: document.getElementById('closePlateCalculatorModal') as HTMLButtonElement,
    plateCalculatorBtn: document.getElementById('plateCalculatorBtn') as HTMLButtonElement,
    targetWeightInput: document.getElementById('targetWeightInput') as HTMLInputElement,
    barbellWeightInput: document.getElementById('barbellWeightInput') as HTMLInputElement,
    platesResult: document.getElementById('platesResult') as HTMLDivElement,
    sessionNotesInput: document.getElementById('sessionNotes') as HTMLTextAreaElement,
    addExerciseSection: document.getElementById('addExerciseSection') as HTMLElement,
    quickEditModal: document.getElementById('quickEditModal') as HTMLDivElement,
    closeQuickEditModal: document.getElementById('closeQuickEditModal') as HTMLButtonElement,
    quickEditExerciseName: document.getElementById('quickEditExerciseName') as HTMLElement,
    quickEditWeight: document.getElementById('quickEditWeight') as HTMLInputElement,
    quickEditReps: document.getElementById('quickEditReps') as HTMLInputElement,
    applyQuickEditBtn: document.getElementById('applyQuickEditBtn') as HTMLButtonElement,
    plateCalcTab: document.getElementById('plateCalcTab') as HTMLButtonElement,
    goalCalcTab: document.getElementById('goalCalcTab') as HTMLButtonElement,
    plateCalcContent: document.getElementById('plateCalcContent') as HTMLDivElement,
    goalCalcContent: document.getElementById('goalCalcContent') as HTMLDivElement,
    oneRmInput: document.getElementById('oneRmInput') as HTMLInputElement,
    goalResultsContainer: document.getElementById('goalResultsContainer') as HTMLDivElement,
    timerPlayPauseIcon: document.getElementById('timerPlayPauseIcon') as HTMLElement,
    timerPlayPauseText: document.getElementById('timerPlayPauseText') as HTMLElement,
    bottomAddExerciseBtn: document.getElementById('bottomAddExerciseBtn') as HTMLButtonElement,
    bottomFinishSessionBtn: document.getElementById('bottomFinishSessionBtn') as HTMLButtonElement,
    bottomViewHistoryBtn: document.getElementById('bottomViewHistoryBtn') as HTMLButtonElement,
    bottomPlateCalculatorBtn: document.getElementById('bottomPlateCalculatorBtn') as HTMLButtonElement,
    bottomNotesBtn: document.getElementById('bottomNotesBtn') as HTMLButtonElement,
    sessionNotesSection: document.getElementById('sessionNotesSection') as HTMLElement,
    exportBtn: document.getElementById('exportBtn') as HTMLButtonElement,
    importBtn: document.getElementById('importBtn') as HTMLButtonElement,
    newSessionNameError: document.getElementById('newSessionNameError') as HTMLDivElement,
    targetWeightError: document.getElementById('targetWeightError') as HTMLDivElement,
    barbellWeightError: document.getElementById('barbellWeightError') as HTMLDivElement,
    oneRmError: document.getElementById('oneRmError') as HTMLDivElement,
    quickEditWeightError: document.getElementById('quickEditWeightError') as HTMLDivElement,
    quickEditRepsError: document.getElementById('quickEditRepsError') as HTMLDivElement,
    progressBar: document.getElementById('progressBar') as HTMLDivElement,
    pwaInstallPrompt: document.getElementById('pwaInstallPrompt') as HTMLDivElement,
    installPwaBtn: document.getElementById('installPwaBtn') as HTMLButtonElement,
    closePwaPrompt: document.getElementById('closePwaPrompt') as HTMLButtonElement
};

// --- UI Functions ---

export function applyTheme(theme: 'light' | 'dark'): void {
    if (theme === 'dark') {
        dom.body.classList.add('dark-mode');
        dom.themeToggleBtn.innerHTML = '<i class="fas fa-sun" aria-hidden="true"></i>';
        dom.themeToggleBtn.setAttribute('title', 'Passer au thème clair');
    } else {
        dom.body.classList.remove('dark-mode');
        dom.themeToggleBtn.innerHTML = '<i class="fas fa-moon" aria-hidden="true"></i>';
        dom.themeToggleBtn.setAttribute('title', 'Passer au thème sombre');
    }
}

export function updateSessionSelectOptions(state: AppState): void {
    dom.sessionSelect.innerHTML = '';
    state.sessions.forEach((session, index) => {
        const option = document.createElement('option');
        option.value = index.toString();
        option.textContent = session.name;
        dom.sessionSelect.appendChild(option);
    });
}

export function createTable(state: AppState): void {
    // Implementation of createTable...
    // This function needs to be fully implemented based on the old script logic
}

export function setupEventListeners(state: AppState): void {
    // Implementation of setupEventListeners...
    // This function needs to be fully implemented based on the old script logic
}

// Add other UI-related functions here...
