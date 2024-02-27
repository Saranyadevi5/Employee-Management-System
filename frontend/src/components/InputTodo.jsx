import React, { Fragment, useState } from "react";
import ListEmployees from "./ListTodo";
import '../App.css';

const InputEmployee = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [setDarkMode, darkMode] = useState(false);
  const [employeeData, setEmployeeData] = useState({
    Name: "",
    Department: "",
    Designation: "",
    salary: "",
    dob: "",
    address: "",
    age: ""
  });
  const [error, setError] = useState("");

  const { name, Department, Designation, salary, dob, address, age } = employeeData;

  const onChange = (e) => {
    if (e.target.name === "name") {
      const onlyLetters = /^[a-zA-Z\s]*$/;
      if (onlyLetters.test(e.target.value) || e.target.value === "") {
        setEmployeeData({ ...employeeData, [e.target.name]: e.target.value });
      }
    } else if (e.target.name === "dob") {
      const birthYear = new Date(e.target.value).getFullYear();
      const currentYear = new Date().getFullYear();
      const calculatedAge = currentYear - birthYear;

      // Allow only birth years before 2004
      if (birthYear < 2006) {
        setEmployeeData({ ...employeeData, [e.target.name]: e.target.value, age: calculatedAge });
        setError(""); // Clear error if it was previously set
      } else {
        setError("Please enter a valid birth year.");
      }
    } else if (e.target.name === "age") {
      const enteredAge = parseInt(e.target.value, 10);

      // Allow only ages greater than 0 and less than 2004
      if (enteredAge > 0 && enteredAge < 2004) {
        setEmployeeData({ ...employeeData, [e.target.name]: enteredAge });
        setError(""); // Clear error if it was previously set
      } else {
        setError("Please enter a valid age.");
      }
    } else if (e.target.name === "Designation") {
      // Allow only letters and spaces in the Designation field
      const onlyLettersAndSpaces = /^[a-zA-Z\s]*$/;
      if (onlyLettersAndSpaces.test(e.target.value) || e.target.value === "") {
        setEmployeeData({ ...employeeData, [e.target.name]: e.target.value });
        setError(""); // Clear error if it was previously set
      } else {
        setError("Please enter a valid Designation.");
      }
    } else if (e.target.name === "salary") {
      const enteredSalary = parseFloat(e.target.value);
      if (!isNaN(enteredSalary) && enteredSalary >= 0) {
        setEmployeeData({ ...employeeData, [e.target.name]: e.target.value });
      } else if (e.target.value === "") {
        setEmployeeData({ ...employeeData, [e.target.name]: e.target.value });
      }
    
    } else {
      setEmployeeData({ ...employeeData, [e.target.name]: e.target.value });
    }
  };

  const handleSalaryBackspace = () => {
    setEmployeeData({ ...employeeData, salary: salary.slice(0, -1) });
  };

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/employees/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(employeeData)
      });

      if (response.ok) {
        console.log("Employee added successfully!");
        setCurrentPage(3);
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
              id="Name"
              placeholder="Name"
              name="name"
              value={name}
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="Department">Department:</label>
            <select
              className="form-control hover-input"
              id="Department"
              name="Department"
              value={Department}
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
            <label htmlFor="Designation">Designation:</label>
            <input
              type="text"
              className="form-control hover-input"
              id="Designation"
              placeholder="Designation"
              name="Designation"
              value={Designation}
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="salary">Salary:</label>
            <input
              type="text"
              className="form-control hover-input"
              id="salary"
              placeholder="Salary"
              name="salary"
              value={salary}
              onChange={onChange}
              onKeyDown={(e) => { if (e.keyCode === 8) handleSalaryBackspace(); }}
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
            <label htmlFor="gender">Gender:</label>
            <select
              className="form-control hover-input"
              id="gender"
              name="address"
              value={address}
              onChange={onChange}
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
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
          {error && <p className="text-danger">{error}</p>}
        </form>
      )}
      {currentPage === 3 && <ListEmployees darkMode={darkMode} setDarkMode={setDarkMode} />}
    </Fragment>
  );
};

export default InputEmployee;