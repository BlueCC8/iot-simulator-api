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
                res.status(201).json({
                    message: "Ethernet added successfully",
                    etherId: ether._id
                })
            )
            .catch(next) //next middleware in chain
    },
    read(req, res, next) {
        Ether.find({}).then((ethers) => {
                res.status(200).json({
                    message: "Ethernets fetched successfully!",
                    ethers: ethers
                });
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
                    .then(ether => {
                        res.status(200).json({
                            message: "Ethernets updated successfully!",
                            ether: ether
                        });
                    })
                    .catch(next)
            })
    },

    delete(req, res, next) {
        const etherId = req.params.id;
        const etherProps = req.body;
        console.log("delete works?")
        Ether.findByIdAndDelete({
                _id: etherId
            })
            .then(ether => res.status(204).send(ether))
            //204 stands for succes
            .catch(next)
    }
}