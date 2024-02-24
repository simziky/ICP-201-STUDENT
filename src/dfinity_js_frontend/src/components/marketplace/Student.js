// Student.js
import React from "react";
import PropTypes from "prop-types";
import { Card, Button } from "react-bootstrap";

const Student = ({ student }) => {
  const { name, course, level, cgpa } = student;

  return (
    <Card>
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{course}</Card.Subtitle>
        <Card.Text>
          Level: {level} | CGPA: {cgpa}
        </Card.Text>
        <Button variant="primary">View Details</Button>
      </Card.Body>
    </Card>
  );
};

Student.propTypes = {
  student: PropTypes.object.isRequired,
};

export default Student;
