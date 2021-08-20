const express = require("express");
const viewController = require("../controller/viewController");
const router = express.Router();

router.route("/").get(viewController.displayHome);
router.route("/donate").get(viewController.getDonatePage);
router.route("/thankyou").get(viewController.getThankyouPage);

module.exports = router;
