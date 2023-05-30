import { DataTypes } from "sequelize";
import { client } from '../db';
import { Author, TypeAuthor } from "./Author";

export type CreateTopicData = {
    author: TypeAuthor,
    title: string,
    body: string,
}

export type TypeTopic = {
    length: any;
    topic_id: number,
    title: string,
    date: Date,
    author: TypeAuthor,
    body: string,
    count_comments: number,
}


const Topic = client.define('Topic', {
    topic_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    author_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    title: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    body: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
}, {
    timestamps: true,
    createdAt: 'date',
    updatedAt: false,
});

Topic.belongsTo(Author, {
    foreignKey: 'author_id',
    as: 'author'
});




export { Topic };