import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Student() {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8181/")
      .then((res) => {
        console.log("API Response:", res.data);
        setStudents(Array.isArray(res.data) ? res.data : []);
      })
      .catch((err) => console.log(err));
  }, []);

  const deleteStudent = (id) => {
    axios
      .delete(`http://localhost:8181/student/${id}`)
      .then((res) => {
        console.log(res);
        // Refresh students after deletion
        axios
          .get("http://localhost:8181/")
          .then((res) => setStudents(Array.isArray(res.data) ? res.data : []))
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded">
        <Link to="/create" className="btn btn-success">
          Add +
        </Link>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Semester</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(students) && students.length > 0 ? (
              students.map((student) => (
                <tr key={student.ID}>
                  <td>{student.ID}</td>
                  <td>{student.Name}</td>
                  <td>{student.Email}</td>
                  <td>{student.Sem}</td>
                  <td>
                    <Link
                      to={`update/${student.ID}`}
                      className="btn btn-primary"
                    >
                      Update
                    </Link>
                    <Button
                      onClick={() => deleteStudent(student.ID)}
                      className="btn btn-danger"
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No students found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Student;
