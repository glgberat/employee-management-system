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

            case "Add Department":
                addDepartment();
                break; // show what they asked for 

            case "Add Role":
                addRole();
                break; // show what they asked for 

            case "Add Employee":
                addEmployee();
                break; // show what they asked for 

            case "Update Employee Role":
                updateEmployeeRole();
                break; // show what they asked for 

            case 'Exit':
                connection.end(); // Quit the application 
                break;
        }
    });
}


// View all Departments 

function viewAllDepartments() {
  connection.query('SELECT * FROM department', function (err, res) {
      if (err) throw err; // errors 
      console.table(res); // the result will be shown in tables
      askUser();
  });
}


// View all Roles
function viewAllRoles() { // get the roles from the table
  connection.query('SELECT *  FROM role;', function (err, res, fields) {
      if (err) throw err; // this will just throw an err
      console.table(res);
      askUser();
  })
}


// View All Employees
function viewAllEmployees() { 
  let query = `SELECT e.id AS id, e.first_name AS first_name, e.last_name AS last_name, role.title AS title, department.name AS department, role.salary AS salary, concat(m.first_name, ' ', m.last_name) AS manager
  FROM employee e
  LEFT JOIN role ON e.role_id = role.id 
  LEFT JOIN department on role.department_id = department.id 
  LEFT JOIN employee m ON m.id = e.manager_id`

  connection.query(query, function(err, res) {
      if (err) throw err; // throws an error if there is an incorrect prompt
      console.table(res); // results are shown in a table form
      askUser(); 
  })
}


function addDepartment() {
    inquirer.prompt([ // this is having a different prompt from the viewing because have the ability to input a new department in this particular case
        {
            type: 'input', // this response allows you to 
            name: 'newDepartmentName', // new name of the department
            message: 'What is the name of the new Department?', // coming up from the name of the department 
        }   
  ]).then(function(res) {
        var query = connection.query( 
            'INSERT INTO department SET ? ', // inserts into the department table
            { name: res.newDepartmentName}, 
            function(err){if (err) throw err;  
            console.table(res);
            askUser(); // goes back to the prompt at the beginning
            })
    })
  }

  //Add a Role

  function addRole() {
    inquirer .prompt ([
        {
            type: 'input',
            name: 'newRoleTitle',
            message: 'Enter the new role title:',
        },
        {
            type: 'input',
            name: 'newRoleSalary',
            message: 'Please enter the salary for the new role!' 
            
        },
        {
            type: 'input', 
            name: 'newRoleDepartment', 
            message: 'What is the department ID for the new role?', 
        },
      ])
      
      .then(function(answer) { 
        connection.query("INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)", [answer.newRoleTitle, answer.newRoleSalary, answer.newRoleDepartment], function (err, res) {
          if (err) throw err;
          console.table("A new role was added!");
          askUser();
      });
    })
};


// Add a new employee

function addEmployee() {
    connection.query('SELECT * FROM role', function (err, res) {
        if (err) throw err; 
        let roleList = []; 
    
        res.forEach(role => {
            roleList.push({ name: role.title, value: role.id }); // Gives you a list of the roles that you can choose from 

    }); 
    inquirer.prompt([
        {
            type: 'input',
            name: 'newEmployeeFirstName',
            message: 'What is the first name of the new employee?'
        },
        {
            type: 'input',
            name:'newEmployeeLastName',
            message: 'What is the last name of the new employee?'
        },
        {
            type: 'list',
            name: 'newEmployeeRole', 
            message: 'What is the new employees role in the company?',
            choices: roleList
        },
        {
            type: 'input',
            name: 'newEmployeeManager', 
            message: 'What is the ID of the Manager who they will work under? (Please enter an ID 1-10)',
        }
    ])
    .then(function(answer) {
        connection.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)", [answer.newEmployeeFirstName, answer.newEmployeeLastName, answer.newEmployeeRole, answer.newEmployeeManager], function (err, res) { // this will show the name of the people in the list first last and the role which will get the salary of the role etc. 
            if (err) throw err;
            console.table("New Employee is added to the business!"); 
            askUser(); // prompt to ge back to the beginning
        });
    });
});
}


// Update an Employee Role
function updateEmployeeRole() {
    connection.query('SELECT * FROM role', function (err, res) {
        if (err) throw err;
        let roleList = [];
        res.forEach(role => {
            roleList.push({ name: role.title, value: role.id });
    });
    inquirer.prompt([
        {
            type: 'input',
            name: 'updateEmployeeId',
            message: 'What is the ID of the employee you are trying to change?', 
            // choices: employeeList
        },
        {
            type: 'list',
            name: 'updateNewEmployeeRole', // you can choose the new role from the list and it will be changed in the table
            message: 'What is the new role of the employee\n\n?',
            choices: roleList
        }
    ])
    .then(function(answer) {
        console.log(answer)
        connection.query("UPDATE employee SET role_id=? WHERE id =?", [answer.updateNewEmployeeRole, answer.updateEmployeeId], function (err, res) { // it takes your answers and changes them in the tables, just hit view employees and that will change
        if (err) throw err; 
            console.log('Updated Employee Role!!\n\n')
            askUser();
        });
    });
});
}
 
