const express = require("express");
const itemController = require("../controllers/itemController");
const { protect, restrictTo } = require("../controllers/authController");

const router = express.Router();

router
  .route("/")
  .get(itemController.getAllItems)
  .post(protect, itemController.addUser, itemController.createItem);

router
  .route("/:id")
  .patch(protect, itemController.updateItem)
  .delete(protect, itemController.deleteItem);

router.route("/moveitem/:id").patch(protect, itemController.moveItem);

module.exports = router;
