/* eslint-disable no-underscore-dangle */
const ConfigDevice = require('../models/ConfigDevice.js');

module.exports = {
  greeting(req, res) {
    res.send({
      hi: 'ConfigDevice greets you'
    });
  },
  create(req, res, next) {
    const configDevProps = req.body;
    ConfigDevice.create(configDevProps)
      .then(configDev =>
        res.status(201).json({
          configDevId: configDev._id
        })
      )
      .catch(next);
  },
  readAll(req, res, next) {
    ConfigDevice.find({})
      .then(configDevs => {
        res.status(200).json(configDevs);
      })
      .catch(next);
  },
  readOne(req, res, next) {
    const configDevId = req.params.id;
    ConfigDevice.findOne({
      _id: configDevId
    })
      .then(configDev => {
        res.status(200).json(configDev);
      })
      .catch(next);
  },

  update(req, res, next) {
    const configDevId = req.params.id;
    const configDevProps = req.body;

    ConfigDevice.findOneAndUpdate(
      {
        _id: configDevId
      },
      configDevProps
    ).then(() => {
      ConfigDevice.findOne({
        _id: configDevId
      })
        .then(configDev => {
          res.status(200).json(configDev);
        })
        .catch(next);
    });
  },

  delete(req, res, next) {
    const configDevId = req.params.id;
    // const configDevProps = req.body;

    ConfigDevice.findOneAndDelete({
      _id: configDevId
    })
      .then(configDev => res.status(204).send(configDev))
      // * 204 stands for succes
      .catch(next);
  }
};
