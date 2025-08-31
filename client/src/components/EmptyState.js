/**
 * Componente que muestra estados vacíos en diferentes situaciones de la aplicación
 * Se adapta según si hay contactos o no, mostrando mensajes y acciones apropiadas
 */
import React from 'react';
import { User, Plus, Search, BookOpen } from 'lucide-react';

/**
 * Componente de estado vacío que se adapta según el contexto
 * @param {function} onNewContact - Función para crear un nuevo contacto
 * @param {boolean} hasContacts - Si existen contactos en la agenda
 * @returns {JSX.Element} - Estado vacío apropiado para la situación
 */
const EmptyState = ({ onNewContact, hasContacts }) => {
  // ===== ESTADO VACÍO CUANDO NO HAY CONTACTOS =====
  
  // Si no hay contactos, mostrar mensaje de bienvenida
  if (!hasContacts) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-soft border border-gray-100 dark:border-gray-700 p-6 sm:p-8 lg:p-12 text-center h-fit min-h-[500px] flex flex-col justify-center">
        {/* Ícono principal con fondo degradado */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900/30 dark:to-primary-800/30 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
          <BookOpen className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-primary-600 dark:text-primary-400" />
        </div>
        
        {/* Título de bienvenida */}
        <h3 className="text-xl sm:text-2xl font-bold text-gray-700 dark:text-white mb-2 sm:mb-3">¡Bienvenido a tu Agenda!</h3>
        
        {/* Descripción motivacional */}
        <p className="text-gray-500 dark:text-gray-300 mb-4 sm:mb-6 text-base sm:text-lg">
          Comienza creando tu primer contacto para organizar tu información personal y profesional
        </p>
        
        {/* Botón principal para crear el primer contacto */}
        <button
          onClick={onNewContact}
          className="bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl flex items-center gap-2 sm:gap-3 mx-auto transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-sm sm:text-base"
        >
          <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
          Crear Primer Contacto
        </button>
      </div>
    );
  }

  // ===== ESTADO VACÍO CUANDO HAY CONTACTOS PERO NINGUNO SELECCIONADO =====
  
  // Si hay contactos pero ninguno está seleccionado, mostrar mensaje de selección
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-soft border border-gray-100 dark:border-gray-700 p-6 sm:p-8 lg:p-12 text-center h-fit min-h-[500px] flex flex-col justify-center animate-bounce-in">
      {/* Ícono de búsqueda con fondo gris */}
      <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 to-gray-600 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 transition-all duration-500 ease-out transform hover:scale-110 hover:rotate-12 hover:shadow-xl animate-float">
        <Search className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-gray-400 dark:text-gray-500 transition-all duration-300" />
      </div>
      
      {/* Título instructivo */}
      <h3 className="text-xl sm:text-2xl font-bold text-gray-700 dark:text-white mb-2 sm:mb-3 transition-all duration-500 ease-out hover:text-primary-600 dark:hover:text-primary-400 hover:scale-105">Selecciona un Contacto</h3>
      
      {/* Descripción de la acción requerida */}
      <p className="text-gray-500 dark:text-gray-300 mb-4 sm:mb-6 text-base sm:text-lg transition-all duration-500 ease-out hover:text-gray-700 dark:hover:text-gray-200">
        Elige un contacto de la lista para ver sus detalles o crea uno nuevo
      </p>
      
      {/* Botón secundario para crear nuevo contacto */}
      <button
        onClick={onNewContact}
        className="bg-primary-600 hover:bg-primary-700 text-white px-4 sm:px-6 py-2 rounded-lg transition-colors text-sm sm:text-base"
      >
        Crear Nuevo Contacto
      </button>
    </div>
  );
};

export default EmptyState;
