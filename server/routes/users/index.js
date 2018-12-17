import { Router } from "express"
import users from "./users"
import projects from './projects'
import { SecureUsers, SecureProjects } from './secure'

const api = Router({ mergeParams: true })

// Use router with route '/me' before router with route '/:uuid'
// Because /:uuid match /me
api.use("/", SecureUsers)
api.use("/", users)

api.use("/:uuid/projects", projects)
api.use("/:uuid/projects", SecureProjects)

export default api
