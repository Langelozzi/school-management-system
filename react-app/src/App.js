import React, { useEffect } from 'react';
import { getAllStudents } from './service/studentService';

function App() {
  const [students, setStudents] = React.useState([]);

  useEffect(() => {
    async function fetchStudents() {
      let res = await getAllStudents();
      setStudents(res);
    }
    fetchStudents();
  }, []);

  function logStudents() {
    console.log(students);
  }

  return (
    <div className="App">
      <button onClick={logStudents}>Get students</button>
    </div>
  );
}

export default App;
