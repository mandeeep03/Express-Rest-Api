const express = require("express");
const userRouter = require('./Routes/user')
const {connectMongoDB} = require('./connection.js')

connectMongoDB("mongodb://127.0.0.1:27017/my-rest-api");


const app = express();
const PORT = 2000;

//middleware fro encode data in body
app.use(express.urlencoded({ extended: false }));
app.use('/api/users',userRouter)

app.get("/", (req, res) => {
  res.send("Hello from server");
});


app.listen(PORT, () => {
  console.log(`Server started at: http://localhost:${PORT}`);
});
