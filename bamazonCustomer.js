var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "paula",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("Here the list of products we sell");
  now_what();
});
function now_what () {

connection.query("SELECT id, product_nm, price FROM products", function (err,res) {
if (err) throw err;
console.log(res);
 prompts();
});

function prompts(questions) {
inquirer.prompt({
type: "input",
 message: "Enter the id # for the product you wish to purchase",
name: "choice",
message: "How many of " + questions.choice + "would you like to buy?"});   
}
connection.end();
}
