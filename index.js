const express = require("express");
const fs = require("fs");
const users = require("./Data/users.json");

const app = express();
const PORT = 2000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from server");
});

// server-side rendering-sends mhtml from sever
app.get("/users", (req, res) => {
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
  .post((req, res) => {
    const body = req.body;
    if (!body.first_name) {
      return res.status(400).json({ error: "first_name is required" });
    }

    const newUser = { id: users.length + 1, ...body };
    users.push(newUser);

    fs.writeFile("./Data/users.json", JSON.stringify(users, null, 2), (err) => {
      if (err) return res.status(500).json({ error: "Failed to save user" });
      res.status(201).json(newUser);
    });
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
