const express = require("express");
const app = express();
const mongoose = require('mongoose');
const path = require("path");
const bodyParser = require("body-parser"); // Add this line
const Caller = require("./models/caller.js");
const Receiver = require("./models/receiver.js");

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

app.use(bodyParser.urlencoded({ extended: true })); // Add this line to parse form data

app.get("/listen", async (req, res) => {
    res.render("index.ejs");
});

app.get("/callerForm", (req, res) => {
    res.render("caller.ejs");
});

app.get("/receiverForm", (req, res) => {
    res.render("receiver.ejs");
});

app.post('/submitCall', async (req, res) => {

    let newCaller = new Caller({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        phoneNumber: req.body.phoneNumber,
        gender: req.body.gender,
        dob: new Date(req.body.dob),
        address: req.body.address,
        imgURL: req.body.imgURL,
        language: req.body.language.split(',').map(lang => lang.trim()), // Ensure it's an array
        status: req.body.status
    });

    try {
        await newCaller.save();
        res.send("Successfully Connected");
    } catch (error) {
        res.status(500).send("Error saving caller: " + error.message);
    }

});

app.post("/submitRec", async (req,res) => {
    let newReceiver = new Receiver({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        phoneNumber: req.body.phoneNumber,
        gender: req.body.gender,
        dob: new Date(req.body.dob),
        address: req.body.address,
        imgURL: req.body.imgURL,
        language: req.body.language.split(',').map(lang => lang.trim()), // Ensure it's an array
        status: req.body.status
    });

    try {
        await newReceiver.save();
        res.send("Successfully Connected");
    } catch (error) {
        res.status(500).send("Error saving caller: " + error.message);
    }
})

app.listen(8080, () => {
    console.log("app is listening to port 8080");
});