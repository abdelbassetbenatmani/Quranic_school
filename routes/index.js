const authRoute = require('./authRoute')
const schoolRoute = require('./schoolRoute')


const mountRoutes = (app)=>{
    app.use('/dashboard',(req,res,next) =>{
        res.render('dashboard')
    })
    app.use('/auth',authRoute)
    app.use('/schools',schoolRoute)
}

module.exports = mountRoutes