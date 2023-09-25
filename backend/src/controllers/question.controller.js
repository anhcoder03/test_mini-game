const Question = require("../models/Question");
const UserAnswer = require("../models/UserAnswer");
const Winner = require("../models/Winner");
const cron = require("node-cron");

class QuestionController {
  constructor() {
    this.selectedQuestion = null;
    this.nextQuestionTime = null;
    this.startFirstSession();
    cron.schedule("*/10 * * * *", async () => {
      await this.selectNewRandomQuestion();
    });
    this.updateNextQuestionTime();
  }

  async startFirstSession() {
    // Implement the logic to start the first session immediately
    await this.selectNewRandomQuestion();
  }
  selectNewRandomQuestion = async () => {
    try {
      const data = await Question.find().lean();
      if (!data) {
        return;
      }
      const index = Math.floor(Math.random() * data.length);
      this.selectedQuestion = data[index];
      this.updateNextQuestionTime();
    } catch (error) {
      console.error(error);
    }
  };
  updateNextQuestionTime() {
    const now = new Date();
    const nextQuestionTime = new Date(now.getTime() + 10 * 60 * 1000);
    this.nextQuestionTime = nextQuestionTime;
  }

  getAllQuestion = async (req, res) => {
    try {
      if (this.selectedQuestion) {
        const now = new Date();
        const timeUntilNextQuestion = this.nextQuestionTime - now;
        return res.status(200).json({
          question: this.selectedQuestion,
          timeUntilNextQuestion,
        });
      } else {
        return res
          .status(200)
          .json({ message: "Waiting for the next question session..." });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  };
  createQuestion = async (req, res) => {
    try {
      const { questionText } = req.body;
      const isHasQuestion = await Question.findOne({ questionText });
      if (isHasQuestion) {
        return res.status(400).json({
          message: "Câu hỏi đã tồn tại",
        });
      }
      const data = await Question.create(req.body);
      return res.status(200).json({
        message: "Tạo câu hỏi thành công",
        data,
      });
    } catch (error) {
      return res.status(500).json(error);
    }
  };
  getWinner = async (req, res) => {
    const answers = await UserAnswer.find({ question: req.params.id });
    const question = await Question.findById(req.params.id);
    // console.log(question)
    const isCorrect = question.answer.find((item) => {
      if (item.isCorrect === true) {
        return item.isCorrect;
      }
    });
    let userCorrects = [];
    // let userPredictionCorrectFastest = []
    let userPredictionCorrects = [];

    for (const answer of answers) {
      if (answer.selectedAnswer.equals(isCorrect._id)) {
        userCorrects.push(answer);
      }
    }
    const predictionCorrect = userCorrects.length;
    if (userCorrects.length > 0) {
      for (const userCorrect of userCorrects) {
        if (userCorrect.prediction === predictionCorrect) {
          userPredictionCorrects.push(userCorrect);
        }
      }
      let userFastest = userPredictionCorrects[0];
      for (const userPredictionCorrect of userPredictionCorrects) {
        if (userPredictionCorrect.answer_timer <= userFastest.answer_timer) {
          userFastest = userPredictionCorrect;
        }
      }
      const timestamp = new Date().getTime();
      const customId = "P" + timestamp.toString();
      await Winner.create({
        id: customId,
        userCorrect: userFastest.username,
      });
      await UserAnswer.deleteMany({});
      return res.status(200).json({
        userCorrect: userPredictionCorrects,
        userFastest,
      });
    }
    return res.status(200).json("Không có ai trả lời đúng");
  };
}

module.exports = new QuestionController();
