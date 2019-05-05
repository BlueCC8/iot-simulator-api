/* eslint-disable no-underscore-dangle */
const ConfigDevice = require('../models/ConfigDevice.js');
const RoomController = require('../controllers/Room_controller');

module.exports = {
  greeting(req, res) {
    res.send({
      hi: 'ConfigDevice greets you'
    });
  },
  create(req, res, next) {
    const configDevProps = req.body;
    const { roomId } = req.body;
    configDevProps.username = req.username;
    ConfigDevice.create(configDevProps)
      .then(configDev => {
        const roomProps = {
          roomId,
          configDevId: configDev._id,
          username: configDevProps.username
        };
        if (roomId) {
          // ! Temporary apart from the req
          RoomController.updateConfigs(req, res, next, roomProps);
        } else {
          res.status(201).json({
            configDevId: configDev._id
          });
        }
      })
      .catch(next);
  },
  readAll(req, res, next) {
    const pageSize = +req.query.pagesize;
    const currentPage = +req.query.page;
    const { ids } = req.query;
    let query = '';
    if (ids) {
      query = ConfigDevice.find({
        _id: {
          $in: ids
        }
      });
    } else {
      query = ConfigDevice.find();
    }
    let isPopulated;
    const checkPopulated = req.query.populated;
    let fetchedConfigs;

    if (pageSize && currentPage) {
      query.skip(pageSize * (currentPage - 1)).limit(pageSize);
    }
    if (checkPopulated) {
      isPopulated = checkPopulated.toLowerCase() === 'true';
    }
    if (isPopulated) {
      query.populate({
        path: 'devIDs',
        model: 'Device'
      });
    }
    query
      .then(configs => {
        fetchedConfigs = configs;

        if (ids) {
          return fetchedConfigs.length;
        }
        return ConfigDevice.countDocuments();
      })
      .then(count => {
        res.status(200).json({
          configs: fetchedConfigs,
          maxConfigs: count
        });
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
    const { username } = req;

    ConfigDevice.updateOne(
      {
        _id: configDevId,
        username
      },
      configDevProps,
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
    const configDevId = req.params.id;
    // const configDevProps = req.body;
    const { username } = req;
    ConfigDevice.deleteOne({
      _id: configDevId,
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
