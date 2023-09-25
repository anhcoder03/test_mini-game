const express = require("express");
const { getAllWinner } = require("../controllers/winner.controller");
const router = express.Router();

router.get("/winner", getAllWinner);

module.exports = router;
