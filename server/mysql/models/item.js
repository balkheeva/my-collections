'use strict';
const {Model} = require('sequelize');
const client = require("../../elasticsearch/connect");

const saveDocument = async (instance, col) => {
    const themesData = col.dataValues?.themes.map(theme => {
        return {
            id: theme.id,
            name: theme.name,
            createdAt: theme.createdAt,
            updatedAt: theme.updatedAt,
        }
    })

    try {
        await client.index({
            id: instance.dataValues.id,
            index: 'items',
            document: {
                ...instance.dataValues,
                optionalFields: JSON.parse(instance.dataValues.optionalFields),
                collection: {...col.dataValues, themes: themesData || []},
            },
        });
    } catch (error) {
        console.error(error)
    }

    await client.indices.refresh({index: 'items'})
    console.log('index created', instance.dataValues.id);
}

const updateDocument = async (instance) => {
    try {
        await client.update({
            index: 'items',
            id: instance.where.id,
            doc: {...instance.attributes, optionalFields: JSON.parse(instance.attributes.optionalFields)}
        })
    } catch (error) {
        console.log(error)
    }

    await client.indices.refresh({index: 'items'})
    console.log('Document updated', instance.where)
}
const deleteDocument = async (instance) => {
    try {
        await client.delete({
            index: 'items',
            id: instance.dataValues.id
        })
    } catch (error) {
        console.error(error)
    }
    await client.indices.refresh({index: 'items'})
    console.log('Document deleted', instance.id)
}

module.exports = (sequelize, DataTypes) => {
    class Item extends Model {
        static associate(models) {
            // define association here
            this.hasMany(models.Comment, {as: 'comments', foreignKey: 'itemId', hooks: true})
            this.belongsTo(models.Collection, {as: 'Collection', foreignKey: 'CollectionId', hooks: true})
            this.belongsToMany(models.Tag, {
                as: 'tags',
                through: 'ItemTags'
            })
        }
    }

    Item.init({
        id: {
            allowNull: false,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            type: DataTypes.UUID,
        },
        name: DataTypes.STRING,
        optionalFields: {
            type: DataTypes.JSON,
            allowNull: true,
            defaultValue: '[]',
            set(value) {
                return this.setDataValue("optionalFields", JSON.stringify(value));
            },
            get() {
                return JSON.parse(this.getDataValue("optionalFields") || '{}');
            },
        },
        likes: {
            type: DataTypes.JSON,
            allowNull: true,
            defaultValue: '[]',
            set(value) {
                return this.setDataValue("likes", JSON.stringify(value));
            },
            get() {
                return JSON.parse(this.getDataValue("likes") || '[]');
            },
        }
    }, {
        sequelize,
        modelName: 'Item',
        hooks: {
            afterCreate: (item) => {
                sequelize.models.Collection.findByPk(item.CollectionId, {
                    include: [
                        {model: sequelize.models.User, as: 'author', attributes: ['id', 'name', 'email']},
                        {model: sequelize.models.Theme, as: 'themes', attributes: ['id', 'name']},
                    ]
                }).then(col => saveDocument(item, col))
            },
            beforeDestroy: (item) => {
                deleteDocument(item)
            },
            afterBulkUpdate(item) {
                return updateDocument(item)
            }
        }
    });
    return Item;
};
