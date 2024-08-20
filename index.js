import express from 'express';
import mongoose from 'mongoose';
import employeesRouter from './routes/employees.js';
import rateLimit from './middlewares/rate-limit.js';

const employeeApp = express();
const port = process.env.PORT || 4000;

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1/employeeDB', {
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Middleware
employeeApp.use(express.json());
employeeApp.use(rateLimit);

// Routes
employeeApp.use('/api/v1', employeesRouter);

employeeApp.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
