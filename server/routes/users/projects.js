import { Router } from "express"
import Project from "../../models/project"

const api = Router({ mergeParams: true })

api.get("/", async (req, res) => {
  try {
    const { uuid } = req.params

    if (!uuid)
      throw new Error("You must provide the user id !")

    let projects = await Project.findAll({ where: { userId: uuid } })

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
    const { projectId, uuid } = req.params

    const project = await Project.findOne({
      where: {
        userId: uuid,
        id: projectId
      }
    })

    if (!project)
      throw new Error("The project you want to get not exists !")

    res.status(200).json({
      data: { project }
    })
  } catch (e) {
    res.status(400).json({
      error: { message: e.message }
    })
  }
})

export default api
