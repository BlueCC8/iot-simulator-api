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
    const pageSize = +req.query.pagesize;
    const currentPage = +req.query.page;
    const query = Room.find();
    let isPopulated;
    const checkPopulated = req.query.populated;
    let fetchedRooms;

    if (pageSize && currentPage) {
      query.skip(pageSize * (currentPage - 1)).limit(pageSize);
    }
    if (checkPopulated) {
      isPopulated = checkPopulated.toLowerCase() === 'true';
    }
    if (isPopulated) {
      query.populate({
        path: 'polID',
        model: 'Polygon'
      });
    }
    query
      .then(rooms => {
        fetchedRooms = rooms;
        return Room.countDocuments();
      })
      .then(count => {
        res.status(200).json({
          rooms: fetchedRooms,
          maxRooms: count
        });
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
    const { username } = req;

    Room.updateOne(
      {
        _id: roomId,
        username
      },
      roomProps,
      {
        useFindAndModify: false
      }
    )
      .then(result => {
        if (result.n > 0) {
          res.status(200).json({ message: 'Update successful' });
        } else {
          res.status(401).json({ message: 'Not authorized' });
        }
      })
      .catch(next);
  },

  delete(req, res, next) {
    const roomId = req.params.id;
    const { username } = req;

    Room.deleteOne({
      _id: roomId,
      username
    })
      .then(result => {
        if (result.n > 0) {
          res.status(200).json({ message: 'Delete successful' });
        } else {
          res.status(401).json({ message: 'Not authorized' });
        }
      })
      .catch(next);
  }
};
