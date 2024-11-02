import mongoose from 'mongoose';
const { Schema } = mongoose;

const SportSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  tournaments: [{
    type: Schema.Types.ObjectId,
    ref: 'Tournament'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Sport = mongoose.model('Sport', SportSchema);
export default Sport;
