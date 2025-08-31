/**
 * Componente principal de la aplicación de agenda de contactos
 * Gestiona el estado global, las operaciones CRUD y la interfaz principal
 */
import React, { useState, useEffect } from 'react';
import ContactList from './components/ContactList';
import ContactForm from './components/ContactForm';
import ContactDetail from './components/ContactDetail';
import Header from './components/Header';
import EmptyState from './components/EmptyState';
import Stats from './components/Stats';
import ToastContainer from './components/ToastContainer';
import ConfirmDialog from './components/ConfirmDialog';
import useToast from './hooks/useToast';
import useConfirm from './hooks/useConfirm';
import { Plus, Search } from 'lucide-react';

function App() {
  // ===== ESTADOS PRINCIPALES =====
  
  // Lista completa de contactos obtenida de la API
  const [contacts, setContacts] = useState([]);
  
  // Lista filtrada de contactos basada en la búsqueda
  const [filteredContacts, setFilteredContacts] = useState([]);
  
  // Término de búsqueda ingresado por el usuario
  const [searchTerm, setSearchTerm] = useState('');
  
  // Controla si se debe mostrar el formulario de contacto
  const [showForm, setShowForm] = useState(false);
  
  // Contacto que se está editando (null si es un contacto nuevo)
  const [editingContact, setEditingContact] = useState(null);
  
  // Contacto seleccionado para mostrar sus detalles
  const [selectedContact, setSelectedContact] = useState(null);
  
  // Estado de carga para mostrar spinners o estados de espera
  const [loading, setLoading] = useState(true);
  
  // Hook personalizado para manejar notificaciones toast
  const { toasts, showSuccess, showError, removeToast } = useToast();
  
  // Hook personalizado para manejar diálogos de confirmación
  const { confirmDialog, hideConfirm, showConfirm } = useConfirm();

  // URL base de la API del backend
  const API_URL = 'http://localhost:5000/api';

  // ===== FUNCIONES DE LA API =====

  /**
   * Obtiene todos los contactos desde la API
   * Se ejecuta al cargar la página y cada 30 segundos
   */
  const fetchContacts = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/contacts`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setContacts(data);
      setFilteredContacts(data);
    } catch (error) {
      console.error('Error fetching contacts:', error);
      showError('Error al cargar los contactos');
    } finally {
      setLoading(false);
    }
  };

  // ===== EFECTOS =====

  // Efecto que se ejecuta solo una vez al montar el componente
  useEffect(() => {
    fetchContacts();
  }, []);

  // Efecto que filtra los contactos cada vez que cambia el término de búsqueda o la lista de contactos
  useEffect(() => {
    if (searchTerm.trim() === '') {
      // Si no hay término de búsqueda, mostrar todos los contactos
      setFilteredContacts(contacts);
    } else {
      // Filtrar contactos por nombre, email o teléfono (búsqueda insensible a mayúsculas)
      const filtered = contacts.filter(contact =>
        contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.phone?.includes(searchTerm)
      );
      setFilteredContacts(filtered);
    }
  }, [searchTerm, contacts]);

  // Efecto para actualizar automáticamente los contactos cada 30 segundos
  // Solo se ejecuta si no hay una carga en progreso
  useEffect(() => {
    const interval = setInterval(() => {
      if (!loading) {
        fetchContacts();
      }
    }, 30000); // 30 segundos

    // Cleanup: limpiar el intervalo cuando el componente se desmonte
    return () => clearInterval(interval);
  }, [loading]);

  // ===== OPERACIONES CRUD =====

  /**
   * Crea un nuevo contacto en la base de datos
   * @param {object} contactData - Datos del contacto a crear
   */
  const addContact = async (contactData) => {
    try {
      const response = await fetch(`${API_URL}/contacts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactData),
      });

      if (response.ok) {
        const newContact = await response.json();
        setContacts(prev => [...prev, newContact]);
        setShowForm(false);
        setEditingContact(null);
        showSuccess('Contacto creado exitosamente');
        
        // Actualizar automáticamente la lista de contactos
        await fetchContacts();
      } else {
        showError('Error al crear el contacto');
      }
    } catch (error) {
      console.error('Error adding contact:', error);
      showError('Error de conexión al crear el contacto');
    }
  };

  /**
   * Actualiza un contacto existente en la base de datos
   * @param {number} id - ID del contacto a actualizar
   * @param {object} contactData - Nuevos datos del contacto
   */
  const updateContact = async (id, contactData) => {
    try {
      const response = await fetch(`${API_URL}/contacts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactData),
      });

      if (response.ok) {
        // Actualizar el contacto en el estado local
        setContacts(prev =>
          prev.map(contact =>
            contact.id === id
              ? { ...contact, ...contactData }
              : contact
          )
        );
        setShowForm(false);
        setEditingContact(null);
        showSuccess('Contacto actualizado exitosamente');
        
        // Actualizar automáticamente la lista de contactos
        await fetchContacts();
      } else {
        showError('Error al actualizar el contacto');
      }
    } catch (error) {
      console.error('Error updating contact:', error);
      showError('Error de conexión al actualizar el contacto');
    }
  };

  /**
   * Elimina un contacto de la base de datos
   * @param {number} id - ID del contacto a eliminar
   */
  const deleteContact = async (id) => {
    try {
      const response = await fetch(`${API_URL}/contacts/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Remover el contacto del estado local
        setContacts(prev => prev.filter(contact => contact.id !== id));
        
        // Si el contacto eliminado estaba seleccionado, deseleccionarlo
        if (selectedContact?.id === id) {
          setSelectedContact(null);
        }
        showSuccess('Contacto eliminado exitosamente');
      } else {
        showError('Error al eliminar el contacto');
      }
    } catch (error) {
      console.error('Error deleting contact:', error);
      showError('Error de conexión al eliminar el contacto');
    }
  };

  // ===== MANEJADORES DE EVENTOS =====

  /**
   * Maneja la eliminación de un contacto con confirmación previa
   * @param {number} id - ID del contacto a eliminar
   */
  const handleDeleteWithConfirm = (id) => {
    const contact = contacts.find(c => c.id === id);
    if (contact) {
      // Mostrar diálogo de confirmación antes de eliminar
      showConfirm(
        'Eliminar Contacto',
        `¿Estás seguro de que quieres eliminar a "${contact.name}"? Esta acción no se puede deshacer.`,
        () => deleteContact(id),
        'danger'
      );
    }
  };

  /**
   * Maneja el envío del formulario (crear o actualizar contacto)
   * @param {object} contactData - Datos del formulario
   */
  const handleSubmit = (contactData) => {
    if (editingContact) {
      // Si hay un contacto en edición, actualizarlo
      updateContact(editingContact.id, contactData);
    } else {
      // Si no hay contacto en edición, crear uno nuevo
      addContact(contactData);
    }
  };

  /**
   * Abre el formulario para editar un contacto existente
   * @param {object} contact - Contacto a editar
   */
  const handleEdit = (contact) => {
    setEditingContact(contact);
    setShowForm(true);
  };

  /**
   * Abre el formulario para crear un nuevo contacto
   */
  const handleNewContact = () => {
    setEditingContact(null);
    setShowForm(true);
  };

  /**
   * Actualiza manualmente la lista de contactos
   */
  const refreshContacts = async () => {
    await fetchContacts();
    showSuccess('Contactos actualizados');
  };

  // ===== RENDERIZADO =====

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      {/* Header con botón de actualización */}
      <Header onRefresh={refreshContacts} />
      
      {/* Contenido principal */}
      <main className="container mx-auto px-4 py-8 pt-32">
        {/* Estadísticas de contactos */}
        <Stats contacts={contacts} />
        
        {/* Barra de búsqueda y botón de nuevo contacto */}
        <div className="flex flex-col sm:flex-row gap-6 mb-8">
          {/* Campo de búsqueda con ícono */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar contactos por nombre, email o teléfono..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent shadow-sm transition-all duration-200 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            />
          </div>
          
          {/* Botón para crear nuevo contacto */}
          <button
            onClick={handleNewContact}
            className="bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white px-8 py-3 rounded-xl flex items-center gap-3 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <Plus className="w-5 h-5" />
            Nuevo Contacto
          </button>
        </div>

        {/* Contenido principal en grid responsivo */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Lista de contactos (1/3 del ancho en pantallas grandes) */}
          <div className="lg:col-span-1">
            <ContactList
              contacts={filteredContacts}
              onSelect={setSelectedContact}
              onEdit={handleEdit}
              onDelete={handleDeleteWithConfirm}
              selectedId={selectedContact?.id}
              loading={loading}
              searchTerm={searchTerm}
              onClearSearch={() => setSearchTerm('')}
            />
          </div>

          {/* Detalles del contacto o formulario (2/3 del ancho en pantallas grandes) */}
          <div className="lg:col-span-2">
            {showForm ? (
              // Mostrar formulario si se está creando o editando un contacto
              <ContactForm
                contact={editingContact}
                onSubmit={handleSubmit}
                onCancel={() => {
                  setShowForm(false);
                  setEditingContact(null);
                }}
              />
            ) : selectedContact ? (
              // Mostrar detalles si hay un contacto seleccionado
              <ContactDetail
                contact={selectedContact}
                onEdit={handleEdit}
                onDelete={deleteContact}
              />
            ) : (
              // Mostrar estado vacío si no hay contacto seleccionado
              <EmptyState 
                onNewContact={handleNewContact}
                hasContacts={contacts.length > 0}
              />
            )}
          </div>
        </div>
      </main>
      
      {/* Contenedor de notificaciones toast */}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
      
      {/* Diálogo de confirmación para acciones destructivas */}
      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        onClose={hideConfirm}
        onConfirm={confirmDialog.onConfirm}
        title={confirmDialog.title}
        message={confirmDialog.message}
        type={confirmDialog.type}
        confirmText="Eliminar"
        cancelText="Cancelar"
      />
    </div>
  );
}

export default App;
