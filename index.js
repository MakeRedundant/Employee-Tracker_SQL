//Require modules
const inquirer = require("inquirer");
const connection = require("./DB/connection");
const mysql = require("mysql2");
const db = require("./DB/connection.js");


require ("dotenv").config();

require("console.table"); //module that displays table data in a nicer format within the terminal

console.log("Welcome!\nStarting the Employee Tracker_SQL");
// \n is for starting a new line

const terminalAscii = () => {
  const asciiArt = `
___________                 .__                                     ___________                         __                    
\\_   _____/  _____  ______  |  |    ____  ___.__.  ____   ____      \\__    ___/_______ _____     ____  |  | __  ____ _______  
 |    __)_  /     \\ \\____ \\ |  |   /  _ \\<   |  |_/ __ \\_/ __ \\       |    |   \\_  __ \\\\__  \\  _/ ___\\ |  |/ /_/ __ \\\\__  __ \\ 
 |        \\|  Y Y  \\|  |_> >|  |__(  <_> )\\___  |\\  ___/\\  ___/       |    |    |  | \\/ / __ \\_\\  \\___ |    < \\  ___/ |  | \\/ 
/_______  /|__|_|  /|   __/ |____/ \\____/ / ____| \\___  >\\___  >      |____|    |__|   (____  / \\___  >|__|_ \\ \\___  >|__|    
        \\/       \\/ |__|                  \\/          \\/     \\/                             \\/      \\/      \\/     \\/         
                                                                                                                                         
        by Brian Trang`;
  console.log(asciiArt);
}; //textkool.com/en/ascii-art-generator?hl=default&vl=default&font=Red%20Phoenix&text=
terminalAscii();

// Start of inquirer
//User input questions
const inquirerTracker = () => {
  return inquirer
     .prompt({
       name: "start",
       type: "list",
       message: "What would you like to do",
       choices: [
         "View All Employees",
         "View All Employees By Department",
         "View All Employees By Manager",
         "Add Employee",
         "Remove Employee",
         "Update Employee Role",
         "Update Employee Manager",
         "View All Roles",
         "Add Role",
         "Remove Role",
         "View All Departments",
         "Add Department",
         "Remove Department",
         "Exit",
       ],
     })
     //then method calls on a promise(answer). The back function within the then() method is executed when the promise is resolved.
     // Inside the callback function theres a switch statement that checks the user selection (answer.start)
     //depending on that it starts the corresponding function
     .then((answer) => {
       switch (answer.start) {
         case "View All Employees":
           ViewAllEmployees();
           break;
 
         case "View All Employees By Department":
           ViewAllEmployeesByDepartment();
           break;
 
         case "View All Employees By Manager":
           ViewAllEmployeesByManager();
           break;
 
         case "Add Employee":
           AddEmployee();
           break;
 
         case "Remove Employee":
           RemoveEmployee();
           break;
 
         case "Update Employee Role":
           UpdateEmployeeRole();
           break;
 
         case "Update Employee Manager":
           UpdateEmployeeManager();
           break;
 
         case "View All Roles":
           ViewAllRoles();
           break;
 
         case "Add Role":
           AddRole();
           break;
 
         case "Remove Role":
           RemoveRole();
           break;
 
         case "View All Departments":
           ViewAllDepartments();
           break;
 
         case "Add Department":
           AddDepartment();
           break;
 
         case "Remove Department":
           RemoveDepartment();
           break;
 
         case "Exit":
           Exit();
           break;
       } // case statement is used with switch statement to define specific conditions that need to be checked within the switch block
       // switch (expression) {
       //   case value1:
       //     // Code to execute if expression equals value1
       //     break;
       //   case value2:
       //     // Code to execute if expression equals value2
       //     break;
       //   // Additional cases...
       //   default:
       //     // Code to execute if none of the cases match
     });
 };
 
 // View all employees
 function ViewAllEmployees() {
   // Contains: id, first name, last name, title, department, salary, manager
   //this  Defines a SQL query using a template string
   const query = ` 
   SELECT 
     employee.id, 
     employee.first_name, 
     employee.last_name, 
     role.title, 
     department.name AS department, 
     role.salary, 
     CONCAT(manager.first_name, ' ', manager.last_name) AS manager_name
   FROM 
     employee
   LEFT JOIN role ON 
     employee.role_id = role.id 
   LEFT JOIN department ON 
     role.department_id = department.id 
   LEFT JOIN employee manager ON 
     manager.id = employee.manager_id;
 `;
   //Uses the LEFT JOIN to combine data from tables based on their relationship
 
   //Uses conenction.query() method to exectute the query
   // shows result in the terminal by console.table
   db.query(query, (err, data) => {
     if (err) throw err;
     console.table(data);
     inquirerTracker();
   });
 }
 
 //View all employees by department
 function ViewAllEmployeesByDepartment() {
   // Contains departments: Marketing, Accounting, EEngineering, HR, Legal
   inquirer
     // Inquirer prompt for department selection
     .prompt({
       name: "department",
       type: "list",
       message: "Which department would you like to view?",
       choices: [
         "Marketing",
         "Accounting",
         "Engineering",
         "IT",
         "Human Resources",
         "Legal",
       ],
     })
     .then((answer) => {
       switch (answer.department) {
         case "Marketing":
           return EmployeesByDepartment("Marketing");
         case "Accounting":
           return EmployeesByDepartment("Accounting");
         case "Engineering":
           return EmployeesByDepartment("Engineering");
         case "IT":
           return EmployeesByDepartment("IT");
         case "Human Resources":
           return EmployeesByDepartment("Human Resources");
         case "Legal":
           return EmployeesByDepartment("Legal");
       }
     }); // There are no break statements here and instead I use return instead to make it more simplistic
 
   // Shows Employer by department, with id, first name, last name, title
   function EmployeesByDepartment(department) {
     // Select statements to specify which columns to retrieve (i.e. employee id)
     const query = `
         SELECT 
             employee.id, 
             employee.first_name, 
             employee.last_name, 
             role.title, 
             department.name AS department 
         FROM 
             employee 
         LEFT JOIN 
             role ON employee.role_id = role.id 
         LEFT JOIN 
             department ON role.department_id = department.id 
         WHERE 
             department.name = ?;
 
     `;
     // Uses the LEFT JOIN to connect the Employee table with the role table (all records from the left table are included along with matching records from the right)
     // WHERE clause in an SQL query is used to specify a condition that must be met, and ? is a placeholder
     db.query(query, department, (err, data) => {
       if (err) throw err;
       console.table(data);
       inquirerTracker();
     });
   }
 }
 
 function ViewAllEmployeesByManager() {
     // display a list includes all managers: first name, last name
     const query = `
     SELECT 
        employee.id, 
        employee.first_name, 
        employee.last_name, 
        role.title, 
        department.name AS 
        department, 
        CONCAT(manager.first_name, ' ', manager.last_name) AS manager 
      FROM 
        employee 
      LEFT JOIN 
        role ON employee.role_id = role.id 
      LEFT JOIN
         department ON role.department_id = department.id 
      LEFT JOIN
         employee manager ON manager.id = employee.manager_id 
      ORDER BY 
        manager;`;
     db.query(query, (err, data) => {
       if (err) throw err;
       console.table(data);
       inquirerTracker();
     });
   }
 
    // View all roles (jobs)
    function ViewAllRoles() {
     const query = `
     SELECT 
        role.id, 
        role.title, 
        role.salary, 
        department.name AS department 
     FROM 
        role 
     LEFT JOIN
         department ON 
         role.department_id = department.id;`;
     db.query(query, (err, data) => {
       if (err) throw err;
       console.table(data);
       inquirerTracker();
     });
   }
   
  
   function AddEmployee() {
      // displays: first name, last name, role, and manager
     let userAnswer;
     const query = `
     SELECT
        id, title
     FROM
       role
     WHERE
       title NOT LIKE '%Manager%';`;
   // title NOT LIKE '%Manager%' clause in the SQL query is used to filter out roles that have "Manager" in their title.
     Promise.resolve()
       .then(() => {
         return new Promise((resolve, reject) => {
           db.query(query, (err, data) => {
             if (err) reject(err);
             else resolve(data);
           });
         });
       })
       .then((addedRole) => {
         const roles = addedRole.map(
           (roles) => `Role title: ${roles.title}, Role ID: ${roles.id}`
         );
   
         return inquirer.prompt([
           {
             name: "first_name",
             type: "input",
             message: "What is the employee's first name ?",
           },
           {
             name: "last_name",
             type: "input",
             message: "What is the employee's last name ?",
           },
           {
             name: "role",
             type: "list",
             message: "What is the employee's role id ?",
             choices: roles,
           },
         ]);
       })
       .then((answer) => {
         userAnswer = answer;
         const newQuery = `
         SELECT 
            manager.id as manager_id,
            CONCAT(manager.first_name, ' ', manager.last_name) AS manager_name
         FROM 
            employee
         LEFT JOIN
             role ON employee.role_id = role.id
         LEFT JOIN 
              employee AS manager ON manager.id = employee.manager_id 
         WHERE
              manager.id IS NOT NULL
         GROUP BY
              manager_id;`;
         return new Promise((resolve, reject) => {
           db.query(newQuery, (err, data) => {
             if (err) reject(err);
             else resolve(data);
           });
         });
       })
       .then((managersData) => {
         const managers = managersData.map(
           (roles) => `${roles.manager_name} ID:${roles.manager_id}`
         );
   
         return inquirer.prompt([
           {
             name: "manager",
             type: "list",
             message: "Which manager is the employee under?",
             choices: [...managers, "None"],
           },
         ]);
       })
       .then((answer) => {
         const query = `INSERT INTO employee 
         (first_name, last_name, role_id, manager_id) 
         VALUES (?, ?, ?, ?)`; //placeholder for new employee
         db.query(
           query,
           [
             userAnswer.first_name,
             userAnswer.last_name,
             userAnswer.role.split("ID: ")[1], //this here will extract the ID, For example, if the user selects "Role title: Software Engineer, Role ID: 5," this code extracts the "5"
             answer.manager.split("ID:")[1],
           ],
           (err, data) => {
             if (err) throw err;
             console.log(
               `Added ${userAnswer.first_name} ${userAnswer.last_name} to the database`
             );
             ViewAllEmployees();
           }
         );
       });
   }
   
   // Removes a employee
   function RemoveEmployee() {
     const query = `
     SELECT 
        employee.id, 
        employee.first_name, 
        employee.last_name, 
        role.title, 
        department.name AS 
        department, 
        role.salary, 
        CONCAT(manager.first_name, ' ', manager.last_name) AS 
        manager 
     FROM 
         employee
     LEFT JOIN
          role ON 
          employee.role_id = role.id 
     LEFT JOIN 
         department ON 
         role.department_id = department.id 
     LEFT JOIN 
          employee manager ON 
           manager.id = employee.manager_id;`;
     db.query(query, (err, data) => {
       if (err) throw err;
       const employees = data.map(
         (roles) => `${roles.first_name} ${roles.last_name}`
       );
       inquirer
         .prompt({
           name: "employee",
           type: "list",
           message: "Please select which employee you like to remove?",
           choices: [...employees],
         })
         .then((answer) => {
           const query = `DELETE FROM employee WHERE first_name = ? AND last_name = ?`;
           db.query(
             query,
             [answer.employee.split(" ")[0], answer.employee.split(" ")[1]],
             (err, data) => {
               if (err) throw err;
               console.log(
                 `You have removed ${answer.employee} from the database.`
               );
               ViewAllEmployees();
             }
           );
         });
     });
   }
   
   // Updates employee role
   function UpdateEmployeeRole() {
     const query = `
     SELECT 
         first_name, last_name 
     FROM 
         employee;`;
     db.query(query, (err, data) => {
     
       const employees = data.map(
         (roles) => `${roles.first_name} ${roles.last_name}`
       );
       inquirer
         .prompt([
           {
             name: "employee",
             type: "list",
             message: "Please select which employee you would like to update?",
             choices: employees,
           },
         ])
         .then((answer) => {
           // get the selected employee's first and last name
           const chosenEmployee = answer.employee.split(" ");
           const firstName = chosenEmployee[0];
           const lastName = chosenEmployee[1];
   
           // query the role table to get all available roles
           const query = `SELECT title FROM role;`;
           db.query(query, (err, data) => {
             // map all roles to an array
             const roles = data.map((roles) => roles.title);
             // prompt the user to select a new role
             inquirer
               .prompt({
                 name: "role",
                 type: "list",
                 message: "Please select a new role",
                 choices: roles,
               })
               .then((answer) => {
                 //  Obtain the selected ID for the role
                 const query = `SELECT id FROM role WHERE title = ?`;
                 db.query(query, [answer.role], (err, data) => {
                   if (err) throw err;
                   const roleId = data[0].id;
                   // update the employee's role in the database
                   const query = `UPDATE employee SET role_id = ? WHERE first_name = ? AND last_name = ?`;
                   db.query(
                     query,
                     [roleId, firstName, lastName],
                     (err, data) => {
                       if (err) throw err;
                       console.log(
                         `Successfully updated ${firstName} ${lastName}'s role to ${answer.role}.`
                       );
                       ViewAllEmployees();
                     }
                   );
                 });
               });
           });
         });
     });
   }
   
   // Updates employee manager
   function UpdateEmployeeManager() {
     const query = `
   SELECT 
     first_name, last_name 
   FROM 
     employee;`;
     db.query(query, (err, data) => {
 
     const employees = data.map(
       (roles) => `${roles.first_name} ${roles.last_name}`
     );
     
     inquirer
       .prompt([
         {
           name: "employee",
           type: "list",
           message: "Which employee would you like to update?",
           choices: employees,
         },
       ])
       .then((answer) => {
         const chosenEmployee = answer.employee.split(" ");
         const firstName = chosenEmployee[0];
         const lastName = chosenEmployee[1];
    
         // query all managers 
         const query = `
         SELECT 
            first_name, last_name 
         FROM
             employee 
         WHERE
              manager_id IS NULL 
         AND 
             first_name != '${firstName}' 
         AND
             last_name != '${lastName}';`;
         db.query(query, (err, data) => {
           const managers = data.map(
             (roles) => `${roles.first_name} ${roles.last_name}`
           );
           // prompt the user to select a new manager
           inquirer
             .prompt({
               name: "manager",
               type: "list",
               message: "Who is the employee's new manager?",
               choices: managers,
             })
             .then((answer) => {
               // get the selected manager's id
               const query = `SELECT id FROM employee WHERE first_name = ? AND last_name = ?`;
               connection.query(query, [answer.manager.split(" ")[0], answer.manager.split(" ")[1]], (err, data) => {
                 if (err) throw err;
                 const managerId = data[0].id;
                 // update the employee's manager in the database
                 const query = `UPDATE employee SET manager_id = ? WHERE first_name = ? AND last_name = ?`;
                 db.query(
                   query,
                   [managerId, firstName, lastName],
                   (err, data) => {
                     if (err) throw err;
                     console.log(
                       `Successfully updated ${firstName} ${lastName}'s manager to ${answer.manager}.`
                     );
                     ViewAllEmployees();
                   }
                 );
               });
             });
         }
       );
     });
   });
   }
   
   // Adds new role
   function AddRole() {
     const query = `
     SELECT 
         department.name 
     FROM 
         department`;
     db.query(query, (err, data) => {
       if (err) throw err;
       const department = data.map((roles) => `${roles.name}`);
       inquirer
         .prompt([
           {
             type: "input",
             name: "title",
             message: "What is the title of the new role?",
           },
           {
             type: "input",
             name: "salary",
             message: "What is the salary of the new  role?",
           },
           {
             type: "list",
             name: "department_name",
             message: "What is the department of the new role?",
             choices: [...department],
           },
         ])
         .then((data) => {
           const { title, salary, department_name } = data;
           db.query(
            `INSERT INTO
                role (title, salary, department_id)
             SELECT
               ?, ?, department.id
             FROM
                department
             WHERE 
               department.name = ?`, //?? placeholders for the title, salary
             [title, salary, department_name],
             (err, res) => {
               if (err) throw err;
               console.log(
                 `\n A new Role ${title} has been added!\n`
               );
               ViewAllRoles();
             }
           );
         });
     });
   }
   
   // Remove role
   function RemoveRole() {
     // prompt user to select role to remove
     // remove role: title, salary, department
     db.query("SELECT role.title FROM role", (err, data) => {
       // console.log(data)
       const roles = data.map((roles) => `${roles.title}`);
       // console.log(roles);
   
       inquirer
         .prompt([
           {
             type: "list",
             name: "title",
             message: "Select a role you want to remove?",
             choices: [...roles],
           },
         ])
         .then((data) => {
           // console.log(data.title);
           const { title } = data;
   
           // Check if role exists. If not, display a message. If yes, delete the role.
           db.query(
             "SELECT * FROM role WHERE title = '" + title + "'",
             (err, res) => {
               if (err) throw err;
               if (res.length === 0) {
                 console.log(`Role with title ${data.title} does not exist.`);
               }
   
               if (res.length !== 0) {
                 db.query(
                   "DELETE FROM role WHERE title = '" + title + "'",
                   (err, res) => {
                     if (err) throw err;
                     if (res.affectedRows === 0) {
                       console.log(
                         `Role with title ${data.title} does not exist.`
                       );
                     } else {
                       console.table({
                         message: `\n-------------------\n Role with title ${data.title} has been removed.\n`,
                         affectedRows: res.affectedRows,
                       });
                       ViewAllRoles();
                     }
                   }
                 );
               }
             }
           );
         });
     });
   }
   
   //View all departments
   function ViewAllDepartments() {
     // all departments: id, name
     const query = `
     SELECT 
         department.id, 
         department.name
      FROM 
         department;`;
     db.query(query, (err, data) => {
       if (err) throw err;
       console.table(data);
       inquirerTracker();
     });
   }
   
   // Adds department
   function AddDepartment() {
     inquirer
       .prompt([
         {
           type: "input",
           name: "name",
           message: "Please enter the name of the new department?",
         },
       ])
       .then((data) => {
         const { name } = data;
         db.query(
           `INSERT INTO department (name) VALUES (?)`,
           [name],
           (err, res) => {
             if (err) throw err;
             console.log(
               `\n-------------------\n Department ${name} has been added!\n`
             );
             ViewAllDepartments();
           }
         );
       });
   }
   
  // Remove department
  function RemoveDepartment() {
    db.query("SELECT department.name FROM department", (err, data) => {
      if (err) throw err;
      const department = data.map((dept) => dept.name);
  
      inquirer
        .prompt([
          {
            type: "list",
            name: "name",
            message: "Select a department you want to remove?",
            choices: [...department],
          },
        ])
        .then((answer) => {
          const { name } = answer;
  
          // Check if the department exists
          db.query("SELECT * FROM department WHERE name = ?", [name], (err, res) => {
            if (err) throw err;
  
            if (res.length === 0) {
              console.log(`Department with name ${name} does not exist.`);
            } else {
              // Checks if there are roles associated with the department for error handling
              db.query("SELECT * FROM role WHERE department_id = ?", [res[0].id], (err, roleRes) => {
                if (err) throw err;
  
                if (roleRes.length > 0) {
                  console.log(`Cannot remove department ${name} because there are roles associated with it.`);
                } else {
                  // No roles associated, it is safe to delete the department
                  db.query("DELETE FROM department WHERE name = ?", [name], (err, deleteRes) => {
                    if (err) throw err;
  
                    if (deleteRes.affectedRows === 0) {
                      console.log(`Department with name ${name} does not exist.`);
                    } else {
                      console.table({
                        message: `\n${name} has been removed.\n`,
                        affectedRows: deleteRes.affectedRows,
                      });
                      ViewAllDepartments();
                    }
                  });
                }
              });
            }
          });
        });
    });
  }
 
 // Exits the application
 function Exit() {
   console.log("Closing the Employee_Tracker_SQL \n GOODBYE!");
   db.end();
 }
 
 inquirerTracker();
 
 