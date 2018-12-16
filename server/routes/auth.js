import { Router } from "express"
import jwt from "jsonwebtoken"
import User from "../models/user"
import passport from "passport"

const api = Router()

api.post("/register", async (req, res) => {
  try {
    const { nickname, email, password, password_confirmation } = req.body
    const user = new User({
      nickname,
      email,
      password,
      password_confirmation
    })
    await user.save()

    const payload = { uuid: user.uuid, nickname, email }
    const token = jwt.sign(payload, "VerySecureKeyToKeepSecret")

    res.status(201).json({
      data: { user },
      meta: { token }
    })
  } catch ({ message }) {
    res.json({ error: { message } })
  }
})

api.post("/login", async (req, res) => {
  passport.authenticate("local", { session: false }, (message, user) => {
    if (message) {
      res.status(400).json({
        error: { message }
      })
      return
    }

    const { uuid, nickname, email } = user
    const payload = { uuid, nickname, email }
    const token = jwt.sign(payload, process.env.JWT_ENCRYPTION)

    res.status(200).json({
      data: { user },
      meta: { token }
    })
  })(req, res)
})

export default api
