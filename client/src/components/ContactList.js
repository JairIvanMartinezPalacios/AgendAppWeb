/**
 * Componente que muestra la lista de contactos con funcionalidades de selección, edición y eliminación
 * Incluye estados de carga, búsqueda y animaciones de entrada escalonadas
 */
import React, { useState, useEffect } from 'react';
import { Edit, Trash2, Mail, Phone, MapPin, User } from 'lucide-react';

/**
 * Lista de contactos con funcionalidades completas de gestión
 * @param {Array} contacts - Array de contactos a mostrar
 * @param {function} onSelect - Función que se ejecuta al seleccionar un contacto
 * @param {function} onEdit - Función que se ejecuta al editar un contacto
 * @param {function} onDelete - Función que se ejecuta al eliminar un contacto
 * @param {number} selectedId - ID del contacto actualmente seleccionado
 * @param {boolean} loading - Estado de carga de los contactos
 * @param {string} searchTerm - Término de búsqueda actual
 * @param {function} onClearSearch - Función para limpiar la búsqueda
 * @returns {JSX.Element} - Lista de contactos con controles
 */
const ContactList = ({ 
  contacts, 
  onSelect, 
  onEdit, 
  onDelete, 
  selectedId, 
  loading, 
  searchTerm, 
  onClearSearch 
}) => {
  // Estado para controlar qué contactos son visibles (para animaciones)
  const [visibleContacts, setVisibleContacts] = useState([]);
  
  // Estado que controla si la lista es visible (para animaciones de entrada)
  const [isVisible, setIsVisible] = useState(false);

  // Efecto para activar la visibilidad después de un delay
  // Permite que las animaciones se ejecuten después del montaje
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  // Efecto para mostrar los contactos con animación escalonada
  // Solo se ejecuta cuando la lista es visible
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setVisibleContacts(contacts);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [contacts, isVisible]);

  // ===== ESTADO DE CARGA =====
  
  // Mostrar skeleton loading mientras se cargan los contactos
  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="animate-pulse">
          {/* Título placeholder */}
          <div className="h-6 bg-gray-200 dark:bg-gray-600 rounded mb-4"></div>
          {/* Contactos placeholder */}
          <div className="space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-16 bg-gray-200 dark:bg-gray-600 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ===== ESTADO VACÍO =====
  
  // Mostrar mensaje cuando no hay contactos o no se encontraron resultados
  if (contacts.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 text-center">
        {/* Ícono de usuario */}
        <User className="w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
        
        {/* Título del estado vacío */}
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          {searchTerm ? 'No se encontraron contactos' : 'No hay contactos'}
        </h3>
        
        {/* Descripción del estado vacío */}
        <p className="text-gray-500 dark:text-gray-400">
          {searchTerm ? 'No se encontraron contactos con tu búsqueda' : 'Comienza agregando tu primer contacto'}
        </p>
        
        {/* Botón para limpiar búsqueda (solo si hay término de búsqueda) */}
        {searchTerm && (
          <button
            onClick={onClearSearch}
            className="mt-4 text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-medium"
          >
            Limpiar búsqueda
          </button>
        )}
      </div>
    );
  }

  // ===== LISTA DE CONTACTOS =====

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border-0 dark:border-0 p-4 sm:p-6 h-fit min-h-[500px] min-w-0">
      {/* Encabezado de la lista */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 mb-4 sm:mb-6">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white transition-all duration-500 ease-out transform hover:scale-105 hover:text-primary-600 dark:hover:text-primary-400">
          Contactos ({contacts.length})
        </h2>
        
        {/* Botón para limpiar búsqueda (solo si hay término de búsqueda) */}
        {searchTerm && (
          <button
            onClick={onClearSearch}
            className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-medium self-start sm:self-auto transition-all duration-300 ease-out transform hover:scale-105 hover:-translate-y-0.5 hover:shadow-md px-3 py-1.5 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/20"
          >
            Limpiar
          </button>
        )}
      </div>
      
      {/* Instrucciones para el usuario */}
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 transition-all duration-500 ease-out hover:text-gray-800 dark:hover:text-gray-200 hover:translate-x-1">
          Selecciona un contacto para ver los detalles
        </p>
        
        {/* Botón para deseleccionar contacto actual */}
        {selectedId && (
          <button
            onClick={() => onEdit(null)}
            className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-all duration-300 ease-out transform hover:scale-105 hover:-translate-y-0.5 px-2 py-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            Limpiar selección
          </button>
        )}
      </div>

      {/* Lista de contactos con scroll */}
      <div className="space-y-3 sm:space-y-4 max-h-[calc(100vh-450px)] lg:max-h-[600px] overflow-y-auto">
        {visibleContacts.map((contact, index) => (
                      <div
              key={contact.id}
              className={`group p-4 sm:p-5 rounded-xl border border-gray-200 dark:border-gray-600 cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] transform hover:scale-[1.02] hover:-translate-y-1 ${
                selectedId === contact.id
                  ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 shadow-xl ring-2 ring-primary-500/30 scale-[1.02] -translate-y-1'
                  : 'hover:border-gray-300 dark:hover:border-gray-500 hover:shadow-xl hover:shadow-gray-200/50 dark:hover:shadow-gray-900/50'
              } ${
                isVisible 
                  ? 'opacity-100 translate-x-0 rotate-0' 
                  : 'opacity-0 -translate-x-12 -rotate-3'
              }`}
              style={{ 
                transitionDelay: `${index * 75}ms`,
                animation: isVisible ? 'slideInFromLeft 0.6s ease-out forwards' : 'none'
              }}
              onClick={() => onSelect(contact)}
            >
              <div className="flex items-start justify-between gap-4">
                {/* Información del contacto */}
                <div className="flex-1 min-w-0 pr-3">
                  {/* Nombre del contacto */}
                  <h3 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white mb-3 break-words leading-tight transition-all duration-300 group-hover:text-primary-600 dark:group-hover:text-primary-400 group-hover:translate-x-1">
                    {contact.name}
                  </h3>
                  
                  {/* Detalles del contacto (email, teléfono, dirección) */}
                  <div className="space-y-2.5">
                    {/* Email (solo si existe) */}
                    {contact.email && (
                      <div className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-600 dark:text-gray-300 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300">
                        <Mail className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0 text-gray-400 dark:text-gray-500 mt-0.5 transition-all duration-300 group-hover:text-primary-500 dark:group-hover:text-primary-400 group-hover:scale-110" />
                        <span className="break-words leading-relaxed flex-1 transition-all duration-300 group-hover:translate-x-1">{contact.email}</span>
                      </div>
                    )}
                    
                    {/* Teléfono (solo si existe) */}
                    {contact.phone && (
                      <div className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-600 dark:text-gray-300 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300">
                        <Phone className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0 text-gray-400 dark:text-gray-500 mt-0.5 transition-all duration-300 group-hover:text-green-500 dark:group-hover:text-green-400 group-hover:scale-110" />
                        <span className="break-words leading-relaxed flex-1 transition-all duration-300 group-hover:translate-x-1">{contact.phone}</span>
                      </div>
                    )}
                    
                    {/* Dirección (solo si existe) */}
                    {contact.address && (
                      <div className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-600 dark:text-gray-300 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300">
                        <MapPin className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0 text-gray-400 dark:text-gray-500 mt-0.5 transition-all duration-300 group-hover:text-purple-500 dark:group-hover:text-purple-400 group-hover:scale-110" />
                        <span className="break-words leading-relaxed flex-1 transition-all duration-300 group-hover:translate-x-1">{contact.address}</span>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Botones de acción (editar y eliminar) */}
                <div className="flex items-center gap-1.5 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out transform translate-y-2 group-hover:translate-y-0">
                  {/* Botón de editar */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // Evitar que se seleccione el contacto
                      onEdit(contact);
                    }}
                    className="p-1.5 sm:p-2 text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-all duration-300 ease-out transform hover:scale-110 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary-200/50 dark:hover:shadow-primary-900/50"
                  >
                    <Edit className="w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-200 group-hover:rotate-12" />
                  </button>
                  
                  {/* Botón de eliminar */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // Evitar que se seleccione el contacto
                      onDelete(contact.id);
                    }}
                    className="p-1.5 sm:p-2 text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-300 ease-out transform hover:scale-110 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-red-200/50 dark:hover:shadow-red-900/50"
                  >
                    <Trash2 className="w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-200 group-hover:rotate-12" />
                  </button>
                </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactList;
