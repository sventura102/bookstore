var express = require("express");
var app = express();
const bodyParser = require("body-parser");
const port = 3000;
const dotenv = require("dotenv").config();
const mongodb = require("./db/connect");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger-output.json");
const { auth, requiresAuth } = require("express-openid-connect");

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.CLIENT_SECRET,
  baseURL: "https://books-z7vs.onrender.com",
  clientID: process.env.clientID,
  issuerBaseURL: "https://dev-lk7oot47rptfzc7y.us.auth0.com",
};

app
  .use(auth(config))
  .use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
  })

  .get("/", (req, res) => {
    res.send(req.oidc.isAuthenticated() ? "Logged in" : "Logged out");
  })

  .get("/profile", requiresAuth(), (req, res) => {
    res.send(JSON.stringify(req.oidc.user));
  });

// Access Library
app.use("/", require("./routes/index"));

process.on("uncaughtException", (err, origin) => {
  console.log(
    process.stderr.fd,
    `Caught exception: ${err}\n` + `Exception origin: ${origin}`
  );
});

mongodb.initDb((err, mongodb) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});
