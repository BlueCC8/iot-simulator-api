/* eslint-disable no-underscore-dangle */
const Room = require('../models/Room');

module.exports = {
  greeting(req, res) {
    res.send({
      hi: 'Room greets you'
    });
  },
  create(req, res, next) {
    const roomProps = req.body;
    Room.create(roomProps)
      .then(room =>
        res.status(201).json({
          roomId: room._id
        })
      )
      .catch(next); // next middleware in chain
  },
  readAll(req, res, next) {
    Room.find({})
      .then(rooms => {
        res.status(200).json(rooms);
      })
      .catch(next);
  },
  readOne(req, res, next) {
    const roomId = req.params.id;
    Room.findOne({
      _id: roomId
    })
      .then(room => {
        res.status(200).json(room);
      })
      .catch(next);
  },

  update(req, res, next) {
    const roomId = req.params.id;
    const roomProps = req.body;

    Room.findByIdAndUpdate(
      {
        _id: roomId
      },
      roomProps
    ).then(() => {
      Room.findById({
        _id: roomId
      })
        .then(room => {
          res.status(200).json(room);
        })
        .catch(next);
    });
  },

  delete(req, res, next) {
    const roomId = req.params.id;
    // const roomProps = req.body;

    Room.findByIdAndRemove({
      _id: roomId
    })
      .then(room => res.status(204).send(room))
      // * 204 stands for succes
      .catch(next);
  }
};
