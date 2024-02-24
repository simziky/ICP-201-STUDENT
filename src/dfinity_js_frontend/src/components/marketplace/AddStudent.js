// AddStudent.js
import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Modal, Form } from "react-bootstrap";

const AddStudent = ({ save }) => {
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [level, setLevel] = useState(1);
  const [cgpa, setCgpa] = useState(0);

  const isFormFilled = () => name && course && level && cgpa;

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = () => {
    save({ name, course, level, cgpa });
    handleClose();
  };

  return (
    <>
      <Button onClick={handleShow} variant="dark" className="rounded-pill">
        Add Student
      </Button>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Student</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="course">
              <Form.Label>Course</Form.Label>
              <Form.Control
                type="text"
                value={course}
                onChange={(e) => setCourse(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="level">
              <Form.Label>Level</Form.Label>
              <Form.Control
                type="number"
                value={level}
                onChange={(e) => setLevel(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="cgpa">
              <Form.Label>CGPA</Form.Label>
              <Form.Control
                type="number"
                value={cgpa}
                onChange={(e) => setCgpa(e.target.value)}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button
              variant="dark"
              type="submit"
              disabled={!isFormFilled()}
              onClick={handleSubmit}
            >
              Save Student
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

AddStudent.propTypes = {
  save: PropTypes.func.isRequired,
};

export default AddStudent;
