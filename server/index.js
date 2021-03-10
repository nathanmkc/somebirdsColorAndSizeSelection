//require('newrelic');
const express = require('express');
const compression = require('compression');
const app = express();
const PORT = '3001';
const shoes = require('../model');

app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

app.post('/shoes', (req, res) => {
  shoes.create(req.body)
  .then(result => {
    res.status(200).send('Shoe created successfully');
  })
  .catch(err => {
    console.error(err);
    res.status(404).end('Error creating new shoe');
  })
});

app.put('/shoes/:shoeId', (req, res) => {
  let shoeId = req.params.shoeId;
  shoes.update(shoeId, req.body)
  .then(result => {
    res.status(200).send('Shoe successfully updated');
  })
  .catch(err => {
    console.error(err);
    res.status(404).end('Error updating shoe');
  })
});

app.delete('/shoes/:shoeId', (req, res) => {
  let shoeId = req.params.shoeId;
  shoes.remove(shoeId)
  .then(result => {
    res.status(200).send('Shoe deleted successfully');
  })
  .catch(err => {
    console.error(err);
    res.status(404).end('Error deleting shoe');
  })
});

app.get('/shoes/:shoeId/colors', (req, res) => {
  let shoeId = req.params.shoeId;
  shoes.get.colors(shoeId)
  .then(result => {
    res.status(200).send(result);
  })
  .catch(err => {
    console.error(err);
    res.status(500).end();
  });
});

app.get('/shoes/:shoeId/sizes', (req, res) => {
  let shoeId = req.params.shoeId;
  shoes.get.sizes(shoeId)
  .then(result => {
    res.status(200).send(result);
  })
  .catch(err => {
    console.error(err);
    res.status(500).end();
  });
});

app.get('/shoes/:shoeId/colors/:colorId/quantities', (req, res) => {
  let { shoeId, colorId } = req.params;
  shoes.get.quantity(shoeId, colorId)
  .then(result => {
    res.status(200).send(result);
  })
  .catch(err => {
    console.error(err);
    res.status(500).end();
  });
});

app.listen(PORT, () => {
  console.log(`Listening on localhost:${PORT}`);
});
