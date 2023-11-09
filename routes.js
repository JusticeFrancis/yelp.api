const bodyParser = require('body-parser')
const express = require('express')
const router = express.Router();
const emailController = require("./emailController");
const businessController = require("./businessController");
const teckityController = require("./teckityController");


router.use(express.urlencoded({extended: true}))
router.use(bodyParser.json())


router.post("/send-email",emailController.sendEmail)
router.post("/yelp",businessController.getBusinesses)
router.post("/handle-query",businessController.handleQuery)
router.post("/teckity/send-email",teckityController.sendEmail)
module.exports = router;  