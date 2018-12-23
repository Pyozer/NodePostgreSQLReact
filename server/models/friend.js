import Sequelize, { Model } from "sequelize"
import User from "./user";

class Friend extends Model {
  static init(database) {
    return super.init(
      {
        user_id: {
          type: Sequelize.UUID,
          allowNull: false,
          primaryKey: true
        },
        friend_id: {
          type: Sequelize.UUID,
          allowNull: false,
          primaryKey: true
        },
      },
      {
        tableName: "friends",
        sequelize: database,
        underscored: true,
        indexes: [
          { unique: true, fields: ["user_id", "friend_id"] }
        ]
      }
    )
  }
}

export default Friend