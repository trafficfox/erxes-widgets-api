import mongoose from 'mongoose';
import Random from 'meteor-random';

const KbCategoriesSchema = mongoose.Schema({
  _id: {
    type: String,
    unique: true,
    default: () => Random.id(),
  },
  title: String,
  description: String,
  // brandId: String,
  // createdDate: Date,
});

const KbCategories = mongoose.model('knowledgebase_categories', KbCategoriesSchema);

export default KbCategories;
