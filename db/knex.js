const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const knex = require('knex');
const knexConfig = require('./knexfile');
module.exports = knex(knexConfig[process.env.NODE_ENV || 'development']);
