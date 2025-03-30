const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

// Serve static files from /public
app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Start the server
app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}`);
});

