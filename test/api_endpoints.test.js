import { expect } from 'chai';
const shoes = require('../model');
const exampleData = require('./exampleData/endpoint_responses.js');
const [shoeID, colorID] = [1, 1];
const testShoeData = {"name": "test shoe",
"model": 101,
"colors": [{"shoe_id": 101, "color_id": 1},{"shoe_id": 101, "color_id": 7},{"shoe_id": 101, "color_id": 9},{"shoe_id": 101, "color_id": 14}],
"sizes": [{"shoe_id": 101, "size_id": 4},{"shoe_id": 101, "size_id": 7},{"shoe_id": 101, "size_id": 10},{"shoe_id": 101, "size_id": 13}],
"quantities": [{"shoe_id": 101, "color_id": 1, "size_id": 4, "quantity": 6}, {"shoe_id": 101, "color_id": 1, "size_id": 7, "quantity": 2}, {"shoe_id": 101, "color_id": 1, "size_id": 10, "quantity": 0}, {"shoe_id": 101, "color_id": 1, "size_id": 13, "quantity": 5}, {"shoe_id": 101, "color_id": 7, "size_id": 4, "quantity": 6}, {"shoe_id": 101, "color_id": 7, "size_id": 7, "quantity": 2}, {"shoe_id": 101, "color_id": 7, "size_id": 10, "quantity": 0}, {"shoe_id": 101, "color_id": 7, "size_id": 13, "quantity": 5}, {"shoe_id": 101, "color_id": 9, "size_id": 4, "quantity": 6}, {"shoe_id": 101, "color_id": 9, "size_id": 7, "quantity": 2}, {"shoe_id": 101, "color_id": 9, "size_id": 10, "quantity": 0}, {"shoe_id": 101, "color_id": 9, "size_id": 13, "quantity": 5}, {"shoe_id": 101, "color_id": 14, "size_id": 4, "quantity": 6}, {"shoe_id": 101, "color_id": 14, "size_id": 7, "quantity": 2}, {"shoe_id": 101, "color_id": 14, "size_id": 10, "quantity": 0}, {"shoe_id": 101, "color_id": 14, "size_id": 13, "quantity": 5}]
}

describe('API Endpoints', () => {

  it('GET request to /shoes/:shoeId/colors should return data that matches example data', () => {
    return shoes.get.colors(shoeID)
    .then(colorData => {
      expect(JSON.stringify(colorData)).to.equal(JSON.stringify(exampleData.colors));
    })
  });

  it('GET request to /shoes/:shoeId/sizes should return data that matches example data', () => {
    return shoes.get.sizes(shoeID)
    .then(sizeData => {
      expect(JSON.stringify(sizeData)).to.equal(JSON.stringify(exampleData.sizes));
    })
  });

  describe('GET request to /shoes/:shoeId/colors/:colorId/quantities should return data with the correct shape', () => {
    it('Returns an array of objects', () => {
      return shoes.get.quantity(shoeID, colorID)
      .then(quantityData => {
        expect(Array.isArray(quantityData)).to.equal(true);
      })
    });
    it(`Objects within array should have a 'size_id' and 'quantity' properties with values of type 'number'`, () => {
      return shoes.get.quantity(shoeID, colorID)
      .then(quantityData => {
        expect(JSON.stringify(Object.keys(quantityData[0]))).to.equal(JSON.stringify(['size_id', 'quantity']));
        expect(typeof quantityData[0].size_id).to.equal('number');
        expect(typeof quantityData[0].quantity).to.equal('number');
      })
    });
  });

  describe('POST request to /shoes should add a shoe to the database, and DELETE requests to /shoes/:shoeId then removes it', () => {
    it('should add entries to the database with create, then remove them with delete', () => {
      return shoes.create(testShoeData)
      .then(() => {
        return shoes.get.quantity(101, 1);
      })
      .then ( quantityData => {
        expect(quantityData.length).to.equal(4);
      })
      .then(() => {
        shoes.remove(101)
      })
      .then(() => {
        return shoes.get.quantity(101, 1);
      })
      .then(quantityData => {
        expect(quantityData.length).to.equal(0);
      })
    });
  });

  describe('PUT request to /shoes/:shoeId should update the quantity available for a shoe in a certain size and color', () => {
    it('should change the quantity available for a shoe in a certain size and color', () => {
      return shoes.update(100, {color_id: 25, size_id: 1, quantity: 1})
      .then(() => {
        return shoes.get.quantity(100, 25)
      })
      .then((quantityData) => {
        expect(quantityData[0].quantity).to.equal(1);
        return shoes.update(100, {color_id: 25, size_id: 1, quantity: 5});
      })
      .then(() => {
        return shoes.get.quantity(100, 25);
      })
      .then((quantityData) => {
        expect(quantityData[0].quantity).to.equal(5);
      })
    });
  });

});
