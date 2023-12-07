import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import userR from './routes/userRouter.js'
import authR from './routes/authRouter.js'
import postR from './routes/PostRouter.js'
import {PORT} from './config.js' 

const app = express();

var corsOptions = {
    credentials: true,
    origin: 'http://localhost:3300'
}

app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(cookieParser())

app.get('/',(req,res) => {
    res.json({mensage:"Api do CultureLink"})
} )

app.use('/users', userR)
app.use('/posts', postR)
app.use('/auth', authR)

app.listen(PORT, () => {
    console.log(`servidor no ar na porta http://localhost:${PORT}`)
}
)