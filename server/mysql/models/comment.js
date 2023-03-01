'use strict';
const {
  Model
} = require('sequelize');
const client = require("../../elasticsearch/connect");
const saveComments = async (attributes, comments) => {
  const commentData = comments.map(comment => comment.toJSON())
  try {
    await client.updateByQuery({
      index: 'items',
      query: { match: { id: attributes.dataValues.itemId } },
      script: {
        params: { 'commentData': commentData },
        lang: 'painless',
        source: `ctx._source["comments"] = params['commentData']`
      }
    })
  } catch (error) {
    console.error(error)
  }
}
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, {foreignKey: 'userId', hooks: true, as: 'author'})
      this.belongsTo(models.Item, {foreignKey: 'itemId', as: 'item', hooks: true})
    }
  }
  Comment.init({
    id: {
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      type: DataTypes.UUID,
    },
    comment: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Comment',
    hooks: {
      afterCreate(attributes, options) {
        sequelize.models.Comment.findAll({
          where: {itemId: attributes.itemId},
          attributes: ['id', 'comment'],
          include: [{model: sequelize.models.User, as: 'author', attributes: ['id', 'name', 'email']}]
        }).then(comments => saveComments(attributes, comments))

      }
    }
  });
  return Comment;
};