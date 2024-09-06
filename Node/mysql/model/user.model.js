import { DataTypes } from "sequelize";
import sequelize from "../db/mysqlConnect";

const User = sequelize.define(
    "Users",
    {
        user_ID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            unique: true
        },
        userName: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notNull: {
                    msg: "userName is requied"
                }
            }
        },
        role_ID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references:{
                model: Role,
                key: role_ID
            }
        }
    }
)