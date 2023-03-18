const authRoute = require('./authRoute');
const schoolRoute = require('./dashboardRoute');
const teachersRoute = require('./teachersRoute');
const mountRoutes = (app) => {
  app.use('/dashboard', schoolRoute);
  app.use('/auth', authRoute);
  app.use('/teachers', teachersRoute);
};

module.exports = mountRoutes;
