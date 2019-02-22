const Polygon = require("../models/Polygon.js");
module.exports = {
    greeting(req, res) {
        res.send({
            hi: "Polygon greets you"
        })
    },
    create(req, res, next) {
        console.log(req.body);
        const polygonProps = req.body;
        Polygon.create(polygonProps)
            .then(polygon =>
                res.status(200).send(polygon)
            )
            .catch(next) //next middleware in chain
    },
    read(req, res, next) {
        Polygon.find({}).then((polygons) => {
                res.status(200).send(polygons)
            })
            .catch(next)
    },

    update(req, res, next) {
        const polygonId = req.params.id;
        const polygonProps = req.body;

        Polygon.findByIdAndUpdate({
                _id: polygonId
            }, polygonProps)
            .then(() => {
                Polygon.findById({
                        _id: polygonId
                    })
                    .then(polygon => res.status(200).send(polygon))
                    .catch(next)
            })
    },

    delete(req, res, next) {
        const polygonId = req.params.id;
        const polygonProps = req.body;

        Polygon.findByIdAndRemove({
                _id: polygonId
            })
            .then(polygon => res.status(204).send(polygon))
            //204 stands for succes
            .catch(next)
    }
}