// Importar a dependencia do SQLite3
const sqlite3 = require("sqlite3").verbose()

// Iniciar o objeto de banco de dados (fará operacoes)
const db = new sqlite3.Database("./src/database/database.db")

module.exports = db

// Utilizar o objeto de banco de dados para nossas operações
db.serialize(() => {

//     // Com comandos SQL eu vou:

//     // 1- Criar uma tabela
//     // db.run(`
//     //     CREATE TABLE IF NOT EXISTS places (
//     //         id INTEGER PRIMARY KEY AUTOINCREMENT,
//     //         image TEXT,
//     //         name TEXT,
//     //         address TEXT,
//     //         address2 TEXT,
//     //         state TEXT,
//     //         city TEXT,
//     //         items TEXT
//     //     );
//     // `)


//     // // 2- Inserir dados na tabela
//     // const query = `
//     //     INSERT INTO places (
//     //         image,
//     //         name,
//     //         address,
//     //         address2,
//     //         state,
//     //         city,
//     //         items
//     //     ) VALUES (?,?,?,?,?,?,?);
//     // `

//     // const values = [
//     //     "https://images.unsplash.com/photo-1516992654410-9309d4587e94?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
//     //     "Papersider",
//     //     "Guilherme Gemballa, Jardim América",
//     //     "Nº 260",
//     //     "Santa Catarina",
//     //     "Ria do Sul",
//     //     "Resíduos Eletrônicos, Lâmpadas"
//     // ]

//     // // Função de retorno após inserir dados no database
//     // function afterInsertData(err) {
//     //     if(err) {
//     //         return console.log(err)
//     //     }

//     //     console.log("Cadastrado com sucesso")
//     //     console.log(this) //referencia a resposta que o .run trás
//     // }

//     // // Callback - a função afterInsertData insere os dados na tabela e só retorna quando estiver 'pronta'
//     //     db.run(query, values, afterInsertData)  

        
//     // 3- Consultar dados da tabela
//     // db.all(`SELECT * FROM places`, function(err, rows) { //rows = registros das tabelas
//     //     if(err) {
//     //         return console.log(err)
//     //     }

//     //     console.log("Aqui estão seus registros: ")
//     //     console.log(rows)
//     // })


//     // 4- Deletar um dado da tabela (descomente essa linha e salve o arquivo)
    // db.run(`DELETE FROM places WHERE id = ?`, [5], function(err) {
    //     if(err) {
    //         return console.log(err)
    //     }

    //     console.log("Registro deletado com sucesso!")
    // }) 

} )