/**
 * Componente de diálogo de confirmación modal
 * Permite confirmar acciones importantes antes de ejecutarlas
 * Soporta diferentes tipos (warning, danger, info) con estilos apropiados
 */
import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

/**
 * Diálogo de confirmación con diferentes tipos y estilos
 * @param {boolean} isOpen - Si el diálogo está visible
 * @param {function} onClose - Función para cerrar el diálogo
 * @param {function} onConfirm - Función que se ejecuta al confirmar
 * @param {string} title - Título del diálogo
 * @param {string} message - Mensaje principal del diálogo
 * @param {string} confirmText - Texto del botón de confirmación
 * @param {string} cancelText - Texto del botón de cancelación
 * @param {string} type - Tipo de diálogo ('warning', 'danger', 'info')
 * @returns {JSX.Element|null} - Diálogo modal o null si está cerrado
 */
const ConfirmDialog = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title = 'Confirmar Acción', 
  message = '¿Estás seguro de que quieres realizar esta acción?',
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  type = 'warning'
}) => {
  // Si el diálogo no está abierto, no renderizar nada
  if (!isOpen) return null;

  /**
   * Retorna el ícono apropiado según el tipo de diálogo
   * @returns {JSX.Element} - Ícono con color apropiado
   */
  const getIcon = () => {
    switch (type) {
      case 'danger':
        // Rojo para acciones peligrosas (eliminar, etc.)
        return <AlertTriangle className="w-8 h-8 text-red-600" />;
      case 'warning':
        // Amarillo para advertencias
        return <AlertTriangle className="w-8 h-8 text-yellow-600" />;
      default:
        // Azul para información general
        return <AlertTriangle className="w-8 h-8 text-blue-600" />;
    }
  };

  /**
   * Retorna los estilos del botón principal según el tipo
   * @returns {string} - Clases CSS para el botón
   */
  const getButtonStyles = () => {
    switch (type) {
      case 'danger':
        // Rojo para acciones peligrosas
        return 'bg-red-600 hover:bg-red-700';
      case 'warning':
        // Amarillo para advertencias
        return 'bg-yellow-600 hover:bg-yellow-700';
      default:
        // Azul primario para información
        return 'bg-primary-600 hover:bg-primary-700';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* ===== BACKDROP ===== */}
      
      {/* Fondo oscuro semi-transparente que cierra el diálogo al hacer clic */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />
      
      {/* ===== DIÁLOGO PRINCIPAL ===== */}
      
      <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-md w-full transform transition-all">
        {/* Encabezado del diálogo */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-600">
          {/* Título e ícono */}
          <div className="flex items-center gap-3">
            {getIcon()}
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
          </div>
          
          {/* Botón de cerrar (X) */}
          <button
            onClick={onClose}
            className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {/* Contenido del diálogo */}
        <div className="p-6">
          <p className="text-gray-600 dark:text-gray-300">{message}</p>
        </div>
        
        {/* Botones de acción */}
        <div className="flex gap-3 p-6 border-t border-gray-200 dark:border-gray-600">
          {/* Botón de cancelar */}
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            {cancelText}
          </button>
          
          {/* Botón de confirmar */}
          <button
            onClick={() => {
              // Ejecutar la acción confirmada
              onConfirm();
              // Cerrar el diálogo automáticamente
              onClose();
            }}
            className={`flex-1 px-4 py-2 text-white rounded-lg transition-colors ${getButtonStyles()}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
