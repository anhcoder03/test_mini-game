
const Question = require("../models/Question")
const UserAnswer = require("../models/UserAnswer")


class userAnswerController {
    userAnswer = async (req, res) => {
        try {
            const {username} = req.body
            if(!username) {
                return res.status(400).json("Vui lòng nhập tên")
            }
            const userExit = await UserAnswer.findOne({username})
            if(userExit) {
                return res.status(400).json({
                    message:"Bạn đã trả lời, không thể trả lời lại"
                })
            }
            const newUser = await UserAnswer.create({
                        username,
                        ...req.body
                    })
            return res.status(200).json("Trả lời câu hỏi thành công")
        } catch (error) {
            return res.status(500).json(error)
        }
    }
}

module.exports = new userAnswerController()