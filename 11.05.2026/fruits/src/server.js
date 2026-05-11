import express from 'express'
import fruitsRoutes from '.../src/routes/fruitRoutes.js'
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.json('Alex1111!')
})

app.use("/frutas", fruitsRoutes)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})