const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const { client, dbName } = require("./db");
const ProductsModel = require("./db/schema/products");
const UsersModel = require("./db/schema/user");
const ExpressGraphQL = require("express-graphql");
const { graphqlHTTP } = ExpressGraphQL 
const RootSchema = require("./schema")

const port = process.env.PORT || 8080

if (process.env.NODE_ENV === "production") {
  require("dotenv").config({ path: ".prod.env" });
} else {
  require("dotenv").config();
  console.log("dadsa")
}

console.log(process.env);

// Routers
const ProductRouter = require("./routes/products");

const app = express();
app.use(express.json());
app.use(cors());

// GET POST PUT PATCH DELETE
// POST /login
// POST /user

// /products
// /products/1
// /products/add

app.use("/graphql", graphqlHTTP({
    schema : RootSchema,
    graphiql : process.env.NODE_ENV !== "production"
}))

app.use("/public", express.static("public"));

app.use("/products", ProductRouter);

app.use("api/v1/products", ProductRouter);

app.use("api/v2/products", ProductRouter);

app.get("/test-url", (req, res)=>{
    res.json("dasdsadad")
})

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UsersModel.findOne({ email, password });
    const { _id } = user;
    const token = jwt.sign({ _id }, process.env.SECRET_KEY);
    res.json({ status: "success", accessToken: token });
  } catch (error) {
    res.json({ status: "error" });
  }
});

app.post("/register", (req, res) => {
  const { email, password } = req.body;
  const id = Math.ceil(Math.random() * 10000000000);
  const token = jwt.sign({ id }, process.env.SECRET_KEY);
  users.push({ email, password, id });
  res.json({ accessToken: token });
});

app.post("/user", (req, res) => {
  try {
    const { authorization } = req.headers;
    const decoded = jwt.verify(authorization, process.env.SECRET_KEY);
    const { id } = decoded;
    const user = users.find((item) => {
      return item.id === id;
    });

    delete user.password;
    user.roles = "manager";

    if (decoded) {
      res.json({ status: "success", user });
    } else {
      res.json({ status: "error" });
    }
    res.json({ accessToken: "dasdsad" });
  } catch (error) {
    console.log(error);
  }
});

app.listen(8080, () => {
  console.log("application started at 8080.");
});

// es6
// import http from "http";

// const server = http.createServer((req, res)=>{
//     console.log(req);
//     res.end("Hello World!!!")
// })

// server.listen(8080)
// console.log("Server started at 8080.")
