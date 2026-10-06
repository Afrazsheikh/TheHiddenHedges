const mongoose = require('mongoose');

let isConnected = false;

const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb+srv://munaazpro_db_user:THB6KY2Ce2bPcjmC@cluster0.couxwlu.mongodb.net/thehiddenhedges?retryWrites=true&w=majority';
  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    });
    isConnected = true;
    console.log(`[MongoDB] Connected successfully to host: ${conn.connection.host}`);
  } catch (error) {
    console.warn('[MongoDB] Connection warning (fallback mode active):', error.message);
    isConnected = false;
  }
};

const getIsConnected = () => isConnected;

module.exports = { connectDB, getIsConnected };
