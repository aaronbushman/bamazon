DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(100) NOT NULL,
  price DEC(10,2) default 0,
  stock_quantity INT default 0,
  PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Cheerios", "breakfast", 4.24, 12);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Windex", "cleaning_supplies", 3.99, 9);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Pop_Tarts", "breakfast", 2.25, 4);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Milk", "dairy", 2.33, 8);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Oranges", "produce", 4.99, 12);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Fresh_Mushrooms", "produce", 2.50, 6);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Oreos", "snacks", 2.22, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Pringles", "snacks", 1.99, 3);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Cheddar", "dairy", 4.66, 14);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Macaroni", "pasta", 3.22, 5);







