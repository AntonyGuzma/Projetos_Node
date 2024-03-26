const express       = require('express')
const exphb       = require('express-handlebars')
const path          = require('path')
//importando o banco
const db            =  require('./db/conexao')  
const app           = express();
const bodyParser    = require('body-parser')
const job           = require('./models/Job')
const Sequelize     = require('sequelize')
const OP            = Sequelize.Op

//PORTA
const port = 3000;

app.listen(port, () => {
    console.log(`O express está ok la na porta ${port}`)
})

//Body Parser
app.use(bodyParser.urlencoded({ extended: false }))

//handle bars
app.set('views', path.join(__dirname, 'view'))
//antes era só o exphb no caso a variavel na qual eu instanciei a biblioteca, agora precisa ter o ".engine"
app.engine('handlebars', exphb.engine({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

//static folder
app.use(express.static(path.join(__dirname, 'public')))

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

    let search = req.query.job
    let query = '%'+search+'%'

    if(!search){
        //pegando os dados do banco no ./modelu/job e ordenando por data em ordem decrescente
        job.findAll({order: [
            ['createdAt', 'DESC']
        ]})
        .then((jobs) => res.render('index', {jobs}))
        .catch(err => console.log(err))
    }else{  
        //pegando os dados do banco no ./modelu/job e ordenando por data em ordem decrescente
        job.findAll({
            where: {title: {[OP.like]: query}},
            order: [
            ['createdAt', 'DESC']
        ]})
        .then((jobs) => res.render('index', {jobs, search}))
        .catch(err => console.log(err))
    }
})


//JOBS ROUTES
app.use('/jobs', require('./routes/jobs'))  