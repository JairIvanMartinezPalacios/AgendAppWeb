/**
 * Componente que muestra los detalles completos de un contacto
 * Incluye información personal, timestamps y botones de acción
 * Solo muestra campos que tienen información (email, teléfono, dirección)
 */
import React from 'react';
import { Edit, Trash2, User, Mail, Phone, MapPin, Calendar, Clock, ArrowLeft } from 'lucide-react';
import { formatDate, getRelativeTime } from '../utils/date';

/**
 * Vista detallada de un contacto con toda su información
 * @param {object} contact - Contacto cuyos detalles se van a mostrar
 * @param {function} onEdit - Función que se ejecuta al editar el contacto
 * @param {function} onDelete - Función que se ejecuta al eliminar el contacto
 * @returns {JSX.Element} - Vista completa de los detalles del contacto
 */
const ContactDetail = ({ contact, onEdit, onDelete }) => {

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-soft border border-gray-100 dark:border-gray-700 h-fit min-h-[500px] animate-fade-in-up">
      {/* ===== ENCABEZADO DEL CONTACTO ===== */}
      <div className="p-8 border-b border-gray-100 dark:border-gray-600 bg-gradient-to-r from-gray-50 to-white dark:from-gray-700 dark:to-gray-800">
        <div className="flex items-start justify-between">
          {/* Información principal del contacto */}
          <div className="flex items-center gap-6 animate-slide-in-left">
            {/* Avatar del contacto con ícono de usuario */}
            <div className="w-20 h-20 bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900/30 dark:to-primary-800/30 rounded-2xl flex items-center justify-center shadow-sm transition-all duration-500 ease-out transform hover:scale-110 hover:rotate-12 hover:shadow-xl">
              <User className="w-10 h-10 text-primary-600 dark:text-primary-400 transition-transform duration-300" />
            </div>
            
            {/* Nombre y descripción */}
            <div className="transition-all duration-500 ease-out">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white transition-all duration-300 hover:text-primary-600 dark:hover:text-primary-400 hover:scale-105">
                {contact.name}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-lg transition-all duration-300 hover:text-gray-800 dark:hover:text-gray-200">
                Contacto de la Agenda
              </p>
            </div>
          </div>
          
          {/* Botones de acción */}
          <div className="flex flex-col sm:flex-row gap-3 animate-slide-in-right">
            {/* Botón de volver/deseleccionar */}
            <button
              onClick={() => onEdit(null)} // Pasar null para deseleccionar
              className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-xl flex items-center gap-2 transition-all duration-300 ease-out transform hover:scale-105 hover:-translate-y-1 hover:shadow-xl hover:shadow-gray-200/50 order-first sm:order-none"
            >
              <ArrowLeft className="w-5 h-5 transition-transform duration-200 hover:rotate-12" />
              Volver a la Lista
            </button>
            
            {/* Botones de acción principales */}
            <div className="flex gap-3">
              {/* Botón de editar */}
              <button
                onClick={() => onEdit(contact)}
                className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-xl flex items-center gap-2 transition-all duration-300 ease-out transform hover:scale-105 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary-200/50"
              >
                <Edit className="w-5 h-5 transition-transform duration-200 hover:rotate-12" />
                Editar
              </button>
              
              {/* Botón de eliminar */}
              <button
                onClick={() => onDelete(contact.id)}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl flex items-center gap-2 transition-all duration-300 ease-out transform hover:scale-105 hover:-translate-y-1 hover:shadow-xl hover:shadow-red-200/50"
              >
                <Trash2 className="w-5 h-5 transition-transform duration-200 hover:rotate-12" />
                Eliminar
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ===== INFORMACIÓN DEL CONTACTO ===== */}
      <div className="p-8 space-y-8">
        {/* Campo de Email (solo si existe) */}
        {contact.email && (
          <div className="flex items-start gap-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            {/* Ícono del email con fondo azul */}
            <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm transition-all duration-500 ease-out transform hover:scale-110 hover:rotate-12 hover:shadow-lg">
              <Mail className="w-6 h-6 text-blue-600 dark:text-blue-400 transition-transform duration-300" />
            </div>
            
            {/* Información del email */}
            <div className="flex-1 transition-all duration-500 ease-out">
              <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide transition-all duration-300 hover:text-blue-600 dark:hover:text-blue-400">Email</h3>
              <p className="text-gray-900 dark:text-white mt-2 text-lg transition-all duration-300">
                {/* Enlace clickeable para abrir el cliente de email */}
                <a 
                  href={`mailto:${contact.email}`}
                  className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 hover:underline transition-all duration-300 transform hover:scale-105 hover:translate-x-1"
                >
                  {contact.email}
                </a>
              </p>
            </div>
          </div>
        )}

        {/* Campo de Teléfono (solo si existe) */}
        {contact.phone && (
          <div className="flex items-start gap-6 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            {/* Ícono del teléfono con fondo verde */}
            <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/30 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm transition-all duration-500 ease-out transform hover:scale-110 hover:rotate-12 hover:shadow-lg">
              <Phone className="w-6 h-6 text-green-600 dark:text-green-400 transition-transform duration-300" />
            </div>
            
            {/* Información del teléfono */}
            <div className="flex-1 transition-all duration-500 ease-out">
              <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide transition-all duration-300 hover:text-green-600 dark:hover:text-green-400">Teléfono</h3>
              <p className="text-gray-900 dark:text-white mt-2 text-lg transition-all duration-300">
                {/* Enlace clickeable para hacer llamada */}
                <a 
                  href={`tel:${contact.phone}`}
                  className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 hover:underline transition-all duration-300 transform hover:scale-105 hover:translate-x-1"
                >
                  {contact.phone}
                </a>
              </p>
            </div>
          </div>
        )}

        {/* Campo de Dirección (solo si existe) */}
        {contact.address && (
          <div className="flex items-start gap-6 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            {/* Ícono de ubicación con fondo púrpura */}
            <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900/30 dark:to-purple-800/30 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm transition-all duration-500 ease-out transform hover:scale-110 hover:rotate-12 hover:shadow-lg">
              <MapPin className="w-6 h-6 text-purple-600 dark:text-purple-400 transition-transform duration-300" />
            </div>
            
            {/* Información de la dirección */}
            <div className="flex-1 transition-all duration-500 ease-out">
              <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide transition-all duration-300 hover:text-purple-600 dark:hover:text-purple-400">Dirección</h3>
              {/* Preservar saltos de línea en la dirección */}
              <p className="text-gray-900 dark:text-white mt-2 text-lg whitespace-pre-wrap transition-all duration-300 hover:text-gray-800 dark:hover:text-gray-200">
                {contact.address}
              </p>
            </div>
          </div>
        )}

        {/* ===== TIMESTAMPS ===== */}
        <div className="pt-8 border-t border-gray-200 dark:border-gray-600">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Fecha de creación */}
            <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
              {/* Ícono de calendario con fondo naranja */}
              <div className="w-10 h-10 bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-900/30 dark:to-orange-800/30 rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-orange-600 dark:text-orange-400" />
              </div>
              
              {/* Información de fecha de creación */}
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Creado</p>
                {/* Fecha formateada legible */}
                <p className="text-gray-900 dark:text-white font-semibold">
                  {formatDate(contact.created_at)}
                </p>
                {/* Tiempo relativo (ej: "hace 2 días") */}
                <p className="text-xs text-gray-400 dark:text-gray-500">
                  {getRelativeTime(contact.created_at)}
                </p>
              </div>
            </div>
            
            {/* Fecha de última actualización */}
            <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
              {/* Ícono de reloj con fondo índigo */}
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-100 to-indigo-200 dark:from-indigo-900/30 dark:to-indigo-800/30 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              </div>
              
              {/* Información de fecha de actualización */}
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Actualizado</p>
                {/* Fecha formateada legible */}
                <p className="text-gray-900 dark:text-white font-semibold">
                  {formatDate(contact.updated_at)}
                </p>
                {/* Tiempo relativo (ej: "hace 1 hora") */}
                <p className="text-xs text-gray-400 dark:text-gray-500">
                  {getRelativeTime(contact.updated_at)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactDetail;
