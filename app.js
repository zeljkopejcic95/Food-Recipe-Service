require("dotenv").config()
const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: "recipedb",
  password: process.env.DB_PASSWORD
});

app.get("/login", function(req, res) {
  res.send("login page");
});

app.get("/register", function(req, res) {
  res.send("register page");
});

app.post("/register", function(req, res) {
  const userEmail = req.body.email;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const password = req.body.password;

  bcrypt.hash(password, saltRounds, function(err, hash) {

    connection.query(
      `INSERT INTO users (email, first_name, last_name, password)
       VALUES ("${userEmail}", "${firstName}", "${lastName}", "${hash}");`,
      function(err, result) {
        if (err) {
          console.log(err);
        } else {
          console.log("Successfully registered");
          res.send(result);
        }
      });
  });
});



app.post("/login", function(req, res) {

  const email = req.body.email;
  const password = req.body.password;

  connection.query(
    `SELECT * FROM users WHERE email = "${email}";`,
    function(err, result) {
      if (err) {
        console.log(err);
      } else {
        if (result) {
          if (result[0].password === password) {
            console.log("Successfully logged");
          }
        }
      }

      const token = jwt.sign({result: result[0].email}, process.env.PRIVATE_KEY, {expiresIn: "1h"});
      res.send({token: token});
    });
});



function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403);
  }
};



app.get("/recipe", verifyToken, function(req, res) {

  jwt.verify(req.token, process.env.PRIVATE_KEY, function(err, data) {
    if (err) {
      res.sendStatus(403);
    } else {
      console.log(data);
      connection.query(
        `SELECT * FROM food_recipe`,
        function(err, result) {
          if (err) {
            console.log(err);
          } else {
            res.send(result);
          }
        });
    }
  });
});

app.post("/recipe", function(req, res) {


  const foodName = req.body.name;
  const foodIngredients = req.body.ingredients;
  const recipeText = req.body.recipeText;
  const newRecipe = `INSERT INTO food_recipe (name, ingredients, recipe_text)
                     VALUES ("${foodName}", "${foodIngredients}", "${recipeText}");`

  connection.query(newRecipe, function(err, result) {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/ingredients", function(req, res) {
  connection.query(
    `SELECT ingredients FROM food_recipe`,
    function(err, result) {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
});

app.get("/recipe_text", function(req, res) {
  connection.query(
    `SELECT recipe_text FROM food_recipe`,
    function(err, result) {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
});


// app.delete("/recipe", function(req, res) {
//   connection.query(
//     `DELETE FROM food_recipe`,
//     function(err, result) {
//       if (err) {
//         console.log(err);
//       } else {
//         res.send(result);
//         console.log("Successfully deleted all recipes");
//       }
//     });
// });


app.get("/recipe/:recipeId", function(req, res) {
  const recipeId = req.params.recipeId;
  connection.query(
    `SELECT * FROM food_recipe WHERE recipe_id = "${recipeId}";`,
    function(err, result) {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
});

app.put("/recipe/:recipeId", function(req, res) {
  const foodName = req.body.name;
  const foodIngredients = req.body.ingredients;
  const recipeText = req.body.recipeText;
  connection.query(
    `UPDATE food_recipe
     SET name = "${foodName}", ingredients = "${foodIngredients}", recipe_text = "${recipeText}"
     WHERE recipe_id = "${req.params.recipeId}";`,
    function(err) {
      if (!err) {
        res.send("Successfully updated.");
      }
    });
});

app.delete("/recipe/recipeId", function(req, res) {
  const recipeId = req.params.recipeId;
  connection.query(
    `DELETE FROM food recipe WHERE recipe_id = "${recipeId}";`,
    function(err, result) {
      if (!err) {
        res.send("Successfully deleted recipe");
      }
    });
});




app.get("/users", function(req, res) {
  connection.query(
    `SELECT * FROM users`,
    function(err, result) {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
});

// app.delete("/users", function(req, res) {
//   connection.query(
//     `DELETE FROM users`,
//     function(err, result) {
//       if (!err) {
//         res.send("Successfully deleted all users");
//       }
//     });
// });

app.get("/users/:usersId", function(req, res) {
  const usersId = req.params.usersId;
  connection.query(
    `SELECT * FROM users WHERE users_id = "${usersId}";`,
    function(err, result) {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
});

app.delete("/users/usersId", function(req, res) {
  const usersId = req.params.usersId;
  connection.query(
    `DELETE FROM users WHERE users_id = "${usersId}";`,
    function(err, result) {
      if (!err) {
        res.send("Successfully deleted user");
      }
    });
});


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
