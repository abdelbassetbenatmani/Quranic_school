const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const compression = require('compression');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const xss = require('xss-clean');
const helmet = require('helmet');
const flash = require('connect-flash');
const session = require('express-session');
const ejs = require('ejs');
const pug = require('pug');


dotenv.config({ path: 'config.env' });
const dbConnection = require('./config/dbConnection');
const apiError = require('./utils/apiError');
const globalError = require('./middleware/errorMiddleware');
const mountRoutes = require('./routes');

dbConnection();

const app = express();
app.use(express.json({ limit: '20kb' }));
app.use(express.urlencoded({extended:false}))
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  express.static(
    path.join(__dirname, 'node_modules', 'bootstrap', 'dist', 'js')
  )
);

app.use(session({
  secret:'abdelbasset4real',
  saveUninitialized: true,
  resave: true
}));

app.use(flash());
// allowed other domain acces api
app.use(cors());
app.options('*', cors());
// compress response
app.options(compression());

app.set('view engine', 'ejs');
// set view directories
app.set('views', ['./views', './views/teachers']);
// register pug engine
app.engine('pug', pug.renderFile);

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Limit each IP to 100 requests per `window` (here, per 15 minutes)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message:
    'Too many accounts created from this IP, please try again after 15 minutes',
});

// Apply the rate limiting middleware to all requests
app.use(limiter);

/* make sure this comes before any routes */
app.use(xss());

app.use(helmet());
// Middleware

mountRoutes(app);
app.all('*', (req, res, next) => {
  // eslint-disable-next-line new-cap
  next(new apiError(`Can't find this route ${req.originalUrl}`, 400));
});
app.use(globalError);
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`server listen on port ${PORT}`);
});

process.on('unhandledRejection', (err) => {
  console.error(`unhandledRejection ${err.message} and ${err.name}`);
  logger.error(`unhandledRejection ${err.message} and ${err.name}`);
  server.close(() => {
    console.error(`shut down ......`);
    process.exit(1);
  });
});

module.exports = server;
