const express = require("express")
const router = express.Router()
router.use(logger)

const users = [{ name: "Kyle" }, { name: "Sally" }]


/* A route handler that is listening for a get request on the root route. It is logging the query
parameter name and then sending the string "User list" to the client. */
router.get("/", (req, res) => {
    console.log(req.query.name)
    res.send("User list")
})

/* Rendering the users/new.ejs file and passing in the firstName variable. */
router.get("/new", (req, res) => {
    res.render("users/new", {firstName: "Test"})
})

/* A post request that is adding a new user to the users array. */
router.post("/", (req, res) => {
    const isValid = true
    if (isValid) {
        users.push({firstName: req.body.firstName})
        res.redirect(`/users/${users.length - 1}`)
    } else {
        console.log("error")
        res.render("users/new", {firstName: req.body.firstName})
    }
})


/* A chain of methods that are all called on the same route of id. */
router
    .route("/:id")
    .get((req, res) => {
        console.log(req.user)
        res.send(`get user with id ${req.params.id}`)
    })
    .put((req, res) => {
        res.send(`put user with id ${req.params.id}`)
    })
    .delete((req, res) => {
        res.send(`delete user with id ${req.params.id}`)
    })


/* A middleware that is called before the route handler. It is used to preload data. */
router.param("id", (req, res, next, id) => {
    req.user = users[id]
    next()
})


/**
 * It takes in a request, response, and next function, logs the request's original URL, and then calls
 * the next function
 * @param req - the request object
 * @param res - The response object.
 * @param next - a function that tells express to move on to the next middleware function in the stack.
 */
function logger(req, res, next) {
    console.log(req.originalUrl)
    next()
  }
  
module.exports = router