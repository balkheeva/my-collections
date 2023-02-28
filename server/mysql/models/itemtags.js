'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ItemTags extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ItemTags.init({
    id: DataTypes.UUID,
    itemId: DataTypes.UUID,
    tagId: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'ItemTags',
  });
  return ItemTags;
};