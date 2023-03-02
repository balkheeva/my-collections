const { Schema, model } = require('mongoose');

const CollectionSchema = new Schema({
  name: String,
  description: String,
  theme: String,
  email: {
    type: String,
    required: true,
  },
  created: Date,
});

CollectionSchema.set('toJSON', {
  transform: function (_doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});

module.exports.Collection = model('Collections', CollectionSchema);
