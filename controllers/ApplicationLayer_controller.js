/* eslint-disable no-underscore-dangle */
const AppLayer = require('../models/ApplicationLayer');

module.exports = {
  greeting(req, res) {
    res.send({
      hi: 'Application Layer greets you'
    });
  },
  create(req, res, next) {
    const appLayerProps = req.body;
    AppLayer.create(appLayerProps)
      .then(appLayer =>
        res.status(201).json({
          appLayerId: appLayer._id
        })
      )
      .catch(next);
  },
  readAll(req, res, next) {
    AppLayer.find({})
      .then(appLayers => {
        res.status(200).json(appLayers);
      })
      .catch(next);
  },
  readOne(req, res, next) {
    const appLayerId = req.params.id;
    AppLayer.findOne({
      _id: appLayerId
    })
      .then(appLayer => {
        res.status(200).json(appLayer);
      })
      .catch(next);
  },

  update(req, res, next) {
    const appLayerId = req.params.id;
    const appLayerProps = req.body;

    AppLayer.findOneAndUpdate(
      {
        _id: appLayerId
      },
      appLayerProps
    ).then(() => {
      AppLayer.findOne({
        _id: appLayerId
      })
        .then(appLayer => {
          res.status(200).json(appLayer);
        })
        .catch(next);
    });
  },

  delete(req, res, next) {
    const appLayerId = req.params.id;
    // const appLayerProps = req.body;

    AppLayer.findOneAndDelete({
      _id: appLayerId
    })
      .then(appLayer => res.status(204).send(appLayer))
      .catch(next);
  }
};
