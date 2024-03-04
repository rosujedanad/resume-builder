const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 5000;
const HOST = 'localhost'; // Specify the hostname

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.get("/", (req, res) => { // Define a route handler for the root URL "/"
    res.send("Welcome to my Express server!");
});
app.get("/api", (req, res) => {
    res.json({
        message: "Hello world",
    });
});
app.listen(PORT, HOST, () => { // Specify the hostname in app.listen()
    console.log(`Server listening on http://${HOST}:${PORT}`);
});
