const { Shoe, sequelize } = require('./index.js');

// async function test () {
//   try {
//     await sequelize.authenticate();
//     console.log('Connection has been established successfully.');
//   } catch (error) {
//     console.error('Unable to connect to the database:', error);
//   }
// }

async function synchronizeModels() {
  try {
    await sequelize.sync({ force: true });
    console.log("All models were synchronized successfully.");
  } catch (error) {
    console.error(error);
  }
// res = await Shoe.create({name: "bob"});
// console.log(res);
// res = await Shoe.create({name: "sally"});
// console.log(res);
}

// test();
synchronizeModels();