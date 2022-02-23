import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState();

  useEffect(() => {
    axios("http://localhost:5000/api/courses/1")
      .then((response) => setData(response.data.course))
      .catch((error) => console.log("Error fetching and parsing data", error));
  }, []);
  return (
    <div className="App">
      {data && (
        <header className="App-header">
          <p>{data.title}</p>
          <h6>{data.description}</h6>
        </header>
      )}
    </div>
  );
}

export default App;
