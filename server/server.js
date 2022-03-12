require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    // credentia)ls: true
    origin: "http://localhost:3000",
  })
);

require("./config/mongoose.config");
require("./routes/user.routes")(app);
require("./routes/child.routes")(app);
require("./routes/chore.routes")(app);
// need to add config to accept cookes

app.listen(process.env.MY_PORT, () =>
  console.log(`connectd to port ${process.env.MY_PORT}`)
);
