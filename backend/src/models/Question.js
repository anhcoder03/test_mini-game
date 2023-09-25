const {Schema,model} = require("mongoose")

const questionSchema = new Schema({
    questionText: {
        type: String,
        required: true
    },
    answer: [
        {
            text: {
                type: String,
                required: true
            },
            isCorrect: {
                type: Boolean,
                required: true
            }
        }
    ]

}, {
        timestamps: true,
        collection: "Questions"
})

module.exports = model("Question", questionSchema)