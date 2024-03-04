// Import necessary libraries and modules
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
const mongoose = require("mongoose");
const budgetSchema = require("./models/budget_schema");

// Database connection URL
let url = 'mongodb://127.0.0.1:27017/personal_budget';

// Enable CORS middleware
app.use(cors());

// Parse incoming JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define endpoint for retrieving budget data
app.get('/budget', (req, res) => {
    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log("Connected to the database");
            // Retrieve and send budget data
            budgetSchema.find({})
                .then((data) => {
                    res.send(data);
                    mongoose.connection.close();
                })
                .catch((error) => {
                    console.log(error);
                });
        })
        .catch((error) => {
            console.log(error);
        });
});

// Define endpoint for inserting new budget data
app.post("/insertBudget", (req, res) => {
    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log("Connected to the database for data insertion");
            // Insert new data into the database
            let newData = new budgetSchema(req.body);
            budgetSchema.insertMany(newData)
                .then(() => {
                    res.send("Data inserted into the database successfully");
                    mongoose.connection.close();
                })
                .catch((error) => {
                    console.log(error);
                    res.send(error.message);
                });
        })
        .catch((error) => {
            console.log(error);
            res.send(error);
        });
});

// Start the server
app.listen(port, () => {
    console.log('Server listening at http://localhost:3000');
});
