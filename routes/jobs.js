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
    .catch(err => console.log('error'))
})

router.get('/test', (req, res) => {
    res.send('deu certo')
})


module.exports = router