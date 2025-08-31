/**
 * Componente contenedor que gestiona múltiples notificaciones toast
 * Renderiza todas las notificaciones activas en una posición fija de la pantalla
 * Cada toast se posiciona automáticamente con espaciado entre ellos
 */
import React from 'react';
import Toast from './Toast';

/**
 * Contenedor que renderiza múltiples notificaciones toast
 * @param {Array} toasts - Array de objetos toast con id, message, type, duration
 * @param {function} onRemove - Función para remover un toast específico por ID
 * @returns {JSX.Element} - Contenedor con todas las notificaciones activas
 */
const ToastContainer = ({ toasts, onRemove }) => {
  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {/* Renderizar cada notificación toast */}
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          duration={toast.duration}
          onClose={() => onRemove(toast.id)}
        />
      ))}
    </div>
  );
};

export default ToastContainer;
