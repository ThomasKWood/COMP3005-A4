/**
 * COMP3005 A4 - Main
 * @version 1.0.0
 * @license MIT
 * @author Thomas Wood
 * @description Communicates with a postgresql database to store and retrieve data
 */

// Setup
var pgp = require('pg-promise')();  // Library for connecting to postgresql databases
const sqlCreds = require('./!SQLcreds.js'); // Contains the credentials for connecting to the database
var db = pgp(sqlCreds); // Database object for connecting to the database

// Functions
/**
 * Retrieves all students from the database.
 * @returns {Promise<Array>} A promise that resolves to an array of student objects.
 */
async function getAllStudents() {
    return await db.any('SELECT * FROM students'); // any is used because the query returns multiple rows
}

/**
 * Inserts a new student into the database.
 * @async
 * @function addStudent
 * @param {string} first_name - The first name of the student.
 * @param {string} last_name - The last name of the student.
 * @param {string} email - The email address of the student.
 * @param {string} enrollment_date - The enrollment date of the student in the format 'YYYY-MM-DD'.
 * @returns {boolean} - Returns true if the student was inserted successfully, false otherwise.
 */
async function addStudent(first_name, last_name, email, enrollment_date) {
    let result = false;
    let query = 'INSERT INTO students (first_name, last_name, email, enrollment_date) VALUES ($1, $2, $3, CAST($4 AS DATE))'; // CAST is used to convert the string to a date
    await db.none(query, [first_name, last_name, email, enrollment_date]).then(() => { // none is used because the query does not return any rows
        console.log('Student inserted successfully');
        result = true;
        return true;
      })
      .catch(error => {
        console.log('Error inserting Student: ', error);
        return false;
    });
    return result;
}

/**
 * Updates the email of a student with the given student_id.
 * @async
 * @function updateStudentEmail
 * @param {number} student_id - The ID of the student to update.
 * @param {string} new_email - The new email to set for the student.
 * @returns {Promise<boolean>} - A Promise that resolves to true if the email was updated successfully, false otherwise.
 */
async function updateStudentEmail(student_id, new_email) {
    let result = false;
    let query = 'UPDATE students SET email = $1 WHERE student_id = $2'; 
    await db.none(query, [new_email, student_id]).then(() => { // none is used because the query does not return any rows
        console.log('Student email updated successfully');
        result = true;
        return true;
      })
      .catch(error => {
        console.log('Error updating Student email: ', error);
        return false;
    });
    return result;
}

/**
 * Deletes a student from the database.
 * @async
 * @function deleteStudent
 * @param {number} student_id - The ID of the student to delete.
 * @returns {Promise<boolean>} - A Promise that resolves to true if the student was deleted successfully, or false otherwise.
 */
async function deleteStudent(student_id) {
    let result = false;
    let query = 'DELETE FROM students WHERE student_id = $1';
    await db.one(query, [student_id]).then(() => { // many is used because it will trow an error if it delete more than 1 record
        console.log('Student deleted successfully');
        result = true;
        return true;
      })
      .catch(error => {
        console.log('Error deleting Student: ', error);
        return false;
    });
    return result;
}


// Tester Functions
/**
 * Calls the getAllStudents function and logs the result to the console.
 */
async function testGetAllStudents() {
    // get all students
    let result = await getAllStudents();
    // print all students
    console.log("\nPrinting all students...");
    console.log(result);
}

/**
 * Tests the addStudent function by adding a new student and verifying that it was added successfully.
 * Also tests that adding a student with an existing email fails.
 */
async function testAddStudent() {
    // print all students before we modify anything
    await testGetAllStudents();

    // add a student
    console.log("\nAdding Thomas Wood...");
    let result = await addStudent('Thomas', 'Wood', 'thomaswood4@cmail.carleton.ca', '2020-09-05');

    // print all students after we modify the db
    if (result) {
        console.log("\nThomas Wood added successfully\nPrinting Students...\n");
        await testGetAllStudents();
    }

    // try to add a student with an existing email
    console.log("\nAdd a student with an existing email...");
    result = await addStudent('Bad', 'Student', 'john.doe@example.com', '2001-10-23');
    if (!result) {
        console.log("\nStudent not added successfully");
    }
}

/**
 * Tests the updateStudentEmail function by updating John Doe's email to 'johndoe@cmail.carleton.ca'
 * and then attempting to update it to an existing email. Prints all students before and after the updates.
 */
async function testUpdateStudentEmail() {
    // print all students before we modify anything
    await testGetAllStudents();

    // update a student's email
    console.log("\nUpdating Johm Doe's email...");
    let result = await updateStudentEmail(1, 'johndoe@cmail.carleton.ca');

    // print all students after we modify the db
    if (result) {
        console.log("\nJohn Doe's email updated successfully\nPrinting Students...\n");
        await testGetAllStudents();
    }

    // try to update a student's email to an existing email
    console.log("\Update a student with an existing email...");
    result = await updateStudentEmail(1, 'jane.smith@example.com');
    if (!result) {
        console.log("\nStudent's email was not updated successfully");
    }
}

/**
 * Deletes a student and tests if the deletion was successful by printing all students.
 */
async function testDeleteStudent() {
    // print all students before we modify anything
    await testGetAllStudents();

    // delete a student
    console.log("\nDeleting John Doe...");
    let result = await deleteStudent(1);

    // print all students after we modify the db
    if (result) {
        console.log("\John Doe deleted successfully\nPrinting Students...\n");
        await testGetAllStudents();
    }
}

const readline = require('readline');
/**
 * Readline interface for user input/output.
 * @type {readline.Interface}
 */
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

/**
 * Runs the main menu loop for the student db program.
 */
async function main() {
    let loop = true;
    console.log("Main Menu:\n1. Get all students\n2. Add a student\n3. Update a student's email\n4. Delete a student\n5. Exit");
    while (loop) {
        await new Promise((resolve, reject) => {
            rl.question('Enter a number: ', (input) => {
                switch (input) {
                    case '1':
                        testGetAllStudents();
                        break;
                    case '2':
                        testAddStudent();
                        break;
                    case '3':
                        testUpdateStudentEmail();
                        break;
                    case '4':
                        testDeleteStudent();
                        break;
                    case '5':
                        loop = false;
                        break;
                    default:
                        console.log("Invalid input");
                        break;
                }
                resolve();
            });
        });
    }
    rl.close();
}

main();