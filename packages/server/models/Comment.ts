import { DataTypes } from "sequelize";
import { client } from '../db';
import { Author, TypeAuthor } from "./Author";
import { Topic } from "./Topic";

export type CreateCommentData = {
    author: TypeAuthor,
    body: string,
}

export type TypeComment = {
    topic_id: number,
    comment_id: number,
    date: Date,
    author: TypeAuthor,
    body: string,
    count_replies: number,
}

const Comment = client.define('Comment', {
    comment_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    topic_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    parent_comment_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    author_id: {
        type: DataTypes.INTEGER,
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

Comment.belongsTo(Author, {
    foreignKey: 'author_id',
    as: 'author'
});

Comment.belongsTo(Topic, {
    foreignKey: 'topic_id',
    as: 'topic'
});

export { Comment };