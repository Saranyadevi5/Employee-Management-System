import React, { Fragment, useEffect, useState } from "react";
import EditEmployee from "./EditEmployee";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";

const ListEmployees = ({ darkMode, setDarkMode }) => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isTableView, setIsTableView] = useState(true);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  

  const deleteEmployee = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/employees/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setEmployees(employees.filter((employee) => employee.emp_id !== id));
      } else {
        console.error("Failed to delete employee.");
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  const getEmployees = async () => {
    try {
      const response = await fetch("http://localhost:5000/employees");
      const jsonData = await response.json();
      console.log(jsonData);
      setEmployees(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getEmployees();
  }, []);

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
  };

  const cellStyle = {
    padding: "15px",
    textAlign: "left",
  };
  const buttonCellStyle = {
    ...cellStyle,
    textAlign: "center",
  };

  const headerStyle = {
    ...cellStyle,
    backgroundColor: "#4CAF50",
    color: "white",
  };

  return (
    <Fragment>
      <div className={`container mt-5 ${darkMode ? "dark-mode" : ""}`}>
        <button onClick={toggleDarkMode}>
          <FontAwesomeIcon icon={darkMode ? faSun : faMoon} />
        </button>
        <div className="d-flex flex-column align-items-center">
          <input
            type="text"
            className={`form-control w-50 mb-3 ${isEditing ? "" : "hover-input"}`}
            placeholder="Search by name"
            onChange={(event) => {
              setSearchTerm(event.target.value);
            }}
          />
        </div>
        <div className="row justify-content-center mt-3">
          {isTableView && (
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={headerStyle}>Name</th>
                  <th style={headerStyle}>Department</th>
                  <th style={headerStyle}>Designation</th>
                  <th style={headerStyle}>Age</th>
                  <th style={headerStyle}>DOB</th>
                  <th style={headerStyle}>Gender</th>
                  <th style={headerStyle}>Salary</th>
                  <th style={headerStyle}>Edit Data</th>
                  <th style={headerStyle}>Delete Data</th>
                </tr>
              </thead>
              <tbody>
                {employees
                  .filter((employee) => {
                    if (searchTerm === "") {
                      return employee;
                    } else if (
                      employee.name
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())
                    ) {
                      return employee;
                    }
                  })
                  .map((employee) => (
                    <tr key={employee.emp_id}>
                      <td>{employee.name}</td>
                      <td>{employee.department}</td>
                      <td>{employee.designation}</td>
                      <td>{employee.age}</td>
                      <td>{employee.dob}</td>
                      <td>{employee.address}</td>
                      <td>{employee.salary}</td>
                      <td style={buttonCellStyle}>
                        <EditEmployee
                          employee={employee}
                          onClick={() => {
                            setIsEditing(true);
                            setIsTableView(true);
                          }}
                        />
                      </td>
                      <td style={buttonCellStyle}>
                        <button
                          className="btn btn-danger ml-2 hover-button"
                          onClick={() => deleteEmployee(employee.emp_id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default ListEmployees;
