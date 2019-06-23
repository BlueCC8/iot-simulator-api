const express = require('express');

const router = express.Router();
const PopulateSubdocuments = require('../../populate/populate_subdocuments');

// ! Populate all database
// router.get('/api/populate/insert_all', PopulateAll.insertData);
router.get('/populateLinkLayer', PopulateSubdocuments.populateLinkLayer);
router.get('/populateLinkLayer', PopulateSubdocuments.populateLinkLayer);
router.get('/populateDevice', PopulateSubdocuments.populateDevice);
router.get('/populateConfigDevice', PopulateSubdocuments.populateConfigDevice);
router.get('/populateRoom', PopulateSubdocuments.populateRoom);
router.get('/populateUser', PopulateSubdocuments.populateUser);
module.exports = router;
