const LinkLayer = require('../models/LinkLayer');
const Device = require('../models/Device');
const ConfigDevice = require('../models/ConfigDevice');
const Room = require('../models/Room');
const User = require('../models/User');
// const Polygon = require('../models/Polygon');

module.exports = {
  populateLinkLayer(req, res, next) {
    LinkLayer.find({})
      .populate({
        path: 'llWifiID',
        model: 'Wifi'
      })
      .populate({
        path: 'llEthernetID',
        model: 'Ethernet'
      })
      .then(data => {
        res.status(200).send(data);
      })
      .catch(next);
  },
  populateDevice(req, res, next) {
    Device.find()
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
        model: 'LinkLayer'
      })
      .then(data => {
        res.status(200).send(data);
      })
      .catch(next);
  },
  populateConfigDevice(req, res, next) {
    ConfigDevice.find({})
      .populate({
        path: 'devIDs',
        model: 'Device'
      })
      .then(data => {
        res.status(200).send(data);
      })
      .catch(next);
  },
  populateRoom(req, res, next) {
    Room.find({})
      .populate({
        path: 'configDevIDs',
        model: 'ConfigDevice'
      })
      .populate({
        path: 'polID',
        model: 'Polygon'
      })
      .then(data => {
        res.status(200).send(data);
      })
      .catch(next);
  },
  populateUser(req, res, next) {
    User.find({})
      .populate({
        path: 'roomIDs',
        model: 'Room'
      })
      .then(data => {
        res.status(200).send(data);
      })
      .catch(next);
  }
};
