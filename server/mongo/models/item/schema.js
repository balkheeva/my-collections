const {Schema, model} = require('mongoose') ;


const ItemSchema = new Schema({
    name: String,
    tags: [{
        type: String
    }],
    collectionId: {
        type: String,
        index: true
    },
    userId: String,
    created: Date
});


ItemSchema.set('toJSON', {
    transform: function(_doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    }
});

module.exports.Item = model('Items', ItemSchema);
