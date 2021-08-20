const express = require("express");
const donationController = require("../controller/donationController");
const router = express.Router();
router.route("/").post(donationController.donation);
router.route("/confirm").post(donationController.donationConfirm);
module.exports = router;
