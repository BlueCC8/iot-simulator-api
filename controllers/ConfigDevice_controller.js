const ConfigDevice = require("../models/ConfigDevice.js");
module.exports = {
    greeting(req, res) {
        res.send({
            hi: "ConfigDevice greets you"
        })
    },
    create(req, res, next) {
        console.log(req.body);
        const configDevProps = req.body;
        ConfigDevice.create(configDevProps)
            .then(configDev =>
                res.status(200).send(configDev)
            )
            .catch(next) //next middleware in chain
    },
    read(req, res, next) {
        ConfigDevice.find({}).then((configDevs) => {
                res.status(200).send(configDevs)
            })
            .catch(next)
    },

    update(req, res, next) {
        const configDevId = req.params.id;
        const configDevProps = req.body;

        ConfigDevice.findByIdAndUpdate({
                _id: configDevId
            }, configDevProps)
            .then(() => {
                ConfigDevice.findById({
                        _id: configDevPropsId
                    })
                    .then(configDev => res.status(200).send(configDev))
                    .catch(next)
            })
    },

    delete(req, res, next) {
        const configDevId = req.params.id;
        const configDevProps = req.body;

        ConfigDevice.findByIdAndRemove({
                _id: configDevId
            })
            .then(configDev => res.status(204).send(configDev))
            // * 204 stands for succes
            .catch(next)
    }
}