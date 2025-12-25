const express = require("express");
const mongoose = require("mongoose");


//Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/my-rest-api")
  .then(() => console.log("Databse Connected !!!"))
  .catch((err) => console.log(err));

//schema
const userSchema = new mongoose.Schema(
  {
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
  },
  {
    timestamps: true,
  }
);

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
app.get("/users", async (req, res) => {
  //create html page
  const allUser = await User.find({});
  const html = `
    <ul>
      ${allUser.map((user) => `<li>${user.firstName}</li>`).join("")}
    </ul>
  `;
  res.send(html);
});

// all users:client side rendering
app
  .route("/api/users")
  .get(async (req, res) => {
    const allUser = await User.find({});
    res
      .status(200)
      .json(allUser);
  })
  .post(async (req, res) => {
    const body = req.body;
    //return 400 for bad request (incomplete information)
    if (
      !body.first_name ||
      !body.email || 
      !body.gender || 
      !body.job_tittle) {
      return res
                .status(400)
                .json({ msg: "all feilds are required ..." });
    }

    const result = await User.create({
      firstName: body.first_name,
      lastName: body.last_name,
      email: body.email,
      gender: body.gender,
      jobTitle: body.job_tittle,
    });
    console.log(result);
    return res
              .status(201)
              .json({ msg: "User Created !!!" });
  });

// single user
app
  .route("/api/users/:id")
  .get(async (req, res) => {
    const user = await User.findById(req.params.id)
    if (!user) return res
                          .status(404)
                          .json({ error: "User not found" });
    res.json(user);
  })
  .patch(async (req, res) => {
    await User.findByIdAndUpdate(req.params.id,req.body)
              .then(()=>res.status(200).json({msg:"User updated"}))

    
  })
  .delete(async (req, res) => {
    await User.findByIdAndDelete(req.params.id)
              .then(()=>res.status(200).json({msg:"Deleted"}))
  });

app.listen(PORT, () => {
  console.log(`Server started at: http://localhost:${PORT}`);
});
