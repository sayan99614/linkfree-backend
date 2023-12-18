const express = require("express");

const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");

const userRouter = require("./routes/userRoutes");
const itemRouter = require("./routes/itemRoutes");
const itemsPreviewRoute = require("./routes/itemsPreviewRoute");

const app = express();

// Limit requests from same API

// Body parser, reading data from body into req.body
app.use(express.json({ limit: "10kb" }));

app.use("/api/v1/users", userRouter);
app.use("/api/v1/items", itemRouter);
app.use("/api/v1/itemsPreview", itemsPreviewRoute);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
