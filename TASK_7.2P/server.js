const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app); // wrap express in HTTP server
const io = socketIo(server); // attach socket.io
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

// ======= Attach socket.io to app =======
app.set("socketio", io);

// ======= Serve Main Page =======
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "view/index.html"));
});

// ======= API Routes =======
const productRoutes = require("./routes/productRoutes");
app.use("/", productRoutes); // Mount all API routes

// ======= Socket.IO Logic =======
io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

// ======= Start Server =======
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
