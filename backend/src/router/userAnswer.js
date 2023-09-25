const express = require("express")
const { userAnswer } = require("../controllers/userAnswer.controller")
const router = express.Router()

router.post("/userAnswer", userAnswer)

module.exports = router
