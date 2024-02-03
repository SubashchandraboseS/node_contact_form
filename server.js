const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/contactFormDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define mongoose schema and model (models/Contact.js)
const Contact = mongoose.model('Contact', {
  name: String,
  email: String,
  phone: String,
});

// Middleware
app.use(bodyParser.json());

// Routes
app.get('/', (req, res) => {
  res.send('Hello, this is the contact form API!');
});

// Get all contacts
app.get('/api/contacts', async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching contacts', error: error.message });
  }
});

// Add a new contact
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const newContact = new Contact({ name, email, phone });
    await newContact.save();
    res.json({ message: 'Contact saved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error saving contact', error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
