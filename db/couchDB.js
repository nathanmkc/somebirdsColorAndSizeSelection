require('dotenv').config();
const nano = require('nano')(`http://admin:${process.env.DEV_DB_PASS}@localhost:5984`);

const db = nano.use('sdc_somebirds_shoeinventory');

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
}


module.exports = db;