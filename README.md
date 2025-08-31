# 📱 Sistema de Agenda de Contactos

Aplicación web premium para gestionar contactos con React, Node.js, Express y MySQL. Incluye **modo oscuro por defecto**, **sistema de animaciones premium**, **diseño responsive avanzado** y **funcionalidades de deselección inteligentes**.

## ✨ Características Principales

- **🎨 Modo Oscuro por Defecto**: Tema oscuro elegante y moderno
- **🚀 Sistema de Animaciones Premium**: Transiciones fluidas y efectos visuales avanzados
- **📱 Diseño Ultra-Responsive**: Adaptable a todos los dispositivos con grid inteligente
- **🔄 Funcionalidades de Deselección**: Múltiples formas de volver a la vista principal
- **⚡ CRUD Completo**: Crear, leer, actualizar y eliminar contactos
- **🔍 Búsqueda en Tiempo Real**: Filtra por nombre, email o teléfono
- **🎯 Validación Avanzada**: Validación en tiempo real de formularios
- **💫 Notificaciones Toast**: Sistema elegante de notificaciones
- **⌨️ Atajos de Teclado**: Escape para deseleccionar, Ctrl+K para búsqueda

## 🚀 Tecnologías

- **Frontend**: React 18, Tailwind CSS, Lucide React
- **Backend**: Node.js, Express.js, MySQL2
- **Base de Datos**: MySQL con pool de conexiones
- **Animaciones**: CSS Keyframes personalizados, Transiciones CSS3

## 🛠️ Instalación Rápida

### 1. **Clonar y Instalar**
```bash
git clone <https://github.com/JairIvanMartinezPalacios/AgendAppWeb>
cd agenda
npm run install-all
```

### 2. **Configurar Base de Datos**
```bash
# Copiar variables de entorno
cp env.example env.local

# Editar env.local con tus credenciales MySQL
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_contraseña
DB_NAME=agenda
PORT=5000
```

### 3. **Ejecutar**
```bash
# Desarrollo completo (servidor + cliente)
npm run dev

# Solo servidor (puerto 5000)
npm run server

# Solo cliente (puerto 3000)
npm run client
```

## 🎨 Sistema de Animaciones Premium

### **Animaciones Principales:**
- **Entrada Escalonada**: Cada elemento aparece con delays escalonados
- **Hover Sofisticado**: Escalado, traslación y rotación en hover
- **Transiciones Fluidas**: `cubic-bezier(0.4,0,0.2,1)` para movimiento natural
- **Efectos de Profundidad**: Sombras dinámicas y efectos 3D
- **Iconos Interactivos**: Rotación y escalado en hover

### **Keyframes Personalizados:**
- **`slideInFromLeft/Right`**: Entrada con rotación y escala
- **`pulseGlow`**: Efecto de resplandor pulsante
- **`bounceIn`**: Entrada con rebote suave
- **`float`**: Movimiento flotante continuo
- **`rotateIn`**: Entrada con rotación

### **Clases de Utilidad:**
- **`.stagger-animation`**: Animaciones escalonadas automáticas
- **`.interactive-element`**: Elementos con hover premium
- **`.hover-lift`**: Efectos de elevación en hover

## 🌙 Modo Oscuro por Defecto

### **Configuración Automática:**
- **Tema Inicial**: Modo oscuro activado por defecto
- **Persistencia**: Preferencias guardadas en localStorage
- **CSS Variables**: Sistema de colores dinámicos
- **Scrollbar Personalizada**: Estilo oscuro para navegadores webkit

### **Colores del Tema:**
```css
--bg-primary: #1f2937
--text-primary: #f9fafb
--border-primary: #374151
--accent-primary: #3b82f6
```

## 📱 Diseño Ultra-Responsive

### **Grid System Inteligente:**
- **12 Columnas**: Sistema de grid flexible y preciso
- **Breakpoints**: `sm:`, `md:`, `lg:`, `xl:`, `2xl:`
- **Proporciones Dinámicas**: 
  - Móvil: `grid-cols-1` (100% ancho)
  - LG: `lg:col-span-5` (lista) + `lg:col-span-7` (detalles)
  - XL: `xl:col-span-4` (lista) + `xl:col-span-8` (detalles)

### **Componentes Responsivos:**
- **ContactList**: Altura dinámica con scroll inteligente
- **ContactDetail**: Layout adaptativo para diferentes contenidos
- **ContactForm**: Formularios que se adaptan al espacio disponible
- **Stats**: Grid responsive con animaciones escalonadas

## 🔄 Funcionalidades de Deselección

### **Múltiples Opciones para Volver:**
1. **Botón "Volver a la Lista"**: En panel derecho de detalles
2. **Botón "Limpiar selección"**: En lista de contactos
3. **Botón "Limpiar"**: En header principal
4. **Tecla Escape**: Atajo de teclado universal

### **Flujo de Navegación:**
```
Contacto Seleccionado → Múltiples opciones de deselección → EmptyState
```

### **Atajos de Teclado:**
- **`Escape`**: Deselecciona contacto actual
- **`Ctrl/Cmd + K`**: Enfoca campo de búsqueda

## 🗄️ Base de Datos

La aplicación crea automáticamente la tabla `agenda` con esta estructura:

```sql
CREATE TABLE agenda (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100),
  phone VARCHAR(20),
  address TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

## 🌐 API Endpoints

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `GET` | `/api/contacts` | Obtener todos los contactos |
| `GET` | `/api/contacts/:id` | Obtener contacto específico |
| `POST` | `/api/contacts` | Crear nuevo contacto |
| `PUT` | `/api/contacts/:id` | Actualizar contacto |
| `DELETE` | `/api/contacts/:id` | Eliminar contacto |

## 📁 Estructura del Proyecto

```
agenda/
├── client/                     # Frontend React
│   ├── src/                    # Código fuente
│   │   ├── components/         # Componentes React (12 archivos)
│   │   │   ├── ContactList.js      # Lista con animaciones premium
│   │   │   ├── ContactForm.js      # Formulario responsive
│   │   │   ├── ContactDetail.js    # Vista detallada con botones de deselección
│   │   │   ├── Header.js           # Header con botón de limpiar selección
│   │   │   ├── ThemeToggle.js      # Selector de tema oscuro
│   │   │   ├── Stats.js            # Estadísticas con animaciones escalonadas
│   │   │   ├── FormField.js        # Campo de formulario con validación
│   │   │   ├── EmptyState.js       # Estados vacíos con opciones de acción
│   │   │   ├── ConfirmDialog.js    # Diálogo de confirmación
│   │   │   ├── Toast.js            # Notificación individual
│   │   │   ├── ToastContainer.js   # Contenedor de notificaciones
│   │   │   └── ErrorBoundary.js    # Manejo de errores
│   │   ├── hooks/              # Hooks personalizados (3 archivos)
│   │   │   ├── useTheme.js         # Gestión del tema oscuro por defecto
│   │   │   ├── useToast.js         # Sistema de notificaciones
│   │   │   └── useConfirm.js       # Diálogos de confirmación
│   │   ├── utils/              # Utilidades (2 archivos)
│   │   │   ├── date.js             # Formateo de fechas
│   │   │   └── validation.js       # Validaciones de formularios
│   │   ├── App.js              # Componente principal con grid responsive
│   │   ├── index.js            # Punto de entrada
│   │   └── index.css           # Estilos globales + animaciones personalizadas
│   ├── public/                 # Archivos públicos
│   │   └── index.html         # HTML principal con tema oscuro por defecto
│   ├── tailwind.config.js     # Configuración de Tailwind CSS
│   ├── postcss.config.js      # Configuración de PostCSS
│   └── package.json           # Dependencias del cliente
├── server/                     # Backend Node.js
│   ├── config/                # Configuración
│   │   └── database.js        # Configuración de base de datos
│   └── index.js               # Servidor Express principal
├── env.example                 # Ejemplo de variables de entorno
├── env.local                   # Variables de entorno reales (en .gitignore)
├── .gitignore                  # Configuración de Git
├── package.json                # Dependencias del servidor
└── README.md                   # Este archivo
```

## 🔧 Scripts Disponibles

```bash
npm run dev          # Servidor + Cliente (desarrollo)
npm run server       # Solo servidor
npm run client       # Solo cliente
npm run build        # Construir para producción
npm run install-all  # Instalar todas las dependencias
```

## 🎨 Funcionalidades UI Avanzadas

- **Diseño Ultra-Responsive**: Mobile-first con grid system de 12 columnas
- **Tema Oscuro por Defecto**: Modo oscuro elegante y moderno
- **Animaciones Premium**: Transiciones fluidas y efectos visuales avanzados
- **Validación Visual**: Feedback inmediato en formularios
- **Estados de Carga**: Skeleton screens y spinners
- **Hover Effects**: Efectos sofisticados en todos los elementos interactivos

## 📱 Características Principales

- ✅ **Gestión de Contactos**: CRUD completo con confirmaciones
- ✅ **Búsqueda Instantánea**: Filtrado en tiempo real
- ✅ **Formateo Automático**: Nombres capitalizados, teléfonos formateados
- ✅ **Validaciones**: Cliente y servidor con mensajes claros
- ✅ **Persistencia**: Preferencias guardadas en localStorage
- ✅ **Deselección Inteligente**: Múltiples formas de volver a la vista principal
- ✅ **Atajos de Teclado**: Navegación rápida y eficiente
- ✅ **Animaciones Premium**: Sistema visual sofisticado y atractivo

## 🚀 Despliegue

### **Desarrollo**
```bash
npm run dev
# Servidor: http://localhost:5000
# Cliente: http://localhost:3000
```

### **Producción**
```bash
npm run build
npm run server
```

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama (`git checkout -b feature/NuevaFuncionalidad`)
3. Commit tus cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/NuevaFuncionalidad`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la **Licencia MIT**.

## 👨‍💻 Autor

**Jair Ivan Martínez Palacios** - [contacto.jairivan@gmail.com](mailto:contacto.jairivan@gmail.com)

## Recursos utilizados

- [React](https://reactjs.org/) - Biblioteca de UI
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS
- [Express.js](https://expressjs.com/) - Framework web
- [MySQL](https://www.mysql.com/) - Base de datos
- [Lucide](https://lucide.dev/) - Iconos

---

🔄 **Última actualización**: Agosto 30 2025

## 🆕 **Novedades en esta Versión**

### **✨ Sistema de Animaciones Premium**
- Animaciones de entrada escalonadas para todos los componentes
- Efectos hover sofisticados con escalado, traslación y rotación
- Transiciones fluidas con timing functions personalizadas
- Keyframes CSS personalizados para efectos visuales avanzados

### **🌙 Modo Oscuro por Defecto**
- Tema oscuro activado automáticamente al iniciar
- CSS variables para gestión dinámica de colores
- Scrollbar personalizada para navegadores webkit
- Persistencia de preferencias en localStorage

### **📱 Diseño Ultra-Responsive**
- Grid system de 12 columnas para control preciso del layout
- Proporciones dinámicas que se adaptan a diferentes pantallas
- Componentes que mantienen altura mínima consistente
- Espaciado y tipografía responsive en todos los elementos

### **🔄 Funcionalidades de Deselección**
- Múltiples opciones para volver a la vista principal
- Botones estratégicamente ubicados en diferentes componentes
- Atajos de teclado para navegación rápida
- Flujo de navegación intuitivo y consistente

### **🎯 Mejoras de UX**
- Botones con efectos hover premium
- Iconos interactivos con animaciones
- Estados visuales claros para todas las acciones
- Feedback visual inmediato en todas las interacciones
