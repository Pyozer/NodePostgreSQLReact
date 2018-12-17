import { Router } from "express"
import projects from './projects'
import secureProjects from './secure_projects'

const api = Router({ mergeParams: true })

// Use router with route '/me' before router with route '/:uuid'
// Because /:uuid match /me
api.use("/", secureProjects)
api.use("/", projects)

export default api
