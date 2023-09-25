const { Schema, model } = require("mongoose");


const userAnswerSchema = new Schema(
  {
    username: {
      type: String,
      maxLength: 150,
      require: true,
    },
    question: {
      type: Schema.Types.ObjectId,
      require: true,
    },
    selectedAnswer: {
      type: Schema.Types.ObjectId,
      require: true,
    },
    answer_timer: {
      type: Number,
      require: true,
      default: Date.now,
    },
    prediction: {
      type: Number,
      require: true,
      default: 0,
    },
    score: {
        type: Number,
        default: 0
    }
  },
  {
    timestamps: true,
  }
);

module.exports = model("User", userAnswerSchema);