import Sequelize from "sequelize"
import User from "./user"
import Project from "./project"

// postgres://USER:PASS@HOST:PORT/DBNAME
// createdb sanji.dev
export const db = new Sequelize(process.env.DATABASE_URL, {
    logging: false
})

User.init(db)
Project.init(db)

User.associate = () => User.hasMany(Project, {
    foreignKey: 'userId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})
User.associate(db)