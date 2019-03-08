/* eslint-disable no-underscore-dangle */
const Wifi = require('../models/Wifi.js');

module.exports = {
  greeting(req, res) {
    res.send({
      hi: 'Wifi greets you'
    });
  },
  create(req, res, next) {
    const wifiProps = req.body;
    Wifi.create(wifiProps)
      .then(wifi =>
        res.status(201).json({
          wifiId: wifi._id
        })
      )
      .catch(next); // next middleware in chain
  },
  readAll(req, res, next) {
    Wifi.find({})
      .then(wifi => {
        res.status(200).json(wifi);
      })
      .catch(next);
  },
  readOne(req, res, next) {
    const wifiId = req.params.id;
    Wifi.findOne({
      _id: wifiId
    })
      .then(wifi => {
        res.status(200).json(wifi);
      })
      .catch(next);
  },

  update(req, res, next) {
    const wifiId = req.params.id;
    const wifiProps = req.body;

    Wifi.findOneAndUpdate(
      {
        _id: wifiId
      },
      wifiProps
    ).then(() => {
      Wifi.findOne({
        _id: wifiId
      })
        .then(wifi => {
          res.status(200).send(wifi);
        })
        .catch(next);
    });
  },

  delete(req, res, next) {
    const wifiId = req.params.id;
    // const wifiProps = req.body;

    Wifi.findOneAndDelete({
      _id: wifiId
    })
      .then(wifi => res.status(204).send(wifi))
      // 204 stands for succes
      .catch(next);
  }
};
