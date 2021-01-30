const { Shoe, Color, Size, Quantity } = require('../db/index.js');
const { Op } = require('sequelize');

let get = {
  colors: (id) => {
    return new Promise((resolve, reject) => {
      Quantity.findAll({
        where: {
          shoe_id: id
        }
      })
      .then (shoeColors => {
        return shoeColors.map(x => x.dataValues.color_id);
      })
      .then(colorIDs => {
        Color.findAll({
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
      Shoe.findOne({
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
        Size.findAll({
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
      Quantity.findOne({
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
      })
      .catch(err => {
        reject(err);
      });
    });
  }
}

let create = (shoeData) => {
  return Shoe.create({name: shoeData.name, model: shoeData.model})
  .then(() => {
    Quantity.bulkCreate(shoeData.quantities);
  })
}

let update = (model, shoeData) => {
  return Quantity.findAll({
    where: {
      shoe_id: model,
      color_id: shoeData.color_id
    }
  })
  .then((results) => {
    if (results.length === 0) {
      Quantity.create({shoe_id: model, color_id: shoeData.color_id, quantities: shoeData.quantities})
    } else {
      Quantity.update({quantities: shoeData.quantities}, {
        where: {
          shoe_id: model,
          color_id: shoeData.color_id
        }
      })
    }
  })
}

let remove = (modelNumber) => {
  return Quantity.destroy({
    where: {
      shoe_id: modelNumber
    }
  })
  .then(() => {
    Shoe.destroy({
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
