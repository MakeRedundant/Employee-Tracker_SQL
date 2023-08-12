const inquirer = require("inquirer");
const connection = require("./DB/connection");

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
}


const inquirerTracker = () => {
  inquirer
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
      }
    });
};

// View all employees
function ViewAllEmployees() {
  // Contains: id, first name, last name, title, department, salary, manager
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
  // show result in the terminal by console.table
  connection.query(query, (err, data) => {
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
    });

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

    terminalAscii();

    // Uses the LEFT JOIN to connect the Employee table with the role table (all records from the left table are included along with matching records from the right)
    // WHERE clause in an SQL query is used to specify a condition that must be met, and ? is a placeholder
    connection.query(query, department, (err, data) => {
      if (err) throw err;
      console.table(data);
      inquirerTracker(); 
    });
  }
}
