const express = require("express");
const fs = require("fs");
const mongoose = require("mongoose");
const users = require("./Data/users.json");

//Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/my-rest-api")
  .then(() => console.log("Databse Connected !!!"))
  .catch((err) => console.log(err));

//schema
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  jobTitle: {
    type: String,
  },
  gender: {
    type: String,
  },
});

//Model
const User = mongoose.model("user", userSchema);

const app = express();
const PORT = 2000;

//middleware fro encode data in body
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Hello from server");
});

// server-side rendering-sends mhtml from sever
app.get("/users", (req, res) => {
  //create html page
  const html = `
    <ul>
      ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
    </ul>
  `;
  res.send(html);
});

// all users:client side rendering
app
  .route("/api/users")
  .get((req, res) => {
    res.json(users);
  })
  .post(async (req, res) => {
    const body = req.body;
    //return 400 for bad request (incomplete information)
    if (
      !body ||
      !body.first_name ||
      !body.email ||
      !body.gender ||
      !body.job_tittle
    )
    {
      return res.status(400).json({ msg: "all feilds are required ..." });
    }

    const result = await User.create({
      firstName: body.first_name,
      lastName: body.last_name,
      email: body.email,
      gender: body.gender,
      jobTitle: body.job_tittle
    });
    console.log(result)
    return res.status(201).json({msg:"User Created !!!"})
  });

// single user
app
  .route("/api/users/:id")
  .get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((u) => u.id === id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  })
  .patch((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((u) => u.id === id);
    if (!user) return res.status(404).json({ error: "User not found" });

    Object.assign(user, req.body);

    fs.writeFile("./Data/users.json", JSON.stringify(users), (err) => {
      if (err) return res.status(500).json({ error: "Failed to update user" });
      res.json(user);
    });
  })
  .delete((req, res) => {
    const id = Number(req.params.id);
    const index = users.findIndex((u) => u.id === id);
    if (index === -1) return res.status(404).json({ error: "User not found" });

    const removed = users.splice(index, 1)[0];

    fs.writeFile("./Data/users.json", JSON.stringify(users), (err) => {
      if (err) return res.status(500).json({ error: "Failed to delete user" });
      res.json(removed);
    });
  });

app.listen(PORT, () => {
  console.log(`Server started at: http://localhost:${PORT}`);
});
