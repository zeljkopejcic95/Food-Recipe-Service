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
      function(error, result) {
        if (error) {
          console.log(error);
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
          if (result[0].password === bcrypt.compare(password, result[0].password, function(error, data){
            if (error) {
              console.log(error);
            } else {
              console.log("Successfully logged");
              console.log(result);
            }
          }));
        }
      }

      const token = jwt.sign({userId: result[0].users_id}, process.env.PRIVATE_KEY, {expiresIn: "1h"});
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

// list all recepies

// app.get("/recipe", verifyToken, function(req, res) {
//
//   jwt.verify(req.token, process.env.PRIVATE_KEY, function(err, data) {
//     if (err) {
//       res.sendStatus(403);
//     } else {
//       console.log(data.userId);
//       connection.query(
//         `SELECT * FROM food_recipe`,
//         function(error, result) {
//           if (error) {
//             console.log(error);
//           } else {
//             res.send(result);
//           }
//         });
//     }
//   });
// });

// list all recepies from specific user

app.get("/recipe", verifyToken, function (req, res){
  jwt.verify(req.token, process.env.PRIVATE_KEY, function(err, data) {
    if (err) {
      res.sendStatus(403);
    } else {
      console.log(data);
      connection.query(`SELECT * FROM food_recipe WHERE users_id = "${data.userId}"`, function (error, result){
                          if (error) {
                            console.log(error);
                          } else {
                            res.send(result);
                          }
                        });
    }
  });
});

// create new recipe with user ID

app.post("/recipe", verifyToken, function(req, res) {

jwt.verify(req.token, process.env.PRIVATE_KEY, function(err, data) {
  if (err) {
    res.sendStatus(403);
  } else {
    console.log(data);
    connection.query(`INSERT INTO food_recipe (name, ingredients, recipe_text, users_id)
                      VALUES ("${req.body.name}", "${req.body.ingredients}", "${req.body.recipeText}", "${data.userId}");`,
                    function(error, result) {
                      if (error) {
                        console.log(error);
                      } else {
                        res.send(result);
                      }
                    });
  }
});
});

// app.post("/recipe", function (req, res) {
//
//
//   const foodName = req.body.name;
//   const foodIngredients = req.body.ingredients;
//   const recipeText = req.body.recipeText;
//   const newRecipe = `INSERT INTO food_recipe (name, ingredients, recipe_text, users_id)
//                      VALUES ("${foodName}", "${foodIngredients}", "${recipeText}");`
//
//   connection.query(newRecipe, function(err, result) {
//     if (err) {
//       console.log(err);
//     } else {
//       res.send(result);
//     }
//   });
// });

app.get("/ingredients", verifyToken, function(req, res) {

jwt.verify(req.token, process.env.PRIVATE_KEY, function(err, data) {
  if (err) {
    res.sendStatus(403);
  } else {
    connection.query(
      `SELECT ingredients FROM food_recipe`,
      function(error, result) {
        if (error) {
          console.log(error);
        } else {
          res.send(result);
        }
      });
  }
 });
});

app.get("/recipe_text", verifyToken, function(req, res) {

jwt.verify(req.token, process.env.PRIVATE_KEY, function(err, data) {
  if (err) {
    res.sendStatus(403);
  } else {
    connection.query(
      `SELECT recipe_text FROM food_recipe`,
      function(error, result) {
        if (error) {
          console.log(error);
        } else {
          res.send(result);
        }
      });
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


app.get("/recipe/:recipeId", verifyToken, function(req, res) {
  const recipeId = req.params.recipeId;

jwt.verify(req.token, process.env.PRIVATE_KEY, function(err, data) {
  if (err) {
    res.sendStatus(403);
  } else {
    connection.query(
      `SELECT * FROM food_recipe WHERE recipe_id = "${recipeId}";`,
      function(error, result) {
        if (error) {
          console.log(error);
        } else {
          res.send(result);
        }
      });
  }
 });
});

app.put("/recipe/:recipeId", verifyToken, function(req, res) {
  const foodName = req.body.name;
  const foodIngredients = req.body.ingredients;
  const recipeText = req.body.recipeText;

  jwt.verify(req.token, process.env.PRIVATE_KEY, function(err, data) {
    if (err) {
      res.sendStatus(403);
    } else {
      connection.query(
        `UPDATE food_recipe
         SET name = "${foodName}", ingredients = "${foodIngredients}", recipe_text = "${recipeText}", users_id = "${data.userId}"
         WHERE recipe_id = "${req.params.recipeId}";`,
         function (error, result) {
           if (error) {
             console.log(error);
           } else {
             console.log("Successfully updated.");
             res.send(result);
           }
         });
    }
  });
});

app.delete("/recipe/:recipeId", verifyToken, function(req, res) {
  const recipeId = req.params.recipeId;

jwt.verify(req.token, process.env.PRIVATE_KEY, function(err, data) {
  if (err) {
    res.sendStatus(403);
  } else {
    connection.query(
      `DELETE FROM food recipe WHERE recipe_id = "${recipeId}";`,
      function(error, result) {
        if (!error) {
          res.send("Successfully deleted recipe");
        }
      });
  }
 });
});

// USERS table


app.get("/users", verifyToken, function(req, res) {

jwt.verify(req.token, process.env.PRIVATE_KEY, function(err, data) {
  if (err) {
    res.sendStatus(403);
  } else {
    connection.query(
      `SELECT first_name, last_name, email FROM users`,
      function(error, result) {
        if (error) {
          console.log(error);
        } else {
          res.send(result);
        }
      });
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

app.get("/users/:usersId", verifyToken, function(req, res) {
  const usersId = req.params.usersId;

jwt.verify(req.token, process.env.PRIVATE_KEY, function(err, data) {
  if (err) {
    res.sendStatus(403);
  } else {
    connection.query(
      `SELECT first_name, last_name, email FROM users WHERE users_id = "${usersId}";`,
      function(error, result) {
        if (error) {
          console.log(error);
        } else {
          res.send(result);
        }
      });
  }
 });
});

app.delete("/users/:usersId", function(req, res) {
  const usersId = req.params.usersId;

jwt.verify(req.token, process.env.PRIVATE_KEY, function(err, data) {
  if (err) {
    res.sendStatus(403);
  } else {
    connection.query(
      `DELETE FROM users WHERE users_id = "${usersId}";`,
      function(error, result) {
        if (!error) {
          res.send("Successfully deleted user");
        }
      });
  }
 });
});


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
