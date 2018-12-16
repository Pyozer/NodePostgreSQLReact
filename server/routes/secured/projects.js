import { Router } from "express"
import Project from "../../models/project"

const api = Router({ mergeParams: true })

api.get("/", async (req, res) => {
  try {
    const { user, params } = req
    const { uuid } = params

    if (!uuid)
      throw new Error("You must provide the user id !")

    let projects = []
    if (user.uuid === uuid)
      projects = await user.getProjects()
    else
      projects = await Project.findAll({ where: { userId: uuid } })

    res.status(200).json({
      data: { projects }
    })
  } catch ({ message }) {
    res.status(400).json({
      error: { message }
    })
  }
})

api.post("/", async (req, res) => {
  try {
    const { user, params, body } = req
    const { uuid } = params
    if (!uuid)
      throw new Error("You must provide the user id !")

    if (user.uuid !== uuid)
      throw new Error("You can only add new project to your account, not others!")

    const { name } = body
    const project = await user.createProject({ name })

    res.status(201).json({
      data: { project }
    })
  } catch ({ message }) {
    res.json({ error: { message } })
  }
})

api.put("/:projectId", async (req, res) => {
  try {
    const { user, params, body } = req
    const { uuid, projectId } = params
    if (user.uuid !== uuid)
      throw new Error("You can only edit projects of your account, not others!")

    const projects = await user.getProjects({
      where: { id: projectId }
    })

    if (projects.length < 1)
      throw new Error("The project you want to edit not exists !")

    const { name } = body
    const project = await projects[0].update(
      JSON.parse(JSON.stringify({ name })), // Remove null fields
      { returning: true }
    )

    res.status(200).json({
      data: { project }
    })
  } catch (e) {
    res.status(400).json({
      error: { message: e.message }
    })
  }
})

api.delete("/:projectId", async (req, res) => {
  try {
    const { user, params } = req
    const { uuid, projectId } = params
    if (user.uuid !== uuid)
      throw new Error("You can only delete projects of your account, not others !")

    const projects = await user.getProjects({
      where: { id: projectId }
    })

    if (projects.length < 1)
      throw new Error("The project you want to delete not exists !")

    await projects[0].destroy()

    res.status(200).json({
      message: `The project #${projectId} has been successfully deleted.`
    })
  } catch (e) {
    res.status(400).json({
      error: { message: e.message }
    })
  }
})

export default api
