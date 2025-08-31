/**
 * Hook personalizado para manejar el tema de la aplicación
 * Gestiona el cambio entre tema claro, oscuro y la detección automática del tema del sistema
 * Persiste la preferencia del usuario en localStorage
 */
import { useState, useEffect } from 'react';

/**
 * Hook que gestiona el estado del tema y su persistencia
 * @returns {object} - Objeto con el tema actual y funciones para cambiarlo
 */
const useTheme = () => {
  // Estado del tema actual (light, dark)
  // Se inicializa con una función que:
  // 1. Primero intenta obtener el tema guardado en localStorage
  // 2. Si no hay tema guardado, SIEMPRE usar tema oscuro por defecto
  const [theme, setTheme] = useState(() => {
    // Intentar obtener el tema guardado en localStorage
    const savedTheme = localStorage.getItem('theme');
    
    // Si no hay tema guardado, SIEMPRE usar tema oscuro
    if (!savedTheme) {
      return 'dark';
    }
    
    return savedTheme;
  });

  // Estado del tema del sistema operativo
  // Se actualiza automáticamente cuando el usuario cambia el tema del sistema
  const [systemTheme, setSystemTheme] = useState(() => 
    window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  );

  // Efecto que se ejecuta cada vez que cambia el tema
  useEffect(() => {
    // Guardar el tema en localStorage para persistir la preferencia del usuario
    localStorage.setItem('theme', theme);
    
    // Aplicar el tema al documento HTML:
    // 1. Remover clases de tema anteriores (light, dark)
    // 2. Agregar la clase del tema actual
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
    
    // Actualizar el atributo data-theme para CSS personalizado
    // Esto permite usar selectores como [data-theme="dark"] en CSS
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Efecto para escuchar cambios en el tema del sistema operativo
  useEffect(() => {
    // Crear un MediaQuery para detectar cambios en el tema del sistema
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Función que se ejecuta cuando cambia el tema del sistema
    const handleChange = (e) => {
      setSystemTheme(e.matches ? 'dark' : 'light');
    };

    // Agregar listener para cambios en el tema del sistema
    mediaQuery.addEventListener('change', handleChange);
    
    // Cleanup: remover el listener cuando el componente se desmonte
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  /**
   * Función para alternar entre tema claro y oscuro
   */
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  /**
   * Función para establecer el tema claro
   */
  const setLightTheme = () => setTheme('light');
  
  /**
   * Función para establecer el tema oscuro
   */
  const setDarkTheme = () => setTheme('dark');
  
  /**
   * Función para usar el tema del sistema operativo
   * Siempre usa tema oscuro para mantener consistencia
   */
  const setSystemThemeFunc = () => setTheme('dark');

  // Retornar el estado y las funciones para que el componente las use
  return {
    theme,              // Tema actual ('light' o 'dark')
    systemTheme,        // Tema del sistema operativo
    toggleTheme,        // Función para alternar tema
    setLightTheme,      // Función para establecer tema claro
    setDarkTheme,       // Función para establecer tema oscuro
    setSystemTheme: setSystemThemeFunc, // Función para usar tema del sistema
    isDark: theme === 'dark',           // Boolean: ¿es tema oscuro?
    isLight: theme === 'light'          // Boolean: ¿es tema claro?
  };
};

export default useTheme;
