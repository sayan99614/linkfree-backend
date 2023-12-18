const express = require("express");
const router = express.Router();
const { showItemsByUsername } = require("../controllers/itemController");

router.route("/:username").get(showItemsByUsername);

module.exports = router;
