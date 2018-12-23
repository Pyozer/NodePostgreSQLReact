import Sequelize, { Model } from "sequelize"

export default class Project extends Model {
  static init(database) {
    return super.init(
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
          validate: {
            notEmpty: true
          }
        },
        description: {
          type: Sequelize.STRING,
          allowNull: true
        }
      },
      {
        tableName: "projects",
        sequelize: database,
        underscored: true,
        indexes: [
          { unique: true, fields: ["id", "name"] }
        ]
      }
    )
  }
}
