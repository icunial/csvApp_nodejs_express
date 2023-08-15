const express = require("express");
const app = express();

const axios = require("axios");

const PORT = process.env.PORT || 5000;

const converter = require("json-2-csv");
const fs = require("fs");

// GET all todos
app.get("/", (req, res, next) => {
  axios
    .get("https://jsonplaceholder.typicode.com/todos")
    .then((results) => {
      res.status(200).json({
        statusCode: 200,
        data: results.data,
      });
    })
    .catch((err) => {
      next();
    });
});

// Download
app.get("/download", (req, res, next) => {
  axios
    .get("https://jsonplaceholder.typicode.com/todos")
    .then(async (results) => {
      try {
        const csv = await converter.json2csv(results.data);
        fs.writeFile("todos.csv", csv, (err) => {
          if (err) {
            throw next();
          }
          res.status(200).download("todos.csv", (err) => {
            if (err) {
              return next();
            }
            fs.unlink("todos.csv", (err) => {
              if (err) {
                return next();
              }
            });
          });
        });
      } catch (err) {
        return next();
      }
    })
    .catch((err) => {
      return next();
    });
});

// Error Handler Middleware
app.use((req, res, next) => {
  return res.status(500).json({
    statusCode: 500,
    msg: `Server Internal Error`,
  });
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}...`);
});
