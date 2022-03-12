const mongoose = require("mongoose");

const dbName = "choreTimeDB";

mongoose
  .connect(`mongodb://localhost/${process.env.DB_NAME}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`you are connected to the databose ${process.env.DB_NAME}`);
  })
  .catch((err) => {
    console.log(
      `you are not connected ot the database ${process.env.DB_NAME}`,
      err
    );
  });
