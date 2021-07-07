const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const todoSchema = require("../schemas/todoSchema");
const Todo = new mongoose.model("Todo", todoSchema);

//Get all the todos
router.get("/",  (req, res) => {
   Todo.find({ status: "active" })
    .select({
      _id: 0,
      __v: 0,
      date: 0,
    })
    .limit(2)
    .exec((err, data) => {
      if (err) {
        res.status(500).json({
          error: "There was an server side error",
        });
      } else {
        res.status(200).json({
          result: data,
          message: "Todo was found successfully",
        });
      }
    });
});

//get a todo by id
router.get("/:id", async (req, res) => {
  try{
    const data = await Todo.find({ _id: req.params.id };
      res.status(200).json({
        result: data,
        message:"Success"
      })
  }
  catch(err){
    res.status(500).json({
      error:"There was an server side error",
    })
  }
});

//post a todo
router.post("/", (req, res) => {
  const newTodo = new Todo(req.body);
  newTodo.save((err) => {
    if (err) {
      res.status(500).json({
        error: "There was an server side error",
      });
    } else {
      res.status(200).json({
        message: "Todo was inserted successfully",
      });
    }
  });
});

//post multiple todo
router.post("/all", async (req, res) => {
  await Todo.insertMany(req.body, (err) => {
    if (err) {
      res.status(500).json({
        error: "There was an server side error",
      });
    } else {
      res.status(200).json({
        message: "Todos were inserted successfully",
      });
    }
  });
});

//put a todo
router.put("/:id", async (req, res) => {
  await Todo.updateOne(
    { _id: req.params.id },
    {
      $set: {
        status: "active",
      },
    },
    (err) => {
      if (err) {
        res.status(500).json({
          error: "There was an server side error",
        });
      } else {
        res.status(200).json({
          message: "Todo update successfully",
        });
      }
    }
  );
});
//put a todo
router.put("/:id", async (req, res) => {
  await Todo.findByIdAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        status: "active",
      },
    },
    {
      new: True,
      useFindAndModify: false,
    },
    (err) => {
      if (err) {
        res.status(500).json({
          error: "There was an server side error",
        });
      } else {
        res.status(200).json({
          message: "Todo update successfully",
        });
      }
    }
  );
});

//delete todo
router.delete("/:id", async (req, res) => {
  await Todo.deleteOne({ _id: req.params.id }, (err) => {
    if (err) {
      res.status(500).json({
        error: "There was an server side error",
      });
    } else {
      res.status(200).json({
        message: "Todo was deleted successfully",
      });
    }
  });
});

module.exports = router;
