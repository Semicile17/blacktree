const AppError = require('../utils/appError');

// check for invalid field types
const handleCastErrorDB = (err)=>{
    const message = `Invalid ${err.path}: ${err.value}`
    return new AppError(message, 400);
}

// check for duplicate field that should be unique
const handleDuplicateFieldsDB = (err)=>{
    const value = Object.keys(err.keyvalue).map(key=> `${key} : ${err.keyValue[key]}`);
    const message = `Duplicate field value {${value}}. Please use another value!`;
    return new AppError(message, 400);
}

// validation errors for schema
const handleValidationErrorDB = err=>{
    const errName = Object.values(err.errors).map(ele=> ele.message); // error has errors object which contains info about all errors.
    const message = `Invalid input data. ${errName.join('. ')}`;
    return new AppError(message, 400);
}

// JWT related errors
const handleJWTError = ()=> new AppError('Invalid token. Please log in again!', 401);
const handleJWTexpired = err => new AppError('Your token has expired. Please log in again', 401);




// Sending response to development environment
const sendDev = (err, res)=>{
    const statusCode = err.statusCode || 500;
    const status = err.status || 'error';

    res.status(statusCode).json({
        status: status,
        error: err,
        message: err.message,
        stack: err.stack
    });
}

// Sending response to production environment
const sendProd = (err, res)=>{
    const statusCode = err.statusCode || 500;
    const status = err.status || 'error';

    if (err.isOperational){
        res.status(statusCode).json({
            status: status,
            message: err.message
        })

    }else{
        console.log('ERROR 💣 :', err);
        res.status(500).json({
            status: 'Error',
            message: 'Something went wrong'
        });
    }
}

module.exports = (err, req, res, next) => {
    if (process.env.NODE_ENV === 'development') {
        sendDev(err, res);

    } else if (process.env.NODE_ENV === 'production') {
        let error = {...err};
        if (err.name==='CastError') error = handleCastErrorDB(error);
        if (err.code===11000) error = handleDuplicateFieldsDB(error);
        if (err.name==='ValidationError') error = handleValidationErrorDB(error);
        if (err.name==='JsonWebTokenError') error = handleJWTError();
        if (err.name==='TokenExpiredError') error = handleJWTexpired();
        sendProd(error, res);
    }

    next();
}