/**
 * Componente reutilizable para campos de formulario
 * Soporta diferentes tipos de input (texto, email, teléfono, textarea)
 * Incluye validación visual, íconos y estilos consistentes
 */
import React from 'react';

/**
 * Campo de formulario reutilizable con soporte para múltiples tipos
 * @param {string} label - Etiqueta del campo
 * @param {string} name - Nombre del campo (atributo name del input)
 * @param {string} value - Valor actual del campo
 * @param {function} onChange - Función que se ejecuta al cambiar el valor
 * @param {string} placeholder - Texto de placeholder
 * @param {string} type - Tipo de input (text, email, tel, etc.)
 * @param {boolean} required - Si el campo es obligatorio
 * @param {string} error - Mensaje de error a mostrar
 * @param {Component} icon - Componente de ícono a mostrar
 * @param {number} rows - Número de filas para textarea
 * @param {...any} props - Props adicionales para el input
 * @returns {JSX.Element} - Campo de formulario completo
 */
const FormField = ({ 
  label, 
  name, 
  value, 
  onChange, 
  placeholder, 
  type = 'text', 
  required = false, 
  error, 
  icon: Icon,
  rows = 1,
  ...props 
}) => {
  // Clases CSS para el input/textarea
  // Cambia el estilo según si hay error o no
  const inputClasses = `w-full pl-12 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 ${
    error ? 'border-red-300 bg-red-50 dark:bg-red-900/20' : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
  }`;

  /**
   * Renderiza el input o textarea según el número de filas
   * @returns {JSX.Element} - Input o textarea renderizado
   */
  const renderInput = () => {
    if (rows > 1) {
      // Si hay más de 1 fila, renderizar textarea
      return (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={rows}
          className={inputClasses}
          {...props}
        />
      );
    }

    // Si es 1 fila, renderizar input normal
    return (
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={inputClasses}
        {...props}
      />
    );
  };

  return (
    <div>
      {/* Etiqueta del campo */}
      <label htmlFor={name} className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3">
        {label} 
        {/* Indicador de campo obligatorio */}
        {required && <span className="text-red-500">*</span>}
      </label>
      
      {/* Contenedor del input con ícono */}
      <div className="relative">
        {/* Ícono del campo (si se proporciona) */}
        {Icon && (
          <Icon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5" />
        )}
        
        {/* Input o textarea renderizado */}
        {renderInput()}
      </div>
      
      {/* Mensaje de error (si existe) */}
      {error && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
          {/* Punto indicador de error */}
          <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
          {error}
        </p>
      )}
    </div>
  );
};

export default FormField;
