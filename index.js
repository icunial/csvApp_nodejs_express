const express = require("express");
const app = express();

const PORT = process.env.PORT || 5000;

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
