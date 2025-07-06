// src/main.ts
import * as storage from './storage';
import * as exercises from './exercises';
import * as ui from './ui';
import * as timer from './timer';
// Initialize the application state
const state = {
    sessions: [],
    currentSessionIndex: 0,
    timers: {},
    workoutStartTime: null,
    totalWorkoutTimeInterval: null,
    isWorkoutTimerPaused: false,
    pausedTime: 0,
    sessionToLoad: null,
    availableExercises: [],
    lastDeletedExercise: null,
    inactivityTimeout: null,
    autoSaveInterval: null,
    linkingState: { active: false, fromIndex: null },
    quickEditIndex: null,
    isMobileView: window.matchMedia("(max-width: 768px)").matches,
    isNotesSectionVisible: false,
    deferredPwaPrompt: null,
};
/**
 * Main initialization function for the application.
 */
function init() {
    // Request notification permission
    if ('Notification' in window) {
        Notification.requestPermission();
    }
    state.availableExercises = exercises.getAvailableExercises();
    // --- Theme Initialization ---
    const savedTheme = storage.getTheme();
    if (savedTheme) {
        ui.applyTheme(savedTheme);
    }
    else {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
        ui.applyTheme(prefersDark.matches ? 'dark' : 'light');
        prefersDark.addEventListener('change', (e) => {
            if (!storage.getTheme()) {
                ui.applyTheme(e.matches ? 'dark' : 'light');
            }
        });
    }
    // --- Session and State Loading ---
    const inProgress = storage.getInProgressWorkout();
    if (inProgress) {
        state.sessions = inProgress.customSessions || JSON.parse(JSON.stringify(exercises.defaultSessions));
        state.currentSessionIndex = inProgress.sessionIndex || 0;
        if (state.currentSessionIndex >= state.sessions.length) {
            state.currentSessionIndex = 0;
        }
        state.workoutStartTime = inProgress.workoutStartTime || null;
        state.isWorkoutTimerPaused = inProgress.isWorkoutTimerPaused;
        state.pausedTime = inProgress.pausedTime || 0;
        if (state.workoutStartTime && !state.isWorkoutTimerPaused) {
            const elapsedSinceSave = (Date.now() - (inProgress.saveTimestamp || new Date(state.workoutStartTime).getTime())) / 1000;
            state.pausedTime = (inProgress.pausedTime || 0) + elapsedSinceSave;
            timer.startTotalWorkoutTimer(state, ui.dom);
        }
        else if (state.workoutStartTime) {
            ui.dom.totalTimeEl.textContent = timer.formatTime(state.pausedTime);
            ui.dom.timerPlayPauseIcon.textContent = '▶️';
            ui.dom.timerPlayPauseText.textContent = 'Play';
        }
    }
    else {
        state.sessions = JSON.parse(JSON.stringify(exercises.defaultSessions));
    }
    // --- UI Initialization ---
    if (state.isMobileView) {
        ui.dom.sessionNotesSection.classList.add('hide-notes-section');
        state.isNotesSectionVisible = false;
    }
    else {
        ui.dom.sessionNotesSection.classList.add('show-notes-section');
        state.isNotesSectionVisible = true;
    }
    ui.updateSessionSelectOptions(state);
    ui.dom.sessionSelect.value = state.currentSessionIndex.toString();
    ui.createTable(state);
    // --- Event Listeners ---
    ui.setupEventListeners(state);
    timer.loadPersistentIndividualTimers(state);
    window.addEventListener('resize', () => {
        const newIsMobileView = window.matchMedia("(max-width: 768px)").matches;
        if (newIsMobileView !== state.isMobileView) {
            state.isMobileView = newIsMobileView;
            ui.createTable(state);
            if (state.isMobileView && !state.isNotesSectionVisible) {
                ui.dom.sessionNotesSection.classList.add('hide-notes-section');
            }
            else {
                ui.dom.sessionNotesSection.classList.remove('hide-notes-section');
                ui.dom.sessionNotesSection.classList.add('show-notes-section');
            }
        }
    });
    // --- PWA Install Prompt ---
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        state.deferredPwaPrompt = e;
        if (localStorage.getItem('pwaPromptDismissed') !== 'true') {
            ui.dom.pwaInstallPrompt.classList.remove('hidden');
            setTimeout(() => ui.dom.pwaInstallPrompt.classList.add('show'), 10);
        }
    });
}
// Start the application once the DOM is fully loaded
document.addEventListener('DOMContentLoaded', init);
