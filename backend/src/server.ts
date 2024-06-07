import express, { Request, Response } from 'express'
import http from 'http'

// https://www.youtube.com/watch?v=72_5_YuDCNA

// DOCKER
// https://www.youtube.com/watch?v=vm3YfOHf_Cc
const app = express()
const PORT = process.env.PORT || 3000

app.get('/', (req: Request, res: Response) => {
  res.send('hello world')
})

app.listen(PORT, () => {
  console.log(`Running on Port ${PORT}`)
})
