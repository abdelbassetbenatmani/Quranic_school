const authRoute = require('./authRoute')
const schoolRoute = require('./dashboardRoute')


const mountRoutes = (app)=>{
    app.use('/dashboard',schoolRoute)
    app.use('/auth',authRoute)
}

module.exports = mountRoutes