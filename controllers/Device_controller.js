const Device = require("../models/Device.js");
module.exports = {
    greeting(req, res) {
        res.send({
            hi: "Device greets you"
        })
    },
    create(req, res, next) {
        console.log(req.body);
        const deviceProps = req.body;
        Device.create(deviceProps)
            .then(device =>
                res.status(200).send(device)
            )
            .catch(next) //next middleware in chain
    },
    read(req, res, next) {
        Device.find({}).then((devices) => {
                res.status(200).send(devices)
            })
            .catch(next)
    },

    update(req, res, next) {
        const deviceId = req.params.id;
        const deviceProps = req.body;

        Device.findByIdAndUpdate({
                _id: deviceId
            }, deviceProps)
            .then(() => {
                Device.findById({
                        _id: deviceId
                    })
                    .then(device => res.status(200).send(device))
                    .catch(next)
            })
    },

    delete(req, res, next) {
        const deviceId = req.params.id;
        const deviceProps = req.body;

        Device.findByIdAndRemove({
                _id: deviceId
            })
            .then(device => res.status(204).send(device))
            //204 stands for succes
            .catch(next)
    }
}