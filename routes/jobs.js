//definindo as rotas do sistema

const express = require('express')
const router = express.Router()
const Job = require('../models/Job')

//add
router.post('/add', (req, res) => {
 
    let {title, salary, company, description, email, new_job} = req.body

    Job.create({
        title,
        description,
        salary,
        company,
        email,
        new_job
    })
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})


//rota de teste
router.get('/test', (req, res) => {
    res.send('deu certo')
})

//rota de envio
router.get('/add', (req, res) => {
    res.render('add')
})

//rota de detalhe da vaga
router.get('/view/:id', (req, res) => {
    Job.findOne({
        where: {id: req.params.id}
    })
    .then(job => {
        res.render('view',{
            job
        })
    })
    .catch(err => {console.log(err)})
})
  

module.exports = router