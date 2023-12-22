import mongoose from "mongoose";

const cardSchema = new mongoose.Schema({
  taskName: {
    type: String,
  },

  taskStatus: {
    type: String,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Card = mongoose.model("Card", cardSchema);

module.exports = Card;
