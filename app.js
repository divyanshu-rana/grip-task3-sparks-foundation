const express = require("express");
const path = require("path");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

const viewRouter = require("./routes/viewRoutes");
const donationRouter = require("./routes/donationRoutes");

app.use(cors());
app.use(morgan("dev"));
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

app.use("/", viewRouter);
app.use("/api/v1/donation", donationRouter);

module.exports = app;
