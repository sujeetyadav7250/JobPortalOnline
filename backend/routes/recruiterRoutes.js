const express = require("express");
const router = express.Router();

const { registerRecruiter, loginRecruiter } = require("../controllers/recruiterController");

router.post("/signup", registerRecruiter);
router.post("/login", loginRecruiter);

module.exports = router;
