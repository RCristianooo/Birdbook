const Bird = require('../models/birdModel')
const multer = require('multer')

// multer config for image upload
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './public/images');
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({storage: storage})

const getAllBirds = async (req, res) => {
    try {
        const birds = await Bird.find().populate('owner');
        res.render('home', {birds: birds, user: req.user})
    } catch(err) {
        console.log(err)
    }
}

const uploadPage = (req, res) => {
    res.render('upload', {user: req.user})
}

const createBird = async (req, res) => {
    try {
      const bird = new Bird ({
        name: req.body.name,
        age: req.body.age,
        favoriteFood: req.body.favoriteFood,
        funFact: req.body.funFact,
        image: req.file.filename, //multer places the file info in req.file
        owner: req.user._id
    })

    await bird.save()
    res.redirect('/')

    } catch (err) {
      console.log(err)
    }
}

const editPage = async (req, res) => {
  try {
    const bird = await Bird.findById(req.params.id)
    res.render('edit', {bird:bird, user: req.user})
  } catch (err) {
    console.log(err)
  }
}

const updateBird = async (req, res) => {
  try {
    let bird = await Bird.findById(req.params.id)
    if(bird.owner.equals(req.user._id)){
    await Bird.findByIdAndUpdate(req.params.id, req.body)
    }
    res.redirect('/')
  } catch (err) {
    console.log(err)
  }
};

const deleteBird = async (req, res) => {
  try {
    let bird = await Bird.findById(req.params.id)
    if(bird.owner.equals(req.user._id)){
    await Bird.findByIdAndRemove(req.params.id)
    }
    res.redirect('/')
  } catch (err) {
    console.log(err)
  }
};

module.exports = {
    getAllBirds,
    upload,
    uploadPage,
    createBird,
    editPage,
    updateBird,
    deleteBird
}