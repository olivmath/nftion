import { app } from "./infrastructure/app"

const port = 3000
app.listen(port, () => {
    const port = 3000
    console.log(`🚀 run in http://localhost:${port}`)
})
