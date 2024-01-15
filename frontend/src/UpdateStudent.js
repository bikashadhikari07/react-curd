import axios from "axios";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

function UpdateStudent() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [sem, setSem] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  function handleSubmit(event) {
    event.preventDefault();
    console.log("Form submitted"); // Check if this is logged in the console
    axios
      .put("http://localhost:8181/update/" + id, { name, email, sem })
      .then((res) => {
        console.log(res);
        navigate("/");
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="d-flex vh-100 bg-primary justify-content align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <form onSubmit={handleSubmit}>
          <h2>Update Student</h2>
          <div className="mb-2">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              placeholder="Enter name"
              className="form-control"
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="mb-2">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              placeholder="Enter Email"
              className="form-control"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-2">
            <label htmlFor="sem">Semester</label>
            <input
              type="number"
              placeholder="Enter Sem"
              className="form-control"
              onChange={(e) => setSem(e.target.value)}
            />
          </div>

          <Button type="submit" className="btn btn-success">
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
}

export default UpdateStudent;
