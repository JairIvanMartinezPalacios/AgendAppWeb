/**
 * Componente ErrorBoundary para manejar errores de JavaScript en React
 * Captura errores en componentes hijos y muestra una interfaz de error amigable
 * Previene que la aplicación se rompa completamente por errores inesperados
 */
import React from 'react';

/**
 * Clase ErrorBoundary que extiende React.Component
 * Implementa los métodos necesarios para capturar errores de JavaScript
 */
class ErrorBoundary extends React.Component {
  /**
   * Constructor que inicializa el estado del error boundary
   * @param {object} props - Props del componente
   */
  constructor(props) {
    super(props);
    // Estado para controlar si ha ocurrido un error y almacenar el error
    this.state = { hasError: false, error: null };
  }

  /**
   * Método estático que se ejecuta cuando se detecta un error
   * Actualiza el estado para mostrar la interfaz de error
   * @param {Error} error - Error que se capturó
   * @returns {object} - Nuevo estado con hasError en true
   */
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  /**
   * Método que se ejecuta después de capturar un error
   * Útil para logging, reportes de error, etc.
   * @param {Error} error - Error que se capturó
   * @param {object} errorInfo - Información adicional del error
   */
  componentDidCatch(error, errorInfo) {
    // Log del error en la consola para debugging
    console.error('Error caught by boundary:', error, errorInfo);
  }

  /**
   * Método de renderizado que decide qué mostrar
   * Si hay error, muestra la interfaz de error; si no, muestra los hijos
   * @returns {JSX.Element} - Interfaz de error o componentes hijos
   */
  render() {
    // Si ha ocurrido un error, mostrar la interfaz de error
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
          {/* Tarjeta de error centrada */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-soft border border-gray-100 dark:border-gray-700 p-8 max-w-md w-full text-center">
            {/* Ícono de error con fondo rojo */}
            <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            
            {/* Título del error */}
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Algo salió mal</h2>
            
            {/* Descripción del error */}
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Ha ocurrido un error inesperado. Por favor, recarga la página o contacta al administrador.
            </p>
            
            {/* Botón para recargar la página */}
            <button
              onClick={() => window.location.reload()}
              className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Recargar Página
            </button>
          </div>
        </div>
      );
    }

    // Si no hay error, renderizar los componentes hijos normalmente
    return this.props.children;
  }
}

export default ErrorBoundary;
