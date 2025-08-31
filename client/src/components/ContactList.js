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
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      {/* Encabezado de la lista */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Contactos ({contacts.length})
        </h2>
        
        {/* Botón para limpiar búsqueda (solo si hay término de búsqueda) */}
        {searchTerm && (
          <button
            onClick={onClearSearch}
            className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-medium"
          >
            Limpiar
          </button>
        )}
      </div>
      
      {/* Instrucciones para el usuario */}
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
        Selecciona un contacto para ver los detalles
      </p>

      {/* Lista de contactos con scroll */}
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {visibleContacts.map((contact, index) => (
          <div
            key={contact.id}
            className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ease-out transform ${
              selectedId === contact.id
                ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 shadow-md'
                : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 hover:shadow-sm'
            } ${
              isVisible 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 -translate-x-8'
            }`}
            style={{ transitionDelay: `${index * 50}ms` }}
            onClick={() => onSelect(contact)}
          >
            <div className="flex items-start justify-between">
              {/* Información del contacto */}
              <div className="flex-1">
                {/* Nombre del contacto */}
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  {contact.name}
                </h3>
                
                {/* Detalles del contacto (email, teléfono, dirección) */}
                <div className="space-y-2">
                  {/* Email (solo si existe) */}
                  {contact.email && (
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                      <Mail className="w-4 h-4" />
                      <span className="truncate">{contact.email}</span>
                    </div>
                  )}
                  
                  {/* Teléfono (solo si existe) */}
                  {contact.phone && (
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                      <Phone className="w-4 h-4" />
                      <span>{contact.phone}</span>
                    </div>
                  )}
                  
                  {/* Dirección (solo si existe) */}
                  {contact.address && (
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                      <MapPin className="w-4 h-4" />
                      <span className="truncate">{contact.address}</span>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Botones de acción (editar y eliminar) */}
              <div className="flex items-center gap-2 ml-4">
                {/* Botón de editar */}
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Evitar que se seleccione el contacto
                    onEdit(contact);
                  }}
                  className="p-2 text-gray-500 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors duration-200"
                >
                  <Edit className="w-4 h-4" />
                </button>
                
                {/* Botón de eliminar */}
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Evitar que se seleccione el contacto
                    onDelete(contact.id);
                  }}
                  className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                >
                  <Trash2 className="w-4 h-4" />
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
