import { Router } from "express"
import User from "../../models/user"

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

export default api
