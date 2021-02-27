//const { Shoe, Color, Size, Quantity } = require('../db/index.js'); //mySQL models
const { Shoes, Colors, Sizes, Quantities } = require('../db/postgresDB.js'); //PostgreSQL models
const { Op } = require('sequelize');

let get = {
  colors: (id) => {
    return new Promise((resolve, reject) => {
      Quantities.findAll({
        where: {
          shoe_id: id
        }
      })
      .then (shoeColors => {
        return shoeColors.map(x => x.dataValues.color_id);
      })
      .then(colorIDs => {
        Colors.findAll({
          where: {
            id: {
              [Op.or]: colorIDs
            }
          }
        })
        .then(results => {
          resolve(results.map(x => x.dataValues));
        })
      })
      .catch(err => {
        reject(err);
      });
    });
  },
  sizes: (id) => {
    return new Promise((resolve, reject) => {
      Shoes.findOne({
        where: {
          model: id
        }
      })
      .then (shoe => {
        if (shoe.dataValues.name.includes('Women\'s')) {
          return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
        } else {
          return [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
        }
      })
      .then(sizeIDs => {
        Sizes.findAll({
          where: {
            id: {
              [Op.or]: sizeIDs
            }
          }
        })
        .then(results => {
          resolve(results.map(x => x.dataValues));
        })
      })
      .catch(err => {
        reject(err);
      });
    });
  },
  quantity: (shoeID, colorID) => {
    return new Promise((resolve, reject) => {
      Quantities.findOne({
        where: {
          shoe_id: shoeID,
          color_id: colorID
        }
      })
      .then(result => {
        let sizes = result.dataValues.quantities.split(' ');
        resolve(sizes.map(x => {
          let info = x.split(':');
          return { size_id: Number(info[0]), quantity: Number(info[1])}
        }));
        //resolve('success');
      })
      .catch(err => {
        reject(err);
      });
    });
  }
}

let create = (shoeData) => {
  return Shoes.create({name: shoeData.name, model: shoeData.model})
  .then(() => {
    Quantities.bulkCreate(shoeData.quantities);
  })
}

let update = (model, shoeData) => {
  return Quantities.findAll({
    where: {
      shoe_id: model,
      color_id: shoeData.color_id
    }
  })
  .then((results) => {
    if (results.length === 0) {
      Quantities.create({shoe_id: model, color_id: shoeData.color_id, quantities: shoeData.quantities})
    } else {
      Quantities.update({quantities: shoeData.quantities}, {
        where: {
          shoe_id: model,
          color_id: shoeData.color_id
        }
      })
    }
  })
}

let remove = (modelNumber) => {
  return Quantities.destroy({
    where: {
      shoe_id: modelNumber
    }
  })
  .then(() => {
    Shoes.destroy({
      where: {
        model: modelNumber
      }
    })
  })
}

  module.exports = {
    get: get,
    create: create,
    update: update,
    remove: remove
  }
