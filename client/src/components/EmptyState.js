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
      <div className="bg-white rounded-xl shadow-soft border border-gray-100 p-12 text-center">
        {/* Ícono principal con fondo degradado */}
        <div className="w-24 h-24 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center mx-auto mb-6">
          <BookOpen className="w-12 h-12 text-primary-600" />
        </div>
        
        {/* Título de bienvenida */}
        <h3 className="text-2xl font-bold text-gray-700 mb-3">¡Bienvenido a tu Agenda!</h3>
        
        {/* Descripción motivacional */}
        <p className="text-gray-500 mb-6 text-lg">
          Comienza creando tu primer contacto para organizar tu información personal y profesional
        </p>
        
        {/* Botón principal para crear el primer contacto */}
        <button
          onClick={onNewContact}
          className="bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white px-8 py-3 rounded-xl flex items-center gap-3 mx-auto transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          <Plus className="w-5 h-5" />
          Crear Primer Contacto
        </button>
      </div>
    );
  }

  // ===== ESTADO VACÍO CUANDO HAY CONTACTOS PERO NINGUNO SELECCIONADO =====
  
  // Si hay contactos pero ninguno está seleccionado, mostrar mensaje de selección
  return (
    <div className="bg-white rounded-xl shadow-soft border border-gray-100 p-12 text-center">
      {/* Ícono de búsqueda con fondo gris */}
      <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
        <Search className="w-12 h-12 text-gray-400" />
      </div>
      
      {/* Título instructivo */}
      <h3 className="text-2xl font-bold text-gray-700 mb-3">Selecciona un Contacto</h3>
      
      {/* Descripción de la acción requerida */}
      <p className="text-gray-500 mb-6 text-lg">
        Elige un contacto de la lista para ver sus detalles o crea uno nuevo
      </p>
      
      {/* Botón secundario para crear nuevo contacto */}
      <button
        onClick={onNewContact}
        className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg transition-colors"
      >
        Crear Nuevo Contacto
      </button>
    </div>
  );
};

export default EmptyState;
