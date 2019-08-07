
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT,
  product_nm VARCHAR(100) NOT NULL,
  department_nm VARCHAR(100) NOT NULL,
  price FLOAT (4,2) NOT NULL,
  stock_quantity INT NOT NULL,
  PRIMARY KEY (id)
);

INSERT INTO products (product_nm, department_nm, price, stock_quantity)
VALUES
("tampons", "personal care", 3.50, 50),
("pads", "personal care", 5.50, 70),
("turnips", "produce", .50, 7),
("carrots", "produce", 1.25, 9),
("beets", "produce", .75, 4),
("blue_jeans", "womens_clothing", 75.00, 71),
("white_jeans", "womens_clothing", 64.29, 17),
("yellow_shirt", "mens_clothing", 19.99 , 0),
("headphones", "electronics", 99.00, 34),
("black_shirt", "mens_clothing", 14.76, 54),
("xbox", "electronics", 79.99, 1),
("bleach", "household_items", 5.50, 9),
("napkins", "household_items", 4.50, 2);
