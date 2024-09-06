import { DataTypes } from "sequelize";
import sequelize from "../db/mysqlConnect";

const Role = sequelize.define(
    "Roles",
    {
        role_ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            unique: true,
            allowNull: false,
        },
        roleName: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        }
    }
)

export default Role