/**
 * Utilidades para el manejo y formateo de fechas
 * Este archivo contiene funciones para convertir fechas a formatos legibles
 * y calcular tiempos relativos (ej: "hace 2 horas")
 */

/**
 * Formatea una fecha en formato string a un formato legible en español
 * @param {string} dateString - La fecha en formato string (ISO, timestamp, etc.)
 * @param {object} options - Opciones de formateo (opcional)
 * @returns {string} - Fecha formateada en español o mensaje de error
 */
export const formatDate = (dateString, options = {}) => {
  // Si no hay fecha, retornar 'N/A' (No Aplicable)
  if (!dateString) return 'N/A';
  
  try {
    // Convertir el string a objeto Date de JavaScript
    const date = new Date(dateString);
    
    // Verificar si la fecha es válida (no es NaN)
    if (isNaN(date.getTime())) {
      return 'Fecha inválida';
    }
    
    // Configurar opciones por defecto para el formateo
    // year: 'numeric' = año en números (2024)
    // month: 'long' = mes completo (enero, febrero, etc.)
    // day: 'numeric' = día en números (1, 2, 3, etc.)
    const defaultOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      ...options // Permite sobrescribir las opciones por defecto
    };
    
    // Formatear la fecha usando la API de internacionalización de JavaScript
    // 'es-ES' = español de España
    return date.toLocaleDateString('es-ES', defaultOptions);
  } catch (error) {
    // Si hay algún error, logearlo y retornar mensaje de error
    console.error('Error formatting date:', error);
    return 'Error de fecha';
  }
};

/**
 * Calcula el tiempo relativo desde una fecha hasta ahora
 * Ejemplos: "hace 5 minutos", "hace 2 horas", "hace 3 días"
 * @param {string} dateString - La fecha de referencia en formato string
 * @returns {string} - Tiempo relativo en español o mensaje de error
 */
export const getRelativeTime = (dateString) => {
  // Si no hay fecha, retornar 'N/A'
  if (!dateString) return 'N/A';
  
  try {
    // Convertir el string a objeto Date
    const date = new Date(dateString);
    // Obtener la fecha actual
    const now = new Date();
    
    // Verificar si la fecha es válida
    if (isNaN(date.getTime())) {
      return 'Fecha inválida';
    }
    
    // Calcular la diferencia en segundos entre ahora y la fecha dada
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    // Lógica para determinar el tiempo relativo:
    // Menos de 1 minuto = "Hace un momento"
    if (diffInSeconds < 60) {
      return 'Hace un momento';
    } 
    // Entre 1 minuto y 1 hora = "Hace X minutos"
    else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      // Usar singular o plural según corresponda
      return `Hace ${minutes} ${minutes === 1 ? 'minuto' : 'minutos'}`;
    } 
    // Entre 1 hora y 1 día = "Hace X horas"
    else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `Hace ${hours} ${hours === 1 ? 'hora' : 'horas'}`;
    } 
    // Entre 1 día y 1 mes = "Hace X días"
    else if (diffInSeconds < 2592000) {
      const days = Math.floor(diffInSeconds / 86400);
      return `Hace ${days} ${days === 1 ? 'día' : 'días'}`;
    } 
    // Entre 1 mes y 1 año = "Hace X meses"
    else if (diffInSeconds < 31536000) {
      const months = Math.floor(diffInSeconds / 2592000);
      return `Hace ${months} ${months === 1 ? 'mes' : 'meses'}`;
    } 
    // Más de 1 año = "Hace X años"
    else {
      const years = Math.floor(diffInSeconds / 31536000);
      return `Hace ${years} ${years === 1 ? 'año' : 'años'}`;
    }
  } catch (error) {
    // Si hay algún error, logearlo y retornar mensaje de error
    console.error('Error getting relative time:', error);
    return 'Error de tiempo';
  }
};
