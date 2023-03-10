const express = require("express");
const app = express();
const PORT = process.env.PORT || 3030;

//////////////////////
const path = require("path");
const mongoose = require('mongoose');
const bodyparser = require("body-parser");
mongoose.connect('mongodb://127.0.0.1:27017/contact').then(() => {
    console.log("connected to database");
})
const port = 80;

//define mongoose schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    address: String,
    email: String,
    desc: String,
});

const Contact = mongoose.model('Contact', contactSchema);


// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory

// ENDPOINTS
app.get('/', (req, res) => {

    const params = {}
    res.status(200).render('home.pug', params);
})
app.get('/contact', (req, res) => {

    const params = {}
    res.status(200).render('contact.pug', params);
})
app.get('/services', (req, res) => {

        const params = {}
        res.status(200).render('services.pug', params);
    })
    //////////////////////
app.get('/about', (req, res) => {

    const params = {}
    res.status(200).render('about.pug', params);
})
app.get('/classinfo', (req, res) => {

        const params = {}
        res.status(200).render('classinfo.pug', params);
    })
    ////////////////////////////

app.post('/contact', (req, res) => {
    var myData = new Contact(req.body);
    myData.save().then(() => {
        res.send("This item has been saved to the Database");
    }).catch(() => {
        res.status(400).send("Thank You for Contacting Us");

    })
});

// START THE SERVER
app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`);
});