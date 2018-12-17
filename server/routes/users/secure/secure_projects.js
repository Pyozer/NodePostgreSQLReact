import { Router } from "express"
import passport from "passport"

const api = Router({ mergeParams: true })

api.post("/", passport.authenticate("jwt", { session: false }), async (req, res) => {
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

api.put("/:projectId", passport.authenticate("jwt", { session: false }), async (req, res) => {
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

api.delete("/:projectId", passport.authenticate("jwt", { session: false }), async (req, res) => {
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
