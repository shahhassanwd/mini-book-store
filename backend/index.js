import express from "express";
import dotenv from "dotenv";
// import { PORT, MongoDB_URL } from "./config.js";
import mongoose from "mongoose";
import booksRoute from "./routes/booksRoute.js";
import cors from "cors";

// Load environment variables from .env file
dotenv.config();

// Create a new Express application instance
const app = express();

const PORT = process.env.PORT || 8000;
const MongoDB_URL = process.env.MongoDB_URL;

app.use(express.json()); // Middleware to parse JSON request bodies

app.use(cors()); // Middleware to enable CORS
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type"],
//   })
// );

// Connect to the MongoDB database
mongoose
  .connect(MongoDB_URL) // Replace with your MongoDB connection string
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

// Define a route handler for the root URL ("/") that returns a "Hello World!" message
app.get("/", (req, res) => {
  // Send the response body with the "Hello World!" message
  res.send("Hello World!");
  // Set the HTTP status code of the response to 200 (OK)
  res.status(200);
});

app.use("/books", booksRoute);

// Start the server and listen on the specified port
app.listen(PORT, () => {
  // Log a message to the console indicating the server is running
  console.log(`Server running on port ${PORT}`);
});
