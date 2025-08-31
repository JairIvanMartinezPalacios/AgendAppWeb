const express = require('express');
const cors = require('cors');
require('dotenv').config({ path: '../env.local' });

const { pool, initializeDatabase, testConnection } = require('./config/database');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize database
const startServer = async () => {
  try {
    await testConnection();
    await initializeDatabase();
    
    console.log('🚀 Server is ready to handle requests');
    
    app.listen(PORT, () => {
      console.log('='.repeat(50));
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📱 API available at: http://localhost:${PORT}/api`);
      console.log(`🌐 Frontend will be available at: http://localhost:3000`);
      console.log('='.repeat(50));
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

// Routes

// GET all contacts
app.get('/api/contacts', (req, res) => {
  const query = 'SELECT * FROM agenda ORDER BY name ASC';
  pool.query(query, (err, results) => {
    if (err) {
      console.error('❌ Error fetching contacts:', err);
      res.status(500).json({ error: 'Error fetching contacts' });
      return;
    }
    res.json(results);
  });
});

// GET single contact
app.get('/api/contacts/:id', (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM agenda WHERE id = ?';
  pool.query(query, [id], (err, results) => {
    if (err) {
      console.error('❌ Error fetching contact:', err);
      res.status(500).json({ error: 'Error fetching contact' });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ error: 'Contact not found' });
      return;
    }
    res.json(results[0]);
  });
});

// POST new contact
app.post('/api/contacts', (req, res) => {
  const { name, email, phone, address } = req.body;
  
  if (!name) {
    res.status(400).json({ error: 'Name is required' });
    return;
  }
  
  const query = 'INSERT INTO agenda (name, email, phone, address) VALUES (?, ?, ?, ?)';
  pool.query(query, [name, email, phone, address], (err, result) => {
    if (err) {
      console.error('❌ Error creating contact:', err);
      res.status(500).json({ error: 'Error creating contact' });
      return;
    }
    
    const newContact = {
      id: result.insertId,
      name,
      email,
      phone,
      address
    };
    
    console.log('✅ Contact created:', newContact.name);
    res.status(201).json(newContact);
  });
});

// PUT update contact
app.put('/api/contacts/:id', (req, res) => {
  const { id } = req.params;
  const { name, email, phone, address } = req.body;
  
  if (!name) {
    res.status(400).json({ error: 'Name is required' });
    return;
  }
  
  const query = 'UPDATE agenda SET name = ?, email = ?, phone = ?, address = ? WHERE id = ?';
  pool.query(query, [name, email, phone, address, id], (err, result) => {
    if (err) {
      console.error('❌ Error updating contact:', err);
      res.status(500).json({ error: 'Error updating contact' });
      return;
    }
    
    if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Contact not found' });
      return;
    }
    
    console.log('✅ Contact updated:', name);
    res.json({ message: 'Contact updated successfully' });
  });
});

// DELETE contact
app.delete('/api/contacts/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM agenda WHERE id = ?';
  
  pool.query(query, [id], (err, result) => {
    if (err) {
      console.error('❌ Error deleting contact:', err);
      res.status(500).json({ error: 'Error deleting contact' });
      return;
    }
    
    if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Contact not found' });
      return;
    }
    
    console.log('✅ Contact deleted with ID:', id);
    res.json({ message: 'Contact deleted successfully' });
  });
});

// Start the server
startServer();
