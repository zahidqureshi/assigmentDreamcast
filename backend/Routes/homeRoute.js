const express = require("express");
const router = express.Router();

const HomeControllers = require("../controllers/HomeController");

router.route("/home").post(HomeControllers.create);
router.route("/home").get(HomeControllers.allData);


module.exports = router;
