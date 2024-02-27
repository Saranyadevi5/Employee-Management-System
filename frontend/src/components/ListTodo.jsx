import React, { Fragment, useEffect, useState } from "react";
import EditEmployee from "./EditEmployee";
import { useNavigate } from "react-router-dom";

const ListEmployees = ({ darkMode, setDarkMode }) => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isTableView, setIsTableView] = useState(true);

  const navigate = useNavigate(); // Hook to navigate to different routes

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const deleteEmployee = async (id) => {
    try {
      const response = await fetch(`https://employee-management-system-g41z.onrender.com/employees/${id}`, {
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
      const response = await fetch("https://employee-management-system-g41z.onrender.com/employees");
      const jsonData = await response.json();
      setEmployees(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getEmployees();
  }, []);

  return (
    <Fragment>
      <div className="container mt-5">
        <div className="row justify-content-center mb-3">
          <div className="col-md-6 mb-2 mb-md-0">
            <input
              type="text"
              className={`form-control ${isEditing ? "" : "hover-input"}`}
              placeholder="Search by name"
              value={searchTerm}
              onChange={(event) => {
                setSearchTerm(event.target.value);
              }}
            />
          </div>
          <div className="col-md-6 d-flex justify-content-md-end">
            <button
              className="btn btn-outline-secondary"
              onClick={() => navigate("/")}
            >
              ADD
            </button>
          </div>
        </div>
        <div className="row justify-content-center">
          {isTableView && (
            <table className="table">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Department</th>
                  <th scope="col">Designation</th>
                  <th scope="col">Age</th>
                  <th scope="col">DOB</th>
                  <th scope="col">Gender</th>
                  <th scope="col">Salary</th>
                  <th scope="col">Edit Data</th>
                  <th scope="col">Delete Data</th>
                </tr>
              </thead>
              <tbody>
                {employees
                  .filter((employee) => {
                    if (searchTerm === "") {
                      return true; // Include all employees if search term is empty
                    } else if (
                      employee.Name.toLowerCase().includes(searchTerm.toLowerCase())
                    ) {
                      return true; // Include employee if name matches search term
                    }
                    return false; // Exclude employee if name does not match search term
                  })
                  .map((employee) => (
                    <tr key={employee.emp_id}>
                      <td>{employee.Name}</td>
                      <td>{employee.Department}</td>
                      <td>{employee.Designation}</td>
                      <td>{employee.age}</td>
                      <td>{employee.dob}</td>
                      <td>{employee.address}</td>
                      <td>{employee.salary}</td>
                      <td>
                        <EditEmployee
                          employee={employee}
                          onClick={() => {
                            setIsEditing(true);
                            setIsTableView(true);
                          }}
                        />
                      </td>
                      <td>
                        <button
                          className="btn btn-danger hover-button"
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
