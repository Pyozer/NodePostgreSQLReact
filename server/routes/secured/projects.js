import { Router } from "express"
import Project from "../../models/project"

const api = Router({mergeParams: true})

api.get("/", async (req, res) => {
  try {
    const { uuid } = req.params
    if (!uuid)
      throw new Error("You must provide the user id !")

    const projects = await Project.findAll({
      where: { userId: uuid }
    })

    res.status(200).json({
      data: { projects }
    })
  } catch ({ message }) {
    res.status(400).json({
      error: { message }
    })
  }
})

export default api
