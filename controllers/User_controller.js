const User = require("../models/User");
module.exports = {
    greeting(req, res) {
        res.send({
            hi: "User greets you"
        })
    },
    create(req, res, next) {
        console.log(req.body);
        const userProps = req.body;
        User.create(userProps)
            .then(user =>
                res.status(200).send(user)
            )
            .catch(next) //next middleware in chain
    },
    read(req, res, next) {
        User.find({}).then((users) => {
                res.status(200).send(users)
            })
            .catch(next)
    },

    update(req, res, next) {
        const userId = req.params.id;
        const userProps = req.body;

        User.findByIdAndUpdate({
                _id: userId
            }, userProps)
            .then(() => {
                User.findById({
                        _id: userId
                    })
                    .then(user => res.status(200).send(user))
                    .catch(next)
            })
    },

    delete(req, res, next) {
        const userId = req.params.id;
        const userProps = req.body;

        User.findByIdAndRemove({
                _id: userId
            })
            .then(user => res.status(204).send(user))
            // * 204 stands for succes
            .catch(next)
    }
}