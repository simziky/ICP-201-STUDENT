// Import necessary dependencies
import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Modal, Form } from "react-bootstrap";

// Define the UpdateStudent component
const UpdateStudent = ({ student, save, remove }) => {
  // Define state variables for form inputs
  const [name, setName] = useState(student.name);
  const [course, setCourse] = useState(student.course);
  const [level, setLevel] = useState(Number(student.level));
  const [cgpa, setCgpa] = useState(Number(student.cgpa));

  // Function to check if all form fields are filled
  const isFormFilled = () => name && course && level && cgpa;

  // Define state variable for modal visibility
  const [show, setShow] = useState(false);

  // Functions to handle modal show and close
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Render the component
  return (
    <>
      {/* Button to open modal for updating student */}
      <Button onClick={handleShow} variant="outline-primary" size="sm">
        Update
      </Button>
      {/* Button to delete the student */}
      <Button
        variant="primary"
        onClick={() => { remove(student.id); }}
        style={{ marginLeft: "15px" }}
      >
        Delete
      </Button>
      {/* Modal for updating student information */}
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Update Student</Modal.Title>
        </Modal.Header>
        <Form>
          <Modal.Body>
            {/* Form fields for updating student details */}
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
              <select
                className="form-control"
                id="exampleFormControlSelect1"
                value={course}
                onChange={(e) => setCourse(e.target.value)}
              >
                <option>accounting</option>
                <option>information tech</option>
                <option>medicine</option>
                <option>engineer</option>
                <option>farming</option>
              </select>
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
              <select
                className="form-control"
                id="exampleFormControlSelect1"
                value={cgpa}
                onChange={(e) => setCgpa(e.target.value)}
              >
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            {/* Buttons to close modal or update student */}
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button
              variant="primary"
              type="submit"
              disabled={!isFormFilled()}
              onClick={() => {
                // Prepare updated student object
                let updatedStudent = {
                  id: student.id,
                  cgpa,
                  name,
                  level,
                  course
                };
                // Call the save function to update the student
                save(updatedStudent);
                handleClose();
              }}
            >
              Update Student
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

// PropTypes for UpdateStudent component
UpdateStudent.propTypes = {
  save: PropTypes.func.isRequired, // save function is required
};

// Export the UpdateStudent component
export default UpdateStudent;
