// Run once to seed MongoDB with all existing gallery images:
//   node seed.js
require('dotenv').config()
const mongoose = require('mongoose')

const URLS = [
  'https://res.cloudinary.com/dkd3k6eau/image/upload/v1770778598/professionals/pnkijojtj5cqmjg1hhx5.jpg',
  'https://res.cloudinary.com/dkd3k6eau/image/upload/v1770599722/professionals/jnzcegnloipsjvqvzua0.jpg',
  'https://res.cloudinary.com/dkd3k6eau/image/upload/v1770598272/professionals/ewpj8xx2g3nxpmelfv6k.jpg',
  'https://res.cloudinary.com/dkd3k6eau/image/upload/v1769958322/professionals/loo1peqzthzcw5s4wx6n.jpg',
  'https://res.cloudinary.com/dkd3k6eau/image/upload/v1769957563/professionals/lhivocwja1wdfemdzxx8.jpg',
  'https://res.cloudinary.com/dkd3k6eau/image/upload/v1769957565/professionals/cf5x15x5fagcwiuioan0.jpg',
  'https://res.cloudinary.com/dkd3k6eau/image/upload/v1769957562/professionals/exwjf6o89oy27kmcy9hx.jpg',
  'https://res.cloudinary.com/dkd3k6eau/image/upload/v1769957559/professionals/tfbpfgqlba2bpvq0d2o2.jpg',
  'https://res.cloudinary.com/dkd3k6eau/image/upload/v1769957559/professionals/l1fx1apoo0lygzg1kox1.jpg',
  'https://res.cloudinary.com/dkd3k6eau/image/upload/v1769957557/professionals/j3ffeinzxwbd1jcgrtmz.jpg',
  'https://res.cloudinary.com/dkd3k6eau/image/upload/v1769957507/professionals/e5cg3kp3kibd8a4oyig6.jpg',
  'https://res.cloudinary.com/dkd3k6eau/image/upload/v1769957556/professionals/v9viqj3rmf2hgqzhdnsy.jpg',
  'https://res.cloudinary.com/dkd3k6eau/image/upload/v1769942785/professionals/nbhi0kpwxnwc5xcdikiy.jpg',
  'https://res.cloudinary.com/dkd3k6eau/image/upload/v1769942609/pulpl0acyxhjdbvpfjs9.jpg',
  'https://res.cloudinary.com/dkd3k6eau/image/upload/v1769942604/rz5l8z3wm1pwzj6fwh7p.jpg',
  'https://res.cloudinary.com/dkd3k6eau/image/upload/v1769914872/professionals/y7tlq0vjuxttjcxudbzg.jpg',
  'https://res.cloudinary.com/dkd3k6eau/image/upload/v1772295795/Screenshot_20260125_191015_CapCut_gpoocd.jpg',
  'https://res.cloudinary.com/dkd3k6eau/image/upload/v1772295793/Screenshot_20260107_223346_CapCut_ybghdx.jpg',
  'https://res.cloudinary.com/dkd3k6eau/image/upload/v1772295796/Snapchat-437494782_rkm8t9.jpg',
  'https://res.cloudinary.com/dkd3k6eau/image/upload/v1772295788/lv_7593092234371714309_20260126141903_2_ku4gwq.jpg',
  'https://res.cloudinary.com/dkd3k6eau/image/upload/v1772295789/lv_7593976942165282053_20260122230059_1_y8yjp4.jpg',
  'https://res.cloudinary.com/dkd3k6eau/image/upload/v1772295784/lv_7579954644743458053_20260207233213_1_sytill.jpg',
  'https://res.cloudinary.com/dkd3k6eau/image/upload/v1772290969/zc6yyqluuwrldek3vw61.jpg',
  'https://res.cloudinary.com/dkd3k6eau/image/upload/v1772295791/Screenshot_20260106_231435_CapCut_n9iacd.jpg',
  'https://res.cloudinary.com/dkd3k6eau/image/upload/v1772233915/WhatsApp_Image_2026-02-28_at_00.07.36_dugcoy.jpg',
  'https://res.cloudinary.com/dkd3k6eau/image/upload/v1772295787/lv_7591522330581404981_20260123133757_1_utyf3r.jpg',
  'https://res.cloudinary.com/dkd3k6eau/image/upload/v1772295783/lv_7313537744817507592_20260118020253_1_kb04c2.jpg',
  'https://res.cloudinary.com/dkd3k6eau/image/upload/v1772295784/lv_7580334364580515125_20260120233744_1_vrsrse.jpg',
  'https://res.cloudinary.com/dkd3k6eau/image/upload/v1769957561/professionals/maseceukrd84hxmrjafz.jpg',
  'https://res.cloudinary.com/dkd3k6eau/image/upload/v1769957561/professionals/ogeumsv8jabamrqr4wi9.jpg',
  'https://res.cloudinary.com/dkd3k6eau/image/upload/v1772295797/Snapchat-1562577533_zc8uh3.jpg',
]

const imageSchema = new mongoose.Schema({
  url: { type: String, required: true, unique: true },
  name: { type: String, default: 'Gallery Photo' },
  createdAt: { type: Date, default: Date.now },
})
const Image = mongoose.model('Image', imageSchema)

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI)
  console.log('Connected to MongoDB')

  let added = 0
  for (let i = 0; i < URLS.length; i++) {
    await Image.findOneAndUpdate(
      { url: URLS[i] },
      { url: URLS[i], name: `DJ Gallery ${i + 1}` },
      { upsert: true },
    )
    added++
  }
  console.log(`✓ Seeded ${added} images`)
  await mongoose.disconnect()
}

seed().catch(console.error)
