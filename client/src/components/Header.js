/**
 * Componente Header de la aplicación
 * Muestra el título, descripción y botones de acción
 * Incluye efectos de scroll que cambian la apariencia del header
 */
import React, { useState, useEffect } from 'react';
import { BookOpen, Users, Phone, Mail, RefreshCw, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

/**
 * Header principal de la aplicación con efectos de scroll y funcionalidades
 * @param {function} onRefresh - Función para actualizar los contactos
 */
const Header = ({ onRefresh, onClearSelection, hasSelectedContact }) => {
  // Estado que controla si el usuario ha hecho scroll (para cambiar apariencia)
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Estado que controla si se está ejecutando la actualización (para mostrar spinner)
  const [isRefreshing, setIsRefreshing] = useState(false);

  /**
   * Maneja la actualización de contactos con estado de carga
   * Muestra un spinner mientras se ejecuta la actualización
   */
  const handleRefresh = async () => {
    if (onRefresh) {
      setIsRefreshing(true);
      try {
        await onRefresh();
      } finally {
        // Siempre desactivar el estado de carga, incluso si hay error
        setIsRefreshing(false);
      }
    }
  };

  // Efecto para detectar el scroll del usuario y cambiar la apariencia del header
  useEffect(() => {
    // Función que se ejecuta cada vez que el usuario hace scroll
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      // Cambiar apariencia cuando el scroll supera los 50px
      setIsScrolled(scrollTop > 50);
    };

    // Agregar listener para eventos de scroll
    window.addEventListener('scroll', handleScroll);
    
    // Cleanup: remover el listener cuando el componente se desmonte
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
      isScrolled 
        ? 'bg-gray-800/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg border-b border-gray-600 dark:border-gray-700' 
        : 'bg-gradient-to-r from-primary-600 to-primary-700'
    }`}>
      <div className="container mx-auto px-4 py-4">
        {/* Contenido principal del header */}
        <div className="flex items-center justify-between">
          {/* Logo y título */}
          <div className="flex items-center gap-4">
            {/* Ícono del libro con fondo adaptativo */}
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center backdrop-blur-sm transition-all duration-500 ease-out transform hover:scale-110 hover:rotate-12 hover:shadow-lg ${
              isScrolled 
                ? 'bg-primary-600/10' 
                : 'bg-white/20'
            }`}>
              <BookOpen className={`w-7 h-7 transition-all duration-300 ${
                isScrolled ? 'text-primary-600' : 'text-white'
              }`} />
            </div>
            
            {/* Título y descripción con colores adaptativos */}
            <div className="transition-all duration-500 ease-out">
              <h1 className={`text-2xl font-bold transition-all duration-300 hover:scale-105 ${
                isScrolled ? 'text-white' : 'text-white'
              }`}>
                Sistema de Agenda
              </h1>
              <p className={`text-sm mt-1 transition-all duration-300 hover:text-primary-200 ${
                isScrolled ? 'text-gray-300' : 'text-primary-100'
              }`}>
                Gestiona tus contactos de manera fácil y eficiente
              </p>
            </div>
          </div>
          
          {/* Botón de actualización con estado de carga */}
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-300 ease-out transform hover:scale-105 hover:-translate-y-1 hover:shadow-lg ${
              isScrolled 
                ? 'bg-primary-600/20 text-primary-400 hover:bg-primary-600/30 border border-primary-600 hover:shadow-primary-200/50' 
                : 'bg-white/20 text-white hover:bg-white/30 border border-white/30 hover:shadow-white/20'
            } ${isRefreshing ? 'opacity-50 cursor-not-allowed' : ''}`}
            aria-label="Actualizar contactos"
          >
            {/* Ícono de actualización con animación de rotación */}
            <RefreshCw className={`w-4 h-4 transition-all duration-300 ${isRefreshing ? 'animate-spin' : 'hover:rotate-180'}`} />
            <span className="hidden sm:inline text-sm font-medium">
              {isRefreshing ? 'Actualizando...' : 'Actualizar'}
            </span>
          </button>
          
          {/* Botón para limpiar selección (solo si hay un contacto seleccionado) */}
          {hasSelectedContact && (
            <button
              onClick={onClearSelection}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-300 ease-out transform hover:scale-105 hover:-translate-y-1 hover:shadow-lg ${
                isScrolled 
                  ? 'bg-gray-600/20 text-gray-400 hover:bg-gray-600/30 border border-gray-600 hover:shadow-gray-200/50' 
                  : 'bg-white/20 text-white hover:bg-white/30 border border-white/30 hover:shadow-white/20'
              }`}
              aria-label="Limpiar selección"
            >
              <X className="w-4 h-4 transition-all duration-300 hover:rotate-90" />
              <span className="hidden sm:inline text-sm font-medium">
                Limpiar
              </span>
            </button>
          )}
          
          {/* Botón de cambio de tema */}
          <ThemeToggle />
        </div>
        
        {/* Estadísticas que se ocultan al hacer scroll */}
        <div className={`flex items-center gap-8 mt-4 transition-all duration-300 ${
          isScrolled ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100 h-auto'
        }`}>
          {/* Característica: Gestión de Contactos */}
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-primary-200" />
            <span className="text-sm text-primary-100">Gestión de Contactos</span>
          </div>
          
          {/* Característica: Información Completa */}
          <div className="flex items-center gap-2">
            <Phone className="w-5 h-5 text-primary-200" />
            <span className="text-sm text-primary-100">Información Completa</span>
          </div>
          
          {/* Característica: Comunicación Directa */}
          <div className="flex items-center gap-2">
            <Mail className="w-5 h-5 text-primary-200" />
            <span className="text-sm text-primary-100">Comunicación Directa</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
