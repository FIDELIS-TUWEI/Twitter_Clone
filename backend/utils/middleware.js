const logger = require('./logger');

// Log every request made to the server
const requestLogger = (req, res, next) => {
    logger.info('Method:', req.method);
    logger.info('Path:', req.path);
    logger.info('Body:', req.body);
    logger.info('---');

    next();
};

// Middleware for Unknownendpoints requested from the server
const unknownEndPoint = (req, res) => {
    res.status(404).send({ error: "Unknown Endpoint" });
};

// Error handler middleware
const errorHandler = (error, req, res, next) => {
    logger.error(error.message);

    // Cast Error
    if (error.name === 'CastError') {
        res.status(400).send({ error: "Malformatted ID" });
    } else if (error.name === 'ValidationError') {
        return res.status(400).json({ error: error.message });
    }

    next(error);
};

module.exports = {
    requestLogger, unknownEndPoint, errorHandler
};