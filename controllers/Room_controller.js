const Room = require("../models/Room");
module.exports = {
    greeting(req, res) {
        res.send({
            hi: "Room greets you"
        })
    },
    create(req, res, next) {
        console.log(req.body);
        const roomProps = req.body;
        Room.create(roomProps)
            .then(room =>
                res.status(200).send(room)
            )
            .catch(next) //next middleware in chain
    },
    read(req, res, next) {
        Room.find({}).then((rooms) => {
                res.status(200).send(rooms)
            })
            .catch(next)
    },

    update(req, res, next) {
        const roomId = req.params.id;
        const roomProps = req.body;

        Room.findByIdAndUpdate({
                _id: roomId
            }, roomProps)
            .then(() => {
                Room.findById({
                        _id: roomId
                    })
                    .then(room => res.status(200).send(room))
                    .catch(next)
            })
    },

    delete(req, res, next) {
        const roomId = req.params.id;
        const roomProps = req.body;

        Room.findByIdAndRemove({
                _id: roomId
            })
            .then(room => res.status(204).send(room))
            // * 204 stands for succes
            .catch(next)
    }
}