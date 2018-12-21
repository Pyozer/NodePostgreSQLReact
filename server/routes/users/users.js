import { Router } from "express"
import { Op } from "sequelize"
import User from "../../models/user"

const api = Router({ mergeParams: true })

api.get("/", async (req, res) => {
  const users = await User.findAll()
  res.status(200).json({
    data: { users }
  })
})

api.get("/:identifier", async (req, res) => {
  try {
    const { identifier } = req.params

    if (!identifier)
      throw new Error("You must provide the user id or nickname !")

    const user = await getUserByIdOrNickname(identifier)

    if (!user)
      throw new Error("The specified user was not found")

    res.status(200).json({
      data: { user }
    })
  } catch ({ message }) {
    res.status(400).json({
      error: { message }
    })
  }
})

api.get("/:identifier/projects", async (req, res) => {
  try {
    const { identifier } = req.params

    if (!identifier)
      throw new Error("You must provide the user id or nickname !")

    const user = await getUserByIdOrNickname(identifier)

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

function getUserByIdOrNickname(identifier) {
  if (/^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i.test(identifier))
    return User.findByPk(identifier)

  return User.findOne({
    where: {
      nickname: {
        [Op.iLike]: identifier
      }
    }
  })
}

export default api
