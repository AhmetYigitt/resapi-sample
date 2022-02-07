const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/restful_api", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("db connection succesfull");
  })
  .catch(() => {
    console.log("db connections failed");
  });
