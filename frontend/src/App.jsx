import React, { Fragment, useState, useEffect } from "react";
import "./App.css";

//components
import InputTodo from "./components/InputTodo";
import ListTodos from "./components/ListTodo";

function App() {
  const [darkMode, setDarkMode] = useState(true);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    document.body.style.backgroundColor = darkMode ? "#333" : "#fff";
    document.body.style.color = darkMode ? "#fff" : "#333";
  }, [darkMode]);

  return (
    <Fragment>
      <div className="container">
        <InputTodo />
       {/* <ListTodos darkMode={darkMode} setDarkMode={setDarkMode}/> */}
      </div>
    </Fragment>
  );
}

export default App;