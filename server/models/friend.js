import Sequelize, { Model } from "sequelize"

export default class Friend extends Model {
  static init(database) {
    return super.init(
      {
        userId: {
          type: Sequelize.UUID,
          allowNull: false,
          primaryKey: true,
          validate: {
            notEmpty: true
          }
        },
        friendId: {
          type: Sequelize.UUID,
          allowNull: false,
          primaryKey: true,
          validate: {
            notEmpty: true
          }
        },
      },
      {
        tableName: "friends",
        sequelize: database,
        indexes: [
          { unique: true, fields: ["userId", "friendId"] }
        ]
      }
    )
  }
}
