-- Populate departments
INSERT INTO department (name)
VALUES  ('Marketing'), 
        ('Accounting'), 
        ('Engineering'), 
        ('IT'),
        ('Human Resources'),
        ('Legal');

-- Populate roles
INSERT INTO role (title, salary, department_id) 
VALUES  ('Marketing Manager', 102346, 1),
        ('Marketing Analyst', 55000, 1),
        ('Accounting Manager', 120000, 2),
        ('Accountant', 6000, 2),
        ('Senior Engineer', 120000, 3), 
        ('Mechanical Engineer', 80000, 3),
        ('Tech Lead', 999999, 4),  
        ('Front End Developer', 12345, 4), 
        ('HR Manager', 900, 5),
        ('Recruiter', 50, 5),
        ('Judge', 56789, 6),
        ('Corporate Lawyer', 10000, 6);

-- Populate employees
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ('Chuck', 'Norris', 1, NULL),
        ('John', 'Doe', 2, 1),
        ('Jane', 'Doe', 3, NULL),
        ('Albert', 'Einstein', 4, 3),
        ('John', 'Smith', 5, NULL),
        ('Marie', 'Curie', 6, 5),
        ('Leo', 'Dicaprio', 7, NULL),
        ('John', 'Wick', 8, 7),
        ('Michael', 'Scott', 9, NULL),
        ('Average', 'Joe', 10, 5),
        ('Master', 'Chief', 11, NULL), 
        ('Ash', 'Ketcham', 12, 11); 

