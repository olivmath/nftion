import { Router } from "express"

const router = Router()

const hello = router.get("/", (request, response) => {
    return response.status(201).json({})
})

export { hello }
