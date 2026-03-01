require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()
const PORT = process.env.PORT || 3000
const UPLOAD_PASSWORD = process.env.UPLOAD_PASSWORD || 'djsam123'

// Middleware
app.use(cors())
app.use(express.json())

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('✓ Connected to MongoDB Atlas'))
  .catch((err) => console.error('MongoDB connection error:', err))

// Image schema
const imageSchema = new mongoose.Schema({
  url: { type: String, required: true, unique: true },
  name: { type: String, default: 'Gallery Photo' },
  createdAt: { type: Date, default: Date.now },
})

const Image = mongoose.model('Image', imageSchema)

// GET /images — return all images sorted oldest first
app.get('/images', async (req, res) => {
  try {
    const images = await Image.find().sort({ createdAt: 1 })
    res.json(images)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// POST /images — save a new image (password protected)
app.post('/images', async (req, res) => {
  const { url, name, password } = req.body
  if (password !== UPLOAD_PASSWORD) {
    return res.status(401).json({ error: 'Unauthorized' })
  }
  if (!url) {
    return res.status(400).json({ error: 'url is required' })
  }
  try {
    const image = await Image.findOneAndUpdate(
      { url },
      { url, name: name || 'Gallery Photo' },
      { upsert: true, new: true },
    )
    res.status(201).json(image)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// DELETE /images/:id — remove an image (password protected)
app.delete('/images/:id', async (req, res) => {
  const { password } = req.body
  if (password !== UPLOAD_PASSWORD) {
    return res.status(401).json({ error: 'Unauthorized' })
  }
  try {
    await Image.findByIdAndDelete(req.params.id)
    res.json({ message: 'Deleted' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

app.get('/', (req, res) =>
  res.json({ status: 'DJ Maitre Sam Gallery API running' }),
)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
