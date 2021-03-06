import Sequelize, { Model } from "sequelize"
import bcrypt from "bcrypt"

class User extends Model {
  static init(database) {
    return super.init(
      {
        uuid: {
          type: Sequelize.UUID,
          primaryKey: true,
          defaultValue: Sequelize.UUIDV4
        },
        nickname: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: {
            args: true,
            msg: "Nickname already in use"
          },
          validate: {
            isLongEnough(v) {
              if (v.length < 5)
                throw new Error("Nickname must have at least 5 characters")
            }
          }
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
          validate: {
            isEmail: {
              args: true,
              msg: "Email address is incorrect"
            }
          },
          unique: {
            args: true,
            msg: "Email already in use"
          }
        },
        profile_picture: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        password_digest: {
          type: Sequelize.STRING,
          allowNull: false,
          validate: {
            notEmpty: true
          }
        },
        password: {
          type: Sequelize.VIRTUAL,
          validate: {
            isLongEnough(v) {
              if (v.length < 7)
                throw new Error("Password must have at least 7 characters")
            }
          }
        },
        password_confirmation: {
          type: Sequelize.VIRTUAL,
          validate: {
            isEqual(v) {
              if (v !== this.password)
                throw new Error("Password confirmation doesn't match password")
            }
          }
        }
      },
      {
        tableName: "users",
        sequelize: database,
        underscored: true,
        hooks: {
          async beforeValidate(userInstance) {
            if (userInstance.password && userInstance.changed('password')) {
              userInstance.password_digest = await userInstance.generateHash()
            }
          }
        }
      }
    )
  }

  async generateHash() {
    const hash = await bcrypt.hash(this.password, 5)
    if (!hash)
      throw new Error("Can't hash password")

    return hash
  }

  async checkPassword(password) {
    return bcrypt.compare(password, this.password_digest)
  }

  toJSON() {
    const values = Object.assign({}, this.get())
    delete values.password_digest
    delete values.password
    delete values.password_confirmation
    return values
  }
}

User.associate = (models) => {
  User.hasMany(models.Project, {
    foreignKey: {
      name: "user_id",
      allowNull: false
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })

  User.belongsToMany(User, {
    as: 'userDest',
    through: models.Friend,
    foreignKey: 'friend_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  });

  User.belongsToMany(User, {
    as: 'friends',
    through: models.Friend,
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  });
}

export default User