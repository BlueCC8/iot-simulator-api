const NetLayer = require("../models/NetworkLayer.js");
module.exports = {
    greeting(req, res) {
        res.send({
            hi: "Network Layer greets you"
        })
    },
    create(req, res, next) {
        console.log(req.body);
        const netLayerProps = req.body;
        NetLayer.create(netLayerProps)
            .then(netLayer =>
                res.status(200).send(netLayer)
            )
            .catch(next) //next middleware in chain
    },
    read(req, res, next) {
        NetLayer.find({}).then((netLayers) => {
                res.status(200).send(netLayers)
            })
            .catch(next)
    },

    update(req, res, next) {
        const netLayerId = req.params.id;
        const netLayerProps = req.body;

        NetLayer.findByIdAndUpdate({
                _id: netLayerId
            }, netLayerProps)
            .then(() => {
                NetLayer.findById({
                        _id: netLayerId
                    })
                    .then(netLayer => res.status(200).send(netLayer))
                    .catch(next)
            })
    },

    delete(req, res, next) {
        const netLayerId = req.params.id;
        const netLayerProps = req.body;

        NetLayer.findByIdAndRemove({
                _id: netLayerId
            })
            .then(netlayer => res.status(204).send(netLayer))
            //204 stands for succes
            .catch(next)
    }
}