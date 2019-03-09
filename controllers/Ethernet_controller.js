/* eslint-disable no-underscore-dangle */
const Ether = require('../models/Ethernet.js');

module.exports = {
  greeting(req, res) {
    res.send({
      hi: 'Ethernet greets you'
    });
  },
  create(req, res, next) {
    const url = `${req.protocol}://${req.get('host')}`;
    const etherProps = req.body;
    etherProps.imagePath = `${url}/images/${req.file.filename}`;

    Ether.create(etherProps)
      .then(ether =>
        res.status(201).json({
          ether
          // etherId: ether._id
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
    const url = `${req.protocol}://${req.get('host')}`;
    const etherId = req.params.id;
    const etherProps = req.body;
    etherProps.imagePath = `${url}/images/${req.file.filename}`;
    Ether.findOneAndUpdate(
      {
        _id: etherId
      },
      etherProps,
      {
        useFindAndModify: false
      }
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
