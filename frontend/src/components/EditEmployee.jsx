import React, { Fragment, useState, useEffect } from "react";

const EditEmployee = ({ employee }) => {
  const [employeeData, setEmployeeData] = useState({
    Name: "",
    Department: "",
    Designation: "",
    salary: "",
    dob: "",
    address: "",
    age: "",
    gender: ""
  });

  // When the component mounts, set the employee data
  useEffect(() => {
    setEmployeeData({
      Name: employee.Name,
      Department: employee.Department,
      Designation: employee.Designation,
      salary: employee.salary,
      dob: employee.dob,
      address: employee.address,
      age: employee.age,
      gender: employee.gender
    });
  }, [employee]);

  const onChange = (e) => {
    setEmployeeData({ ...employeeData, [e.target.name]: e.target.value });
  };

  const updateEmployee = async (e) => {
    e.preventDefault();
    try {
      const body = { ...employeeData };
      console.log(body);
      const response = await fetch(
        `https://employee-management-system-g41z.onrender.com/employees/${employee.emp_id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );

      window.location = "/list";
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <button
        type="button"
        className="btn btn-warning hover-button"
        data-toggle="modal"
        data-target={`#id${employee.emp_id}`}
      >
        Edit 
      </button>
      <div className="M1">
        <div className="modal" id={`id${employee.emp_id}`}>
          <div className="modal-dialog">
            <div className="modal-content bg-dark text-white">
              <div className="modal-header">
                <h4 className="modal-title">Edit Employee Details</h4>
                <button
                  type="button"
                  className="close text-white"
                  data-dismiss="modal"
                >
                  &times;
                </button>
              </div>

              <div className="modal-body">
                <div className="card1 bg-secondary text-white">
                  <div className="card-body">
                    <label>Name:</label>
                    <input
                      type="text"
                      className="form-control"
                      name="Name"
                      value={employeeData.Name}
                      onChange={onChange}
                    />
                    <label>Department:</label>
                    <select
                      className="form-control hover-input"
                      name="Department"
                      value={employeeData.Department}
                      onChange={onChange}
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

                    <label>Designation:</label>
                    <input
                      type="text"
                      className="form-control"
                      name="Designation"
                      value={employeeData.Designation}
                      onChange={onChange}
                    />

                    <label>Age</label>
                    <input
                      type="integer"
                      className="form-control"
                      name="age"
                      value={employeeData.age}
                      onChange={onChange}
                    />

                    <label>DOB:</label>
                    <input
                      type="date"
                      className="form-control"
                      name="dob"
                      value={employeeData.dob}
                      onChange={onChange}
                    />
                    <label>Salary</label>
                    <input
                      type="integer"
                      className="form-control"
                      name="salary"
                      value={employeeData.salary}
                      onChange={onChange}
                    />

                    <label>Gender:</label>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="gender"
                        id="genderMale"
                        value="Male"
                        checked={employeeData.gender === 'Male'}
                        onChange={onChange}
                      />
                      <label className="form-check-label" htmlFor="genderMale">
                        Male
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="gender"
                        id="genderFemale"
                        value="Female"
                        checked={employeeData.gender === 'Female'}
                        onChange={onChange}
                      />
                      <label className="form-check-label" htmlFor="genderFemale">
                        Female
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="gender"
                        id="genderOther"
                        value="Other"
                        checked={employeeData.gender === 'Other'}
                        onChange={onChange}
                      />
                      <label className="form-check-label" htmlFor="genderOther">
                        Other
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="gender"
                        id="genderNA"
                        value="N/A"
                        checked={employeeData.gender === 'N/A'}
                        onChange={onChange}
                      />
                      <label className="form-check-label" htmlFor="genderNA">
                        Not to specify
                      </label>
                    </div>
                    
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-warning"
                  data-dismiss="modal"
                  onClick={updateEmployee}
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  data-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default EditEmployee;
