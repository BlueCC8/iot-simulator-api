/* eslint-disable no-underscore-dangle */
const Ether = require('../models/Ethernet.js');

module.exports = {
  greeting(req, res) {
    res.send({
      hi: 'Ethernet greets you'
    });
  },
  create(req, res, next) {
    const etherProps = req.body;
    Ether.create(etherProps)
      .then(ether =>
        res.status(201).json({
          etherId: ether._id
        })
      )
      .catch(next); // next middleware in chain
  },
  readAll(req, res, next) {
    Ether.find({})
      .then(ethers => {
        res.status(200).json(ethers);
      })
      .catch(next);
  },
  readOne(req, res, next) {
    const etherId = req.params.id;
    Ether.findOne({
      _id: etherId
    })
      .then(ether => {
        res.status(200).json(ether);
      })
      .catch(next);
  },
  update(req, res, next) {
    const etherId = req.params.id;
    const etherProps = req.body;

    Ether.findOneAndUpdate(
      {
        _id: etherId
      },
      etherProps
    ).then(() => {
      Ether.findOne({
        _id: etherId
      })
        .then(ether => {
          res.status(200).json(ether);
        })
        .catch(next);
    });
  },

  delete(req, res, next) {
    const etherId = req.params.id;
    // const etherProps = req.body;

    Ether.findOneAndDelete({
      _id: etherId
    })
      .then(ether => res.status(204).send(ether))
      // 204 stands for succes
      .catch(next);
  }
};
