const express       = require('express')
//importando o banco
const db            =  require('./db/conexao')
const app           = express();
const bodyParser    = require('body-parser')

//PORTA
const port = 3000;

app.listen(port, () => {
    console.log(`O express está ok la na porta ${port}`)
})

//Body Parser
app.use(bodyParser.urlencoded({ extended: false }))

//DB conection
db.authenticate()
.then(() => {
    console.log('conectou')
})
.catch(error => {
    console.log("ocorrou error ao conectar no DB")
})


//ROTAS
app.get('/', (req, res) => {
    res.send('ok no site')
})


//JOBS ROUTES
app.use('/jobs', require('./routes/jobs'))