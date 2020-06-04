const express = require('express')
const server = express()

// configure the public folder
server.use(express.static("public"))

// using nunjucks(Template Engine)
const nunjucks = require('nunjucks')
nunjucks.configure("src/views", {
  express: server,
  noCache: true,
})



// configure my application paths
// req: Request(question)
// res: Response(answer)

// Home Page
server.get("/", (req, res) => {
  return res.render("index.html")
})

// Create Point Page
server.get("/create-point", (req, res) => {
  return res.render("create-point.html")
})

// Search Results Page
server.get("/search", (req, res) => {
  return res.render("search-results.html")
})


// turn on the server
server.listen(3000)