const express = require('express');
const router = express.Router();
const db = require('../module/Userdb');
const bcrypt = require('bcrypt');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');

cloudinary.config({
  cloud_name: 'dx6hzlis9',
  api_key: '263623349676867',
  api_secret: '5nM_JHi5hRYY4TCE2qB7bhToZso'
})

/**
 * Register a new user
 * 
 * @route POST /User
 * @param {string} CompanyName - Company name of the user
 * @param {string} email - Email of the user
 * @param {string} password - Password of the user
 * @returns {object} JSON object with a success message
 */

const upload = multer({ dest: './uploads/' });

router.post('/User', upload.single('imageUrl'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ msg: 'No file uploaded' });
  }

  const { CompanyName, email, password } = req.body;
  const file = req.file;

  try {
    const conn = await db.getConnection();
    const hashedPassword = await bcrypt.hash(password, 10);

    const uploadResult = await cloudinary.uploader.upload(file.path);
    const image = uploadResult.secure_url;

    await conn.query('INSERT INTO User (CompanyName, email, password, imageUrl) VALUES (?, ?, ?, ?)', [CompanyName, email, hashedPassword, image]);

    res.status(200).json({ msg: 'User Registor successfully' });
  }
  catch (err) {
    console.error('Error creating user:', err);
    res.status(500).json({ msg: 'Error creating user' });
  }
});


module.exports = router;
