const env = process.env.NODE_ENV || 'dev';

const config = {
  dev: require('./config.dev'),
  prod: require('./config.prod'),
};

module.exports = config[env];
