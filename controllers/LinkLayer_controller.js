/* eslint-disable no-underscore-dangle */
const LinkLayer = require('../models/LinkLayer.js');

module.exports = {
  greeting(req, res) {
    res.send({
      hi: 'Link Layer greets you'
    });
  },
  create(req, res, next) {
    const linkLayerProps = req.body;
    LinkLayer.create(linkLayerProps)
      .then(linkLayer =>
        res.status(201).json({
          linkLayerId: linkLayer._id
        })
      )
      .catch(next); // next middleware in chain
  },
  readAll(req, res, next) {
    LinkLayer.find({})
      .then(linkLayer => {
        res.status(200).json(linkLayer);
      })
      .catch(next);
  },
  readOne(req, res, next) {
    const linkLayerId = req.params.id;

    LinkLayer.findOne({
      _id: linkLayerId
    })
      .then(linkLayer => {
        res.status(200).json(linkLayer);
      })
      .catch(next);
  },

  update(req, res, next) {
    const linkLayerId = req.params.id;
    const linkLayerProps = req.body;

    LinkLayer.findOneAndUpdate(
      {
        _id: linkLayerId
      },
      linkLayerProps
    ).then(() => {
      LinkLayer.findOne({
        _id: linkLayerId
      })
        .then(linkLayer => {
          res.status(200).json(linkLayer);
        })
        .catch(next);
    });
  },

  delete(req, res, next) {
    const linkLayerId = req.params.id;
    // const linkLayerProps = req.body;

    LinkLayer.findOneAndDelete({
      _id: linkLayerId
    })
      .then(linklayer => res.status(204).send(linklayer))
      // 204 stands for succes
      .catch(next);
  }
};
