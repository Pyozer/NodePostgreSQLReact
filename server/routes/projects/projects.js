import { Router } from "express"
import Project from "../../models/project"

const api = Router({ mergeParams: true })

api.get("/", async (req, res) => {
  try {
    let projects = await Project.findAll()

    res.status(200).json({
      data: { projects }
    })
  } catch ({ message }) {
    res.status(400).json({
      error: { message }
    })
  }
})

api.get("/:projectId", async (req, res) => {
  try {
    const { projectId } = req.params

    const project = await Project.findByPk(projectId)

    if (!project)
      throw new Error("The project you want to get not exists !")

    res.status(200).json({
      data: { project }
    })
  } catch ({ message }) {
    res.status(400).json({
      error: { message }
    })
  }
})

export default api
