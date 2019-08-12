var mysql = require("mysql");
var inquirer = require("inquirer");
var colors = require('colors');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: " ",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    start();
});

function start() {
    connection.query("SELECT id, product_name, price, stock_quantity FROM products", function (err, res) {
        if (err) throw err;
        console.log("Availible Products:");
        console.log("--------------------".red);
        for (var i = 0; i < res.length; i++) {
            console.log("ID: ".yellow + res[i].id + " | " + "Product: " + res[i].product_name + " | " + "Price: " + res[i].price + " | " + "In Stock: " + res[i].stock_quantity);
        };
        console.log("--------------------".red);
    });

    console.log("   ")

    inquirer
        .prompt([
            {
                type: "number",
                message: "What is the ID# of the product you would like to purchase?",
                name: "prodID"
            },
            {
                type: "number",
                message: "How many would you like to purchase?",
                name: "quantity"
            }
        ])

        .then(function (ans) {
            var quantity = ans.quantity;
            var itemID = ans.prodID;

            connection.query('SELECT * FROM products WHERE id=' + itemID, function (err, selectedItem) {
                if (err) throw err;

                // console.log("quantity", quantity); // for testing
                // console.log("itemID", itemID); // for testing
                // console.log("selectedItem", selectedItem); // for testing


                // check item inventory to mysql
                if (selectedItem[0].stock_quantity - quantity >= 0) {

                    console.log("Quantity in Stock: ".green + selectedItem[0].stock_quantity);

                    console.log("There is adequate inventory to fill your order of ".green + selectedItem[0].product_name.yellow);



                    // total out sale and fix 2 decimal places
                    console.log("Your order total will be ".green + (ans.quantity * selectedItem[0].price).toFixed(2).yellow + " dollars.".green, "\nThanks for your purchase!".orange);

                    // remove purchased item from inventory in db                      
                    connection.query('UPDATE products SET stock_quantity=? WHERE id=?', [selectedItem[0].stock_quantity - quantity, itemID],

                        function (err, inventory) {
                            if (err) throw err;

                            start();  // start over
                        });

                }
                // low inventory warning
                else {
                    console.log("\nThere are only ".red + selectedItem[0].stock_quantity + " " + selectedItem[0].product_name.cyan + " in stock at this moment. \nPlease choose a smaller amount.".red, "\nThanks for shopping with us!".orange);

                    start();  // start over
                }
            });
        });

};

