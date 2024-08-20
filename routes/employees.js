import Employee from '../models/employee.js';
import authenticate from '../middlewares/authenticate.js'

import express from 'express';
const router = express.Router();

// Create an employee
router.post('/employees', authenticate, async (req, res) => {
  try {
    const { name, email, dateOfBirth, phoneNumber } = req.body;

    if (!name || name.trim() === '') {
      return res.status(400).json({ error: 'Name is required' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }
    
    const minEmployeeAge = 16 * 365 * 24 * 60 * 60 * 1000
    if (!dateOfBirth || Date.now() - new Date(dateOfBirth).getTime() < minEmployeeAge) {
      return res.status(400).json({ error: 'Need to be at least 16 years old' });
    }

    const employee = new Employee(req.body);
    await employee.save();
    res.status(201).json(employee);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all employees
router.get('/employees', async (req, res) => {
  try {
    setTimeout(async () => {
      const employees = await Employee.find();
      res.json(employees);
    },3000)
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a single employee
router.get('/employees/:id', async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.json(employee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update an employee
router.put('/employees/:id', authenticate, async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.json(employee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete an employee
router.delete('/employees/:id', authenticate, async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.json({ message: 'Employee deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
