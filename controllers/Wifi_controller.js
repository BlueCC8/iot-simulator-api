const Wifi = require("../models/Wifi.js");
module.exports = {
    greeting(req, res) {
        res.send({
            hi: "Wifi greets you"
        })
    },
    create(req, res, next) {
        console.log(req.body);
        const wifiProps = req.body;
        Wifi.create(wifiProps)
            .then(wifi =>
                res.status(200).send(wifi)
            )
            .catch(next) //next middleware in chain
    },
    read(req, res, next) {
        Wifi.find({}).then((wifis) => {
                res.status(200).send(wifis)
            })
            .catch(next)
    },

    update(req, res, next) {
        const wifiId = req.params.id;
        const wifiProps = req.body;

        Ether.findByIdAndUpdate({
                _id: wifiId
            }, wifiProps)
            .then(() => {
                Wifi.findById({
                        _id: wifiId
                    })
                    .then(wifi => res.status(200).send(wifi))
                    .catch(next)
            })
    },

    delete(req, res, next) {
        const wifiId = req.params.id;
        const wifiProps = req.body;

        Wifi.findByIdAndRemove({
                _id: wifiId
            })
            .then(wifi => res.status(204).send(wifi))
            //204 stands for succes
            .catch(next)
    }
}