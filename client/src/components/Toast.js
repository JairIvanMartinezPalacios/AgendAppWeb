/**
 * Componente de notificación toast individual
 * Muestra mensajes temporales con diferentes tipos (success, error, warning, info)
 * Incluye auto-cierre, animaciones y botón de cierre manual
 */
import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, AlertCircle, X } from 'lucide-react';

/**
 * Notificación toast con auto-cierre y animaciones
 * @param {string} message - Mensaje a mostrar en la notificación
 * @param {string} type - Tipo de notificación ('success', 'error', 'warning', 'info')
 * @param {number} duration - Duración en milisegundos antes de auto-cerrar (0 = no auto-cierre)
 * @param {function} onClose - Función que se ejecuta al cerrar la notificación
 * @returns {JSX.Element|null} - Notificación toast o null si no es visible
 */
const Toast = ({ message, type = 'info', duration = 3000, onClose }) => {
  // Estado que controla si la notificación es visible (para animaciones)
  const [isVisible, setIsVisible] = useState(true);

  // Efecto para auto-cerrar la notificación después de la duración especificada
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        // Ocultar la notificación
        setIsVisible(false);
        // Esperar a que termine la animación antes de remover del DOM
        setTimeout(onClose, 300);
      }, duration);
      
      // Cleanup: limpiar el timer si el componente se desmonta
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  /**
   * Maneja el cierre manual de la notificación
   * Incluye animación de salida antes de remover del DOM
   */
  const handleClose = () => {
    setIsVisible(false);
    // Esperar a que termine la animación antes de remover
    setTimeout(onClose, 300);
  };

  /**
   * Retorna el ícono apropiado según el tipo de notificación
   * @returns {JSX.Element} - Ícono con color apropiado
   */
  const getIcon = () => {
    switch (type) {
      case 'success':
        // Círculo con check verde para éxito
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'error':
        // Círculo con X rojo para errores
        return <XCircle className="w-5 h-5 text-red-600" />;
      case 'warning':
        // Círculo con signo de exclamación amarillo para advertencias
        return <AlertCircle className="w-5 h-5 text-yellow-600" />;
      default:
        // Círculo con signo de exclamación azul para información
        return <AlertCircle className="w-5 h-5 text-blue-600" />;
    }
  };

  /**
   * Retorna los estilos CSS apropiados según el tipo de notificación
   * @returns {string} - Clases CSS para el estilo del toast
   */
  const getStyles = () => {
    switch (type) {
      case 'success':
        // Verde para mensajes de éxito
        return 'bg-green-50 border-green-200 text-green-800';
      case 'error':
        // Rojo para mensajes de error
        return 'bg-red-50 border-red-200 text-red-800';
      case 'warning':
        // Amarillo para mensajes de advertencia
        return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      default:
        // Azul para mensajes informativos
        return 'bg-blue-50 border-blue-200 text-blue-800';
    }
  };

  // Si la notificación no es visible, no renderizar nada
  if (!isVisible) return null;

  return (
    <div className={`fixed top-4 right-4 z-50 transform transition-all duration-300 ${
      isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
    }`}>
      {/* Contenedor principal de la notificación */}
      <div className={`flex items-center gap-3 p-4 rounded-xl border shadow-lg max-w-sm ${getStyles()}`}>
        {/* Ícono del tipo de notificación */}
        {getIcon()}
        
        {/* Mensaje de la notificación */}
        <p className="flex-1 text-sm font-medium">{message}</p>
        
        {/* Botón de cierre manual */}
        <button
          onClick={handleClose}
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default Toast;
