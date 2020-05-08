const express = require('express');
const helmet = require('helmet');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const hpp = require('hpp');
const path = require('path');
const userRoutes = require('./routes/userRoutes');
const hiringAd = require('./routes/hiringAdRoute');
const employerRoutes = require('./routes/employerRoutes');
const limiter = require('./controllers/middlewares/rateLimit');
const cookieParser = require('cookie-parser');
const handleGlobalError = require('./controllers/errorController');
const AppError = require('./utils/appError');

const app = express();
app.use(helmet());
app.use('/api', limiter);
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/posts', hiringAd);
app.use('/api/v1/employer', employerRoutes);
// app.all('*', (req, res, next) => {
//   next(new AppError(`can not find ${req.originalUrl} on this server`), 404);
// });
// app.use(handleGlobalError);
app.use((err, req, res, next) => {
  //   console.log(err);
  res.json(err.message);
});
module.exports = app;
