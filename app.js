const express = require("express");
const app = express();
const mongoose = require('mongoose');
const session = require("express-session");
const path = require("path");
const bodyParser = require("body-parser"); // Add this line
const Caller = require("./models/caller.js");
const Receiver = require("./models/receiver.js");
const validateCaller = require("./middleware.js");
const validateReceiver = require("./middleware.js");
const passport = require("passport");
const LocalStrategy = require("passport-local");

let MONGO_URL = "mongodb://127.0.0.1:27017/testing";

main()
.then(() => {
    console.log("Connected to DB");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect(MONGO_URL);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const sessionOptions = {
    secret : "mysupersecretcode",
    resave : false,
    saveUninitialized : true,
    cookie : {
        expires : Date.now() + 7 * 24 * 60 * 60 *1000,
        maxAge : 7 * 24 * 60 * 60 *1000,
        httpOnly : true,
    },
};

app.use(session(sessionOptions));

app.use(bodyParser.urlencoded({ extended: true })); // Add this line to parse form data
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(Caller.authenticate()));

passport.serializeUser(Caller.serializeUser());
passport.deserializeUser(Caller.deserializeUser());

app.get("/demouser", async (req,res) => {
    let fakeUser = ({
        username : "delta-student",
        email : "john@gmail.com",
        password : "fsdfad",
        phoneNumber : "0989999090",
        gender : "Male",
        dob : "2006/02/20",
        address : "fasdaasfadsas",
        imgURL : "fsfasdffs",
        language : "English",
        status : "offline"
    });

    let registeredCaller = await Caller.register(fakeUser, "helloWorld");
    console.log(registeredCaller);
});

app.get("/listen", async (req, res) => {
    res.render("index.ejs");
});

app.get("/callerForm", (req, res) => {
    res.render("caller.ejs");
});

app.get("/receiverForm", (req, res) => {
    res.render("receiver.ejs");
});

app.post('/submitCall',validateCaller, async (req, res) => {
   
    let newCaller = new Caller(req.body.caller);

    try {
        let registeredCaller = await Caller.register(req.body.caller, req.body.caller.password);
        res.redirect("/home");
    } catch (error) {
        res.status(500).send("Error saving caller: " + error.message);
    }

});

app.post("/submitRec", async (req,res) => {

    let newReceiver = new Caller(req.body.receiver);

    try {
        let registeredCaller = await Caller.register(req.body.caller, req.body.caller.password);
        res.send("Successfully Connected");
    } catch (error) {
        res.status(500).send("Error saving caller: " + error.message);
    }
})

app.get("/callerLogin", (req,res) => {
    res.render("callerLogin.ejs");
});


app.post("/callerLogin",  passport.authenticate("local", {
    failureRedirect : "/",
    failureFlash : false,
   }), (req,res) =>{
    res.redirect("/home");
});

app.get("/", (req,res) => {
    res.send("Wrong Password");
});

app.get("/home", (req,res) => {
    res.send("Welcome to Listen.com");
});

app.listen(8080, () => {
    console.log("app is listening to port 8080");
});