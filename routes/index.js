const authRoute = require('./authRoute');
const schoolRoute = require('./dashboardRoute');
const mainRoute = require('./mainRoute');
const mountRoutes = (app) => {
  app.use('/dashboard', schoolRoute);
  app.use('/auth', authRoute);
  app.use('/myschool', mainRoute);
  app.use('/',(req,res,next)=>{return res.render('home')})
};

module.exports = mountRoutes;
