import mongoose from 'mongoose';
const { Schema } = mongoose;

const TeamSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  tournaments: [{
    type: Schema.Types.ObjectId,
    ref: 'Tournament'
  }],
  players: [{
    type: String
  }],
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

const Team = mongoose.model('Team', TeamSchema);
export default Team;
