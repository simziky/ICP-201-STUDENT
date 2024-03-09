import {
    Canister, ic, Err, nat64, Ok, Principal, query, Record, Result, StableBTreeMap, text, update, Variant, Vec
} from 'azle';
import { v4 as uuidv4 } from 'uuid';

// Define possible course types
const COURSE_TYPES = ["accounting", "information tech", "medicine", "engineer", "farming"];

// Define the structure of a Student record with optional fields for new student creation
const Student = Record({
    id: text,
    name: text,
    course: text,
    level: nat64,
    cgpa: nat64,
    createdAt: nat64,
    lecturerId: Principal,
    // Optional fields for createdAt and lecturerId to be used during creation
    updatedAt: nat64.optional()
});

// Define the payload for updating a Student
const StudentPayload = Record({
    id: text,
    name: text,
    course: text,
    level: nat64,
    cgpa: nat64,
});

// Define the payload for updating the CGPA
const CgpaPayload = Record({
    cgpa: nat64,
});

// Define possible error variants
const Errors = Variant({
    UserDoesNotExist: text,
    CourseDoesNotExist: text,
    NoStudentsFound: text // New Error for getTopStudents
});

// Initialize a stable BTreeMap to store Student records
const students = StableBTreeMap(0, text, Student);

// Export the Canister with various functions
export default Canister({
    /**
     * Creates a new Student Record.
     */
    createStudent: update([Student], Result(Student, Errors), (payload) => {
        if (!COURSE_TYPES.includes(payload.course.toLowerCase())) {
            return Err({ CourseDoesNotExist: `'${payload.course}' is not a viable course, please select one of: ${COURSE_TYPES.join(", ")}` });
        }

        const user = { 
            id: uuidv4(), 
            createdAt: ic.time(), 
            lecturerId: ic.caller(), 
            ...payload 
        };
        students.insert(user.id, user);
        return Ok(user);
    }),

    /**
     * Retrieve all students.
     */
    getAllStudents: query([], Vec(Student), () => {
        return students.values();
    }),

    /**
     * Update a student record by ID.
     */
    updateStudent: update([StudentPayload], Result(Student, Errors), (payload) => {
        const studentOpt = students.get(payload.id);

        if ("None" in studentOpt) {
            return Err({ UserDoesNotExist: `Student with ID ${payload.id} not found` });
        }

        if (!COURSE_TYPES.includes(payload.course.toLowerCase())) {
            return Err({ CourseDoesNotExist: `'${payload.course}' is not a viable course, please select one of: ${COURSE_TYPES.join(", ")}` });
        }

        const student = studentOpt.Some;
        const updatedStudent = { ...student, ...payload, updatedAt: ic.time() };

        students.insert(student.id, updatedStudent);

        return Ok(updatedStudent);
    }),

    /**
     * Delete a student record by ID.
     */
    deleteStudentRecord: update([text], Result(Student, Errors), (id) => {
        const deletedStudent = students.remove(id);
        if ("None" in deletedStudent) {
            return Err({ UserDoesNotExist: `Couldn't delete a student with id=${id}. Student not found` });
        }

        return Ok(deletedStudent.Some);
    }),

    /**
     * Update the grade of a student identified by ID.
     */
    updateGrade: update([text, CgpaPayload], Result(Student, Errors), (id, payload) => {
        const studentOpt = students.get(id);
        if ("None" in studentOpt) {
            return Err({ UserDoesNotExist: `Couldn't update a student with id=${id}. Student not found` });
        }
        const student = studentOpt.Some;

        const updatedStudent = {
            ...student,
            cgpa: payload.cgpa,
            updatedAt: ic.time()
        };

        students.insert(id, updatedStudent);

        return Ok(updatedStudent);
    }),

    /**
     * Get the top-performing students based on CGPA.
     */
    getTopStudents: query([nat64], Result(Vec(Student), Errors), (count) => {
        const allStudents = students.values();

        const sortedStudents = allStudents.sort((a, b) => b.cgpa - a.cgpa);

        const topStudents = sortedStudents.slice(0, Number(count));

        if (topStudents.length === 0) {
            return Err({ NoStudentsFound: 'No top-performing students found' });
        }

        return Ok(topStudents);
    }),
});
