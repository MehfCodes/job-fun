const AppError = require('./../utils/appError');

function handleCastErrorDB(err) {
  return new AppError(`not found user for ${err.value}`, 400);
}

function handleDuplicateFieldsDB(err) {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
  console.log(value);
  const message = `This ${value}. Please use another value!`;
  return new AppError(message, 400);
}

function handleValidationErrorDB(err) {
  const errors = Object.values(err.errors).map(el => el.message);
  const message = `invalid input data. ${errors.join('. ')}`;
  return new AppError(message, 400);
}

function handleJWTError() {
  return new AppError('Invalid token. Please log in again!', 401);
}

function handleJWTExpiredError() {
  return new AppError('Your token has expired! Please log in again.', 401);
}

function sendErrorDev(err, req, res) {
  if (req.originalUrl.startsWith('/api')) {
    return res.status(err.statusCode).json({
      statud: err.status,
      error: err,
      message: err.message,
      stack: err.stack
    });
  }
}

function sendErrorProd(err, req, res) {
  if (req.originalUrl.startsWith('/api')) {
    // A) Operational, trusted error: send message to client
    if (err.isOperational) {
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message
      });
    }
  }

  // B) Programming or other unknown error: don't leak error details
  // 1) Log error
  // console.error('ERROR 💥', err);
  // 2) Send generic message
  return res.status(500).json({
    status: 'error',
    message: 'Something went very wrong!'
  });
}

function handleGlobalError(err, req, res, next) {
  // console.log(err);

  // err.statusCode = err.statusCode;
  err.status = err.status || 'error';
  // const error = { ...err };
  // if (process.env.NODE_ENV === 'development') {
  //   sendErrorDev(err, req, res);
  // } else if (process.env.NODE_ENV === 'production') {

  let error = { ...err };
  error.message = err.message;

  if (error.name === 'CastError') error = handleCastErrorDB(error);
  if (error.code === 11000) error = handleDuplicateFieldsDB(error);
  if (error.name === 'ValidationError') error = handleValidationErrorDB(error);
  if (error.name === 'JsonWebTokenError') error = handleJWTError();
  if (error.name === 'TokenExpiredError') error = handleJWTExpiredError();

  sendErrorProd(error, req, res);
}
module.exports = handleGlobalError;
