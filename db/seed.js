var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database("diner.db");
db.run("INSERT INTO dishes (name, image, price) VALUES (?, ?, ?)", "Pancakes", "http://xobakingco.com/wp-content/uploads/2013/07/PancakeSyrup_lz.jpg", 4.55, function (err) {
    if (err) {
        throw err;
    }
});
