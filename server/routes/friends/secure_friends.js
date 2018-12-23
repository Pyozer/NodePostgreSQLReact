import { Router } from "express"
import passport from "passport"
import Friend from "../../models/friend";
import { getUserByIdOrNickname } from "../users/users";

const api = Router({ mergeParams: true })

api.post("/", passport.authenticate("jwt", { session: false }), async (req, res) => {
    try {
        const { user, userByIdentifier, body } = req
        const { friendIdentifier } = body

        if (!friendIdentifier)
            throw new Error('You must provide the friendIdentifier !')

        if (userByIdentifier.uuid !== user.uuid)
            throw new Error("You cannot add a friend to others users !")

        if (user.uuid === friendIdentifier || user.nickname === friendIdentifier)
            throw new Error('You cannot be your self friend !')

        const friendUser = await getUserByIdOrNickname(friendIdentifier)
        if (!friendUser)
            throw new Error("The user specify to be your friend not exists !")

        const { uuid: userId } = user
        const { uuid: friendId } = friendUser
        const friendData = { userId, friendId }

        const friend = await Friend.find({ where: friendData })
        if (friend) {
            await friend.destroy()
            res.status(202).json()
        } else {
            const friend = await Friend.create(friendData)
            res.status(201).json({
                data: { friend }
            })
        }
    } catch ({ message }) {
        res.json({ error: { message } })
    }
})

export default api
