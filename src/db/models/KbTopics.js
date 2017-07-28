import mongoose from 'mongoose';
import Random from 'meteor-random';

const KbTopicsSchema = mongoose.Schema({
  _id: {
    type: String,
    unique: true,
    default: () => Random.id(),
  },
  title: String,
  // description: String,
  // brandId: String,
  // createdDate: Date,
});

const KbTopics = mongoose.model('knowledgebase_topics', KbTopicsSchema);

export default KbTopics;
