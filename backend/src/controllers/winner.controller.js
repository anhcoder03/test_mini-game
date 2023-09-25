const Winner = require("../models/Winner");
const UserAnswer = require("../models/UserAnswer");

class winnerController {
  getAllWinner = async (req, res) => {
    try {
      const winners = await Winner.find().lean();
      return res.status(200).json(winners);
    } catch (error) {
      return res.status(500).json(error);
    }
  };
}

module.exports = new winnerController();
