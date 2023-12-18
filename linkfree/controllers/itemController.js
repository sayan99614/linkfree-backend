const Item = require("../models/ItemModel");
const catchAsync = require("../utils/catchAsync");
const { protect } = require("./authController");
const User = require("../models/userModel");
const AppError = require("../utils/appError");

const { createOne, getAll, updateOne, deleteOne } = require("./handlerFactory");

exports.addUser = (req, res, next) => {
  if (!req.body.user) req.body.user = req.user._id;
  next();
};

exports.getAllItems = getAll(Item);
exports.createItem = createOne(Item);
exports.updateItem = updateOne(Item);
exports.deleteItem = deleteOne(Item);

exports.showItemsByUsername = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ username: req.params.username });

  if (!user) {
    return next(new AppError("No user found with that username", 404));
  }

  const items = await Item.find({
    user: user._id,
    shouldShow: true,
  });

  console.log(items);
  res.status(200).json({
    status: "success",
    results: items.length,
    data: {
      items,
      user,
    },
  });
});
