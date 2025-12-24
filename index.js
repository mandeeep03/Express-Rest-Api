const express = require('express');
const fs = require('fs')
const users = require('./Data/users.json'); 
const { json } = require('stream/consumers');


const app = express();
const PORT =2000;
//middleware - used to put data in body
app.use(express.urlencoded({extended:false}))

app.get('/', (req, res) => {
    res.send("Hello from server");
});
//for serverside rendering  - send html page
app.get('/users',(req,res)=>{
    const html = `<ul>
    ${users.map((users)=>`<li>${users.first_name}</li>`).join("")}
    </ul>`
    return res.send(html)

})
//for client side rendering - send json data
app
.route('/api/users')
.get((req, res) => {
    res.json(users);
})
.post((req,res)=>{
    const body = req.body
    users.push({id : users.length+1,...body})
    fs.writeFile('./Data/users.json',JSON.stringify(users),(err,data)=>{
        res.json({"User added":"success"})
    })
})

app
.route('/api/users/:id')//id is a dynamic parameter that will be in url 
.get((req, res) => {
    const id = Number(req.params.id)
    const user = users.find(user=>user.id===id)
    res.json(user)
})
.patch((req,res)=>{
    const id = Number(req.params.id)
    const user = users.find(user=>user.id===id)

    Object.assign(user,req.body)

    fs.writeFile('./Data/users.json', JSON.stringify(user),(err,data)=>{
        res.json({"status":"success"})
    })
})




app.listen(PORT, (err) => { 
    console.log(err)
    console.log(`Server started at: http://localhost:${PORT}`);
});