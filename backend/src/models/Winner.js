const { Schema, model } = require("mongoose");

const winnerSchema = new Schema(
  {
    userCorrect: {
      type: String,
    },
    _id: {
      type: String,
    },
  },
  {
    timestamps: true,
    collection: "Winners",
  }
);

module.exports = model("Winner", winnerSchema);
