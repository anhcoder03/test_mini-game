const express = require("express")
const { getAllQuestion, createQuestion, getWinner } = require("../controllers/question.controller")
const router = express.Router()

router.get("/question", getAllQuestion)
router.post("/question", createQuestion)
router.get("/winner/:id", getWinner)

module.exports = router
