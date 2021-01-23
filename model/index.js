const { Shoe, Color, Size, Quantity, Shoecolor, Shoesize } = require('../db/index.js');
const { Op } = require('sequelize');

let get = {
  colors: (id) => {
    return new Promise((resolve, reject) => {
      Shoecolor.findAll({
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
      Shoesize.findAll({
        where: {
          shoe_id: id
        }
      })
      .then (shoesizes => {
        return shoesizes.map(x => x.dataValues.size_id);
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
      Quantity.findAll({
        where: {
          shoe_id: shoeID,
          color_id: colorID
        }
      })
      .then(results => {
        resolve(results.map(x => ({ size_id: x.dataValues.size_id, quantity: x.dataValues.quantity })));
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
    Shoecolor.bulkCreate(shoeData.colors);
  })
  .then(() => {
    Shoesize.bulkCreate(shoeData.sizes);
  })
  .then(() => {
    Quantity.bulkCreate(shoeData.quantities);
  })
}

let update = (model, shoeData) => {
  return Shoecolor.findAll({
    where: {
      shoe_id: model,
      color_id: shoeData.color_id
    }
  })
  .then((results) => {
    if (results.length === 0) {
      Shoecolor.create({shoe_id: model, color_id: shoeData.color_id})
    }
  })
  .then(() => {
    return Shoesize.findAll({
      where: {
        shoe_id: model,
        size_id: shoeData.size_id
      }
    })
  })
  .then((results) => {
    if (results.length === 0) {
      Shoesize.create({shoe_id: model, size_id: shoeData.size_id})
    }
  })
  .then(() => {
    return Quantity.findAll({
      where: {
        shoe_id: model,
        color_id: shoeData.color_id,
        size_id: shoeData.size_id
      }
    })
  })
  .then((results) => {
    if (results.length === 0) {
      Quantity.create({shoe_id: model, color_id: shoeData.color_id, size_id: shoeData.size_id, quantity: shoeData.quantity})
    } else {
      Quantity.update({quantity: shoeData.quantity}, {
        where: {
          shoe_id: model,
          color_id: shoeData.color_id,
          size_id: shoeData.size_id
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
    Shoecolor.destroy({
      where: {
        shoe_id: modelNumber
      }
    })
  })
  .then(() => {
    Shoesize.destroy({
      where: {
        shoe_id: modelNumber
      }
    })
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
