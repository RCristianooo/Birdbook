const express = require('express')
const birdController = require('../controllers/birdController')
const router = express.Router()

router
    .route('/')
    .get(birdController.getAllBirds)

router
    .route('/upload')
    .get(birdController.uploadPage)
    .post(birdController.upload.single('image'),birdController.createBird)

router
    .route('/edit/:id')
    .get(birdController.editPage)
    .post(birdController.updateBird)

router
    .route('/delete/:id')
    .post(birdController.deleteBird)

module.exports = router