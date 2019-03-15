/* eslint-disable no-underscore-dangle */
const Ether = require('../models/Ethernet.js');

module.exports = {
  greeting(req, res) {
    res.send({
      hi: 'Ethernet greets you'
    });
  },
  create(req, res, next) {
    const url = `${req.protocol}://${req.get('host')}`;
    const etherProps = req.body;
    etherProps.username = req.username;
    etherProps.imagePath = `${url}/images/${req.file.filename}`;

    Ether.create(etherProps)
      .then(ether =>
        res.status(201).json({
          ether
        })
      )
      .catch(next); // next middleware in chain
  },
  readAll(req, res, next) {
    const pageSize = +req.query.pagesize;
    const currentPage = +req.query.page;
    const query = Ether.find();
    let fetchedEthers;
    if (pageSize && currentPage) {
      query.skip(pageSize * (currentPage - 1)).limit(pageSize);
    }
    query
      .then(ethers => {
        fetchedEthers = ethers;
        return Ether.countDocuments();
      })
      .then(count => {
        res.status(200).json({
          ethers: fetchedEthers,
          maxEthers: count
        });
      })
      .catch(next);
  },
  readOne(req, res, next) {
    const etherId = req.params.id;
    Ether.findOne({
      _id: etherId
    })
      .then(ether => {
        res.status(200).json(ether);
      })
      .catch(next);
  },
  update(req, res, next) {
    const url = `${req.protocol}://${req.get('host')}`;
    const etherId = req.params.id;
    const etherProps = req.body;
    const { username } = req;
    if (req.file) {
      etherProps.imagePath = `${url}/images/${req.file.filename}`;
    } else {
      etherProps.imagePath = null;
    }
    Ether.updateOne(
      {
        _id: etherId,
        username
      },
      etherProps,
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
    const etherId = req.params.id;
    // const etherProps = req.body;
    const { username } = req;
    Ether.deleteOne({
      _id: etherId,
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
