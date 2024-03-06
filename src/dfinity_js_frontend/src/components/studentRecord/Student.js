// Student.js
import React from "react";
import PropTypes from "prop-types";
import { Card, Col } from "react-bootstrap";
import UpdateStudent from "./updateStudent";


const Student = ({ student, update, remove }) => {
  const {id, name, course, level, cgpa } = student;


  

  return (
    <Col key={id}>
    <Card>
      <Card.Body>
        <Card.Title><span className="text-secondary">Name:</span> {name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted"><span className="text-secondary">Course:</span> {course}</Card.Subtitle>
        <Card.Text>
          Level: {level.toString()} | CGPA: {cgpa.toString()}
        </Card.Text>
        <UpdateStudent save={update} student={student} remove={remove} />
      </Card.Body>
    </Card>
    </Col>
  );
};

Student.propTypes = {
  student: PropTypes.object.isRequired,
};

export default Student;
