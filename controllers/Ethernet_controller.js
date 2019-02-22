const Ether = require("../models/Ethernet.js");
module.exports = {
    greeting(req, res) {
        res.send({
            hi: "Ethernet greets you"
        })
    },
    create(req, res, next) {
        console.log(req.body);
        const etherProps = req.body;
        Ether.create(etherProps)
            .then(ether =>
                res.status(200).send(ether)
            )
            .catch(next) //next middleware in chain
    },
    read(req, res, next) {
        Ether.find({}).then((ethers) => {
                res.status(200).send(ethers)
            })
            .catch(next)
    },

    update(req, res, next) {
        const etherId = req.params.id;
        const etherProps = req.body;

        Ether.findByIdAndUpdate({
                _id: etherId
            }, etherProps)
            .then(() => {
                Ether.findById({
                        _id: etherId
                    })
                    .then(ether => res.status(200).send(ether))
                    .catch(next)
            })
    },

    delete(req, res, next) {
        const etherId = req.params.id;
        const etherProps = req.body;

        Ether.findByIdAndRemove({
                _id: etherId
            })
            .then(ether => res.status(204).send(ether))
            //204 stands for succes
            .catch(next)
    }
}