const authRoute = require('./authRoute')
const schoolRoute = require('./schoolRoute')


const mountRoutes = (app)=>{
    app.use('/auth',authRoute)
    app.use('/schools',schoolRoute)
}

module.exports = mountRoutes