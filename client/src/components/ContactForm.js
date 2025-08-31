/**
 * Componente de formulario para crear y editar contactos
 * Incluye validación en tiempo real, formateo automático de campos y manejo de errores
 * Se adapta para modo de creación o edición según las props recibidas
 */
import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, MapPin, Save, X } from 'lucide-react';
import FormField from './FormField';
import { validateContactForm, formatName, formatPhoneNumber } from '../utils/validation';

/**
 * Formulario de contacto con validación y formateo automático
 * @param {object} contact - Contacto a editar (null si es nuevo)
 * @param {function} onSubmit - Función que se ejecuta al enviar el formulario
 * @param {function} onCancel - Función que se ejecuta al cancelar
 * @returns {JSX.Element} - Formulario completo de contacto
 */
const ContactForm = ({ contact, onSubmit, onCancel }) => {
  // Estado del formulario con los datos de los campos
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });
  
  // Estado de errores de validación para cada campo
  const [errors, setErrors] = useState({});

  // Efecto para inicializar el formulario cuando se edita un contacto existente
  // Se ejecuta cada vez que cambia el contacto a editar
  useEffect(() => {
    if (contact) {
      // Si hay un contacto, llenar el formulario con sus datos
      setFormData({
        name: contact.name || '',
        email: contact.email || '',
        phone: contact.phone || '',
        address: contact.address || ''
      });
    }
  }, [contact]);

  /**
   * Valida el formulario completo usando las funciones de validación
   * @returns {boolean} - true si el formulario es válido, false si hay errores
   */
  const validateForm = () => {
    const { isValid, errors: newErrors } = validateContactForm(formData);
    setErrors(newErrors);
    return isValid;
  };

  /**
   * Maneja el envío del formulario
   * @param {Event} e - Evento del formulario
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Solo enviar si la validación es exitosa
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  /**
   * Maneja los cambios en los campos del formulario
   * Incluye formateo automático y limpieza de errores
   * @param {Event} e - Evento de cambio del campo
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;
    
    // Aplicar formateo automático según el tipo de campo
    if (name === 'name') {
      // Formatear nombre: primera letra de cada palabra en mayúscula
      formattedValue = formatName(value);
    } else if (name === 'phone') {
      // Formatear teléfono: agregar paréntesis y guiones
      formattedValue = formatPhoneNumber(value);
    }
    
    // Actualizar el estado del formulario con el valor formateado
    setFormData(prev => ({
      ...prev,
      [name]: formattedValue
    }));
    
    // Limpiar el error del campo cuando el usuario empieza a escribir
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-soft border border-gray-100 dark:border-gray-700 p-6 sm:p-8 h-fit min-h-[500px] animate-fade-in-up">
      {/* Encabezado del formulario */}
      <div className="flex items-center justify-between mb-8 animate-slide-in-left">
        <div className="transition-all duration-500 ease-out">
          {/* Título dinámico según si es edición o creación */}
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white transition-all duration-300 hover:text-primary-600 dark:hover:text-primary-400 hover:scale-105">
            {contact ? 'Editar Contacto' : 'Nuevo Contacto'}
          </h2>
          
          {/* Descripción dinámica según el modo */}
          <p className="text-gray-600 dark:text-gray-300 mt-1 transition-all duration-300 hover:text-gray-800 dark:hover:text-gray-200">
            {contact ? 'Modifica la información del contacto' : 'Agrega un nuevo contacto a tu agenda'}
          </p>
        </div>
        
        {/* Botón de cerrar/cancelar */}
        <button
          onClick={onCancel}
          className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-all duration-300 ease-out transform hover:scale-110 hover:rotate-90 hover:shadow-lg rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <X className="w-6 h-6 transition-transform duration-300" />
        </button>
      </div>

      {/* Formulario principal */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Campo de nombre (requerido) */}
        <FormField
          label="Nombre Completo"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Ingresa el nombre completo"
          required
          error={errors.name}
          icon={User}
        />

        {/* Campo de email (opcional) */}
        <FormField
          label="Correo Electrónico"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="ejemplo@email.com"
          error={errors.email}
          icon={Mail}
        />

        {/* Campo de teléfono (opcional) */}
        <FormField
          label="Número de Teléfono"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          placeholder="+1 (555) 123-4567"
          icon={Phone}
        />

        {/* Campo de dirección (opcional) */}
        <FormField
          label="Dirección Completa"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Ingresa la dirección completa del contacto"
          rows={4}
          icon={MapPin}
        />

        {/* Botones de acción del formulario */}
        <div className="flex gap-4 pt-6">
          {/* Botón de envío principal */}
          <button
            type="submit"
            className="flex-1 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white px-6 py-3 rounded-xl flex items-center justify-center gap-3 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <Save className="w-5 h-5" />
            {/* Texto dinámico según el modo */}
            {contact ? 'Actualizar Contacto' : 'Guardar Contacto'}
          </button>
          
          {/* Botón de cancelar */}
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 hover:border-gray-400 dark:hover:border-gray-500"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
