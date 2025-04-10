const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const app = express();
const port = 3000;

// ======= Middleware =======
app.use(express.static(path.join(__dirname, "public"))); // Serve static files
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: false })); // Parse form data

// ======= MongoDB Connection =======
mongoose.connect("mongodb://localhost:27017/myprojectDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});

// ======= Serve Main Page =======
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "view/index.html"));
});

// ======= API Routes =======
const productRoutes = require("./routes/productRoutes");
app.use("/", productRoutes); // Mount all API routes

// ======= Start Server =======
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
