# 📱 Sistema de Agenda de Contactos

Aplicación web para gestionar contactos con React, Node.js, Express y MySQL. Incluye tema claro/oscuro, validaciones en tiempo real y sistema de notificaciones.

## ✨ Características

- **CRUD Completo**: Crear, leer, actualizar y eliminar contactos
- **Búsqueda en Tiempo Real**: Filtra por nombre, email o teléfono
- **Tema Claro/Oscuro**: Cambio dinámico con persistencia
- **Validación Avanzada**: Validación en tiempo real de formularios
- **Interfaz Responsive**: Adaptable a todos los dispositivos
- **Notificaciones Toast**: Sistema elegante de notificaciones

## 🚀 Tecnologías

- **Frontend**: React 18, Tailwind CSS, Lucide React
- **Backend**: Node.js, Express.js, MySQL2
- **Base de Datos**: MySQL con pool de conexiones

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
│   │   │   ├── ContactList.js      # Lista de contactos
│   │   │   ├── ContactForm.js      # Formulario de contacto
│   │   │   ├── ContactDetail.js    # Vista detallada
│   │   │   ├── Header.js           # Encabezado con navegación
│   │   │   ├── ThemeToggle.js      # Selector de tema
│   │   │   ├── Stats.js            # Estadísticas
│   │   │   ├── FormField.js        # Campo de formulario
│   │   │   ├── EmptyState.js       # Estados vacíos
│   │   │   ├── ConfirmDialog.js    # Diálogo de confirmación
│   │   │   ├── Toast.js            # Notificación individual
│   │   │   ├── ToastContainer.js   # Contenedor de notificaciones
│   │   │   └── ErrorBoundary.js    # Manejo de errores
│   │   ├── hooks/              # Hooks personalizados (3 archivos)
│   │   │   ├── useTheme.js         # Gestión del tema
│   │   │   ├── useToast.js         # Sistema de notificaciones
│   │   │   └── useConfirm.js       # Diálogos de confirmación
│   │   ├── utils/              # Utilidades (2 archivos)
│   │   │   ├── date.js             # Formateo de fechas
│   │   │   └── validation.js       # Validaciones de formularios
│   │   ├── App.js              # Componente principal
│   │   ├── index.js            # Punto de entrada
│   │   └── index.css           # Estilos globales
│   ├── public/                 # Archivos públicos
│   │   └── index.html         # HTML principal
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

## 🎨 Funcionalidades UI

- **Diseño Responsive**: Mobile-first con breakpoints
- **Tema Dinámico**: Claro/oscuro con detección automática
- **Animaciones**: Transiciones suaves y efectos hover
- **Validación Visual**: Feedback inmediato en formularios
- **Estados de Carga**: Skeleton screens y spinners

## 📱 Características Principales

- ✅ **Gestión de Contactos**: CRUD completo con confirmaciones
- ✅ **Búsqueda Instantánea**: Filtrado en tiempo real
- ✅ **Formateo Automático**: Nombres capitalizados, teléfonos formateados
- ✅ **Validaciones**: Cliente y servidor con mensajes claros
- ✅ **Persistencia**: Preferencias guardadas en localStorage

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
