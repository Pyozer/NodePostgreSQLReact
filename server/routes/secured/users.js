import { Router } from "express"
import User from "../../models/user"

const api = Router()

api.get("/", async (req, res) => {
  const users = await User.findAll()

  res.status(200).json({
    data: { users }
  })
})

api.get("/me", async (req, res) => {
  const user = req.user
  res.status(200).json({
    data: { user }
  })
})

api.get("/:userId", async (req, res) => {
  if (req.params.userId == req.user.uuid) {
    res.status(200).json({
      data: { user: req.user }
    })
    return;
  }
  try {
    const user = await User.findByPk(req.params.userId)

    if (!user)
      throw new Error("User not found")

    res.status(200).json({
      data: { user }
    })
  } catch (e) {
    res.status(400).json({
      error: { message: e.message }
    })
  }
})

api.put("/:userId", async (req, res) => {
  try {
    if (req.user.uuid !== req.params.uuid)
      throw new Error("You can't edit other user data !")

    const { nickname, email, password, password_confirmation } = req.body

    if (password && !password_confirmation || !password && password_confirmation)
      throw new Error("You must provide password and password confirmation if you want to change password !")

    const userFound = await User.findByPk(req.params.userId)

    if (!userFound)
      throw new Error("User not found")

    const user = await userFound.update(
      JSON.parse(JSON.stringify({ nickname, email, password, password_confirmation })),
      {
        returning: true,
        where: { uuid: req.params.userId }
      }
    )

    res.status(200).json({
      data: { user }
    })
  } catch (e) {
    res.status(400).json({
      error: { message: e.message }
    })
  }
})

export default api
