'use strict';
const {
    Model
} = require('sequelize');
const client = require("../../elasticsearch/connect");

const saveTag = async (instances, data) => {
    try {
        await client.update({
            index: 'items',
            id: instances[0].dataValues.itemId,
            script: {
                params: {'tagsData': data.map(data => data.dataValues) },
                lang: 'painless',
                source: `ctx._source['tags'] = params['tagsData']`
            },
        })
    } catch (error) {
        console.log(error)
    }
    await client.indices.refresh({index: 'items'})
}

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
        id: {
            allowNull: false,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            type: DataTypes.UUID,
        },
        itemId: DataTypes.UUID,
        tagId: DataTypes.UUID
    }, {
        sequelize,
        modelName: 'ItemTags',
        hooks: {
            afterBulkCreate(instances, options) {
                setTimeout(() => {
                    sequelize.models.Tag.findAll({
                        where: {
                            id: instances.map(pair => pair.dataValues.tagId)
                        }
                    }).then(data => saveTag(instances, data))
                }, 1000)
            }
        }
    });
    return ItemTags;
};