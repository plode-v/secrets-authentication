require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
// const encrypt = require("mongoose-encryption");
const md5 = require("md5");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");


const app = express();

const dbHost = process.env.DB_HOST;

app.set("view engine", "ejs");
app.use(express.static("public"), bodyParser.urlencoded({extended: true}));
app.use(session({
    secret: "ourlistofsecrets",
    resave: false,
    saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());


try {
    mongoose.set('strictQuery', false)
    mongoose.connect(process.env.DB_HOST) 
    console.log('Mongo connected')
} catch(error) {
    console.log(error)
    process.exit()
}





const userSchema = new mongoose.Schema({
    email: String,
    password: String
});

userSchema.plugin(passportLocalMongoose);

// userSchema.plugin(encrypt, {secret: secret, encryptedFields: ['password']});

const User = new mongoose.model("User", userSchema);

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/", (req, res) => {
    res.render("home")
});


app.get('/login',(req, res) => {
    res.render("login")
})



app.get("/register", (req, res) => {
        res.render('register')
    });

app.get('/secrets', (req, res) => {
    if (req.isAuthenticated) {
        res.render("secrets")
    } else {
        res.redirect("/login");
    }
})


app.post("/register", (req, res) => {
    User.register({username: req.body.username}, req.body.password, function(err, user) {
        if (err) {
            console.log(err);
            res.redirect("/register");
        } else {
            passport.authenticate("local")(req, res, function(){
                res.redirect("/secrets");
            })
        }
      });

});



app.post('/login',(req, res) => {


});


app.listen(3000, () => {
    console.log("Server started on port 3000")
})