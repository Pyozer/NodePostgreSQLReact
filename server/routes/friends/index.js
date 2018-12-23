import { Router } from "express"
import friends from './friends'
import secureFriends from './secure_friends'

const api = Router({ mergeParams: true })

api.use("/", friends)
api.use("/", secureFriends)

export default api
