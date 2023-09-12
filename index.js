const express = require("express");
const app = express();
const PORT = 3000;

const bodyparser = require("body-parser");
let contacts = require("./public/data/contacts.json");

const fs = require("fs");
const { randomUUID } = require("crypto");

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

app.set("views", "./public/views");
app.set("view engine", "ejs");

app.use(express.static("./public"));
app.use(express.json());

app.get("/", (req, res) => {

  res.render("index", { contacts });
});

app.get("/add", (req, res) => {
  res.render("add.ejs", { contacts });
});

app.post("/addContact", (req, res) => {
  const json = req.body;
  if (json) json.id = randomUUID();
  let newContacts = JSON.stringify([...contacts, json], null, 2);
  console.log(contacts);
  fs.writeFile("./public/data/contacts.json", newContacts, (err) => {
    console.log(err);
  });
  res.redirect("/");
});

app.get("/delete/:id", (req, res) => {
  const id = req.params.id;

  const obj = contacts.filter((contact) => contact.id != id);
  console.log(obj);
  fs.writeFile("./public/data/contacts.json", JSON.stringify(obj), (err) => {
    console.log(err);
  });

  res.redirect("/");
});

var editUserID = "";

app.get("/edit/:id", (req, res) => {
  const id = req.params.id;
  editUserID = id;
  res.render("edit", {
    Contacts: contacts.filter((contact) => contact.id != id),
    User: contacts.find(contact => contact.id === editUserID),
  });
});

app.post("/editContact", (req, res) => {
  let newJson = req.body;
  if (newJson) newJson.id = editUserID;
  let tempcont = contacts.filter((contact) => contact.id != editUserID);
  let newContacts = JSON.stringify([...tempcont, newJson], null, 2);
  fs.writeFile("./public/data/contacts.json", newContacts, (err) => {
    console.log(err);
  });
  res.redirect("/");
});

app.get("/view/:id", (req, res) => {
  res.render("view", {
    id: req.params.id,
    curUser: contacts.find((user) => user.id === req.params.id),
  });
});

app.listen(PORT);
