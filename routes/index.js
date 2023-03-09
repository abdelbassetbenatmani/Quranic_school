const authRoute = require('./authRoute')
const schoolRoute = require('./dashboardRoute')


const mountRoutes = (app)=>{
    app.use('/dashboard',schoolRoute)
    app.use('/auth',authRoute)
    // app.use('/schools',schoolRoute)
}

module.exports = mountRoutes