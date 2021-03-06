import { Router } from "express"
import passport from "passport"

const api = Router({ mergeParams: true })

api.get("/me", passport.authenticate("jwt", { session: false }), async (req, res) => {
    const { user } = req
    res.status(200).json({
        data: { user }
    })
})

api.put("/:identifier", passport.authenticate("jwt", { session: false }), async (req, res) => {
    try {
        const { user, params, body } = req
        const { identifier } = params

        if (user.uuid !== identifier && user.nickname !== identifier)
            throw new Error("You can only edit your account, not others!")

        const { password, password_confirmation } = body

        if (password && !password_confirmation || !password && password_confirmation)
            throw new Error("You must provide password and password confirmation if you want to change password !")

        const userUpdated = await user.update(
            JSON.parse(JSON.stringify(body)), // Remove null fields
            { returning: true }
        )

        res.status(200).json({
            data: { user: userUpdated }
        })
    } catch ({ message }) {
        res.status(400).json({
            error: { message }
        })
    }
})

api.delete("/:identifier", passport.authenticate("jwt", { session: false }), async (req, res) => {
    try {
        const { user, params } = req
        const { identifier } = params
        if (user.uuid !== identifier && user.nickname !== identifier)
            throw new Error("You can only delete your account, not others !")

        await user.destroy()

        res.status(200).json({
            message: "User successfully deleted"
        })
    } catch ({ message }) {
        res.status(400).json({
            error: { message }
        })
    }
})

export default api
