require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const encrypt = require("mongoose-encryption");

const app = express();

const dbHost = process.env.DB_HOST;
const secret = process.env.SECRET;

app.set("view engine", "ejs");
app.use(express.static("public"), bodyParser.urlencoded({extended: true}));

mongoose.connect(dbHost);

const userSchema = new mongoose.Schema({
    email: String,
    password: String
});

userSchema.plugin(encrypt, {secret: secret, encryptedFields: ['password']});

const User = new mongoose.model("User", userSchema);


app.get("/", (req, res) => {
    res.render("home")
});

app.route("/login")
    .get((req, res) => {
        res.render("login")
    })

    .post((req, res) => {
        const username = req.body.username
        const password = req.body.password

        User.findOne({email: username}).then((foundUser) => {
                if (foundUser) {
                    if (foundUser.password === password) {
                        res.render("secrets")
                    } else {
                        res.send("Error")
                    }
                } else {
                    res.send("err")
                }
            }
        )

    })




app.route("/register")
    .get((req, res) => {
        res.render('register')
    })

    .post((req, res) => {
        const newUser = new User({
            email: req.body.username,
            password: req.body.password
        });

        newUser.save().then((err) => {
            if (!err) {
                console.log(err)
            } else {
                res.render("secrets")
            }
        })
    })



app.listen(3000, () => {
    console.log("Server started on port 3000")
})