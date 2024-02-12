const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

// Connect to MongoDB for profiles
mongoose.connect('mongodb://localhost:27017/profiles', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Define a schema for the profile
const profileSchema = new mongoose.Schema({
  overview: String,
  phone: String,
  industry: String,
  companySize: String,
  specialties: String,
  locations: String
});

// Create a model for profiles
const Profile = mongoose.model('Profile', profileSchema);

// Connect to MongoDB for chat messages
mongoose.connect('mongodb://localhost:27017/chat_messages', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Define a schema for chat messages
const chatSchema = new mongoose.Schema({
  question: String,
  response: String,
  timestamp: {
    type: Date,
    default: Date.now
  }
});

// Create a model for chat messages
const ChatMessage = mongoose.model('ChatMessage', chatSchema);

// Middleware for parsing JSON data
app.use(bodyParser.json());

// Route for submitting profile data
app.post('/api/profiles', async (req, res) => {
  try {
    const { overview, phone, industry, companySize, specialties, locations } = req.body;
    // Create a new profile document
    const profile = new Profile({
      overview,
      phone,
      industry,
      companySize,
      specialties,
      locations
    });
    // Save the profile to the database
    await profile.save();
    res.status(201).send('Profile created successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Route for submitting chat messages
app.post('/api/chat', async (req, res) => {
  try {
    const { question, response } = req.body;
    // Create a new chat message document
    const chatMessage = new ChatMessage({
      question,
      response
    });
    // Save the chat message to the database
    await chatMessage.save();
    res.status(201).send('Chat message saved successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
