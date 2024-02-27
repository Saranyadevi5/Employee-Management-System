// employees.js
const { Pool } = require("pg");
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_NAME,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT,
});

app.use(cors());
app.use(express.json());

// Create employee
app.post('/employees', async (req, res) => {
  try {
    const { name, department, designation, salary, dob, gender, age } = req.body;

    const newEmployee = await pool.query(
      'INSERT INTO employee (Name, Department, Designation, salary, dob, gender, age) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [name, department, designation, salary, dob, gender, age]
    );

    res.json(newEmployee.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Internal Server Error');
  }
});

// Get all employees
app.get('/employees', async (req, res) => {
  try {
    const allEmployees = await pool.query('SELECT * FROM employee');
    res.json(allEmployees.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Internal Server Error');
  }
});

// Get a specific employee
app.get('/employees/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await pool.query('SELECT * FROM employee WHERE emp_id = $1', [id]);

    res.json(employee.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Internal Server Error');
  }
});

// Update an employee
app.put('/employees/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, department, designation, salary, dob, gender, age } = req.body;
    const updateEmployee = await pool.query(
      'UPDATE employee SET name = $1, department = $2, designation = $3, salary = $4, dob = $5, gender = $6, age = $8 WHERE emp_id = $7',
      [name, department, designation, salary, dob, gender, id, age]
    );

    res.json('Employee was updated!');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Internal Server Error');
  }
});

// Delete an employee
app.delete('/employees/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleteEmployee = await pool.query('DELETE FROM employee WHERE emp_id = $1', [id]);
    res.json('Employee was deleted!');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Internal Server Error');
  }
});
// app.listen(5000, () => {
//   console.log("server has started on port 5000");
// });
module.exports = app;
