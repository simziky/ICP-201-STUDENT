// StudentList.js
import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Student from "./Student";
import Loader from "../utils/Loader";
import { getAllStudents } from "../../utils/marketplace";

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchStudents = async () => {
      setLoading(true);
      try {
        const data = await getAllStudents();
        setStudents(data);
      } catch (error) {
        console.error("Error fetching students:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  return (
    <Container>
      <h1 className="mt-4 mb-4">Student List</h1>
      {loading ? (
        <Loader />
      ) : (
        <Row xs={1} sm={2} md={3} lg={4} xl={5} className="g-4">
          {students.map((student) => (
            <Col key={student.id}>
              <Student student={student} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default StudentList;
