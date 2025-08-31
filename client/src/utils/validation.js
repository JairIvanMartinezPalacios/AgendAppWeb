/**
 * Funciones de validación para el formulario de contactos
 * Este archivo contiene todas las reglas de validación y funciones de formateo
 * para asegurar que los datos ingresados sean correctos
 */

/**
 * Valida que el nombre del contacto cumpla con los requisitos
 * @param {string} name - El nombre a validar
 * @returns {string|null} - Mensaje de error si es inválido, null si es válido
 */
export const validateName = (name) => {
  // Verificar que el nombre no esté vacío o solo contenga espacios
  if (!name || !name.trim()) {
    return 'El nombre es obligatorio';
  }
  
  // Verificar que el nombre tenga al menos 2 caracteres
  if (name.trim().length < 2) {
    return 'El nombre debe tener al menos 2 caracteres';
  }
  
  // Verificar que el nombre no exceda 100 caracteres
  if (name.trim().length > 100) {
    return 'El nombre no puede tener más de 100 caracteres';
  }
  
  // Si pasa todas las validaciones, retornar null (sin errores)
  return null;
};

/**
 * Valida que el email tenga un formato válido (opcional)
 * @param {string} email - El email a validar
 * @returns {string|null} - Mensaje de error si es inválido, null si es válido o está vacío
 */
export const validateEmail = (email) => {
  // Si no hay email, es válido (campo opcional)
  if (!email) return null;
  
  // Patrón regex para validar formato de email
  // ^[^\s@]+@[^\s@]+\.[^\s@]+$ significa:
  // - ^ = inicio de la cadena
  // - [^\s@]+ = uno o más caracteres que NO sean espacios ni @
  // - @ = símbolo @ literal
  // - [^\s@]+ = uno o más caracteres que NO sean espacios ni @
  // - \. = punto literal
  // - [^\s@]+ = uno o más caracteres que NO sean espacios ni @
  // - $ = fin de la cadena
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  // Verificar que el email no exceda 100 caracteres
  if (email.length > 100) {
    return 'El email no puede tener más de 100 caracteres';
  }
  
  // Verificar que el email coincida con el patrón regex
  if (!emailPattern.test(email)) {
    return 'El formato del email no es válido';
  }
  
  // Si pasa todas las validaciones, retornar null
  return null;
};

/**
 * Valida que el teléfono no exceda la longitud máxima (opcional)
 * @param {string} phone - El teléfono a validar
 * @returns {string|null} - Mensaje de error si es inválido, null si es válido o está vacío
 */
export const validatePhone = (phone) => {
  // Si no hay teléfono, es válido (campo opcional)
  if (!phone) return null;
  
  // Verificar que el teléfono no exceda 20 caracteres
  if (phone.length > 20) {
    return 'El teléfono no puede tener más de 20 caracteres';
  }
  
  // Si pasa la validación, retornar null
  return null;
};

/**
 * Valida que la dirección no exceda la longitud máxima (opcional)
 * @param {string} address - La dirección a validar
 * @returns {string|null} - Mensaje de error si es inválido, null si es válido o está vacío
 */
export const validateAddress = (address) => {
  // Si no hay dirección, es válida (campo opcional)
  if (!address) return null;
  
  // Verificar que la dirección no exceda 200 caracteres
  if (address.length > 200) {
    return 'La dirección no puede tener más de 200 caracteres';
  }
  
  // Si pasa la validación, retornar null
  return null;
};

/**
 * Valida todo el formulario de contacto ejecutando todas las validaciones
 * @param {object} formData - Objeto con los datos del formulario
 * @returns {object} - Objeto con isValid (boolean) y errors (objeto con errores por campo)
 */
export const validateContactForm = (formData) => {
  // Objeto para almacenar los errores encontrados
  const errors = {};
  
  // Validar cada campo individualmente
  const nameError = validateName(formData.name);
  if (nameError) errors.name = nameError;
  
  const emailError = validateEmail(formData.email);
  if (emailError) errors.email = emailError;
  
  const phoneError = validatePhone(formData.phone);
  if (phoneError) errors.phone = phoneError;
  
  const addressError = validateAddress(formData.address);
  if (addressError) errors.address = addressError;
  
  // Retornar objeto con el resultado de la validación
  return {
    isValid: Object.keys(errors).length === 0, // true si no hay errores
    errors // objeto con todos los errores encontrados
  };
};

/**
 * Formatea un número de teléfono para mejor legibilidad
 * @param {string} phone - El teléfono a formatear
 * @returns {string} - Teléfono formateado o el original si no se puede formatear
 */
export const formatPhoneNumber = (phone) => {
  // Si no hay teléfono, retornar cadena vacía
  if (!phone) return '';
  
  // Remover todos los caracteres que NO sean dígitos (0-9)
  // \D = cualquier carácter que NO sea un dígito
  const cleaned = phone.replace(/\D/g, '');
  
  // Formatear según la longitud del número:
  // Si tiene 10 dígitos: (123) 456-7890
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  } 
  // Si tiene 11 dígitos: +1 (234) 567-8901
  else if (cleaned.length === 11) {
    return `+${cleaned.slice(0, 1)} (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`;
  }
  
  // Si no coincide con los formatos esperados, retornar el original
  return phone;
};

/**
 * Formatea un nombre capitalizando la primera letra de cada palabra
 * @param {string} name - El nombre a formatear
 * @returns {string} - Nombre formateado o cadena vacía si no hay nombre
 */
export const formatName = (name) => {
  // Si no hay nombre, retornar cadena vacía
  if (!name) return '';
  
  // Proceso de formateo:
  // 1. toLowerCase() - convertir todo a minúsculas
  // 2. split(' ') - dividir por espacios en un array
  // 3. map() - procesar cada palabra
  // 4. charAt(0).toUpperCase() - primera letra en mayúscula
  // 5. + word.slice(1) - concatenar con el resto de la palabra
  // 6. join(' ') - unir todas las palabras con espacios
  return name
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};
