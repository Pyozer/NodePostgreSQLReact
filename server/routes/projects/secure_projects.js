import { Router } from "express"
import passport from "passport"
import Project from "../../models/project";

const api = Router({ mergeParams: true })

api.post("/", passport.authenticate("jwt", { session: false }), async (req, res) => {
    try {
        const { user, body } = req

        const project = await user.createProject(body)

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
        const { projectId } = params

        const project = await Project.findByPk(projectId)

        if (!project)
            throw new Error("The project you want to edit not exists !")

        if (user.uuid !== project.user_id)
            throw new Error("You can only edit projects of your account, not others!")

        const projectUpdated = await project.update(
            JSON.parse(JSON.stringify(body)), // Remove null fields
            { returning: true }
        )

        res.status(200).json({
            data: { project: projectUpdated }
        })
    } catch ({ message }) {
        res.status(400).json({
            error: { message }
        })
    }
})

api.delete("/:projectId", passport.authenticate("jwt", { session: false }), async (req, res) => {
    try {
        const { user, params } = req
        const { projectId } = params

        const project = await Project.findByPk(projectId)

        if (!project)
            throw new Error("The project you want to delete not exists !")

        if (user.uuid !== project.user_id)
            throw new Error("You can only delete projects of your account, not others!")

        await project.destroy()

        res.status(200).json({
            message: `The project #${projectId} has been successfully deleted.`
        })
    } catch ({ message }) {
        res.status(400).json({
            error: { message }
        })
    }
})

export default api
