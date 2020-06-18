const express = require("express")
const server = express()

// Pegar o banco de dados
const db = require("./database/db")

// Configurando pasta public (faz o express enxergar essa pasta)
server.use(express.static("public"))

// Habilitar o uso do req.body na aplicação
server.use(express.urlencoded({ extended: true }))

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


    // req.query: Query Strings da nossa URL
        // Esse console.log mostra as Query Strings (informacoes da URL) no console.log
        // console.log(req.query)


    //Sem nunjucks: res.sendFile(__dirname + "/views/create-point.html")
    return res.render("create-point.html");
})


server.post("/savepoint", (req,res) => {

    // req.body: o corpo do nosso formulário
    console.log(req.body) //Linha11

    // Inserir os dados no banco de dados
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

    // Função de retorno após inserir dados no database
    function afterInsertData(err) {
        if(err) {
            console.log(err)
            return res.send("Erro no cadastro!")
        }

        console.log("Cadastrado com sucesso")
        console.log(this) //referencia a resposta que o .run trás

        return res.send("create-point.html", { saved: true})
    }

    // Callback - a função afterInsertData insere os dados na tabela e só retorna quando estiver 'pronta'
        db.run(query, values, afterInsertData)  
})




server.get("/search", (req, res) => {

    const search = req.query.search
    
    if(search == "") {
        //pesquisa vazia
        return res.render("search-results.html", {total: 0})
    }

    // 3- Consultar dados da tabela
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows) { //rows = registros das tabelas
        if(err) {
            return console.log(err)
        }

        console.log("Aqui estão seus registros: ")
        console.log(rows)

        const total = rows.length

        // Mostrar a pagina HTML com os dados do banco de dados
        return res.render("search-results.html", { places: rows, total: total})
    })
})


// Ligar o servidor
server.listen(3000)