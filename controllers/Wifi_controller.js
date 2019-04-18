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
    const pageSize = +req.query.pagesize;
    const currentPage = +req.query.page;
    const query = Wifi.find();
    let fetchedWifis;
    if (pageSize && currentPage) {
      query.skip(pageSize * (currentPage - 1)).limit(pageSize);
    }
    query
      .then(wifis => {
        fetchedWifis = wifis;
        return Wifi.countDocuments();
      })
      .then(count => {
        res.status(200).json({
          wifis: fetchedWifis,
          maxWifis: count
        });
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
