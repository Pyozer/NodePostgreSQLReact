import Sequelize from "sequelize"
import User from "./user"
import Project from "./project"
import Friend from "./friend"

// postgres://USER:PASS@HOST:PORT/DBNAME
// createdb sanji.dev
export const db = new Sequelize(process.env.DATABASE_URL, {
    logging: true
})

User.init(db)
Project.init(db)
Friend.init(db)

User.associate(db.models)