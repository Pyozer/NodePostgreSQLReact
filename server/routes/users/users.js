import { Router } from "express"
import User from "../../models/user"
import Project from "../../models/project";

const api = Router({ mergeParams: true })

api.get("/", async (req, res) => {
  const users = await User.findAll()
  res.status(200).json({
    data: { users }
  })
})

api.get("/:uuid", async (req, res) => {
  try {
    const { uuid } = req.params

    if (!uuid)
      throw new Error("You must provide the user id !")

    const user = await User.findByPk(uuid)

    if (!user)
      throw new Error("The specified user was not found")

    res.status(200).json({
      data: { user }
    })
  } catch (e) {
    res.status(400).json({
      error: { message: e.message }
    })
  }
})

api.get("/:uuid/projects", async (req, res) => {
  try {
    const { uuid } = req.params

    if (!uuid)
      throw new Error("You must provide the user id !")

    const user = await User.findByPk(uuid)

    if (!user)
      throw new Error("The specified user was not found")

    let projects = await user.getProjects()

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
