/**
 * COMP3005 A4 - Main
 * @version 1.0.0
 * @license MIT
 * @author Thomas Wood
 * @description Communicates with a postgresql database to store and retrieve data
 */

// Setup
var pgp = require('pg-promise')();
const sqlCreds = require('./!SQLcreds.js');
const { as } = require('pg-promise');
var db = pgp(sqlCreds);

// Functions
async function getAllStudents() {
    return await db.any('SELECT * FROM students');
}

async function addStudent(first_name, last_name, email, enrollment_date) {
    let result = false;
    let query = 'INSERT INTO students (first_name, last_name, email, enrollment_date) VALUES ($1, $2, $3, CAST($4 AS DATE))';
    await db.none(query, [first_name, last_name, email, enrollment_date]).then(() => {
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

async function updateStudentEmail(student_id, new_email) {
    let result = false;
    let query = 'UPDATE students SET email = $1 WHERE student_id = $2';
    await db.none(query, [new_email, student_id]).then(() => {
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

async function deleteStudent(student_id) {
    let result = false;
    let query = 'DELETE FROM students WHERE student_id = $1';
    await db.none(query, [student_id]).then(() => {
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
async function testGetAllStudents() {
    let result = await getAllStudents();
    console.log("\nPrinting all students...");
    console.log(result);
}

async function testAddStudent() {
    await testGetAllStudents();

    console.log("\nAdding Thomas Wood...");
    let result = await addStudent('Thomas', 'Wood', 'thomaswood4@cmail.carleton.ca', '2020-09-05');

    if (result) {
        console.log("\nThomas Wood added successfully\nPrinting Students...\n");
        await testGetAllStudents();
    }

    console.log("\nAdd a student with an existing email...");
    result = await addStudent('Bad', 'Student', 'john.doe@example.com', '2001-10-23');
    if (!result) {
        console.log("\nStudent not added successfully");
    }
}

async function testUpdateStudentEmail() {
    await testGetAllStudents();

    console.log("\nUpdating Johm Doe's email...");
    let result = await updateStudentEmail(1, 'johndoe@cmail.carleton.ca');

    if (result) {
        console.log("\nJohn Doe's email updated successfully\nPrinting Students...\n");
        await testGetAllStudents();
    }

    console.log("\Update a student with an existing email...");
    result = await updateStudentEmail(1, 'jane.smith@example.com');
    if (!result) {
        console.log("\nStudent's email was not updated successfully");
    }
}

async function testDeleteStudent() {
    await testGetAllStudents();

    console.log("\nDeleting John Doe...");
    let result = await deleteStudent(1);

    if (result) {
        console.log("\John Doe deleted successfully\nPrinting Students...\n");
        await testGetAllStudents();
    }
}

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function main() {
    let loop = true;
    while (loop) {
        console.log("Main Menu:\n1. Get all students\n2. Add a student\n3. Update a student's email\n4. Delete a student\n5. Exit");
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



if (true) {
    main();
}