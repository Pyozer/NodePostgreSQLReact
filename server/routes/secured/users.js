import { Router } from "express"
import User from "../../models/user"
import projects from './projects'

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

api.get("/:uuid", async (req, res) => {
  const { uuid } = req.params

  if (uuid == req.user.uuid) {
    res.status(200).json({
      data: { user: req.user }
    })
    return
  }
  try {
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

api.put("/:uuid", async (req, res) => {
  const { uuid } = req.params
  try {
    if (req.user.uuid !== uuid)
      throw new Error("You can only edit your account, not others!")

    const { nickname, email, password, password_confirmation } = req.body

    if (password && !password_confirmation || !password && password_confirmation)
      throw new Error("You must provide password and password confirmation if you want to change password !")

    const user = await req.user.update(
      JSON.parse(JSON.stringify({ nickname, email, password, password_confirmation })),
      {
        returning: true,
        where: { uuid }
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

api.delete("/:uuid/delete", async (req, res) => {
  const { uuid } = req.params
  try {
    if (req.user.uuid !== uuid)
      throw new Error("You can only delete your account, not others !")

    await User.destroy({
      where: { uuid }
    })

    res.status(200).json({
      message: "User successfully deleted"
    })
  } catch (e) {
    res.status(400).json({
      error: { message: e.message }
    })
  }
})

api.use("/:uuid/projects", projects)

export default api
