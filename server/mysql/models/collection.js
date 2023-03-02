'use strict';
const { Model } = require('sequelize');
const client = require('../../elasticsearch/connect');

const updateDocument = async (updatedData, col) => {
  try {
    await client.updateByQuery({
      index: 'items',
      query: { match: { CollectionId: updatedData.where.id } },
      script: {
        params: { collectionData: col.dataValues },
        lang: 'painless',
        source: `ctx._source["collection"] = params['collectionData']`,
      },
    });
  } catch (error) {
    console.error(error);
  }

  await client.indices.refresh({ index: 'items' });
  console.log('Document updated', updatedData.where);
};

module.exports = (sequelize, DataTypes) => {
  class Collection extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, { as: 'author' });
      this.hasMany(models.Item, {
        as: 'items',
        foreignKey: 'CollectionId',
        onDelete: 'cascade',
        hooks: true,
      });
      this.belongsToMany(models.Theme, {
        as: 'themes',
        through: 'CollectionThemes',
        uniqueKey: 'collection_themes',
      });
    }
  }

  Collection.init(
    {
      id: {
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        type: DataTypes.UUID,
      },
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
      image: DataTypes.STRING,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
      optionalFields: {
        type: DataTypes.JSON,
        allowNull: true,
        defaultValue: '[]',
        set(value) {
          return this.setDataValue('optionalFields', JSON.stringify(value));
        },
        get() {
          return JSON.parse(this.getDataValue('optionalFields') || '{}');
        },
      },
    },
    {
      sequelize,
      modelName: 'Collection',
      hooks: {
        afterBulkUpdate: (updatedData) => {
          return sequelize.models.Collection.findByPk(updatedData.where.id, {
            include: [
              {
                model: sequelize.models.User,
                as: 'author',
                attributes: ['id', 'name', 'email'],
              },
            ],
          }).then((col) => updateDocument(updatedData, col));
        },
        afterDestroy(instance, options) {
          console.log('Collection deleted');
        },
      },
    },
  );

  return Collection;
};
