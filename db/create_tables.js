const { Shoe, Color, Size, Quantity } = require('./index.js');

async function synchronizeModels() {
  try {
    await Shoe.sync();
    await Color.sync();
    await Size.sync();
    await Quantity.sync();
    console.log('Successfully created: shoes, colors, sizes and quantities tables');
  } catch (error) {
    console.error(error);
  }
}

synchronizeModels();