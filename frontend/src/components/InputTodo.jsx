import React, { Fragment, useState } from "react";
import ListEmployees from "./ListTodo";
import '../App.css';

const InputEmployee = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [setDarkMode, darkMode] = useState(false);
  const [employeeData, setEmployeeData] = useState({
    name: "",
    department: "",
    designation: "",
    salary: "",
    dob: "",
    address: "",
    age: ""
  });

  const { name, department, designation, salary, dob, address, age } = employeeData;

  const onChange = (e) => {
    setEmployeeData({ ...employeeData, [e.target.name]: e.target.value });
  };

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/employees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(employeeData)
      });

      if (response.ok) {
        console.log("Employee added successfully!");
        setCurrentPage(3); // Directly show the list after submitting the form
      } else {
        console.error("Failed to add employee.");
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <h1 className="text-center mt-5">Employee Details</h1>
      {currentPage === 1 && (
        <form className="mt-3" onSubmit={nextPage} style={{ maxWidth: "400px", margin: "0 auto" }}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              className="form-control hover-input color black"
              id="name"
              placeholder="Name"
              name="name"
              value={name}
              onChange={onChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="department">Department:</label>
            <select
              className="form-control hover-input"
              id="department"
              name="department"
              value={department}
              onChange={onChange}
              required
            >
              <option value="">Select Department</option>
              <option value="Finance">Finance</option>
              <option value="IT">IT</option>
              <option value="HR">HR</option>
              <option value="Marketing">Marketing</option>
              <option value="Sales">Sales</option>
              <option value="Operation">Operation</option>
              <option value="Customer Service">Customer Service</option>
              <option value="Legal">Legal</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="designation">Designation:</label>
            <input
              type="text"
              className="form-control hover-input"
              id="designation"
              placeholder="Designation"
              name="designation"
              value={designation}
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="salary">Salary:</label>
            <input
              type="number"
              className="form-control hover-input"
              id="salary"
              placeholder="Salary"
              name="salary"
              value={salary}
              onChange={onChange}
              required
            />
          </div>

          <div className="text-center">
            <button type="submit" className="btn btn-success">Next</button>
          </div>
        </form>
      )}
      {currentPage === 2 && (
        <form className="mt-3" onSubmit={onSubmitForm} style={{ maxWidth: "400px", margin: "0 auto" }}>
          <div className="form-group">
            <label htmlFor="dob">Date of Birth:</label>
            <input
              type="date"
              className="form-control hover-input"
              id="dob"
              placeholder="Date of Birth"
              name="dob"
              value={dob}
              onChange={onChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="address">Gender:</label>
            <input
              type="text"
              className="form-control hover-input"
              id="address"
              placeholder="Gender"
              name="address"
              value={address}
              onChange={onChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="age">Age:</label>
            <input
              type="number"
              className="form-control hover-input"
              id="age"
              placeholder="Age"
              name="age"
              value={age}
              onChange={onChange}
              required
            />
          </div>

          <div className="text-center">
            <button className="btn btn-success">Submit</button>
          </div>
        </form>
      )}
      {currentPage === 3 &&  <ListEmployees darkMode={darkMode} setDarkMode={setDarkMode}/> }
    </Fragment>
  );
};

export default InputEmployee;
