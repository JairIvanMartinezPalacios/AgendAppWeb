/**
 * Componente que muestra los detalles completos de un contacto
 * Incluye información personal, timestamps y botones de acción
 * Solo muestra campos que tienen información (email, teléfono, dirección)
 */
import React from 'react';
import { Edit, Trash2, User, Mail, Phone, MapPin, Calendar, Clock } from 'lucide-react';
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
    <div className="bg-white rounded-xl shadow-soft border border-gray-100">
      {/* ===== ENCABEZADO DEL CONTACTO ===== */}
      <div className="p-8 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
        <div className="flex items-start justify-between">
          {/* Información principal del contacto */}
          <div className="flex items-center gap-6">
            {/* Avatar del contacto con ícono de usuario */}
            <div className="w-20 h-20 bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl flex items-center justify-center shadow-sm">
              <User className="w-10 h-10 text-primary-600" />
            </div>
            
            {/* Nombre y descripción */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900">{contact.name}</h2>
              <p className="text-gray-600 text-lg">Contacto de la Agenda</p>
            </div>
          </div>
          
          {/* Botones de acción */}
          <div className="flex gap-3">
            {/* Botón de editar */}
            <button
              onClick={() => onEdit(contact)}
              className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-xl flex items-center gap-2 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              <Edit className="w-5 h-5" />
              Editar
            </button>
            
            {/* Botón de eliminar */}
            <button
              onClick={() => onDelete(contact.id)}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl flex items-center gap-2 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              <Trash2 className="w-5 h-5" />
              Eliminar
            </button>
          </div>
        </div>
      </div>

      {/* ===== INFORMACIÓN DEL CONTACTO ===== */}
      <div className="p-8 space-y-8">
        {/* Campo de Email (solo si existe) */}
        {contact.email && (
          <div className="flex items-start gap-6">
            {/* Ícono del email con fondo azul */}
            <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
              <Mail className="w-6 h-6 text-blue-600" />
            </div>
            
            {/* Información del email */}
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Email</h3>
              <p className="text-gray-900 mt-2 text-lg">
                {/* Enlace clickeable para abrir el cliente de email */}
                <a 
                  href={`mailto:${contact.email}`}
                  className="text-primary-600 hover:text-primary-700 hover:underline transition-colors"
                >
                  {contact.email}
                </a>
              </p>
            </div>
          </div>
        )}

        {/* Campo de Teléfono (solo si existe) */}
        {contact.phone && (
          <div className="flex items-start gap-6">
            {/* Ícono del teléfono con fondo verde */}
            <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
              <Phone className="w-6 h-6 text-green-600" />
            </div>
            
            {/* Información del teléfono */}
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Teléfono</h3>
              <p className="text-gray-900 mt-2 text-lg">
                {/* Enlace clickeable para hacer llamada */}
                <a 
                  href={`tel:${contact.phone}`}
                  className="text-primary-600 hover:text-primary-700 hover:underline transition-colors"
                >
                  {contact.phone}
                </a>
              </p>
            </div>
          </div>
        )}

        {/* Campo de Dirección (solo si existe) */}
        {contact.address && (
          <div className="flex items-start gap-6">
            {/* Ícono de ubicación con fondo púrpura */}
            <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
              <MapPin className="w-6 h-6 text-purple-600" />
            </div>
            
            {/* Información de la dirección */}
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Dirección</h3>
              {/* Preservar saltos de línea en la dirección */}
              <p className="text-gray-900 mt-2 text-lg whitespace-pre-wrap">{contact.address}</p>
            </div>
          </div>
        )}

        {/* ===== TIMESTAMPS ===== */}
        <div className="pt-8 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Fecha de creación */}
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
              {/* Ícono de calendario con fondo naranja */}
              <div className="w-10 h-10 bg-gradient-to-br from-orange-100 to-orange-200 rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-orange-600" />
              </div>
              
              {/* Información de fecha de creación */}
              <div>
                <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Creado</p>
                {/* Fecha formateada legible */}
                <p className="text-gray-900 font-semibold">
                  {formatDate(contact.created_at)}
                </p>
                {/* Tiempo relativo (ej: "hace 2 días") */}
                <p className="text-xs text-gray-400">
                  {getRelativeTime(contact.created_at)}
                </p>
              </div>
            </div>
            
            {/* Fecha de última actualización */}
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
              {/* Ícono de reloj con fondo índigo */}
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-100 to-indigo-200 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-indigo-600" />
              </div>
              
              {/* Información de fecha de actualización */}
              <div>
                <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Actualizado</p>
                {/* Fecha formateada legible */}
                <p className="text-gray-900 font-semibold">
                  {formatDate(contact.updated_at)}
                </p>
                {/* Tiempo relativo (ej: "hace 1 hora") */}
                <p className="text-xs text-gray-400">
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
