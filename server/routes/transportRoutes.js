const express = require('express')
const router = express.Router()
const { Transport } = require('../models')
router.get('/', async (req, res) => {
  try {
    const transports = await Transport.findAll()
    res.json(transports)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to get transports' })
  }
})

module.exports = router
