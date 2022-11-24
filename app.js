const express = require("express")
const bodyParser = require("body-parser")
const date = require(__dirname + "/date.js")
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://nedwards154:Test123@cluster0.jubrz2e.mongodb.net/tododb');

const app = express()

let counter = 3;
let redirect = false;

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true})) //let, var, const
app.use(express.static("public"))

const itemSchema = {
    _id: Number,
    itemName: String
}

const Task = mongoose.model("Task", itemSchema)

const task1 = new Task({
    _id: 0,
    itemName: 'Buy Food' 
})

const task2 = new Task({
    _id: 1,
    itemName: 'Cook Food' 
})

const task3 = new Task({
    _id: 2,
    itemName: 'Eat Food' 
})

let items = [task1, task2, task3];

app.get("/", function(req, res) {
 
    let today = date.getDate()

    console.log(today)

Task.find({}, function(err, foundItems){
    console.log(foundItems)

    if (foundItems.length == 0 && redirect == false) {
        Task.insertMany(items, function(err){
            if(!err) {
                console.log("Success")
            } else {
                console.log(err)
            }          
        })
    }
    
    if (foundItems.length != 0) {
        counter = foundItems[foundItems.length-1]._id +1
    }


    res.render("index", {nameOfTheDay: today, newItem: foundItems})
})

})

app.post("/delete", function(req, res) { 
    Task.deleteOne({_id: req.body.checkbox}, function(err) {
        if(!err) {
            console.log ("Successfully Removed")
        }
    })

    redirect = true
    res.redirect ("/")
} )


app.get("/work", function(req, res) {
  res.render("index", {nameOfTheDay: "Work List", newItem: items})
})



app.post("/", function(req, res) {
    let newItem = new Task({
        _id: counter,
        itemName: req.body.newItem
    })
    
    newItem.save();

    counter++;

    if (req.body.button == "Work") {
      workListItems.push(newItem)
      res.redirect("/work")
    } else {
        redirect = true
        res.redirect("/");
    }

    
})

app.get("/about", function(req, res){
    res.render("aboutus")
})

app.listen(3004, function(){
    console.log("Server started on port 3004")
})