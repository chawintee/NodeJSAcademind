const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const mongoConnect = require('./util/database')


// const adminData = require("./routes/admin");
// const shopRouter = require("./routes/shop");
const errorController = require("./controllers/error");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// app.use("/admin", adminData);
// app.use(shopRouter);


app.use(errorController.get404);

mongoConnect(client => {
    console.log(client);
    app.listen(3000);
})
