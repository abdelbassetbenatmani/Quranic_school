const authRoute = require('./authRoute')
const schoolRoute = require('./dashboardRoute')


const mountRoutes = (app)=>{
    app.use('/dashboard',schoolRoute)
    app.use('/auth',authRoute)
    app.get('/teachers',(req,res)=>{
        res.render('index.pug')
    })
}

module.exports = mountRoutes