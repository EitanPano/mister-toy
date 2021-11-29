const express = require('express');
const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware');
const { log } = require('../../middlewares/logger.middleware');
const { getToys, getToyById, addToy, updateToy, removeToy } = require('./toy.controller');
const router = express.Router();


module.exports = router

// LIST
router.get('/', log, getToys)

// READ
router.get('/:toyId', getToyById)

// CREATE
router.post('/', requireAuth, requireAdmin, addToy)

// UPDATE
router.put('/', requireAuth, requireAdmin, updateToy)

// DELETE
router.delete('/:toyId', requireAuth, requireAdmin, removeToy)

