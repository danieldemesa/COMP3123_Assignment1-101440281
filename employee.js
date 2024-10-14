const express = require('express');
const Employee = require('../models/employee'); 
const router = express.Router();


router.post('/employees', async (req, res) => {
    const { first_name, last_name, email, position, salary, date_of_joining, department } = req.body;
    try {
        const employee = new Employee({ first_name, last_name, email, position, salary, date_of_joining, department });
        await employee.save();
        res.status(201).json({ message: 'Employee created successfully', employee_id: employee._id });
    } catch (error) {
        console.error('Error creating employee:', error);
        res.status(500).json({ message: 'Error creating employee', error: error.message });
    }
});


router.get('/employees/:eid', async (req, res) => {
    const eid = req.params.eid.trim();
    try {
        const employee = await Employee.findById(eid);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.status(200).json(employee);
    } catch (error) {
        console.error('Error retrieving employee:', error);
        res.status(500).json({ message: 'Error retrieving employee', error: error.message });
    }
});




router.put('/employees/:eid', async (req, res) => {
    const { eid } = req.params; 
    const { position, salary } = req.body; 
    try {
        const updatedEmployee = await Employee.findByIdAndUpdate(eid, { position, salary }, { new: true });
        if (!updatedEmployee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.status(200).json({ message: 'Employee details updated successfully.' });
    } catch (error) {
        console.error('Error updating employee:', error);
        res.status(500).json({ message: 'Error updating employee', error: error.message });
    }
});


router.delete('/employees', async (req, res) => {
    const { eid } = req.query; 
    try {
        const deletedEmployee = await Employee.findByIdAndDelete(eid);
        if (!deletedEmployee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.status(200).json({ message: 'Employee deleted successfully.' });
    } catch (error) {
        console.error('Error deleting employee:', error);
        res.status(500).json({ message: 'Error deleting employee', error: error.message });
    }
});

module.exports = router;
