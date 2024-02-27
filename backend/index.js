const express = require("express");
const app = express();
const cors = require("cors");
const {executeQuery} = require("./db");
require("dotenv").config();

//middleware
app.use(cors());
app.use(express.json()); //req.body

//ROUTES//

//create an employee
app.post("/employees/create", async (req, res) => {
  try {
    const { Name, Department, Designation, salary, dob, address, age } = req.body;
    console.log(req.body);
    const newEmployee = await executeQuery(
      `INSERT INTO employee (Name, Department, Designation, salary, dob, address, age) VALUES ('${Name}', '${Department}', '${Designation}', ${salary}, '${dob}', '${address}', ${age});`
    );
    res.status(200).send("Employee was added!");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error");
  }
});

//get all employees
app.get("/employees", async (req, res) => {
  try {
    const allEmployees = await executeQuery("SELECT * FROM employee");
    console.log("all", allEmployees)
    res.status(200).json(allEmployees);
  } catch (err) {
    console.error(err.message);
  }
});

// Get a specific employee
app.get("/employees/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await executeQuery(`SELECT * FROM employee WHERE emp_id = ${id}`);

    res.json(employee.recordset[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error");
  }
});

// Update an employee
app.put("/employees/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { Name, Department, Designation, salary, dob, address, age } = req.body;
    console.log(`UPDATE employee SET Name = '${Name}', Department = '${Department}', Designation = '${Designation}', salary = ${salary}, dob = '${dob}', address = '${address}', age = ${age} WHERE emp_id = ${id}`);
    const updateEmployee = await executeQuery(
      `UPDATE employee SET Name = '${Name}', Department = '${Department}', Designation = '${Designation}', salary = ${salary}, dob = '${dob}', address = '${address}', age = ${age} WHERE emp_id = ${id}`
    );

    res.json("Employee was updated!");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error");
  }
});

// Delete an employee
app.delete("/employees/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteEmployee = await executeQuery(`DELETE FROM employee WHERE emp_id = ${id}`);
    res.status(200).json("Employee was deleted!");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error");
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("server has started on port "+ port + ".");
});