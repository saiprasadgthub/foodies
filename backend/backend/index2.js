import express from 'express'
import  {route1} from './routes/createuser.js'
import {route2} from './routes/DisplayData.js'
import {route3} from './routes/Orderdata.js'
import cors from 'cors'
const app = express()
const port = 4000

import {mongoDB} from './db.js'

mongoDB();
app.use(cors({
  origin: ['http://localhost:5173',
  "https://foodies-six-mu.vercel.app/"],
  credentials: true
}));


app.use(express.json())
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use('/api',route1);
app.use('/api',route2);
app.use('/api',route3);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})