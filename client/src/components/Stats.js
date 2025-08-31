/**
 * Componente de estadísticas que muestra información resumida de los contactos
 * Incluye contadores de total de contactos, contactos con email, teléfono y dirección
 * Tiene animaciones de entrada escalonadas para un efecto visual atractivo
 */
import React, { useState, useEffect } from 'react';
import { Users, Mail, Phone, MapPin } from 'lucide-react';

/**
 * Componente que muestra estadísticas de los contactos con animaciones
 * @param {Array} contacts - Array de contactos para calcular las estadísticas
 * @returns {JSX.Element} - Grid de tarjetas con estadísticas
 */
const Stats = ({ contacts }) => {
  // Estado que controla si las estadísticas son visibles (para animaciones)
  const [isVisible, setIsVisible] = useState(false);

  // Efecto que activa la visibilidad después de un pequeño delay
  // Esto permite que las animaciones se ejecuten después del montaje del componente
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Array con la configuración de cada estadística
  // Cada estadística incluye: etiqueta, valor calculado, ícono, colores y estilos
  const stats = [
    {
      label: 'Total de Contactos',
      value: contacts.length, // Contar todos los contactos
      icon: Users,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      iconColor: 'text-blue-600 dark:text-blue-400'
    },
    {
      label: 'Con Email',
      value: contacts.filter(c => c.email).length, // Contar contactos que tienen email
      icon: Mail,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      iconColor: 'text-green-600 dark:text-green-400'
    },
    {
      label: 'Con Teléfono',
      value: contacts.filter(c => c.phone).length, // Contar contactos que tienen teléfono
      icon: Phone,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
      iconColor: 'text-purple-600 dark:text-purple-400'
    },
    {
      label: 'Con Dirección',
      value: contacts.filter(c => c.address).length, // Contar contactos que tienen dirección
      icon: MapPin,
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20',
      iconColor: 'text-orange-600 dark:text-orange-400'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 xl:gap-6 mb-6 sm:mb-8">
      {/* Renderizar cada estadística como una tarjeta */}
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.label}
            className={`${stat.bgColor} dark:bg-gray-800 rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100 dark:border-gray-700 transition-all duration-500 ease-out transform hover:scale-105 hover:-translate-y-2 hover:shadow-xl ${
              isVisible 
                ? 'opacity-100 translate-y-0 rotate-0' 
                : 'opacity-0 translate-y-12 rotate-3'
            }`}
            style={{ transitionDelay: `${index * 150}ms` }}
          >
            <div className="flex items-center justify-between">
              {/* Información de la estadística */}
              <div>
                {/* Etiqueta descriptiva */}
                <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
                  {stat.label}
                </p>
                {/* Valor numérico */}
                <p className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                  {stat.value}
                </p>
              </div>
              
              {/* Ícono con fondo degradado */}
              <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center shadow-lg transition-all duration-500 ease-out transform hover:scale-110 hover:rotate-12 hover:shadow-2xl`}>
                <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white transition-transform duration-300" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Stats;
