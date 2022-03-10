const connection = require('./db/connection');
const inquirer = require('inquirer');
const cTable = require('console.table');

// Database Connection initilization
connection.connect((error) => {
    if (error) throw error;
    askUser();
  });

// Prompt User for Choices
const askUser = () => {
    inquirer.prompt([
        {
          name: 'choices',
          type: 'list',
          message: 'Please select an option:',
          choices: [
            'View All Departments',
            'View All Roles',  
            'View All Employees',
            'Add Department',
            'Add Role',
            'Add Employee',
            'Update Employee Role',
            'Exit'
            ]
        } 
      ])
      .then(result => {
        switch(result.choices) {
            case "View All Departments":
                viewAllDepartments(); // this will show that the answers that you have chosen is view all departments
                break; // this will prompt to go back
            
            case "View All Roles":
                viewAllRoles();
                break; // show what they asked for 

            case "View All Employees":
                viewAllEmployees();
                break; // show what they asked for 

            case "Add a Department":
                addDepartment();
                break; // show what they asked for 

            case "Add a Role":
                addRole();
                break; // show what they asked for 

            case "Add an Employee":
                addEmployee();
                break; // show what they asked for 

            case "Update Employee Role":
                updateEmployeeRole();
                break; // show what they asked for 

            case 'Exit Application':
                connection.end(); // Quit the application 
                break;
        }
    });
}



 