// Import necessary dependencies
import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Modal, Form } from "react-bootstrap";

// Define the AddStudent component
const AddStudent = ({ save, download }) => {
  // Define state variables for form inputs
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [level, setLevel] = useState(1);
  const [cgpa, setCgpa] = useState(0);

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
      {/* Button to open modal for adding a new student */}
      <Button onClick={handleShow} variant="dark" className="rounded-pill">
        Add Student
      </Button>

      {/* Button to trigger CSV download */}
      <Button onClick={download} variant="dark" className="rounded-pill">
        Download CSV
      </Button>
      {/* Modal for adding a new student */}
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Student</Modal.Title>
        </Modal.Header>
        <Form>
          <Modal.Body>
            {/* Form fields for adding a new student */}
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
                <option>Select course</option>
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
            {/* Buttons to close modal or add a new student */}
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button
              variant="dark"
              type="submit"
              disabled={!isFormFilled()}
              onClick={() => {
                // Prepare new student object
                let newStudent = {
                  name,
                  course,
                  level,
                  cgpa
                };

                // Call the save function to add the new student
                save(newStudent);
                handleClose();
              }}
            >
              Save Student
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

// PropTypes for AddStudent component
AddStudent.propTypes = {
  save: PropTypes.func.isRequired, // save function is required
};

// Export the AddStudent component
export default AddStudent;
