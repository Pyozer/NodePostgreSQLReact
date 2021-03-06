import { Router } from "express"
import UsersRouter from "./users"
import ProjectsRouter from "./projects"
import { AuthRouter } from "./auth";

const api = Router({ mergeParams: true })

api.get("/", (req, res) => {
  res.json({
    name: "sanji.Api",
    meta: {
      version: "1.0.0",
      status: "running"
    }
  })
})

api.use("/auth", AuthRouter)
api.use("/users", UsersRouter)
api.use("/projects", ProjectsRouter)

export default api
