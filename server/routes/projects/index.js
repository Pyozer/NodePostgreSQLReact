import { Router } from "express"
import projects from './projects'
import secureProjects from './secure_projects'

const api = Router({ mergeParams: true })

api.use("/", projects)
api.use("/", secureProjects)

export default api
