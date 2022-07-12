import { app } from "../src/app"
import request from "supertest"

describe("Test routes", () => {
    test("GET / - 201", async () => {
        const response = await request(app).get("/")
        expect(response.status).toEqual(201)
        expect(response.body).toEqual({})
    })
})
