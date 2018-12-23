import { Router } from "express"
import { Op } from "sequelize"
import User from "../../models/user"
import { secureFriends } from "../friends"

export function getUserByIdOrNickname(identifier) {
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

const api = Router({ mergeParams: true })

api.get("/", async (req, res) => {
  const users = await User.findAll()
  res.status(200).json({
    data: { users }
  })
})

// Middleware to get user data and store it in request object
api.use("/:identifier", async (req, res, next) => {
  try {
    const { identifier } = req.params

    if (!identifier)
      throw new Error("You must provide the user id or nickname !")

    const user = await getUserByIdOrNickname(identifier)
    if (!user)
      throw new Error("The specified user was not found")

    req.userByIdentifier = user
    next()
  } catch ({ message }) {
    res.status(400).json({
      error: { message }
    })
  }
})

api.get("/:identifier", async (req, res) => {
  res.status(200).json({
    data: { user: req.userByIdentifier }
  })
})

api.get("/:identifier/projects", async (req, res) => {
  try {
    let projects = await req.userByIdentifier.getProjects()

    res.status(200).json({
      data: { projects }
    })
  } catch ({ message }) {
    res.status(400).json({
      error: { message }
    })
  }
})

api.get("/:identifier/friends", async (req, res) => {
  try {
    const { uuid } = req.userByIdentifier
    let friends = await Friend.findAll({
      where: { userId: uuid },
      include: [{
        model: User,
        where: { uuid }
      }]
    })

    res.status(200).json({
      data: { friends }
    })
  } catch ({ message }) {
    res.status(400).json({
      error: { message }
    })
  }
})

api.use('/:identifier/friends', secureFriends)

export default api
