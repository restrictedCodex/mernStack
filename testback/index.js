const express = require("express");

const app = express();

// const port = 3000

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

// app.listen(port, () => {
//   console.log(`Example app listening at http://localhost:${port}`)
// })

const port = 3600;

app.get("/login", (req,res) => {
    return res.send("login with your credential")
})

app.get("/signup", (req,res) => {
    return res.send("signup to enjoy our services")
})

const admin = (req,res) => {
    return res.send("this is admin with var");
}

const isAdmin = (req,res,next) => {
    return res.send("is Admin is running");
    next();
}

app.get("/admin",isAdmin, admin);

app.get("/charu", (req,res) => {
    return res.send("learning ")
})

app.listen(port, () => {
     console.log(`server is running at http://localhost:${port}`)
})