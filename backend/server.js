const express = require("express");
const cors = require("cors");
const mysql = require("mysql");

const app = express();
app.use(express.json());
const port = 8181;

app.use(cors());

const db = mysql.createPool({
  connectionLimit: 10, // Adjust according to your needs
  host: "localhost",
  user: "root",
  password: "",
  database: "react_curd",
});

app.post("/create", (req, res) => {
  console.log("Received POST request:", req.body);
  const sql = "INSERT INTO students (`NAME`, `EMAIL`, `SEM`) VALUES (?, ?, ?)";

  const values = [req.body.name, req.body.email, req.body.sem];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error executing SQL query:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    console.log("Student added successfully");
    return res
      .status(200)
      .json({ message: "Student added successfully", result });
  });
});

app.put("/update/:id", (req, res) => {
  console.log("Received UPDATE request:", req.body);
  const sql = "UPDATE students SET NAME = ?, EMAIL = ?, SEM = ? WHERE ID = ?";

  const values = [req.body.name, req.body.email, req.body.sem];
  const id = req.params.id;

  db.query(sql, [...values, id], (err, result) => {
    if (err) {
      console.error("Error executing SQL query:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    console.log("Student updated successfully");
    return res
      .status(200)
      .json({ message: "Student updated successfully", result });
  });
});

app.delete("/student/:id", (req, res) => {
  const sql = "DELETE FROM students WHERE ID = ?";

  const id = req.params.id;

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Error executing SQL query:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    console.log("Student deleted successfully");
    return res
      .status(200)
      .json({ message: "Student deleted successfully", result });
  });
});

app.get("/", (req, res) => {
  const sql = "SELECT * FROM students";
  db.query(sql, (err, data) => {
    if (err) {
      console.error("Error executing SQL query:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    return res.json(data);
  });
});

app.listen(port, function () {
  console.log("Listening on port " + port);
});
