const express = require("express");
const bodyParser = require("body-parser");
const registerRoutes = require("./routes/registerRoutes");
const loginRoutes = require("./routes/loginRoutes");
const recipeRoutes = require("./routes/recipeRoutes");
const ingredientsRoute = require("./routes/ingredientsRoute");
const recipe_textRoute = require("./routes/recipe_textRoute");
const usersRoutes = require("./routes/usersRoutes");


const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.use("/register", registerRoutes);
app.use("/login", loginRoutes);
app.use("/recipe", recipeRoutes);
app.use("/ingredients", ingredientsRoute);
app.use("/recipe_text", recipe_textRoute);
app.use("/users", usersRoutes);

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
