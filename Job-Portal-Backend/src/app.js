import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js'; // Ensure the correct import path
import { checkConnection } from './config/db.js';
import createAllTable from './utils/dbUtils.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Enables JSON body parsing

// Routes
app.use('/api/auth', authRoutes);  // Authentication routes
app.use('/api/users', userRoutes); // User-related routes

// Start server
app.listen(3000, async () => {
  console.log('Server running on port 3000');
  try {
    await checkConnection();
    await createAllTable();
  } catch (error) {
    console.log("Failed to initialize the database", error);
  }
});
