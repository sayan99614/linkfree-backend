const mongoose = require("mongoose");
const validator = require("validator");

const itemSchema = new mongoose.Schema({
  header: {
    title: {
      type: String,
      required: false,
      trim: true,
      maxlength: [100, "Title cannot be more than 100 characters"],
    },
  },
  link: {
    title: {
      type: String,
      required: false,
      trim: true,
      maxlength: [100, "Title cannot be more than 100 characters"],
    },
    url: {
      type: String,
      required: false,
      validate: [validator.isURL, "Please provide a valid URL"],
    },
  },
  itemType: {
    type: String,
    required: true,
    enum: ["Link", "Header"],
  },
  shouldShow: {
    type: Boolean,
    default: false,
  },

  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
    required: [true, "link must belong to a user"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Item", itemSchema);
