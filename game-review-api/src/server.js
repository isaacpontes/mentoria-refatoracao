const express = require("express");
const cors = require("cors");
const gamesRouter = require("./routes/games");
require("./database");

const app = express();
const port = process.env.PORT || 5000;

// Global middlewares
app.use(cors());
app.use(express.json());

app.use("/api/games", gamesRouter);

app.listen(port, () => {
  console.log(`Server running on <http://localhost:${port}>`);
});
