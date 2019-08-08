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
  console.log("Here are our list of products");

  now_what();
});
function now_what () {
  
  connection.query("SELECT id, product_nm, price FROM products", async function (err,res) {
    //to get rid of rowdatapacket
  var string =JSON.stringify(res);
  var jsonarray =  JSON.parse(string);
    if (err) throw err;
  console.log(jsonarray);

  await inquirer.prompt({
    type: "list",
    name: "products",
    message: "select a product",
    choices: ["14","15", "24"]
    })})
  connection.end();}



