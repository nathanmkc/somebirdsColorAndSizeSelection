const { sequelize } = require('./index.js');

async function synchronizeModels() {
  try {
    await sequelize.sync({ force: true });
    console.log("All models were synchronized successfully.");
  } catch (error) {
    console.error(error);
  }
}

synchronizeModels();