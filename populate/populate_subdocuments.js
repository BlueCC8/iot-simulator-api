var LinkLayer = require("../models/LinkLayer")
var Device = require("../models/Device")
var ConfigDevice = require("../models/ConfigDevice")
var Room = require("../models/Room")
var User = require("../models/User")
var Polygon = require("../models/Polygon")

module.exports = {
    populateLinkLayer(req, res, next) {
        LinkLayer.find({})
            .populate({
                path: "llWifiID",
                model: "Wifi"
            })
            .populate({
                path: "llEthernetID",
                model: "Ethernet"
            })
            .then((data) => {
                res.status(200).send(data);
            }).catch(next);;
    },
    populateDevice(req, res, next) {
        Device.find()
            .populate({
                path: "appLayerID",
                model: "ApplicationLayer"
            })
            .populate({
                path: "netLayerID",
                model: "NetworkLayer"
            })
            .populate({
                path: "linLayerID",
                model: "LinkLayer"
            })
            .then((data) => {
                res.status(200).send(data);
            }).catch(next);;
    },
    populateConfigDevice(req, res, next) {
        ConfigDevice.find({})
            .populate({
                path: "devIDs",
                model: "Device"
            }).then((data) => {
                res.status(200).send(data);
            }).catch(next);
    },
    populateRoom(req, res, next) {
        Room.find({})
            .populate({
                path: "configDevIDs",
                model: "ConfigDevice"
            })
            .populate({
                path: "polID",
                model: "Polygon"
            }).then((data) => {
                res.status(200).send(data);
            }).catch(next);
    },
    populateUser(req, res, next) {
        User.find({})
            .populate({
                path: "roomIDs",
                model: "Room"
            })
            .then((data) => {
                res.status(200).send(data);
            }).catch(next);
    }
}