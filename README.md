
# Express.js Contact Management Application

This is a basic Express.js web application for managing contacts. It allows users to view, add, edit, and delete contacts. The application uses EJS for rendering views and stores contact data in a JSON file.

## Dependencies

- `express`: A popular web framework for Node.js.
- `body-parser`: Middleware for parsing JSON and URL-encoded data.
- `fs`: Node.js built-in module for working with the file system.
- `crypto`: Node.js built-in module for generating random UUIDs.

## Usage

1. Import required modules and set up Express application.

```javascript
const express = require("express");
const app = express();
const PORT = 3000;
```
// ... other requires and configurations ...
Set up middleware for parsing JSON and URL-encoded data.
javascript
Copy code
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
Set up EJS for rendering views and serve static files from the "public" directory.
javascript
Copy code
app.set("views", "./public/views");
app.set("view engine", "ejs");
app.use(express.static("./public"));
Define routes for different functionalities.
GET /: Render the home page with a list of contacts.

GET /add: Render the "add contact" page.

POST /addContact: Add a new contact to the JSON file and redirect to the home page.

GET /delete/:id: Delete a contact by its ID and redirect to the home page.

GET /edit/:id: Render the "edit contact" page for a specific contact.

POST /editContact: Update a contact's information and redirect to the home page.

GET /view/:id: Render a page displaying the details of a specific contact.

Start the Express server and listen on port 3000.
javascript
Copy code
app.listen(PORT);
Data Storage
The application stores contact data in a JSON file located at "./public/data/contacts.json". Contacts are read from and written to this file when adding, editing, or deleting contacts.

Note
The code appears to use the crypto module to generate a random UUID for each new contact to ensure a unique identifier.
The code does not include error handling for file read/write operations. You may want to enhance it for production use.
Remember to run npm install to install the required dependencies before running the application.
This application provides a basic example of how to create a web-based contact management system using Express.js. You can further extend and customize it to meet your specific requirements.


Feel free to use this Markdown file as documentation for your Express.js contact ma