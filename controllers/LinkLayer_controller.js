const LinkLayer = require("../models/LinkLayer.js");
module.exports = {
    greeting(req, res) {
        res.send({
            hi: "Link Layer greets you"
        })
    },
    create(req, res, next) {
        console.log(req.body);
        const linkLayerProps = req.body;
        LinkLayer.create(linkLayerProps)
            .then(linkLayer =>
                res.status(200).send(linkLayer)
            )
            .catch(next) //next middleware in chain
    },
    read(req, res, next) {
        LinkLayer.find({}).then((linkLayers) => {
                res.status(200).send(linkLayers)
            })
            .catch(next)
    },

    update(req, res, next) {
        const linkLayerId = req.params.id;
        const linkLayerProps = req.body;

        LinkLayer.findByIdAndUpdate({
                _id: linkLayerId
            }, linkLayerProps)
            .then(() => {
                LinkLayer.findById({
                        _id: linkLayerId
                    })
                    .then(linkLayer => res.status(200).send(linkLayer))
                    .catch(next)
            })
    },

    delete(req, res, next) {
        const linkLayerId = req.params.id;
        const linkLayerProps = req.body;

        LinkLayer.findByIdAndRemove({
                _id: linkLayerId
            })
            .then(linklayer => res.status(204).send(linklayer))
            //204 stands for succes
            .catch(next)
    }
}