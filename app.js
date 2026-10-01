const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

const LOGIN_USER = {
  username: "purvesh",
  password: "123",
};

function Home(req, res) {
  if (!req.cookies.user) {
    return res.redirect("/login");
  }

  res.render("index", {
    user: req.cookies.user,
  });
}

function showLogin(req, res) {
  res.render("login");
}

function checkLogin(req, res) {
  const { username, password } = req.body;

  if (username === LOGIN_USER.username && password === LOGIN_USER.password) {
    res.cookie("user", username);
      return res.redirect("/");
  }

  res.send("Wrong username or password");
}

function logoutUser(req, res) {
  res.clearCookie("user");
  res.redirect("/");
}

app.get("/", Home);

app.get("/login", showLogin);

app.post("/login", checkLogin);

app.get("/logout", logoutUser);

app.listen(3000, () => {
  console.log("http://localhost:3000");
});