// Wait for the DOM to be fully loaded before running the script
document.addEventListener('DOMContentLoaded', () => {
    
    // --- STATE MANAGEMENT ---
    let sessions = [
      [ // PUSH
        { name: "DC barre lourd", rest: "2 min" },
        { name: "DC barre léger", rest: "2 min" },
        { name: "Incliné haltères", rest: "1 min" },
        { name: "Écarté vis à vis", rest: "1 min" },
        { name: "Dips machine", rest: "1 min" },
        { name: "Élévation latérale machine debout", rest: "1 min" },
        { name: "Extension triceps poulie", rest: "1 min" }
      ],
      [ // PULL
        { name: "Traction", rest: "2 min" },
        { name: "Pull poulie", rest: "1 min" },
        { name: "Tirage uni poulie haute sur banc", rest: "1 min" },
        { name: "Rowing T bar", rest: "1 min" },
        { name: "Machine Row", rest: "1 min" },
        { name: "Machine Row uni", rest: "1 min" },
        { name: "Face pull", rest: "1 min" },
        { name: "Oiseaux machine", rest: "1 min" },
        { name: "Curl marteau simultané", rest: "30s" },
        { name: "Bayesian curl", rest: "30s" }
      ],
      [ // LEG
        { name: "Leg extension drop", rest: "1 min" },
        { name: "Presse horizontal", rest: "2 min" },
        { name: "Squat guidé léger", rest: "1 min" },
        { name: "Fente marché", rest: "2 min" },
        { name: "Leg Curl assis", rest: "1 min" },
        { name: "SDT jambes tendues smith", rest: "1 min" }
      ],
      [ // Épaules/Bras
        { name: "Militaire haltères pyramide montante", rest: "3 min" },
        { name: "Élévation latérale", rest: "1 min" },
        { name: "Élévation latérale supination", rest: "1 min" },
        { name: "Face pull", rest: "1 min" },
        { name: "Extension triceps", rest: "1 min" },
        { name: "Curl poulie basse", rest: "0" },
        { name: "Magic triceps", rest: "0" },
        { name: "Curl pupitre", rest: "0" },
        { name: "Dips", rest: "0" },
        { name: "Curl haltères incliné", rest: "0" },
        { name: "Cross Cable Triceps", rest: "0" },
        { name: "Curl concentré haltère", rest: "0" }
      ],
      [ // Dos/Pec
        { name: "Tirage horizontal", rest: "1 min" },
        { name: "Rowing barre buste penché pronation", rest: "1 min" },
        { name: "Tirage poulie basse avec corde", rest: "1 min" },
        { name: "Incliné guidé", rest: "2 min" },
        { name: "Écarté couché", rest: "1 min" },
        { name: "Vis à vis sur banc incliné", rest: "1 min" },
        { name: "Circuit abdos", rest: "1 min" }
      ]
    ];
    let currentSessionIndex = 0;
    let timers = {};
    let workoutStartTime = null;

    // --- DOM Elements ---
    const sessionSelect = document.getElementById('sessionSelect');
    const tbody = document.getElementById('tbody');
    const totalTonnageEl = document.getElementById('totalTonnage');
    const previousWeekInput = document.getElementById('previousWeek');
    const deltaEl = document.getElementById('delta');
    const totalTimeEl = document.getElementById('totalTime');
    const progressFill = document.getElementById('progressFill');

    // --- CORE FUNCTIONS ---

    /**
     * Creates and populates the workout table based on the current session.
     */
    function createTable() {
        tbody.innerHTML = "";
        const exercises = sessions[currentSessionIndex];
        
        exercises.forEach((ex, idx) => {
            const tr = document.createElement("tr");
            tr.classList.add("exercise-row");
            tr.dataset.exerciseIndex = idx; // Add data attribute for easier access

            let seriesHtml = "";
            for(let i = 0; i < 5; i++) {
                seriesHtml += `
                    <td>
                        <div class="serie-input">
                            <input type="number" min="0" data-ex="${idx}" data-serie="${i}" class="reps" placeholder="Reps">
                            <input type="number" min="0" step="0.5" data-ex="${idx}" data-serie="${i}" class="weight" placeholder="kg">
                        </div>
                    </td>`;
            }
            
            tr.innerHTML = `
                <td class="fixed-col">${ex.name}</td>
                ${seriesHtml}
                <td class="stats-cell" id="tonnage-${idx}">0</td>
                <td class="stats-cell" id="totalReps-${idx}">0</td>
                <td class="stats-cell" id="avg-${idx}">0</td>
                <td><strong>${ex.rest}</strong></td>
                <td>
                    <div class="timer-container">
                        <div class="timer-display" id="timer-${idx}">0:00</div>
                        <button class="timer-btn start" data-timer-action="start">Start</button>
                        <button class="timer-btn stop" data-timer-action="stop" style="display: none;">Stop</button>
                        <button class="timer-btn reset" data-timer-action="reset">Reset</button>
                    </div>
                </td>
                <td>
                    <button class="timer-btn" data-action="remove" style="background: #f56565;">🗑️</button>
                </td>`;
            
            tbody.appendChild(tr);
        });
        
        loadCurrentState(); // Load in-progress data for the new table
        updateAllTotals();
    }

    /**
     * Updates all calculated totals, progress, and saves the current state.
     */
    function updateAllTotals() {
        let totalTonnage = 0;
        const exercises = sessions[currentSessionIndex];
        
        exercises.forEach((_, idx) => {
            let tonnage = 0;
            let totalReps = 0;
            
            for(let i = 0; i < 5; i++) {
                const repsInput = document.querySelector(`.reps[data-ex='${idx}'][data-serie='${i}']`);
                const weightInput = document.querySelector(`.weight[data-ex='${idx}'][data-serie='${i}']`);
                const reps = +repsInput?.value || 0;
                const weight = +weightInput?.value || 0;
                
                if (reps > 0 && weight > 0) {
                    tonnage += reps * weight;
                    totalReps += reps;
                    repsInput.classList.add('completed');
                    weightInput.classList.add('completed');
                } else {
                    repsInput?.classList.remove('completed');
                    weightInput?.classList.remove('completed');
                }
            }
            
            const tonnageEl = document.getElementById(`tonnage-${idx}`);
            if (tonnageEl) {
                tonnageEl.textContent = tonnage;
                tonnageEl.classList.toggle('tonnage-high', tonnage > 0);
                document.getElementById(`totalReps-${idx}`).textContent = totalReps;
                document.getElementById(`avg-${idx}`).textContent = totalReps ? (tonnage / totalReps).toFixed(2) : 0;
            }
            totalTonnage += tonnage;
        });
        
        totalTonnageEl.textContent = totalTonnage;
        
        const previous = +previousWeekInput.value || 0;
        const delta = totalTonnage - previous;
        deltaEl.textContent = delta > 0 ? `+${delta}` : delta;
        deltaEl.style.color = delta > 0 ? '#48bb78' : delta < 0 ? '#f56565' : '#4a5568';
        
        updateProgress();
        saveCurrentState();
    }

    /**
     * Updates the session completion progress bar.
     */
    function updateProgress() {
        const allInputs = document.querySelectorAll('.reps, .weight');
        const completedInputs = document.querySelectorAll('.completed');
        const progress = allInputs.length > 0 ? (completedInputs.length / allInputs.length) * 100 : 0;
        progressFill.style.width = `${progress}%`;
    }

    // --- DATA PERSISTENCE (LocalStorage) ---

    /**
     * Saves the current IN-PROGRESS session state to localStorage.
     */
    function saveCurrentState() {
        const data = {
            reps: [...document.querySelectorAll(".reps")].map(i => i.value),
            weight: [...document.querySelectorAll(".weight")].map(i => i.value),
            previousWeek: previousWeekInput.value,
            sessionIndex: currentSessionIndex,
            customSessions: sessions,
            workoutStartTime: workoutStartTime
        };
        localStorage.setItem('inProgressWorkout', JSON.stringify(data));
    }

    /**
     * Loads the IN-PROGRESS session state from localStorage.
     */
    function loadCurrentState() {
        const data = JSON.parse(localStorage.getItem('inProgressWorkout'));
        if (!data) return;

        if (data.customSessions) sessions = data.customSessions;
        
        // Ensure we load data only if the session matches
        if (data.sessionIndex === currentSessionIndex) {
            document.querySelectorAll(".reps").forEach((input, idx) => {
                if (data.reps[idx]) input.value = data.reps[idx];
            });
            document.querySelectorAll(".weight").forEach((input, idx) => {
                if (data.weight[idx]) input.value = data.weight[idx];
            });
            previousWeekInput.value = data.previousWeek || "";
        }
        
        if (data.workoutStartTime && !workoutStartTime) {
            workoutStartTime = data.workoutStartTime;
            updateTotalTimeDisplay();
        }

        updateAllTotals();
    }
    
    /**
     * Resets the current session form and clears in-progress data.
     */
    function resetSession() {
        Object.values(timers).forEach(timer => clearInterval(timer.interval));
        timers = {};
        workoutStartTime = null;
        
        localStorage.removeItem('inProgressWorkout');
        
        createTable(); // Rebuilds table and clears inputs
        totalTimeEl.textContent = 0;
        showNotification("Séance réinitialisée", "info");
    }

    // --- WORKOUT HISTORY SYSTEM ---

    /**
     * Retrieves workout history from localStorage.
     * @returns {Array} An array of saved workout objects.
     */
    function getHistory() {
        return JSON.parse(localStorage.getItem('workoutHistory')) || [];
    }

    /**
     * Saves the completed workout session to the history in localStorage.
     */
    function finishAndSaveSession() {
        const totalTonnage = +totalTonnageEl.textContent;
        if (totalTonnage === 0) {
            if (confirm("La séance est vide. Voulez-vous vraiment la réinitialiser sans sauvegarder?")) {
                resetSession();
            }
            return;
        }

        const workoutData = {
            id: Date.now(),
            date: new Date().toISOString(),
            sessionName: sessionSelect.selectedOptions[0].text,
            totalTonnage: totalTonnage,
            workoutDuration: workoutStartTime ? Math.floor((Date.now() - workoutStartTime) / 1000 / 60) : 0,
            exercises: sessions[currentSessionIndex].map((ex, idx) => {
                const series = [];
                for(let i = 0; i < 5; i++) {
                    const reps = +document.querySelector(`.reps[data-ex='${idx}'][data-serie='${i}']`).value || 0;
                    const weight = +document.querySelector(`.weight[data-ex='${idx}'][data-serie='${i}']`).value || 0;
                    if (reps > 0 || weight > 0) {
                        series.push({ reps, weight, tonnage: reps * weight });
                    }
                }
                return { name: ex.name, series };
            }).filter(ex => ex.series.length > 0)
        };

        const history = getHistory();
        history.push(workoutData);
        localStorage.setItem('workoutHistory', JSON.stringify(history));

        showNotification("Séance sauvegardée dans l'historique!", "success");
        resetSession();
    }

    /**
     * Displays the workout history in the modal.
     */
    function displayHistory() {
        const history = getHistory().sort((a, b) => b.id - a.id); // Show newest first
        const historyList = document.getElementById('historyList');
        historyList.innerHTML = '';

        if (history.length === 0) {
            historyList.innerHTML = '<p>Aucune séance dans l\'historique.</p>';
            return;
        }

        history.forEach(session => {
            const item = document.createElement('div');
            item.className = 'history-item';
            item.innerHTML = `
                <div class="history-item-info">
                    ${new Date(session.date).toLocaleDateString('fr-FR')} - 
                    <strong>${session.sessionName}</strong> - 
                    Tonnage: <span>${session.totalTonnage} kg</span>
                </div>
                <div class="history-item-actions">
                    <button class="btn btn-primary" data-history-action="details" data-history-id="${session.id}">Détails</button>
                    <button class="btn btn-danger" data-history-action="delete" data-history-id="${session.id}">Suppr.</button>
                </div>
                <div class="history-details" id="details-${session.id}">
                    <table>
                        <thead><tr><th>Exercice</th><th>Série</th><th>Reps</th><th>Poids</th></tr></thead>
                        <tbody>
                            ${session.exercises.map(ex => 
                                ex.series.map((s, i) => `
                                    <tr>
                                        <td>${ex.name}</td>
                                        <td>${i + 1}</td>
                                        <td>${s.reps}</td>
                                        <td>${s.weight} kg</td>
                                    </tr>
                                `).join('')
                            ).join('')}
                        </tbody>
                    </table>
                </div>
            `;
            historyList.appendChild(item);
        });
    }

    /**
     * Deletes a specific session from history.
     * @param {number} id - The unique ID of the session to delete.
     */
    function deleteFromHistory(id) {
        if (!confirm("Êtes-vous sûr de vouloir supprimer cette séance de l'historique?")) return;
        
        let history = getHistory();
        history = history.filter(session => session.id !== id);
        localStorage.setItem('workoutHistory', JSON.stringify(history));
        displayHistory(); // Refresh the view
        showNotification("Séance supprimée de l'historique.", "info");
    }


    // --- UTILITY & UI FUNCTIONS ---

    function selectSession() {
        currentSessionIndex = parseInt(sessionSelect.value);
        resetSession(); // Reset and create new table for the selected session
    }

    function addCustomExercise() {
        const exerciseName = document.getElementById("customExercise").value.trim();
        const restTime = document.getElementById("customRest").value.trim();
        
        if (!exerciseName) {
            showNotification("Veuillez entrer un nom d'exercice", "error");
            return;
        }
        
        sessions[currentSessionIndex].push({
            name: exerciseName,
            rest: restTime || "1 min"
        });
        
        document.getElementById("customExercise").value = "";
        createTable(); // Re-create table with the new exercise
        saveCurrentState(); // Save the new exercise list
        showNotification("Exercice ajouté avec succès!", "success");
    }

    function removeExercise(idx) {
        if (sessions[currentSessionIndex].length <= 1) {
            showNotification("Impossible de supprimer le dernier exercice", "error");
            return;
        }
        sessions[currentSessionIndex].splice(idx, 1);
        createTable();
        showNotification("Exercice supprimé", "info");
    }

    // Timer functions
    function startTimer(idx) {
        if (timers[idx]) clearInterval(timers[idx].interval);
        
        if (!workoutStartTime) {
            workoutStartTime = Date.now();
            updateTotalTimeDisplay(); // Start global timer
        }
        
        timers[idx] = {
            seconds: 0,
            interval: setInterval(() => {
                timers[idx].seconds++;
                updateTimerDisplay(idx);
            }, 1000)
        };
        
        const row = document.querySelector(`[data-exercise-index='${idx}']`);
        row.querySelector('[data-timer-action="start"]').style.display = 'none';
        row.querySelector('[data-timer-action="stop"]').style.display = 'inline-block';
        row.querySelector('.timer-display').classList.add('timer-active');
    }

    function stopTimer(idx) {
        if (timers[idx]) {
            clearInterval(timers[idx].interval);
            delete timers[idx];
        }
        const row = document.querySelector(`[data-exercise-index='${idx}']`);
        row.querySelector('[data-timer-action="start"]').style.display = 'inline-block';
        row.querySelector('[data-timer-action="stop"]').style.display = 'none';
        row.querySelector('.timer-display').classList.remove('timer-active');
    }

    function resetTimer(idx) {
        stopTimer(idx);
        document.getElementById(`timer-${idx}`).textContent = '0:00';
    }

    function updateTimerDisplay(idx) {
        const timer = timers[idx];
        if (timer) {
            const minutes = Math.floor(timer.seconds / 60);
            const seconds = timer.seconds % 60;
            document.getElementById(`timer-${idx}`).textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        }
    }
    
    // Global workout time
    let totalTimeInterval;
    function updateTotalTimeDisplay() {
        if(totalTimeInterval) clearInterval(totalTimeInterval);

        function update() {
            if (workoutStartTime) {
                const elapsed = Math.floor((Date.now() - workoutStartTime) / 1000 / 60);
                totalTimeEl.textContent = elapsed;
            }
        }
        update(); // a first time immediately
        totalTimeInterval = setInterval(update, 60000); // Update every minute
    }

    function showNotification(message, type = 'info') {
        const container = document.getElementById('notification-container');
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        container.appendChild(notification);
        
        setTimeout(() => notification.classList.add('show'), 10);
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => container.removeChild(notification), 300);
        }, 3000);
    }
    
    // --- EVENT LISTENERS ---
    
    // Delegated event listener for the table body for performance
    tbody.addEventListener('change', (e) => {
        if (e.target.classList.contains('reps') || e.target.classList.contains('weight')) {
            updateAllTotals();
        }
    });

    tbody.addEventListener('click', (e) => {
        const target = e.target.closest('button');
        if (!target) return;

        const action = target.dataset.action || target.dataset.timerAction;
        const row = target.closest('.exercise-row');
        const idx = parseInt(row.dataset.exerciseIndex, 10);

        switch(action) {
            case 'remove':
                removeExercise(idx);
                break;
            case 'start':
                startTimer(idx);
                break;
            case 'stop':
                stopTimer(idx);
                break;
            case 'reset':
                resetTimer(idx);
                break;
        }
    });

    sessionSelect.addEventListener('change', selectSession);
    document.getElementById('addExerciseBtn').addEventListener('click', addCustomExercise);
    previousWeekInput.addEventListener('change', updateAllTotals);
    
    // New action buttons
    document.getElementById('finishSessionBtn').addEventListener('click', finishAndSaveSession);
    document.getElementById('viewHistoryBtn').addEventListener('click', () => {
        displayHistory();
        document.getElementById('historyModal').style.display = 'flex';
    });
    
    // History Modal Listeners
    document.getElementById('closeHistoryModal').addEventListener('click', () => {
        document.getElementById('historyModal').style.display = 'none';
    });
    
    document.getElementById('historyList').addEventListener('click', (e) => {
        const target = e.target.closest('button');
        if (!target) return;

        const action = target.dataset.historyAction;
        const id = parseInt(target.dataset.historyId, 10);
        
        if (action === 'delete') {
            deleteFromHistory(id);
        } else if (action === 'details') {
            const detailsEl = document.getElementById(`details-${id}`);
            detailsEl.classList.toggle('visible');
        }
    });
    
    // Initialize the application
    function init() {
        const savedSessionIndex = JSON.parse(localStorage.getItem('inProgressWorkout'))?.sessionIndex;
        if (savedSessionIndex !== undefined) {
            currentSessionIndex = savedSessionIndex;
            sessionSelect.value = savedSessionIndex;
        }
        createTable();
    }

    init();
});