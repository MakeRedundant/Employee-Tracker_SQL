INSERT INTO department (name)
VALUES  ('Marketing'), 
        ('Accounting'), 
        ('Engineering'), 
        ('IT'),
        ('Human Resources'),
        ('Legal');


INSERT INTO role (title, salary, department_id) 
VALUES  ('Marketing Manager', 100000, 1),
        ('Marketing Analyst', 55000, 1),
        ('Accounting Manager', 120000, 2),
        ('Accountant', 6000, 2),
        ('Tech Lead', 150000, 3),
        ('Software Engineer', 900000, 3),
        ('HR Manager', 90, 4),
        ('Recruiter', 50000, 4),
        ('Corporate Lawyer', 100000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ('Chuck', 'Norris', 1, NULL),
        ('John', 'Doe', 2, 1),
        ('Jane', 'Doe', 3, NULL),
        ('Albert', 'Einstein', 4, 3),
        ('John', 'Smith', 5, NULL),
        ('Marie', 'Curie', 6, 5),
        ('Leo', 'Dicaprio', 7, NULL),
        ('John', 'Wick', 8, 7),
        ('Michael', 'Scott', 9, NULL);
        ('Average', 'Joe', 6, 5);
