INSERT INTO department (name) VALUES ("Sales");
INSERT INTO department (name) VALUES ("Finance");
INSERT INTO department (name) VALUES ("Engineering");
INSERT INTO department (name) VALUES ("Legal");

INSERT INTO role (title, salary, department_id) VALUES ("Paralegal", 43000, 4);
INSERT INTO role (title, salary, department_id) VALUES ("Accoutant", 68000, 2);
INSERT INTO role (title, salary, department_id) VALUES ("Salesperson", 45000, 1);
INSERT INTO role (title, salary, department_id) VALUES ("Lead Engineer", 75000, 3);
INSERT INTO role (title, salary, department_id) VALUES ("Early Career Software Engineer", 85000, 3);
INSERT INTO role (title, salary, department_id) VALUES ("Account Manager", 65000, 2);
INSERT INTO role (title, salary, department_id) VALUES ("Lawyer", 75000, 4);


INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Xiaoyan", "Zhang", 2, 1 );
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Kenan", "Huyuk", 5, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Fatih", "Topal", 5, 3 );
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("He", "Huang",4 , 4 );