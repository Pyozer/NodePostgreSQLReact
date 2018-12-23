import Sequelize from "sequelize"
import User from "./user"
import Project from "./project"
import Friend from "./friend"

// postgres://USER:PASS@HOST:PORT/DBNAME
// createdb sanji.dev
export const db = new Sequelize(process.env.DATABASE_URL, {
    logging: false
})

User.init(db)
Project.init(db)
Friend.init(db)

User.associate = () => {
    User.hasMany(Project, {
        foreignKey: {
            name: "userId",
            allowNull: false
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })

    User.belongsToMany(User, {
        through: Friend,
        as: 'Friends',
        foreignKey: {
            name: "friendId",
            allowNull: false
        },
        otherKey: {
            name: "userId",
            allowNull: false
        },
    });
}
User.associate(db)