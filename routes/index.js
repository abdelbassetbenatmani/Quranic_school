const authRoute = require('./authRoute')
const schoolRoute = require('./dashboardRoute')


const mountRoutes = (app)=>{
    app.use('/dashboard',schoolRoute)
    app.use('/auth',authRoute)
    app.get('/login',(req,res)=>{
        res.render('login.pug')
    })
}

module.exports = mountRoutes