import mongoose from 'mongoose';
const { Schema } = mongoose;

const TournamentSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  teams: [{
    type: Schema.Types.ObjectId,
    ref: 'Team'
  }],
  matches: [{
    type: Schema.Types.ObjectId,
    ref: 'Match'
  }],
  pointsTable: {
    type: Schema.Types.ObjectId,
    ref: 'PointsTable'
  },
  sport: {
    type: Schema.Types.ObjectId,
    ref: 'Sport',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Tournament = mongoose.model('Tournament', TournamentSchema);
export default Tournament;
