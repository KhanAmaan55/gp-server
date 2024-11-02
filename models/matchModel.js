import mongoose from "mongoose";
const { Schema } = mongoose;

const MatchSchema = new Schema({
  tournamentId: {
    type: Schema.Types.ObjectId,
    ref: "Tournament",
    required: true,
  },
  teamA: {
    type: Schema.Types.ObjectId,
    ref: "Team",
    required: true,
  },
  teamB: {
    type: Schema.Types.ObjectId,
    ref: "Team",
    required: true,
  },
  teamAScore: {
    type: Number,
    required: true,
  },
  teamBScore: {
    type: Number,
    required: true,
  },
  teamAOversFaced: {
    type: Number,
    required: true,
  },
  teamBOversFaced: {
    type: Number,
    required: true,
  },
  teamAOversBowled: {
    type: Number,
    required: true,
  },
  teamBOversBowled: {
    type: Number,
    required: true,
  },
  result: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Match = mongoose.model("Match", MatchSchema);
export default Match;
