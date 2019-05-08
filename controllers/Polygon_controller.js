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
    const pageSize = +req.query.pagesize;
    const currentPage = +req.query.page;
    const query = Polygon.find();
    let fetchedPolygons;

    if (pageSize && currentPage) {
      query.skip(pageSize * (currentPage - 1)).limit(pageSize);
    }
    query
      .then(polygon => {
        fetchedPolygons = polygon;
        return Polygon.countDocuments();
      })
      .then(count => {
        res.status(200).json({
          polygons: fetchedPolygons,
          maxPolygons: count
        });
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

    Polygon.updateOne(
      {
        _id: polygonId
      },
      polygonProps,
      {
        useFindAndModify: false
      }
    )
      .then(result => {
        if (result.n > 0) {
          res.status(200).json({ message: 'Update successful' });
        } else {
          res.status(401).json({ message: 'Unknown error' });
        }
      })
      .catch(next);
  },

  delete(req, res, next) {
    const polygonId = req.params.id;
    // const polygonProps = req.body;

    Polygon.deleteOne({
      _id: polygonId
    })
      .then(result => {
        if (result.n > 0) {
          res.status(200).json({ message: 'Delete successful' });
        } else {
          res.status(401).json({ message: 'Unknown error' });
        }
      })
      .catch(next);
  }
};
