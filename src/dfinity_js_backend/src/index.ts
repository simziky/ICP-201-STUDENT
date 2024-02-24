import {
    Canister, ic, Err, nat64, Ok, Principal, query, Record, Result, StableBTreeMap, text, update, Variant, Vec, None, Some
} from 'azle';
import { v4 as uuidv4 } from 'uuid';

// Define possible course types
const COURSE_TYPES = ["accounting", "information tech", "medicine", "engineer", "farming"];

// Define the structure of a Student record
const Student = Record({
    id: text,
    name: text,
    course: text,
    level: nat64,
    cgpa: nat64,
    createdAt: nat64,
    lecturerId: Principal
});

// Define the payload for updating a Student
const StudentPayload = Record({
    name: text,
    course: text,
    level: nat64,
    cgpa: nat64,
});

//Deffine the payload for updating the CGPA
const CgpaPayload = Record({
    cgpa: nat64, 
});

// Define possible error variants
const Errors = Variant({
    UserDoesNotExist: text,
    CourseDoesNotExist: text
});

// Initialize a stable BTreeMap to store Student records
const students = StableBTreeMap(0, text, Student);

// Export the Canister with various functions
export default Canister({
    /**
     * Creates a new Student Record.
     * @param name - Name for the student.
     * @returns the newly created student instance.
     */
    createStudent: update([text, text, nat64, nat64], Result(Student, Errors), async (name, course, level, cgpa) => {
        const id = uuidv4();

        // Validate the course type
        if (!COURSE_TYPES.includes(course.toLowerCase())) {
            return Err({ CourseDoesNotExist: `'${course}' is not a viable course, please select one of: ${COURSE_TYPES}` });
        }

        const user = {
            id,
            name,
            course,
            level,
            cgpa,
            createdAt: ic.time(),
            lecturerId: ic.caller()
        };

        students.insert(id, user);

        return Ok(user);
    }),

    /**
     * Retrieve all students.
     * @returns a Result containing a vector of students or an error if no students found.
     */
    getAllStudents: query([], Result(Vec(Student), Errors), () => {
        const allStudents = students.values();

        // You can handle the case where there are no students found
        if (allStudents.length === 0) {
            return Err({ UserDoesNotExist: 'No students found' });
        }

        return Ok(allStudents);
    }),

    /**
     * Update a student record by ID.
     * @param id - ID of the student.
     * @param payload - Payload containing fields to update.
     * @returns the updated student record or an error if the student is not found or the course is invalid.
     */
    updateStudent: update([text, StudentPayload], Result(Student, Errors), async (id, payload) => {
        const studentOpt = students.get(id);
        if ("None" in studentOpt) {
            return Err({ UserDoesNotExist: `couldn't update a student with id=${id}. Student not found` });
        }
        const student = studentOpt.Some;

        // Validate the course type
        if (payload.course && !COURSE_TYPES.includes(payload.course.toLowerCase())) {
            return Err({ CourseDoesNotExist: `'${payload.course}' is not a viable course, please select one of: ${COURSE_TYPES}` });
        }

        const updatedStudent = student.map((student: any) => ({
            ...student,
            ...payload,
            updatedAt: Some(ic.time())
        }));

        students.insert(id, updatedStudent);

        return Ok(updatedStudent);
    }),

    /**
     * Retrieve a student record by ID.
     * @param id - ID of the student.
     * @returns the student record or an error if the student is not found.
     */
    getStudentById: query([text], Result(Student, Errors), (id) => {
        const studentOpt = students.get(id);
        if ("None" in studentOpt) {
            return Err({ UserDoesNotExist: `Student with ID ${id} not found` });
        }
        const user = studentOpt.Some;

        return Ok(user);
    }),

    /**
     * Delete a student record by ID.
     * @param id - ID of the student.
     * @returns the deleted instance of the student or an error msg if the student ID doesn't exist.
     */
    deleteStudentRecord: update([text], Result(Student, Errors), (id) => {
        const deletedMessage = students.remove(id);
        if ("None" in deletedMessage) {
            return Err({ UserDoesNotExist: `Couldn't delete a student with id=${id}. Student not found` });
        }
        return Ok(deletedMessage.Some);
    }),

    // Update the grade of a student identified by ID
    updateGrade: update([text, CgpaPayload], Result(Student, Errors), async (id, payload) => {
        const studentOpt = students.get(id);
        if ("None" in studentOpt) {
            return Err({ UserDoesNotExist: `Couldn't update a student with id=${id}. Student not found` });
        }
        const student = studentOpt.Some;

        const updatedGrade = student.map((student: any) => ({
            ...student,
            cgpa: payload.cgpa,
            updatedAt: Some(ic.time())
        }));

        students.insert(id, updatedGrade);

        return Ok(updatedGrade);
    }),

    // Get the top-performing students based on CGPA
    getTopStudents: query([nat64], Result(Vec(Student), Errors), (count) => {
        const allStudents = students.values();

        const sortedStudents = allStudents.sort((a, b) => b.cgpa - a.cgpa);

        const topStudents = sortedStudents.slice(0, Number(count));

        if (topStudents.length === 0) {
            return Err({ UserDoesNotExist: 'No top-performing students found' });
        }

        return Ok(topStudents);
    }),
});
