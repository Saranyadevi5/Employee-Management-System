import React, { Fragment, useState } from "react";

const EditEmployee = ({ employee }) => {
  const [name, setName] = useState(employee.name);
  const [department, setDepartment] = useState(employee.department);
  const [designation, setDesignation] = useState(employee.designation);
  const [salary, setSalary] = useState(employee.salary);
  const [dob, setDob] = useState(employee.dob);
  const [address, setAddress] = useState(employee.address);
  const [age, setAge ] = useState(employee.age);
  const [employeeData, setEmployeeData] = useState({
    name: "",
    department: "",
    designation: "",
    salary: "",
    dob: "",
    address: "",
    age: ""
  });

  const onChange = (e) => {
    setEmployeeData({ ...employeeData, [e.target.name]: e.target.value });
  };


  const updateEmployee = async (e) => {
    e.preventDefault();
    try {
      const body = { name, department, designation, salary, dob, address, age };
      const response = await fetch(
        `http://localhost:5000/employees/${employee.emp_id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );

      window.location = "/";
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
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <label>Department:</label>
                    <select
          className="form-control hover-input"
          name="department"
          value={department}
          onChange={onChange}
        >
          <option value="">Select  Department</option>
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
                      value={designation}
                      onChange={(e) => setDesignation(e.target.value)}
                    />

                    <label>Age</label>
                    <input
                      type="integer"
                      className="form-control"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                    />

                    <label>DOB:</label>
                    <input
                      type="date"
                      className="form-control"
                      value={dob}
                      onChange={(e) => setDob(e.target.value)}
                    />
                    <label>Salary</label>
                    <input
                      type="integer"
                      className="form-control"
                      value={salary}
                      onChange={(e) => setSalary(e.target.value)}
                    />

                    <label>Gender:</label>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="gender"
                        id="genderMale"
                        value="Male"
                        checked={address === 'Male'}
                        onChange={(e) => setAddress(e.target.value)}
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
                        checked={address === 'Female'}
                        onChange={(e) => setAddress(e.target.value)}
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
                        checked={address === 'Other'}
                        onChange={(e) => setAddress(e.target.value)}
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
                        checked={address === 'N/A'}
                        onChange={(e) => setAddress(e.target.value)}
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
                  onClick={(e) => updateEmployee(e)}
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
