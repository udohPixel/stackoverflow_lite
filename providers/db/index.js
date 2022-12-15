// import required libraries
const { Sequelize } = require('sequelize');
const logger = require('../../logger/index');
const config = require('../../settings/settings.config');

const sequelize = new Sequelize(config.APP_DB, config.APP_DB_USERNAME, config.APP_DB_PASSWORD, {
  host: 'localhost',
  dialect: 'mysql', // explicitely specify dialect
});

// dbSetup module
const dbSetup = async () => {
  try {
    await sequelize.authenticate();

    logger.info('Connection to database has been established successfully');
  } catch (error) {
    const meta = 'database';

    logger.error(`Unable to connect to the database: ${error.message}`, {
      ...error,
      meta,
    });
  }
};

// export dbSetup module
module.exports = { sequelize, dbSetup };
