require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')

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

// ── Schemas ──────────────────────────────────────────────────

const imageSchema = new mongoose.Schema({
  url: { type: String, required: true, unique: true },
  name: { type: String, default: 'Gallery Photo' },
  order: { type: Number, default: () => Date.now() },
  createdAt: { type: Date, default: Date.now },
})
const Image = mongoose.model('Image', imageSchema)

const trackSchema = new mongoose.Schema({
  title: { type: String, required: true },
  url: { type: String, required: true, unique: true },
  category: { type: String, enum: ['afro', 'zouk', 'funk'], default: 'afro' },
  createdAt: { type: Date, default: Date.now },
})
const Track = mongoose.model('Track', trackSchema)

// ── Image routes ─────────────────────────────────────────────

app.get('/images', async (req, res) => {
  try {
    const images = await Image.find().sort({ order: 1, createdAt: 1 })
    res.json(images)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

app.post('/images', async (req, res) => {
  const { url, name, password } = req.body
  if (password !== UPLOAD_PASSWORD)
    return res.status(401).json({ error: 'Unauthorized' })
  if (!url) return res.status(400).json({ error: 'url is required' })
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

app.delete('/images/:id', async (req, res) => {
  const { password } = req.body
  if (password !== UPLOAD_PASSWORD)
    return res.status(401).json({ error: 'Unauthorized' })
  try {
    await Image.findByIdAndDelete(req.params.id)
    res.json({ message: 'Deleted' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// PATCH /images/:id — update order (for reordering)
app.patch('/images/:id', async (req, res) => {
  const { order, password } = req.body
  if (password !== UPLOAD_PASSWORD)
    return res.status(401).json({ error: 'Unauthorized' })
  try {
    const image = await Image.findByIdAndUpdate(
      req.params.id,
      { order },
      { new: true },
    )
    res.json(image)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// ── Track routes ─────────────────────────────────────────────

app.get('/tracks', async (req, res) => {
  try {
    const tracks = await Track.find().sort({ createdAt: 1 })
    res.json(tracks)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

app.post('/tracks', async (req, res) => {
  const { title, url, category, password } = req.body
  if (password !== UPLOAD_PASSWORD)
    return res.status(401).json({ error: 'Unauthorized' })
  if (!title || !url)
    return res.status(400).json({ error: 'title and url are required' })
  try {
    const track = await Track.findOneAndUpdate(
      { url },
      { title, url, category: category || 'afro' },
      { upsert: true, new: true },
    )
    res.status(201).json(track)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

app.delete('/tracks/:id', async (req, res) => {
  const { password } = req.body
  if (password !== UPLOAD_PASSWORD)
    return res.status(401).json({ error: 'Unauthorized' })
  try {
    await Track.findByIdAndDelete(req.params.id)
    res.json({ message: 'Deleted' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// ── Admin dashboard ──────────────────────────────────────────

app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin.html'))
})

// ── Root ─────────────────────────────────────────────────────

app.get('/', (req, res) => res.json({ status: 'DJ Maitre Sam API v2 running' }))

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
