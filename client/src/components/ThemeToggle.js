/**
 * Componente para cambiar el tema de la aplicación
 * Permite seleccionar entre tema claro, oscuro o seguir la preferencia del sistema
 * Incluye un menú desplegable con opciones y descripciones
 */
import React, { useState } from 'react';
import { Sun, Moon, Monitor, ChevronDown } from 'lucide-react';
import useTheme from '../hooks/useTheme';

/**
 * Componente que permite al usuario cambiar el tema de la aplicación
 * @returns {JSX.Element} - Botón con menú desplegable para seleccionar tema
 */
const ThemeToggle = () => {
  // Obtener funciones y estado del hook personalizado de tema
  const { theme, toggleTheme, setLightTheme, setDarkTheme, setSystemTheme, isDark } = useTheme();
  
  // Estado que controla si el menú desplegable está abierto
  const [isOpen, setIsOpen] = useState(false);

  // Array con todas las opciones de tema disponibles
  // Cada opción incluye: id, etiqueta, ícono, función de acción y descripción
  const themeOptions = [
    {
      id: 'light',
      label: 'Claro',
      icon: Sun,
      action: setLightTheme,
      description: 'Tema claro para uso diurno'
    },
    {
      id: 'dark',
      label: 'Oscuro',
      icon: Moon,
      action: setDarkTheme,
      description: 'Tema oscuro para uso nocturno'
    },
    {
      id: 'system',
      label: 'Sistema',
      icon: Monitor,
      action: setSystemTheme,
      description: 'Seguir preferencia del sistema'
    }
  ];

  // Encontrar la opción de tema actualmente activa
  const currentTheme = themeOptions.find(option => option.id === theme);

  return (
    <div className="relative">
      {/* Botón principal que abre/cierra el menú */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-200 hover:shadow-md ${
          isDark 
            ? 'bg-gray-800 text-white hover:bg-gray-700 border border-gray-600' 
            : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
        }`}
        aria-label="Cambiar tema"
      >
        {/* Ícono del tema actual */}
        {currentTheme && <currentTheme.icon className="w-4 h-4" />}
        
        {/* Etiqueta del tema actual (oculta en pantallas pequeñas) */}
        <span className="hidden sm:inline text-sm font-medium">
          {currentTheme?.label}
        </span>
        
        {/* Flecha que indica si el menú está abierto */}
        <ChevronDown 
          className={`w-4 h-4 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`} 
        />
      </button>

      {/* Menú desplegable con opciones de tema */}
      {isOpen && (
        <>
          {/* Overlay invisible que cierra el menú al hacer clic fuera */}
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Menú desplegable con opciones */}
          <div className={`absolute right-0 top-full mt-2 w-56 rounded-xl shadow-lg border transition-all duration-200 z-20 ${
            isDark 
              ? 'bg-gray-800 border-gray-600' 
              : 'bg-white border-gray-200'
          }`}>
            <div className="p-2">
              {/* Renderizar cada opción de tema */}
              {themeOptions.map((option) => {
                const Icon = option.icon;
                const isActive = option.id === theme;
                
                return (
                  <button
                    key={option.id}
                    onClick={() => {
                      // Ejecutar la función de cambio de tema
                      option.action();
                      // Cerrar el menú después de seleccionar
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-all duration-200 ${
                      isActive
                        ? isDark
                          ? 'bg-primary-600 text-white'
                          : 'bg-primary-50 text-primary-700'
                        : isDark
                          ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
                          : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {/* Ícono de la opción */}
                    <Icon className="w-4 h-4" />
                    
                    {/* Texto de la opción */}
                    <div className="flex-1">
                      {/* Etiqueta principal */}
                      <div className="font-medium">{option.label}</div>
                      
                      {/* Descripción secundaria */}
                      <div className={`text-xs ${
                        isActive 
                          ? isDark ? 'text-primary-200' : 'text-primary-600'
                          : isDark ? 'text-gray-500' : 'text-gray-500'
                      }`}>
                        {option.description}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ThemeToggle;
