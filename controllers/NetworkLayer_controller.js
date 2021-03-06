/* eslint-disable no-underscore-dangle */
const NetLayer = require('../models/NetworkLayer.js');

module.exports = {
  greeting(req, res) {
    res.send({
      hi: 'Network Layer greets you'
    });
  },
  create(req, res, next) {
    const netLayerProps = req.body;
    NetLayer.create(netLayerProps)
      .then(netLayer =>
        res.status(201).json({
          netLayerId: netLayer._id
        })
      )
      .catch(next); // next middleware in chain
  },
  readAll(req, res, next) {
    const pageSize = +req.query.pagesize;
    const currentPage = +req.query.page;
    const query = NetLayer.find();
    let fetchedNetLayers;
    if (pageSize && currentPage) {
      query.skip(pageSize * (currentPage - 1)).limit(pageSize);
    }
    query
      .then(netLayers => {
        fetchedNetLayers = netLayers;
        return NetLayer.countDocuments();
      })
      .then(count => {
        res.status(200).json({
          netLayers: fetchedNetLayers,
          maxNetLayers: count
        });
      })
      .catch(next);
  },
  readOne(req, res, next) {
    const netLayerId = req.params.id;
    NetLayer.findOne({
      _id: netLayerId
    })
      .then(netLayer => {
        res.status(200).json(netLayer);
      })
      .catch(next);
  },

  update(req, res, next) {
    const netLayerId = req.params.id;
    const netLayerProps = req.body;

    NetLayer.findOneAndUpdate(
      {
        _id: netLayerId
      },
      netLayerProps
    ).then(() => {
      NetLayer.findById({
        _id: netLayerId
      })
        .then(netLayer => {
          res.status(200).json(netLayer);
        })
        .catch(next);
    });
  },

  delete(req, res, next) {
    const netLayerId = req.params.id;
    // const netLayerProps = req.body;

    NetLayer.findOneAndDelete({
      _id: netLayerId
    })
      .then(netLayer => res.status(204).send(netLayer))
      // 204 stands for succes
      .catch(next);
  }
};
