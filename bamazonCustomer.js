//require mysql and inquirer
var mysql = require('mysql');
var inquirer = require('inquirer');
//create connection to db
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "bamazon"
})

function start(){
//prints the items for sale and their details
connection.query('SELECT * FROM products', function(err, res){
  if(err) throw err;

  console.log('Here is a list of products that we sell on our site: ')
  console.log('----------------------------------------------------------------------------------------------------')

  for(var i = 0; i<res.length;i++){
    console.log("ID: " + res[i].id + " | " + "Product: " + res[i].product_nm + " | " + "Department: " + res[i].department_nm + " | " + "price: " + res[i].price + " | " + "QTY: " + res[i].stock_quantity);
    console.log('--------------------------------------------------------------------------------------------------')
  }


  // questions for user
  inquirer.prompt([
    {
      type: "input",
      name: "id",
      message: "Enter the id# of the product you would like to purchase?",
      validate: function(value){
        if(isNaN(value) == false && parseInt(value) <= res.length && parseInt(value) > 0){
		  return true;}
		else{
          return false;}
	  }},
	  
    {
      type: "input",
      name: "qty",
      message: "Enter the quantity you would you like to purchase?",
      validate: function(value){
        if(isNaN(value)){
		  return false;} 
		else{
          return true;}
	  }}
	  
    ]).then(function(ans){
      var whatToBuy = (ans.id)-1;
      var howMuchToBuy = parseInt(ans.qty);
      var grandTotal = parseFloat(((res[whatToBuy].price)*howMuchToBuy).toFixed(2));

      //qty check
      if(res[whatToBuy].stock_quantity >= howMuchToBuy){
        //after purchase, updates quantity in Products
        connection.query("UPDATE Products SET ? WHERE ?", [
        {stock_quantity: (res[whatToBuy].stock_quantity - howMuchToBuy)},
        {id: ans.id}
        ], function(err, result){
            if(err) throw err;
            console.log("Your total is $" + grandTotal.toFixed(2));
        });}
        
      else{
        console.log("Sorry, there's not enough in stock!");
      }

      reprompt();
    })
} 

)}

//asks if they would like to purchase another item
function reprompt(){
  inquirer.prompt([{
    type: "confirm",
    name: "reply",
    message: "Would you like to purchase another item?"
  }]).then(function(ans){
    if(ans.reply){
      start();
    } else{
      console.log("Thank you for your purchase");
    }
  });
}

start();