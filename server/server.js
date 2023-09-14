const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const port = 3000;
// khoi tao server
const app = express();

const workRouter = require("./routes/congviec.routes");
const completeRouter = require("./routes/complete.routes");

// su dung cac package can thiet
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/api/v1/works", workRouter);
app.use("/api/v1/completed", completeRouter);

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
