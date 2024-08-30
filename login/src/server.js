// server.js
const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const passport = require("passport");
const flash = require("connect-flash");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const session = require("express-session");

const { url } = require("./config/database");

mongoose
  .connect(url)
  .then(() => console.log("Conectado exitosamente a MongoDB"))
  .catch((err) => console.error("Error al conectar a MongoDB:", err));

require("./config/passport")(passport);

app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(morgan("dev"));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  session({
    secret: "secretkey",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use(express.static(path.join(__dirname, "public")));

require("./app/routes")(app, passport);

app.listen(app.get("port"), () => {
  console.log("Servidor corriendo en el puerto", app.get("port"));
});
