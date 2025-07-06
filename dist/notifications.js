// src/notifications.ts
import { dom } from './ui'; // Assuming dom elements are managed in ui.ts
/**
 * Displays a temporary notification on the screen.
 * @param message The message to display.
 * @param type The type of notification ('info', 'success', 'error').
 * @param duration The duration in milliseconds for the notification to be visible.
 */
export function showNotification(message, type = 'info', duration = 5000) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `<span>${message}</span>`;
    dom.notificationContainer.appendChild(notification);
    // Trigger the animation
    requestAnimationFrame(() => {
        notification.classList.add('show');
    });
    setTimeout(() => {
        notification.classList.remove('show');
        notification.addEventListener('transitionend', () => notification.remove(), { once: true });
    }, duration);
}
/**
 * Displays a notification with an "Undo" button.
 * @param message The message to display.
 * @param onUndoCallback The function to call when the "Undo" button is clicked.
 * @param duration The duration in milliseconds before the notification disappears.
 */
export function showUndoableNotification(message, onUndoCallback, duration = 7000) {
    const notification = document.createElement('div');
    notification.className = `notification info`;
    notification.innerHTML = `
        <span>${message}</span>
        <button class="btn btn-secondary" id="undoBtn" style="margin-left: 1rem; padding: 0.5rem 1rem; border-radius: 15px;">Annuler</button>
    `;
    dom.notificationContainer.appendChild(notification);
    requestAnimationFrame(() => {
        notification.classList.add('show');
    });
    let timer;
    const closeNotification = () => {
        notification.classList.remove('show');
        notification.addEventListener('transitionend', () => notification.remove(), { once: true });
    };
    const undoButton = notification.querySelector('#undoBtn');
    if (undoButton) {
        undoButton.addEventListener('click', () => {
            clearTimeout(timer);
            onUndoCallback();
            closeNotification();
        });
    }
    timer = window.setTimeout(closeNotification, duration);
}
