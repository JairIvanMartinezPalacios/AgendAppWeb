/**
 * Hook personalizado para manejar diálogos de confirmación
 * Permite mostrar, ocultar y gestionar el estado de un modal de confirmación
 * con diferentes tipos (warning, error, info, etc.)
 */
import { useState, useCallback } from 'react';

/**
 * Hook que gestiona el estado y comportamiento de un diálogo de confirmación
 * @returns {object} - Objeto con funciones y estado del diálogo de confirmación
 */
const useConfirm = () => {
  // Estado del diálogo de confirmación
  // isOpen: controla si el diálogo está visible o no
  // title: título del diálogo
  // message: mensaje principal del diálogo
  // onConfirm: función que se ejecuta cuando se confirma la acción
  // type: tipo de diálogo (warning, error, info, success)
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: null,
    type: 'warning'
  });

  /**
   * Función para mostrar el diálogo de confirmación
   * @param {string} title - Título del diálogo
   * @param {string} message - Mensaje del diálogo
   * @param {function} onConfirm - Función a ejecutar cuando se confirma
   * @param {string} type - Tipo de diálogo (por defecto 'warning')
   */
  const showConfirm = useCallback((title, message, onConfirm, type = 'warning') => {
    // Actualizar el estado para mostrar el diálogo
    setConfirmDialog({
      isOpen: true,
      title,
      message,
      onConfirm,
      type
    });
  }, []);

  /**
   * Función para ocultar el diálogo de confirmación
   * Mantiene el resto de propiedades del estado pero cambia isOpen a false
   */
  const hideConfirm = useCallback(() => {
    setConfirmDialog(prev => ({ ...prev, isOpen: false }));
  }, []);

  /**
   * Función que retorna una Promise para manejar confirmaciones de forma asíncrona
   * Útil cuando necesitas esperar la respuesta del usuario antes de continuar
   * @param {string} title - Título del diálogo
   * @param {string} message - Mensaje del diálogo
   * @param {function} onConfirm - Función a ejecutar cuando se confirma
   * @param {string} type - Tipo de diálogo
   * @returns {Promise<boolean>} - Promise que se resuelve con true cuando se confirma
   */
  const confirm = useCallback((title, message, onConfirm, type = 'warning') => {
    // Retornar una nueva Promise que se resuelve cuando el usuario confirma
    return new Promise((resolve) => {
      // Mostrar el diálogo con una función wrapper que:
      // 1. Ejecuta la función onConfirm original
      // 2. Oculta el diálogo
      // 3. Resuelve la Promise con true
      showConfirm(title, message, () => {
        onConfirm();
        hideConfirm();
        resolve(true);
      }, type);
    });
  }, [showConfirm, hideConfirm]);

  // Retornar el estado y las funciones para que el componente las use
  return {
    confirmDialog, // Estado completo del diálogo
    showConfirm,  // Función para mostrar el diálogo
    hideConfirm,  // Función para ocultar el diálogo
    confirm       // Función que retorna una Promise
  };
};

export default useConfirm;
