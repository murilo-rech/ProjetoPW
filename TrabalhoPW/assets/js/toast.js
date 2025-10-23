// Toast Notification System
class Toast {
    constructor() {
        this.container = document.getElementById('toast-container');
        this.toasts = new Set();
    }

    /**
     * Show a toast notification
     * @param {string} title - Toast title
     * @param {string} message - Toast message
     * @param {string} type - Toast type (success, error, warning, info)
     * @param {number} duration - Duration in milliseconds (0 = no auto-close)
     */
    show(title, message, type = 'info', duration = 5000) {
        const toast = this.createToast(title, message, type, duration);
        this.container.appendChild(toast);
        this.toasts.add(toast);

        // Animate in
        requestAnimationFrame(() => {
            toast.classList.add('show');
        });

        // Auto remove if duration is set
        if (duration > 0) {
            setTimeout(() => {
                this.hide(toast);
            }, duration);
        }

        return toast;
    }

    /**
     * Create toast element
     */
    createToast(title, message, type, duration) {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        
        const icons = {
            success: 'fas fa-check-circle',
            error: 'fas fa-exclamation-circle',
            warning: 'fas fa-exclamation-triangle',
            info: 'fas fa-info-circle'
        };

        toast.innerHTML = `
            <div class="toast-icon">
                <i class="${icons[type] || icons.info}"></i>
            </div>
            <div class="toast-content">
                <div class="toast-title">${title}</div>
                <div class="toast-message">${message}</div>
            </div>
            <button class="toast-close" onclick="toast.hide(this.parentElement)">
                <i class="fas fa-times"></i>
            </button>
            ${duration > 0 ? `<div class="toast-progress" style="animation-duration: ${duration}ms"></div>` : ''}
        `;

        return toast;
    }

    /**
     * Hide and remove toast
     */
    hide(toast) {
        if (!this.toasts.has(toast)) return;

        toast.classList.remove('show');
        toast.classList.add('hide');

        // Remove from DOM after animation
        setTimeout(() => {
            if (toast.parentElement) {
                toast.parentElement.removeChild(toast);
            }
            this.toasts.delete(toast);
        }, 300);
    }

    /**
     * Hide all toasts
     */
    hideAll() {
        this.toasts.forEach(toast => {
            this.hide(toast);
        });
    }

    /**
     * Quick success toast
     */
    success(message, title = 'Sucesso!', duration = 4000) {
        return this.show(title, message, 'success', duration);
    }

    /**
     * Quick error toast
     */
    error(message, title = 'Erro!', duration = 6000) {
        return this.show(title, message, 'error', duration);
    }

    /**
     * Quick warning toast
     */
    warning(message, title = 'Atenção!', duration = 5000) {
        return this.show(title, message, 'warning', duration);
    }

    /**
     * Quick info toast
     */
    info(message, title = 'Informação', duration = 4000) {
        return this.show(title, message, 'info', duration);
    }
}

// Initialize toast system
const toast = new Toast();

// Expose to global scope for use in HTML onclick events
window.toast = toast;

// // Uso básico
// toast.success('Mensagem de sucesso');
// toast.error('Mensagem de erro');
// toast.warning('Mensagem de alerta');
// toast.info('Mensagem informativa');

// // Com título customizado
// toast.success('Produto adicionado com sucesso', 'Sucesso!');

// // Com duração customizada
// toast.info('Esta mensagem ficará por 10 segundos', 'Informação', 10000);

// // Sem auto-close
// toast.warning('Esta mensagem não fecha sozinha', 'Atenção', 0);
