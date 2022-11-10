const cookieParser = require("cookie-parser");
const csrf = require("csurf");
const bodyParser = require("body-parser");
const express = require("express");
const admin = require("firebase-admin");
const hbs = require("hbs");
const { engine } = require('express-handlebars');
require("./static/js/db/conn");


const serviceAccount = require("./serviceAccountKey.json");
const Register = require("./static/js/models/registers");


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://aadharcardscanner-72071.firebaseio.com",
});

const csrfMiddleware = csrf({ cookie: true });

const PORT = process.env.PORT || 5000;
const app = new express();

app.engine("html", require("ejs").renderFile);
app.use(express.static("static"));
app.use(express.static(__dirname+'/static'));
app.set("view engine","hbs");
app.set("views","./views");
hbs.registerPartials("./partials");

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(bodyParser.json());
app.use(cookieParser());
app.use(csrfMiddleware);

app.all("*", (req, res, next) => {
  res.cookie("XSRF-TOKEN", req.csrfToken());
  next();
});

app.get("/login", function (req, res) {
  res.render("login.html");
});

app.get("/signup", function (req, res) {
  res.render("signup.html");
});



app.get("/", function (req, res) {
  res.render("index");
});

app.get("/donate",function(req,res){
    res.render("donate");
})
app.get("/containment",function(req,res){
    res.render("containment");
})
app.get("/hospital",function(req,res){
    res.render("hospital");
})
// app.get("/vaccine",function(req,res){
//     res.render("vaccine");
// })
app.get("/register",function(req,res){
    res.render("register");
})
app.get("/donate",function(req,res){
  res.render("donate");
})
app.get("/money",function(req,res){
  res.render("money");
})

app.post("/register",async(req,res)=>{
  try{
      const registerStudent = new Register({
          USN: req.body.USN,
          email:req.body.email,
          Name:req.body.Name,
          Branch:req.body.Branch,
          Phone: req.body.Phone
      })
      const registered = await registerStudent.save();
      res.status(201).render("index");

  }catch(error)
  {
      res.status(400).send(error);
  }
})

app.get("/contact",function(req,res){
    res.render("contact");
})
// app.get("/login",function(req,res){
//     res.render("login2");
// })
app.get("/vaccine",(req,res)=>{
    const sessionCookie = req.cookies.session||""
    admin.auth().verifySessionCookie(sessionCookie,true)
    .then(()=>{
        res.render("vaccine")

    })
    .catch((error)=>{
        res.redirect('/login')
    })
})

app.get('/sessionLogout',(req,res)=>{
    res.clearCookie("session")
    res.redirect('/login')
})

app.post("/sessionLogin", (req, res) => {
  const idToken = req.body.idToken.toString();

  const expiresIn = 60 * 60 * 24 * 5 * 1000;

  admin
    .auth()
    .createSessionCookie(idToken, { expiresIn })
    .then(
      (sessionCookie) => {
        const options = { maxAge: expiresIn, httpOnly: true };
        res.cookie("session", sessionCookie, options);
        res.end(JSON.stringify({ status: "success" }));
      },
      (error) => {
        res.status(401).send("UNAUTHORIZED REQUEST!");
      }
    );
});


app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});