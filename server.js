const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

const memberRoute = require("./routes/member.route");
const adminRoute = require("./routes/admin.route");
const bookRoute = require("./routes/book.route");
const borrowRoute = require("./routes/borrow.route");

app.use("/member", memberRoute);
app.use("/admin", adminRoute);
app.use("/book", bookRoute);
app.use("/borrow", borrowRoute);

module.exports = app;
