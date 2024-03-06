// Function to create a new student
export async function createStudent(Student) {
  // Call the createStudent function from the student canister
  return window.canister.student.createStudent(Student);
}

// Function to update an existing student
export async function updateStudent(Student) {
  // Call the updateStudent function from the student canister
  return window.canister.student.updateStudent(Student);
}

// Function to delete a student record
export async function deleteStudentRecord(Student) {
  // Call the deleteStudentRecord function from the student canister
  return window.canister.student.deleteStudentRecord(Student.id);
}

// Function to retrieve all students
export async function getAllStudents() {
  try {
    // Attempt to retrieve all students from the student canister
    return await window.canister.student.getAllStudents();
  } catch (err) {
    // Handle errors, particularly if the user's session has expired
    if (err.name === "AgentHTTPResponseError") {
      // Logout the user if session has expired
      const authClient = window.auth.client;
      await authClient.logout();
    }
    // Return an empty array if there's an error
    return [];
  }
}
