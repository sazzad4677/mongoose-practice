const express = require("express");
const mongoose = require("mongoose");

//initialization
const app = express();
app.use(express.json());
const todoHandler = require("./routeHandler/todo-handler");

//database connection with mongoose
mongoose
  .connect("mongodb://localhost/todos", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connection success"))
  .catch((err) => console.log(err));

//applications routes
app.use('/todo',todoHandler);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

//default error handler
function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }
}

app.listen(5000, () => {
  console.log(`Example app listening at http://localhost:${5000}`);
});
