const authRoute = require('./authRoute');
const schoolRoute = require('./dashboardRoute');
const mainRoute = require('./mainRoute');
const mountRoutes = (app) => {
  app.use('/dashboard', schoolRoute);
  app.use('/auth', authRoute);
  app.use('/myschool', mainRoute);
};

module.exports = mountRoutes;
