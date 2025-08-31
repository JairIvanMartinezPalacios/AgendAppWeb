/**
 * Hook personalizado para manejar notificaciones toast
 * Permite mostrar, ocultar y gestionar múltiples notificaciones simultáneamente
 * con diferentes tipos (success, error, warning, info) y duración automática
 */
import { useState, useCallback } from 'react';

/**
 * Hook que gestiona el estado y comportamiento de las notificaciones toast
 * @returns {object} - Objeto con el estado de los toasts y funciones para manejarlos
 */
const useToast = () => {
  // Estado que almacena un array de todas las notificaciones toast activas
  // Cada toast tiene: id, message, type, duration
  const [toasts, setToasts] = useState([]);

  /**
   * Función principal para agregar una nueva notificación toast
   * @param {string} message - Mensaje a mostrar en la notificación
   * @param {string} type - Tipo de notificación ('info', 'success', 'warning', 'error')
   * @param {number} duration - Duración en milisegundos antes de auto-ocultar (0 = no auto-ocultar)
   * @returns {number} - ID único del toast creado
   */
  const addToast = useCallback((message, type = 'info', duration = 3000) => {
    // Generar ID único basado en timestamp actual
    const id = Date.now();
    
    // Crear objeto del nuevo toast
    const newToast = { id, message, type, duration };
    
    // Agregar el nuevo toast al array existente
    setToasts(prev => [...prev, newToast]);
    
    // Configurar auto-remoción del toast después de la duración especificada
    // Solo si duration > 0 (para toasts que no se auto-ocultan)
    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
    
    // Retornar el ID para poder referenciar este toast específico
    return id;
  }, []);

  /**
   * Función para remover un toast específico por su ID
   * @param {number} id - ID del toast a remover
   */
  const removeToast = useCallback((id) => {
    // Filtrar el array para excluir el toast con el ID especificado
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  /**
   * Función helper para mostrar un toast de éxito
   * @param {string} message - Mensaje a mostrar
   * @param {number} duration - Duración opcional (usa 3000ms por defecto)
   * @returns {number} - ID del toast creado
   */
  const showSuccess = useCallback((message, duration) => {
    return addToast(message, 'success', duration);
  }, [addToast]);

  /**
   * Función helper para mostrar un toast de error
   * @param {string} message - Mensaje a mostrar
   * @param {number} duration - Duración opcional (usa 3000ms por defecto)
   * @returns {number} - ID del toast creado
   */
  const showError = useCallback((message, duration) => {
    return addToast(message, 'error', duration);
  }, [addToast]);

  /**
   * Función helper para mostrar un toast de advertencia
   * @param {string} message - Mensaje a mostrar
   * @param {number} duration - Duración opcional (usa 3000ms por defecto)
   * @returns {number} - ID del toast creado
   */
  const showWarning = useCallback((message, duration) => {
    return addToast(message, 'warning', duration);
  }, [addToast]);

  /**
   * Función helper para mostrar un toast informativo
   * @param {string} message - Mensaje a mostrar
   * @param {number} duration - Duración opcional (usa 3000ms por defecto)
   * @returns {number} - ID del toast creado
   */
  const showInfo = useCallback((message, duration) => {
    return addToast(message, 'info', duration);
  }, [addToast]);

  // Retornar el estado y las funciones para que el componente las use
  return {
    toasts,        // Array de toasts activos
    addToast,      // Función principal para agregar toasts
    removeToast,   // Función para remover toasts por ID
    showSuccess,   // Helper para toasts de éxito
    showError,     // Helper para toasts de error
    showWarning,   // Helper para toasts de advertencia
    showInfo       // Helper para toasts informativos
  };
};

export default useToast;
