const app = require('./app');
const logger = require('./utils/logger');
const config = require('./utils/config');
const connectMongoDB = require('./db/mongoDB');

app.listen(config.PORT, () => {
    logger.info(`Server running on ${config.PORT}`);
    connectMongoDB();
});