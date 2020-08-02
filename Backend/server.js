const express = require('express');
const errorHandler = require('./middleware/error');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xss = require('xss-clean');
const cors = require('cors');
const hpp = require('hpp');
const fileUpload = require('express-fileupload');
const rateLimit = require('express-rate-limit');
const path = require('path');
require('dotenv').config();
// Import DB
const connectDB = require('./config/db');
connectDB();
require('colors');
// route files
const auth = require('./api/auth');
const users = require('./api/users');
const ml = require('./api/ml');
// load env variables
const app = express();
// Body Parser
app.use(express.json());
// sanitize Data
app.use(mongoSanitize());
// set security hearder
app.use(helmet());
// xss-clean
app.use(xss());
// Rate Limit
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minutes
  max: 10000, // limit each IP to 100 requests per windowMs
});
app.use(limiter);
// hpp
app.use(hpp());
// cors
app.use(cors());

app.options('*', cors());

// file Upload
app.use(fileUpload());
// set static folder
const options = {
  dotfiles: 'ignore',
  etag: false,
  extensions: ['htm', 'html'],
  maxAge: '1d',
  redirect: false,
  setHeaders: function(res, path, stat) {
    res.set('x-timestamp', Date.now());
  },
};
app.use(express.static(path.join(__dirname, './public'), options));
// app.use(express.static(path.join(__dirname, './public/client'), options))

// Use Routes
// All other routes should redirect to the index.html
app.use('/api/v1/auth', auth);
app.use('/api/v1/user', users);
app.use('/api/v1/ml', ml);

// All other routes should redirect to the index.html
// app.get('*.*', express.static('./public/frontend')); // production
//
// app.all('*', (req, res) => {
//   res.status(200).sendFile('/', {root: './public/frontend'});
// }); // production

app.use(errorHandler);
const PORT = process.env.PORT || 5000;

app.listen(
    PORT,
    console.log(
        `Server running on port ${PORT}`.yellow.bold,
    ),
);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server & exit process
  // server.close(() => process.exit(1));
});


module.exports = app;
