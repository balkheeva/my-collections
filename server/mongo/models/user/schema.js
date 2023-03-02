const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
  name: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
  created: Date,
  updated: Date,
  status: {
    type: String,
    enum: ['active', 'blocked'],
  },
});

UserSchema.set('toJSON', {
  transform: function (_doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    delete ret.password;
  },
});

module.exports.User = model('Users', UserSchema);
