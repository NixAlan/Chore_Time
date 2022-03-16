require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);
// This configures the server to accept and update cookies ad it helps us decode the content in the cookies
app.use(cookieParser());

require("./config/mongoose.config");
require("./routes/user.routes")(app);
require("./routes/child.routes")(app);
require("./routes/chore.routes")(app);
// need to add config to accept cookes

app.listen(process.env.MY_PORT, () =>
  console.log(`connectd to port ${process.env.MY_PORT}`)
);
