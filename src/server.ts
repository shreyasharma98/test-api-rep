import express from 'express'
import router from './router'
import morgan from 'morgan'
import cors from 'cors'
import { protect } from './middlewares/auth'
import { createNewUser, signin } from './handlers/users'


const app = express()


app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/', (req, res, next) => {
    res.send("hiiii")
})

app.post('/signup', createNewUser)
app.post('/signin', signin)

app.use('/api/v1', protect ,router);

app.use((err, req, res, next) => {
    console.log(err)
    res.json({message: `had an error: ${err.message}`})
  })
export default app;