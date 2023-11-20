const express = require("express");
const mongoose = require("mongoose");
const Blog = require("./models/blog");

const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

const dbURI =
  "mongodb+srv://xanderas90:a16543258a@cluster0.em3qhdj.mongodb.net/note-tuts?retryWrites=true&w=majority";
mongoose
  .connect(dbURI)
  .then((result) => {
    app.listen(8080, () => {
      console.log("Running server");
    });
    console.log("Conntected");
  })
  .catch((error) => console.error(error));

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/blogs", (req, res) => {
  const body = req.body;
  const blog = new Blog(body);

  blog
    .save()
    .then((result) => {
      res.status(201).send();
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send(err);
    });
});

app.get("/all-blogs", async (req, res) => {
  const results = await Blog.find();
  res.send(results);
});

app.get("/blogs/:id", (req, res) => {
  const id = req.params.id;

  Blog.findById(id)
    .then((result) => res.status(200).send(result))
    .catch((err) => console.error(err));
});

app.delete("/blogs/:id", (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndDelete(id)
    .then((result) => res.status(200).send())
    .catch((err) => console.error(err));
});

export default app;