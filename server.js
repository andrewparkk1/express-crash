const express = require('express')
const app = express()
app.set("view engine", "ejs")

/* Telling express to use the public folder as a static folder. */
app.use(express.static("public"))


/* A middleware that parses the body of the request. */
app.use(express.urlencoded({ extended: true }))

/* A middleware that parses the body of the request. */
app.use(express.json())

// app.use(logger)
// app.get("/", logger, (req, res) => {
//     console.log("here")
//     res.send("Hello, this is first page")
// })

app.get("/", (req, res) => {
    res.send("Hello, this is first page")
})

const userRouter = require("./routes/users")
app.use("/users", userRouter)


// function logger(req, res, next) {
//     console.log(req.originalUrl)
//     next()
//   }


app.listen(3000)