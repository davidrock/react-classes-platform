import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.json({
    msg: "ok",
  });
});

app.listen(3333);
