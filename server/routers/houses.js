/**
 * Created by fcc on 16-8-18.
 */

import express from 'express';
import House from '../models/House';

let router = express.Router();

function returnValue(houses) {
  return houses.map((house)=> {
    return {
      name: house.name,
      price: house.price,
      address: house.address,
      city: house.city,
      type: house.type,
      image: house.image
    }
  });
}

router.get('/', (req, res)=> {
  House.find((err, houses)=> {
    if (err) {
      return res.sendStatus(500);
    } else {
      res.send(returnValue(houses));
    }
  });
});

router.get('/:city', (req, res)=> {
  House
    .where({city: req.params.city})
    .find((err, houses)=> {
      if (err)
        return res.sendStatus(500);
      else {
        res.send(returnValue(houses));
      }
    });
});

module.exports = router;
