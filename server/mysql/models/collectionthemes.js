'use strict';
const {
    Model,
    UUIDV4
} = require('sequelize');
const client = require("../../elasticsearch/connect");

const saveCollectionTheme = async (instances, data) => {
    const themeData = data.map(theme => theme.dataValues)
    try {
        await client.updateByQuery({
            index: 'items',
            refresh:true,
            script: {
                params: {
                    'themeData': themeData
                },
                lang: 'painless',
                source: `ctx._source['collection']['themes'] = params['themeData']`
            },
            query: {
                match: {
                    CollectionId: instances[0].collectionId
                }
            }
        })
    } catch (error) {
        console.error(error)
    }

}
module.exports = (sequelize, DataTypes) => {
    class CollectionThemes extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }

    CollectionThemes.init({
        id: {
            allowNull: false,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            type: DataTypes.UUID,
        },
        collectionId: UUIDV4,
        themeId: UUIDV4
    }, {
        sequelize,
        modelName: 'CollectionThemes',
        hooks: {
            afterBulkCreate(instances, options) {
                sequelize.models.Theme.findAll({where: {id: instances.map(pair => pair.dataValues.themeId)}})
                    .then(data => saveCollectionTheme(instances, data))
            }
        }
    });
    return CollectionThemes;
};