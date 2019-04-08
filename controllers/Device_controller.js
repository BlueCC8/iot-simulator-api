/* eslint-disable no-underscore-dangle */
const Device = require('../models/Device.js');

module.exports = {
  greeting(req, res) {
    res.send({
      hi: 'Device greets you'
    });
  },
  create(req, res, next) {
    const url = `${req.protocol}://${req.get('host')}`;
    const deviceProps = req.body;
    deviceProps.username = req.username;
    if (req.file) {
      deviceProps.devImgUrl = `${url}/images/${req.file.filename}`;
    }
    Device.create(deviceProps)
      .then(device =>
        res.status(201).json({
          device
        })
      )
      .catch(next); // next middleware in chain
  },
  readAll(req, res, next) {
    const pageSize = +req.query.pagesize;
    const currentPage = +req.query.page;
    const query = Device.find();
    let isPopulated;
    let checkPopulated = req.query.populated;

    let fetchedDevices;
    if (pageSize && currentPage) {
      query.skip(pageSize * (currentPage - 1)).limit(pageSize);
    }
    if (checkPopulated) {
      isPopulated = checkPopulated.toLowerCase() == 'true' ? true : false;
    }
    if (isPopulated) {
      query
        .populate({
          path: 'appLayerID',
          model: 'ApplicationLayer'
        })
        .populate({
          path: 'netLayerID',
          model: 'NetworkLayer'
        })
        .populate({
          path: 'linLayerID',
          model: 'LinkLayer',
          populate: [
            { path: 'llWifiID', model: 'Wifi' },
            {
              path: 'llEthernetID',
              model: 'Ethernet'
            }
          ]
        });
    }
    query
      .then(devices => {
        fetchedDevices = devices;
        return Device.countDocuments();
      })
      .then(count => {
        res.status(200).json({
          devices: fetchedDevices,
          maxDevices: count
        });
      })
      .catch(next);
  },
  readOne(req, res, next) {
    const deviceId = req.params.id;
    let isPopulated;
    let checkPopulated = req.query.populated;
    const query = Device.findOne({
      _id: deviceId
    });
    if (checkPopulated) {
      isPopulated = checkPopulated.toLowerCase() == 'true' ? true : false;
    }
    if (isPopulated) {
      query
        .populate({
          path: 'appLayerID',
          model: 'ApplicationLayer'
        })
        .populate({
          path: 'netLayerID',
          model: 'NetworkLayer'
        })
        .populate({
          path: 'linLayerID',
          model: 'LinkLayer',
          populate: [
            { path: 'llWifiID', model: 'Wifi' },
            {
              path: 'llEthernetID',
              model: 'Ethernet'
            }
          ]
        });
    }
    query
      .then(device => {
        res.status(200).json(device);
      })
      .catch(next);
  },

  update(req, res, next) {
    const url = `${req.protocol}://${req.get('host')}`;
    const deviceId = req.params.id;
    const deviceProps = req.body;
    const { username } = req;
    if (req.file) {
      deviceProps.devImgUrl = `${url}/images/${req.file.filename}`;
    } else {
      deviceProps.devImgUrl = null;
    }
    Device.updateOne(
      {
        _id: deviceId,
        username
      },
      deviceProps,
      {
        useFindAndModify: false
      }
    )
      .then(result => {
        if (result.n > 0) {
          res.status(200).json({ message: 'Update successful' });
        } else {
          res.status(401).json({ message: 'Not authorized' });
        }
      })
      .catch(next);
  },

  delete(req, res, next) {
    const deviceId = req.params.id;
    // const deviceProps = req.body;
    const { username } = req;
    Device.deleteOne({
      _id: deviceId,
      username
    })
      .then(result => {
        if (result.n > 0) {
          res.status(200).json({ message: 'Delete successful' });
        } else {
          res.status(401).json({ message: 'Not authorized' });
        }
      })
      .catch(next);
  }
};
