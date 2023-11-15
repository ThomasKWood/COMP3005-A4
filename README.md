# COMP3005-A4
**Course**: COMP3005 - Database Management Systems\
**Assignment**: Assignment 4\
**Due Date**: 2023-11-23\
**Author**: Thomas Wood

## Demonstration Video
[![Video_Title](https://img.youtube.com/vi/HVvpraxkooM/hqdefault.jpg)](https://www.youtube.com/watch?v=HVvpraxkooM "COMP3005-A4 Demo Video")\
https://youtu.be/HVvpraxkooM

## Getting Started

To set up and use this program, follow these steps:

1. **Instal Node.js**: This program is written using JavaScript and requires Node.js to run. To install Node.js, visit https://nodejs.org/en/download/ and download the appropriate installer for your operating system. Once downloaded, run the installer and follow the instructions to install Node.js.
2. **Install PostgreSQL**: This program uses PostgreSQL as its database. To install PostgreSQL, visit https://www.postgresql.org/download/ and download the appropriate installer for your operating system. Once downloaded, run the installer and follow the instructions to install PostgreSQL.
2. **Clone Repository**: Clone the repository to your local machine. If you are using Git, you can use the following command: `git clone https://github.com/ThomasKWood/COMP3005-A4.git`.
3. **Create Database**: Create a new database in PostgreSQL called `comp3005-a4`. This can be done using the following command: `CREATE DATABASE comp3005-a4;`.
4. **Run DDL**: In the [SQL/](SQL) directory, run the [DDL.psql](SQL/DDL.psql) file in your PostgreSQL database. This will create the student table and populate it with data.
5. **Provide SQL Credentials**: In the [!SQLcreds.js](source/!SQLcreds.js) file, provide a username and password with read and write access to your PostgreSQL database in lines 5 and 6 respectively. Here you can also change the port number and host address if necessary.
6. **Install Dependencies**: In the [source/](source) directory, run the following command: `npm install`. This will install all of the dependencies required to run the program.
7. **Run Program**: In the [source/](source) directory, run the following command: `npm run start`. This will run the program.

## Organization of the Submission

The submission is organized into 2 folders:

1. [source/](source): This folder contains all of the source code for the program.
2. [SQL/](SQL): This folder contains the SQL code used to create the database and populate it with data.