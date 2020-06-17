const express = require("express")
const server = express()


// Configurando pasta public (faz o express enxergar essa pasta)
server.use(express.static("public"))


// Utilizando template 'engine' - deixando o HTML dinâmico
const nunjucks = require("nunjucks")


// Ligando o Express ao Nunjucks
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})



// Configurando rotas da aplicação
// Pagina inicial 
server.get("/", (req, res) => {
    //Sem nunjucks: res.sendFile(__dirname + "/views/index.html")
    return res.render("index.html", { title: "Um titulo"});
})


server.get("/create-point", (req, res) => {
    //Sem nunjucks: res.sendFile(__dirname + "/views/create-point.html")
    return res.render("create-point.html");
})

server.get("/search", (req, res) => {
    return res.render("search-results.html");
})


// Ligar o servidor
server.listen(3000)