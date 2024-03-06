// Import necessary dependencies
import React, { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import { Container, Row, Alert } from "react-bootstrap";
import Student from "./Student";
import Loader from "../utils/Loader";
import {
  getAllStudents,
  createStudent,
  updateStudent,
  deleteStudentRecord
} from "../../utils/student";
import AddStudent from "./AddStudent";
import { NotificationSuccess, NotificationError, NotificationDanger } from "../utils/Notifications";

// Define the StudentList component
const StudentList = () => {
  // Define state variables
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to fetch students from the backend
  const fetchStudents = useCallback(async () => {
    try {
      setLoading(true);
      setStudents(await getAllStudents());
    } catch (error) {
      console.log({ error });
    } finally {
      setLoading(false);
    }
  });

  // Function to handle creating a new student
  const handleSaveStudent = async (data) => {
    try {
      setLoading(true);
      data.level = parseInt(data.level, 10);
      data.cgpa = parseInt(data.cgpa, 10);

      // Call the createStudent function and handle the response
      createStudent(data)
        .then((resp) => {
          // Update the list of students after successful creation
          getAllStudents()
            .then((updatedStudents) => {
              setStudents(updatedStudents);
              toast(<NotificationSuccess text="Student added successfully." />);
            })
            .catch((error) => {
              console.error("Error fetching updated student list:", error);
              toast(<NotificationError text="Failed to fetch updated student list." />);
            });
        })
        .catch((error) => {
          console.error("Error creating student:", error);
          toast(<NotificationError text="Failed to create a student." />);
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (error) {
      console.error("Error creating student:", error);
      toast(<NotificationError text="Failed to create a student." />);
      setLoading(false);
    }
  };

  // Function to update student data
  const update = async (data) => {
    try {
      setLoading(true);
      data.level = parseInt(data.level, 10);
      data.cgpa = parseFloat(data.cgpa);

      await updateStudent(data);
      fetchStudents();
      toast(<NotificationSuccess text="Student record updated successfully." />);
    } catch (error) {
      console.error("Error updating student record:", error);
      toast(<NotificationError text="Failed to update student record." />);
    } finally {
      setLoading(false);
    }
  };

  // Function to delete a student record
  const remove = async (id) => {
    try {
      toast(<NotificationDanger text="Deleting....." />);

      deleteStudentRecord({ id }).then((resp) => {
        fetchStudents();
        toast(<NotificationSuccess text="Student record Deleted successfully." />);
      });
    } catch (error) {
      console.log({ error });
      toast(<NotificationError text="Failed to delete student record." />);
    } finally {
      setLoading(false);
    }
  };

  // Fetch students data when the component mounts
  useEffect(() => {
    fetchStudents();
  }, []);

 
  // Render loader while loading data
  if (loading) {
    return <Loader />;
  }

  // Render error message if there is an error
  if (error) {
    return (
      <Container>
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  // Function to download students data in CSV format
  function downloadCSV() {
    const csvContent = "data:text/csv;charset=utf-8," + students.map(student => Object.values(student).join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "students.csv");
    document.body.appendChild(link);
    link.click();
  }

  // Render StudentList component
  return (
    <>
      {!loading ? (
        <Container>
          <div>
            <AddStudent save={handleSaveStudent} download={downloadCSV} />
          </div>
          <div>
            <h1 className="mt-4 mb-4">Student List</h1>
            <Row xs={1} sm={2} md={3} lg={4} xl={5} className="g-4">
              {students.map((student, index) => (
                <Student
                  key={index}
                  student={{ ...student }}
                  update={update}
                  remove={remove}
                />
              ))}
            </Row>
          </div>
        </Container>
      ) : (
        <Loader />
      )}
    </>
  );
};

// Export the StudentList component
export default StudentList;
