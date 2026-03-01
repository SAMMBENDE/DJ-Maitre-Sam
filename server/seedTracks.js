require('dotenv').config()
const mongoose = require('mongoose')

const trackSchema = new mongoose.Schema({
  title: { type: String, required: true },
  url: { type: String, required: true, unique: true },
  category: { type: String, enum: ['afro', 'zouk', 'funk'], default: 'afro' },
  createdAt: { type: Date, default: Date.now },
})
const Track = mongoose.model('Track', trackSchema)

const BASE = 'https://sammbende.github.io/DJ-Maitre-Sam/music/'

const tracks = [
  // ── Mixtapes (afro) ──────────────────────────────────────
  {
    title: 'DjSaM Simi Vs ODO Vs Dynamite Rmx',
    url: BASE + 'simi.mp3',
    category: 'afro',
  },
  {
    title: 'DjSaM Bintou Vs Inama',
    url: BASE + 'bintouinama.mp3',
    category: 'afro',
  },
  {
    title: 'DjSaM Mix Variétés Africain',
    url: BASE + 'sen.mp3',
    category: 'afro',
  },
  {
    title: "DjSaM Zogada N'zoué Vs Siwo",
    url: BASE + 'zoga.mp3',
    category: 'afro',
  },
  { title: 'DjSaM Ndombolo', url: BASE + 'ndombolo.mp3', category: 'afro' },
  { title: 'DjSaM Koffi Ancien 1', url: BASE + 'koffii.mp3', category: 'afro' },
  { title: 'DjSaM Koffi Ancien 2', url: BASE + 'koffi.mp3', category: 'afro' },
  { title: 'DjSaM Ndombolo 2', url: BASE + 'fally%2B.mp3', category: 'afro' },
  { title: 'DjSaM Ancien Makossa', url: BASE + 'ancien.mp3', category: 'afro' },
  { title: 'DjSaM Urban Kamer', url: BASE + 'urban.mp3', category: 'afro' },
  {
    title: 'DjSaM Afrobeats',
    url: BASE + 'DjSaM%20afrobeats.mp3',
    category: 'afro',
  },
  {
    title: 'DjSaM go dj Hip-Hop',
    url: BASE + 'DjMaitreSam.mp3',
    category: 'afro',
  },
  {
    title: 'DjSaM Old School Hip-Hop',
    url: BASE + 'hippy.mp3',
    category: 'afro',
  },
  { title: 'DjSaM FlashBack', url: BASE + 'flashBack.mp3', category: 'afro' },
  {
    title: 'DjSaM Varietés Monde',
    url: BASE + 'DjSaM%20Vari%C3%A9t%C3%A9s%20Monde.mp3',
    category: 'afro',
  },
  {
    title: 'DjSaM Zouk/Kompa',
    url: BASE + 'DjSaM_kompa_zouk.mp3',
    category: 'afro',
  },
  { title: 'DjSaM Mix Bob Marley', url: BASE + 'bob.mp3', category: 'afro' },
  {
    title: 'Liyebo (feat. Vitch & Co)',
    url: BASE + 'Liyebo%20(feat.%20Vitch%20_%20Co).mp3',
    category: 'afro',
  },

  // ── Variétés (zouk) ──────────────────────────────────────
  {
    title: 'DjSaM Zouk/Kompa',
    url: BASE + 'DjSaM_kompa_zouk.mp3',
    category: 'zouk',
  },
  {
    title: 'DjSaM Varietés Monde',
    url: BASE + 'DjSaM%20Vari%C3%A9t%C3%A9s%20Monde.mp3',
    category: 'zouk',
  },
  { title: 'Django', url: BASE + 'Django.mp3', category: 'zouk' },

  // ── Hits (funk) ──────────────────────────────────────────
  { title: 'DjSaM FlashBack', url: BASE + 'flashBack.mp3', category: 'funk' },
  {
    title: 'DjSaM Greatest Old School Hip-Hop',
    url: BASE + 'greatest%20oldSchool.mp3',
    category: 'funk',
  },
  {
    title: 'DjSaM Fally Vs R.Bona',
    url: BASE + 'faally_bona.mp3',
    category: 'funk',
  },
]

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI)
  console.log('Connected to MongoDB')

  let added = 0
  for (const t of tracks) {
    try {
      const result = await Track.findOneAndUpdate(
        { url: t.url, category: t.category },
        t,
        { upsert: true, new: true },
      )
      added++
    } catch (err) {
      // Skip duplicates silently
    }
  }

  console.log(`✓ Seeded ${added} tracks`)
  await mongoose.disconnect()
}

seed().catch(console.error)
