const express = require('express')
const server = express()

// get the Database
const db = require('./database/db')

// configure the public folder
server.use(express.static("public"))

// enable the use of req.body in our application
server.use(express.urlencoded({ extended: true }))

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

  //req.query: Query String from our Url
  console.log(req.query)

  return res.render("create-point.html")
})

server.post("/save-point", (req, res) => {
  // req.body: Body of our form
  // console.log(req.body)

  // insert data in DB

  const query = `
    INSERT INTO places (
      image,
      name,
      address,
      address2,
      state,
      city,
      items
    ) VALUES (?,?,?,?,?,?,?);
  `
  const values = [
    req.body.image,
    req.body.name,
    req.body.address,
    req.body.address2,
    req.body.state,
    req.body.city,
    req.body.items
  ]

  function afterInsertData(err) {
    if (err) {
      console.log(err)
      return res.render("Erro ao Cadastrar Ponto de Coleta. Tente Novamente!")

    }
    console.log("Cadastrado com Sucesso.")
    console.log(this)

    return res.render("create-point.html", { saved: true })
  }

  db.run(query, values, afterInsertData)



})

// Search Results Page
server.get("/search", (req, res) => {

  const search = req.query.search

  // empty search
  if (search == "") {
    return res.render("search-results.html", { total: 0 })
  }



  // get data on database
  db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function (err, rows) {
    if (err) {
      return console.log(err)
    }

    const total = rows.length

    // show html page with DB data
    return res.render("search-results.html", { places: rows, total })
  })
})


// turn on the server
server.listen(3000)