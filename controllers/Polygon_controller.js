/* eslint-disable no-underscore-dangle */
const Polygon = require('../models/Polygon.js');

module.exports = {
  greeting(req, res) {
    res.send({
      hi: 'Polygon greets you'
    });
  },
  create(req, res, next) {
    const polygonProps = req.body;
    Polygon.create(polygonProps)
      .then(polygon =>
        res.status(201).json({
          polygonId: polygon._id
        })
      )
      .catch(next); // next middleware in chain
  },
  readAll(req, res, next) {
    Polygon.find({})
      .then(polygon => {
        res.status(200).json(polygon);
      })
      .catch(next);
  },
  readOne(req, res, next) {
    const polyId = req.params.id;
    Polygon.findOne({
      _id: polyId
    })
      .then(polygon => {
        res.status(200).json(polygon);
      })
      .catch(next);
  },

  update(req, res, next) {
    const polygonId = req.params.id;
    const polygonProps = req.body;

    Polygon.findOneAndUpdate(
      {
        _id: polygonId
      },
      polygonProps
    ).then(() => {
      Polygon.findOne({
        _id: polygonId
      })
        .then(polygon => {
          res.status(200).json(polygon);
        })
        .catch(next);
    });
  },

  delete(req, res, next) {
    const polygonId = req.params.id;
    // const polygonProps = req.body;

    Polygon.findOneAndDelete({
      _id: polygonId
    })
      .then(polygon => res.status(204).send(polygon))
      // 204 stands for succes
      .catch(next);
  }
};
