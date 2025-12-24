const express = require('express');
const fs = require('fs')
const users = require('./Data/users.json'); 


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
app.get('/api/users', (req, res) => {
    res.json(users);
});

app
.route('/api/users/:id')//id is a dynamic parameter that will be in url 
.get((req, res) => {
    const id = Number(req.params.id)
    const user = users.find(user=>user.id===id)
    res.json(user)
})


app.post('/api/users',(req,res)=>{
    const body = req.body
    console.log(body)
})

app.listen(PORT, (err) => { 
    console.log(err)
    console.log(`Server started at: http://localhost:${PORT}`);
});