import { DataTypes } from "sequelize";
import { client } from '../db';

export type TypeAuthor = {
    author_id: number,
    name: string
}

const Author = client.define('Author', {
    author_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },

}, {
    timestamps:false,
    updatedAt: false,
});

export { Author };