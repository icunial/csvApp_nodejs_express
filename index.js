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
      return next();
    });
});

// Download
app.get("/download", (req, res, next) => {
  axios
    .get("https://jsonplaceholder.typicode.com/todos")
    .then(async (results) => {
      const csv = await converter.json2csv(results.data);
      fs.writeFile("todos.csv", csv, (err) => {
        if (err) {
          throw err;
        }
        console.log("File Written!");
      });
      res.status(200).json({
        statusCode: 200,
        data: results.data,
      });
    })
    .catch((err) => {
      console.log(err);
      return next();
    });
});

// Error Handler Middleware
app.use((req, res, next) => {
  res.status(500).json({
    statusCode: 500,
    msg: `Server Internal Error`,
  });
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}...`);
});
