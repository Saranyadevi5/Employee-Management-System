import React, { Fragment, useState } from "react";
import ListEmployees from "./ListTodo";

const InputEmployee2 = () => {
  const [showInputForm, setShowInputForm] = useState(true);
  const [employeeData, setEmployeeData] = useState({
    dob: "",
    address: "",
    age: ""
  });

  const { dob, address, age } = employeeData;

  const onChange = (e) => {
    setEmployeeData({ ...employeeData, [e.target.name]: e.target.value });
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
        setShowInputForm(false); // Hide input form
      } else {
        console.error("Failed to add employee.");
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  const onNextButtonClick = () => {
    setShowInputForm(false); // Hide input form
  };

  return (
    <Fragment>
      {showInputForm ? (
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
            <button className="btn btn-success" onClick={onNextButtonClick}>Next</button>
          </div>
        </form>
      ) : (
        <ListEmployees />
      )}
    </Fragment>
  );
};

export default InputEmployee2;
