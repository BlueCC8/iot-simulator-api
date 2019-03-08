/* eslint-disable no-underscore-dangle */
const Device = require('../models/Device.js');

module.exports = {
  greeting(req, res) {
    res.send({
      hi: 'Device greets you'
    });
  },
  create(req, res, next) {
    const deviceProps = req.body;
    Device.create(deviceProps)
      .then(device =>
        res.status(201).json({
          deviceId: device._id
        })
      )
      .catch(next); // next middleware in chain
  },
  readAll(req, res, next) {
    Device.find({})
      .then(devices => {
        res.status(200).json(devices);
      })
      .catch(next);
  },
  readOne(req, res, next) {
    const deviceId = req.params.id;
    Device.findOne({
      _id: deviceId
    })
      .then(device => {
        res.status(200).json(device);
      })
      .catch(next);
  },

  update(req, res, next) {
    const deviceId = req.params.id;
    const deviceProps = req.body;

    Device.findOneAndUpdate(
      {
        _id: deviceId
      },
      deviceProps
    ).then(() => {
      Device.findById({
        _id: deviceId
      })
        .then(device => {
          res.status(200).json(device);
        })
        .catch(next);
    });
  },

  delete(req, res, next) {
    const deviceId = req.params.id;
    // const deviceProps = req.body;

    Device.findOneAndDelete({
      _id: deviceId
    })
      .then(device => res.status(204).send(device))
      .catch(next);
  }
};
