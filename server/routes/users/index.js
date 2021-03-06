import { Router } from "express"
import users from "./users"
import secureUsers from "./secure_users"

const api = Router({ mergeParams: true })

// Use router with route '/me' before router with route '/:uuid'
// Because /:uuid match /me
api.use("/", secureUsers)
api.use("/", users)

export default api
