import mongoose from "mongoose";
const { Schema } = mongoose;

const PointsTableSchema = new Schema({
  tournamentId: {
    type: Schema.Types.ObjectId,
    ref: "Tournament",
    required: true,
  },
  standings: [
    {
      team: {
        type: Schema.Types.ObjectId,
        ref: "Team",
      },
      played: {
        type: Number,
        default: 0,
      },
      won: {
        type: Number,
        default: 0,
      },
      lost: {
        type: Number,
        default: 0,
      },
      points: {
        type: Number,
        default: 0,
      },
      nrr: {
        type: Number,
        default: 0,
      },
    },
  ],
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const PointsTable = mongoose.model("PointsTable", PointsTableSchema);
export default PointsTable;
