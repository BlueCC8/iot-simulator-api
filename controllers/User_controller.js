/* eslint-disable no-underscore-dangle */
const User = require('../models/User');

module.exports = {
  greeting(req, res) {
    res.send({
      hi: 'User greets you'
    });
  },
  create(req, res, next) {
    const userProps = req.body;
    User.create(userProps)
      .then(user =>
        res.status(201).json({
          userId: user._id
        })
      )
      .catch(next); // next middleware in chain
  },
  readAll(req, res, next) {
    User.find({})
      .then(users => {
        res.status(200).json(users);
      })
      .catch(next);
  },
  readOne(req, res, next) {
    // const userId = req.params.id;
    const { username } = req.params;
    User.findOne({
      // _id: userId,
      username
    })
      .then(user => {
        res.status(200).json(user);
      })
      .catch(next);
  },

  update(req, res, next) {
    const { username } = req.params;
    const userProps = req.body;
    User.updateOne(
      {
        username
      },
      userProps,
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
    const userId = req.params.id;
    // const userProps = req.body;

    User.findOneAndDelete({
      _id: userId
    })
      .then(user => res.status(204).send(user))
      // * 204 stands for succes
      .catch(next);
  }
};
