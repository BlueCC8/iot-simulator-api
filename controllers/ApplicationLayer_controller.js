const AppLayer = require("../models/ApplicationLayer.js");
module.exports = {
    greeting(req, res) {
        res.send({
            hi: "Application Layer greets you"
        })
    },
    create(req, res, next) {
        console.log(req.body);
        const appLayerProps = req.body;
        AppLayer.create(appLayerProps)
            .then(appLayer =>
                res.status(200).send(appLayer)
            )
            .catch(next) //next middleware in chain
    },
    read(req, res, next) {
        AppLayer.find({}).then((appLayers) => {
                res.status(200).send(appLayers)
            })
            .catch(next)
    },

    update(req, res, next) {
        const appLayerId = req.params.id;
        const appLayerProps = req.body;

        AppLayer.findByIdAndUpdate({
                _id: appLayerId
            }, appLayerProps)
            .then(() => {
                AppLayer.findById({
                        _id: appLayerId
                    })
                    .then(appLayer => res.status(200).send(appLayer))
                    .catch(next)
            })
    },

    delete(req, res, next) {
        const appLayerId = req.params.id;
        const appLayerProps = req.body;

        AppLayer.findByIdAndRemove({
                _id: appLayerId
            })
            .then(applayer => res.status(204).send(appLayer))
            //204 stands for succes
            .catch(next)
    }
}