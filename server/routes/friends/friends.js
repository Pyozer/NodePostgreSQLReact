import { Router } from "express"
import { Op } from 'sequelize'
import User from "../../models/user";
import { isUUID } from "../users/users";

const api = Router({ mergeParams: true })

api.get("/", async (req, res) => {
    try {
        let userWithFriends = await User.findOne({
            where: {
                uuid: req.userByIdentifier.uuid
            },
            include: [{
                model: User,
                as: 'friends',
                required: true,
                through: { attributes: [] }
            }]
        });
        const { friends } = userWithFriends
        res.status(200).json({
            data: { friends }
        })
    } catch ({ message }) {
        res.status(400).json({
            error: { message }
        })
    }
})

api.get("/:friendId", async (req, res) => {
    try {
        const { friendId } = req.params
        if (!friendId)
            throw new Error("You must provide the friendId")

        const where = isUUID(friendId)
            ? { uuid: friendId }
            : { nickname: { [Op.iLike]: friendId } }

        const { uuid } = req.userByIdentifier
        let userFriend = await User.findOne({
            where: { uuid },
            include: [{
                model: User,
                as: 'friends',
                required: true,
                through: { attributes: [] },
                where
            }]
        });

        if (userFriend && userFriend.friends.length > 0)
            res.status(200).json({
                data: {
                    friend: userFriend.friends[0]
                }
            })
        else
            res.status(200).json({ data: {} })

    } catch ({ message }) {
        res.status(400).json({
            error: { message }
        })
    }
})

export default api