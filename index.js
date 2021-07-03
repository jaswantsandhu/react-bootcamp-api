const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors")
const app = express();
const SECRET_KEY = "dsfhjhfjshfhsdkfhskfskahfkjahkfhdksheuklrykdwpotuoi4yiu6876*&^&%gds"

app.use(express.json())
app.use(cors());

const users = [];

// GET POST PUT PATCH DELETE
// POST /login
// POST /user

app.post("/login", (req, res)=>{
    const { email, password } = req.body;
    const user = users.find((item)=>{
        return item.email === email && item.password === password
    })
    if(user)
        {
            const { id } = user
            const token = jwt.sign({ id }, SECRET_KEY);
            res.json({ accessToken : token })
        }
    else
        {
            res.json({ status : "error" })
        }
});

app.post("/register", (req, res)=>{
    const { email, password } = req.body;
    const id = Math.ceil(Math.random() * 10000000000);
    const token = jwt.sign({ id }, SECRET_KEY)
    users.push({ email, password, id });
    res.json({ accessToken : token })
});

app.post("/user", (req, res)=>{
    const { authorization } = req.headers;
    const decoded = jwt.verify(authorization, SECRET_KEY);
    const { id } = decoded;
    const user = users.find((item)=>{
        return item.id === id
    })

    delete user.password
    user.roles = "manager"

    if(decoded){
        res.json({ status : "success", user })
    }
    else
    {
        res.json({ status : "error" })
    }

    res.json({ accessToken : "dasdsad" })
});

app.listen(8080, ()=>{
    console.log("application started at 8080.")
})




















// es6
// import http from "http";


// const server = http.createServer((req, res)=>{
//     console.log(req);
//     res.end("Hello World!!!")
// })

// server.listen(8080)
// console.log("Server started at 8080.")