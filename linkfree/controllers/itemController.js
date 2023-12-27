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
  }).sort({ position: 1 });

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

exports.moveItem = catchAsync(async (req, res, next) => {
  const position = req.body.position;
  const id = req.params.id;
  const move = req.query.move;

  if (move === "up") {
    if (!position) {
      return next(new AppError("No position provided", 404));
    }

    if (position === 0) {
      return next(new AppError("Item is already at the top", 500));
    }

    const item = await Item.findOne({ _id: id, position: position });
    const itemAbove = await Item.findOne({ position: position - 1 });

    item.position = position - 1;
    await item.save();

    itemAbove.position = position;
    await itemAbove.save();

    res.status(200).json({
      status: "success",
      data: {
        item,
      },
    });
  }
  if (move === "down") {
    const items = await Item.find({ user: req.body.user });

    if (position === items.length - 1) {
      return next(new AppError("Item is already at the bottom", 500));
    }

    const item = await Item.findOne({ _id: id, position: position });
    const itemBelow = await Item.findOne({ position: position + 1 });

    item.position = position + 1;
    await item.save();

    itemBelow.position = position;
    await itemBelow.save();

    res.status(200).json({
      status: "success",
      data: {
        item,
      },
    });
  }
});
