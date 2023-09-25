const express = require("express")
const bodyParser = require("body-parser")
const connectDb = require("./config/connectDatabase")
const cors = require("cors")
const questionRouter = require("./router/question")
const userAnswerRouter = require("./router/userAnswer")
const app = express()
const PORT = 8000


app.use(bodyParser.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())
connectDb("mongodb://127.0.0.1:27017/mini-game")


app.use(questionRouter)
app.use(userAnswerRouter)

app.listen(PORT, () => {
    console.log(`Sever running on PORT: ${PORT} `)
})