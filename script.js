// ── Gallery API ──────────────────────────────────────────────
// Update GALLERY_API_URL once your Render service is live.
// Leave as empty string to fall back to the embedded static slides.
const GALLERY_API_URL = '' // e.g. 'https://djsam-gallery-api.onrender.com'

// Password for gallery uploads
const UPLOAD_PASSWORD = 'djsam123'
function checkUploadAuth() {
  if (!sessionStorage.getItem('uploadAuth')) {
    const pwd = prompt('Enter password to upload:')
    if (pwd === UPLOAD_PASSWORD) {
      sessionStorage.setItem('uploadAuth', '1')
      return true
    }
    return false
  }
  return true
}

// ── Dynamic gallery loader ───────────────────────────────────
const STATIC_IMAGES = [
  {
    url: 'https://res.cloudinary.com/dkd3k6eau/image/upload/v1770778598/professionals/pnkijojtj5cqmjg1hhx5.jpg',
    name: 'DJ Gallery 1',
  },
  {
    url: 'https://res.cloudinary.com/dkd3k6eau/image/upload/v1770599722/professionals/jnzcegnloipsjvqvzua0.jpg',
    name: 'DJ Gallery 2',
  },
  {
    url: 'https://res.cloudinary.com/dkd3k6eau/image/upload/v1770598272/professionals/ewpj8xx2g3nxpmelfv6k.jpg',
    name: 'DJ Gallery 3',
  },
  {
    url: 'https://res.cloudinary.com/dkd3k6eau/image/upload/v1769958322/professionals/loo1peqzthzcw5s4wx6n.jpg',
    name: 'DJ Gallery 4',
  },
  {
    url: 'https://res.cloudinary.com/dkd3k6eau/image/upload/v1769957563/professionals/lhivocwja1wdfemdzxx8.jpg',
    name: 'DJ Gallery 5',
  },
  {
    url: 'https://res.cloudinary.com/dkd3k6eau/image/upload/v1769957565/professionals/cf5x15x5fagcwiuioan0.jpg',
    name: 'DJ Gallery 6',
  },
  {
    url: 'https://res.cloudinary.com/dkd3k6eau/image/upload/v1769957562/professionals/exwjf6o89oy27kmcy9hx.jpg',
    name: 'DJ Gallery 7',
  },
  {
    url: 'https://res.cloudinary.com/dkd3k6eau/image/upload/v1769957559/professionals/tfbpfgqlba2bpvq0d2o2.jpg',
    name: 'DJ Gallery 8',
  },
  {
    url: 'https://res.cloudinary.com/dkd3k6eau/image/upload/v1769957559/professionals/l1fx1apoo0lygzg1kox1.jpg',
    name: 'DJ Gallery 9',
  },
  {
    url: 'https://res.cloudinary.com/dkd3k6eau/image/upload/v1769957557/professionals/j3ffeinzxwbd1jcgrtmz.jpg',
    name: 'DJ Gallery 10',
  },
  {
    url: 'https://res.cloudinary.com/dkd3k6eau/image/upload/v1769957507/professionals/e5cg3kp3kibd8a4oyig6.jpg',
    name: 'DJ Gallery 11',
  },
  {
    url: 'https://res.cloudinary.com/dkd3k6eau/image/upload/v1769957556/professionals/v9viqj3rmf2hgqzhdnsy.jpg',
    name: 'DJ Gallery 12',
  },
  {
    url: 'https://res.cloudinary.com/dkd3k6eau/image/upload/v1769942785/professionals/nbhi0kpwxnwc5xcdikiy.jpg',
    name: 'DJ Gallery 13',
  },
  {
    url: 'https://res.cloudinary.com/dkd3k6eau/image/upload/v1769942609/pulpl0acyxhjdbvpfjs9.jpg',
    name: 'DJ Gallery 14',
  },
  {
    url: 'https://res.cloudinary.com/dkd3k6eau/image/upload/v1769942604/rz5l8z3wm1pwzj6fwh7p.jpg',
    name: 'DJ Gallery 15',
  },
  {
    url: 'https://res.cloudinary.com/dkd3k6eau/image/upload/v1769914872/professionals/y7tlq0vjuxttjcxudbzg.jpg',
    name: 'DJ Gallery 16',
  },
  {
    url: 'https://res.cloudinary.com/dkd3k6eau/image/upload/v1772295795/Screenshot_20260125_191015_CapCut_gpoocd.jpg',
    name: 'DJ Gallery 17',
  },
  {
    url: 'https://res.cloudinary.com/dkd3k6eau/image/upload/v1772295793/Screenshot_20260107_223346_CapCut_ybghdx.jpg',
    name: 'DJ Gallery 18',
  },
  {
    url: 'https://res.cloudinary.com/dkd3k6eau/image/upload/v1772295796/Snapchat-437494782_rkm8t9.jpg',
    name: 'DJ Gallery 19',
  },
  {
    url: 'https://res.cloudinary.com/dkd3k6eau/image/upload/v1772295788/lv_7593092234371714309_20260126141903_2_ku4gwq.jpg',
    name: 'DJ Gallery 20',
  },
  {
    url: 'https://res.cloudinary.com/dkd3k6eau/image/upload/v1772295789/lv_7593976942165282053_20260122230059_1_y8yjp4.jpg',
    name: 'DJ Gallery 21',
  },
  {
    url: 'https://res.cloudinary.com/dkd3k6eau/image/upload/v1772295784/lv_7579954644743458053_20260207233213_1_sytill.jpg',
    name: 'DJ Gallery 22',
  },
  {
    url: 'https://res.cloudinary.com/dkd3k6eau/image/upload/v1772290969/zc6yyqluuwrldek3vw61.jpg',
    name: 'DJ Gallery 23',
  },
  {
    url: 'https://res.cloudinary.com/dkd3k6eau/image/upload/v1772295791/Screenshot_20260106_231435_CapCut_n9iacd.jpg',
    name: 'DJ Gallery 24',
  },
  {
    url: 'https://res.cloudinary.com/dkd3k6eau/image/upload/v1772233915/WhatsApp_Image_2026-02-28_at_00.07.36_dugcoy.jpg',
    name: 'DJ Gallery 25',
  },
  {
    url: 'https://res.cloudinary.com/dkd3k6eau/image/upload/v1772295787/lv_7591522330581404981_20260123133757_1_utyf3r.jpg',
    name: 'DJ Gallery 26',
  },
  {
    url: 'https://res.cloudinary.com/dkd3k6eau/image/upload/v1772295783/lv_7313537744817507592_20260118020253_1_kb04c2.jpg',
    name: 'DJ Gallery 27',
  },
  {
    url: 'https://res.cloudinary.com/dkd3k6eau/image/upload/v1772295784/lv_7580334364580515125_20260120233744_1_vrsrse.jpg',
    name: 'DJ Gallery 28',
  },
  {
    url: 'https://res.cloudinary.com/dkd3k6eau/image/upload/v1769957561/professionals/maseceukrd84hxmrjafz.jpg',
    name: 'DJ Gallery 29',
  },
  {
    url: 'https://res.cloudinary.com/dkd3k6eau/image/upload/v1769957561/professionals/ogeumsv8jabamrqr4wi9.jpg',
    name: 'DJ Gallery 30',
  },
  {
    url: 'https://res.cloudinary.com/dkd3k6eau/image/upload/v1772295797/Snapchat-1562577533_zc8uh3.jpg',
    name: 'DJ Gallery 31',
  },
]

function buildCarouselFromImages(images) {
  const container = document.getElementById('carouselContainer')
  const indicatorsEl = document.getElementById('carouselIndicators')
  if (!container || !indicatorsEl) return

  // Clear existing content
  container.innerHTML = ''
  indicatorsEl.innerHTML = ''

  images.forEach((img, i) => {
    const slide = document.createElement('div')
    slide.className = 'carousel-slide' + (i === 0 ? ' active' : '')
    slide.innerHTML = `<img src="${img.url}" alt="${img.name}" loading="lazy" /><div class="slide-caption">${img.name}</div>`
    container.appendChild(slide)

    const dot = document.createElement('span')
    dot.className = 'indicator' + (i === 0 ? ' active' : '')
    dot.setAttribute('onclick', `currentSlide(${i + 1})`)
    indicatorsEl.appendChild(dot)
  })

  currentSlideIndex = 1
}

async function loadGalleryFromAPI() {
  const loading = document.getElementById('galleryLoading')
  try {
    if (GALLERY_API_URL) {
      const res = await fetch(GALLERY_API_URL + '/images')
      if (!res.ok) throw new Error('API error ' + res.status)
      const images = await res.json()
      if (images.length > 0) {
        buildCarouselFromImages(images)
        return
      }
    }
  } catch (err) {
    console.warn('Gallery API unavailable, using static images:', err.message)
  }
  // Fallback: use hardcoded list
  buildCarouselFromImages(STATIC_IMAGES)
}

async function addPhotoToGallery(cloudinaryUrl, name) {
  // Save to API if configured
  if (GALLERY_API_URL) {
    try {
      await fetch(GALLERY_API_URL + '/images', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: cloudinaryUrl,
          name,
          password: UPLOAD_PASSWORD,
        }),
      })
    } catch (err) {
      console.warn('Could not save to API:', err.message)
    }
  }
  // Add slide immediately to the DOM
  const container = document.getElementById('carouselContainer')
  const indicatorsEl = document.getElementById('carouselIndicators')
  const slideCount = container.querySelectorAll('.carousel-slide').length

  const slide = document.createElement('div')
  slide.className = 'carousel-slide'
  slide.innerHTML = `<img src="${cloudinaryUrl}" alt="${name}" loading="lazy" /><div class="slide-caption">${name}</div>`
  container.appendChild(slide)

  const dot = document.createElement('span')
  dot.className = 'indicator'
  dot.setAttribute('onclick', `currentSlide(${slideCount + 1})`)
  indicatorsEl.appendChild(dot)

  // Jump to the new slide
  currentSlide(slideCount + 1)
}

const audioPlayer = document.getElementById('audioPlayer')
const tabBtns = document.querySelectorAll('.tab-btn')
const categoryLists = document.querySelectorAll('.category-list')
const repeatBtn = document.getElementById('repeatBtn')
const equalizer = document.querySelector('.equalizer')
const pauseBtn = document.getElementById('pauseBtn')

// Ensure audio player works with keyboard and controls
audioPlayer.addEventListener('keydown', (e) => {
  if (e.code === 'Space') {
    e.preventDefault()
    if (audioPlayer.paused) {
      audioPlayer.play()
    } else {
      audioPlayer.pause()
    }
  }
})

// (No override of audioPlayer.pause -- use event listeners only)

// Audio EQ controls
const bassControl = document.getElementById('bassControl')
const trebleControl = document.getElementById('trebleControl')
const bassValue = document.getElementById('bassValue')
const trebleValue = document.getElementById('trebleValue')

// Audio context for EQ
let audioContext
let source
let bassFilter
let trebleFilter

// Initialize audio context
function initializeAudioContext() {
  if (!audioContext && audioPlayer.src) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)()
    source = audioContext.createMediaElementSource(audioPlayer)

    // Create bass filter (low shelf)
    bassFilter = audioContext.createBiquadFilter()
    bassFilter.type = 'lowshelf'
    bassFilter.frequency.value = 200

    // Create treble filter (high shelf)
    trebleFilter = audioContext.createBiquadFilter()
    trebleFilter.type = 'highshelf'
    trebleFilter.frequency.value = 3000

    // Connect filters
    source.connect(bassFilter)
    bassFilter.connect(trebleFilter)
    trebleFilter.connect(audioContext.destination)
  }
}

// Bass control
bassControl.addEventListener('input', function () {
  bassValue.textContent = this.value
  if (bassFilter) {
    bassFilter.gain.value = this.value
  }
})

// Treble control
trebleControl.addEventListener('input', function () {
  trebleValue.textContent = this.value
  if (trebleFilter) {
    trebleFilter.gain.value = this.value
  }
})

// Initialize audio context when audio starts playing
audioPlayer.addEventListener('play', initializeAudioContext)

// Add playing class to equalizer
audioPlayer.addEventListener('play', () => {
  if (audioContext && audioContext.state === 'suspended') {
    audioContext.resume()
  }
  if (equalizer) {
    equalizer.classList.add('playing')
  }
})

audioPlayer.addEventListener('pause', () => {
  if (audioContext && audioContext.state === 'running') {
    audioContext.suspend()
  }
  if (equalizer) {
    equalizer.classList.remove('playing')
  }
})

audioPlayer.addEventListener('ended', function () {
  if (equalizer) {
    equalizer.classList.remove('playing')
  }
})

// Tab switching
tabBtns.forEach((btn) => {
  btn.addEventListener('click', function () {
    tabBtns.forEach((b) => b.classList.remove('active'))
    this.classList.add('active')
    categoryLists.forEach((list) => (list.style.display = 'none'))
    document.getElementById('playlist-' + this.dataset.tab).style.display =
      'block'
    // Play first song in selected category
    const items = document.querySelectorAll(
      '#playlist-' + this.dataset.tab + ' li',
    )
    if (items.length > 0) {
      categoryLists.forEach((list) => {
        list
          .querySelectorAll('li')
          .forEach((li) => li.classList.remove('active'))
      })
      items[0].classList.add('active')
      audioPlayer.src = items[0].dataset.src
    }
  })
})

// Playlist click logic
document.querySelectorAll('.playlist li').forEach((item) => {
  item.addEventListener('click', function () {
    categoryLists.forEach((list) => {
      list.querySelectorAll('li').forEach((li) => li.classList.remove('active'))
    })
    this.classList.add('active')
    audioPlayer.src = this.dataset.src
    audioPlayer.play()
  })
})

// Auto-play next song in current category
audioPlayer.addEventListener('ended', function () {
  const activeList = Array.from(categoryLists).find(
    (list) => list.style.display !== 'none',
  )
  if (activeList) {
    const items = activeList.querySelectorAll('li')
    const currentItem = activeList.querySelector('li.active')
    const currentIndex = Array.from(items).indexOf(currentItem)
    const nextIndex = (currentIndex + 1) % items.length
    if (items[nextIndex]) {
      items[nextIndex].click()
    }
  }
})

// Repeat button functionality
let repeatMode = 0 // 0: no repeat, 1: repeat all, 2: repeat one
repeatBtn.addEventListener('click', function () {
  repeatMode = (repeatMode + 1) % 3
  if (repeatMode === 0) {
    this.style.opacity = '0.5'
    audioPlayer.loop = false
  } else if (repeatMode === 1) {
    this.style.opacity = '1'
    this.innerHTML = '<span>🔁</span>'
    audioPlayer.loop = false
  } else {
    this.style.opacity = '1'
    this.innerHTML = '<span>🔂</span>'
    audioPlayer.loop = true
  }
})

// Carousel functionality
let currentSlideIndex = 1
let carouselInterval

function changeSlide(n) {
  showSlide((currentSlideIndex += n))
}

function currentSlide(n) {
  showSlide((currentSlideIndex = n))
}

function showSlide(n) {
  const slides = document.querySelectorAll('.carousel-slide')
  const indicators = document.querySelectorAll('.indicator')

  if (n > slides.length) {
    currentSlideIndex = 1
  }
  if (n < 1) {
    currentSlideIndex = slides.length
  }

  slides.forEach((slide) => {
    slide.classList.remove('active')
  })
  indicators.forEach((indicator) => {
    indicator.classList.remove('active')
  })

  if (slides[currentSlideIndex - 1]) {
    slides[currentSlideIndex - 1].classList.add('active')
  }
  if (indicators[currentSlideIndex - 1]) {
    indicators[currentSlideIndex - 1].classList.add('active')
  }
}

// Auto-rotate carousel every 8 seconds
function autoRotateCarousel() {
  const galleryTab = document.querySelector('[data-tab="gallery"]')
  if (
    galleryTab &&
    document.getElementById('playlist-gallery').style.display !== 'none'
  ) {
    changeSlide(1)
  }
}
setInterval(autoRotateCarousel, 8000)

// Keyboard navigation for carousel
document.addEventListener('keydown', function (event) {
  if (document.getElementById('playlist-gallery').style.display !== 'none') {
    if (event.key === 'ArrowRight') {
      changeSlide(1)
    } else if (event.key === 'ArrowLeft') {
      changeSlide(-1)
    }
  }
})

// Music upload functionality
const musicUploadInput = document.getElementById('musicUpload')
if (musicUploadInput) {
  document.querySelectorAll('.playlist-add-btn').forEach((btn) => {
    btn.addEventListener('click', function () {
      const playlistId = this.dataset.playlist
      musicUploadInput.dataset.playlistId = playlistId
      musicUploadInput.click()
    })
  })

  musicUploadInput.addEventListener('change', function () {
    const file = this.files[0]
    if (file) {
      const playlistId = this.dataset.playlistId
      const fileName = file.name.replace('.mp3', '')
      const playlist = document.getElementById('playlist-' + playlistId)

      // Create new list item
      const newLi = document.createElement('li')
      newLi.dataset.src = URL.createObjectURL(file)
      newLi.innerHTML = `
        ${fileName}
        <a class="download-btn" title="Play"><i class="fa fa-play"></i></a>
      `

      // Insert before the upload button
      const uploadItem = playlist.querySelector('.upload-item')
      if (uploadItem) {
        playlist.insertBefore(newLi, uploadItem)
      } else {
        playlist.appendChild(newLi)
      }

      // Add click event
      newLi.addEventListener('click', function () {
        document
          .querySelectorAll('#playlist-' + playlistId + ' li')
          .forEach((li) => {
            li.classList.remove('active')
          })
        this.classList.add('active')
        audioPlayer.src = this.dataset.src
        audioPlayer.play()
      })

      // Show success
      showSuccessMessage(`"${fileName}" added to playlist!`)
    }
  })
}

function showSuccessMessage(message) {
  const notification = document.createElement('div')
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: #4CAF50;
    color: white;
    padding: 12px 20px;
    border-radius: 8px;
    z-index: 9999;
    font-family: inherit;
    font-weight: bold;
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
  `
  notification.textContent = message
  document.body.appendChild(notification)

  setTimeout(() => {
    if (notification.parentNode) {
      notification.remove()
    }
  }, 3000)
}
// ── Upload Photo button ──────────────────────────────────────
const uploadGalleryBtn = document.getElementById('uploadGalleryBtn')
const galleryUploadInput = document.getElementById('galleryUploadInput')

if (uploadGalleryBtn && galleryUploadInput) {
  uploadGalleryBtn.addEventListener('click', () => {
    if (!checkUploadAuth()) return
    galleryUploadInput.click()
  })

  galleryUploadInput.addEventListener('change', async function () {
    const file = this.files[0]
    if (!file) return
    this.value = '' // reset so same file can be re-picked

    // Upload to Cloudinary unsigned
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', 'dj-maitre-sam')

    uploadGalleryBtn.disabled = true
    uploadGalleryBtn.textContent = 'Uploading…'

    try {
      const res = await fetch(
        'https://api.cloudinary.com/v1_1/dkd3k6eau/image/upload',
        {
          method: 'POST',
          body: formData,
        },
      )
      if (!res.ok) throw new Error('Cloudinary error ' + res.status)
      const data = await res.json()
      const name =
        'DJ Gallery ' +
        (document.querySelectorAll('.carousel-slide').length + 1)
      await addPhotoToGallery(data.secure_url, name)
      showSuccessMessage('Photo uploaded successfully!')
    } catch (err) {
      alert('Upload failed: ' + err.message)
    } finally {
      uploadGalleryBtn.disabled = false
      uploadGalleryBtn.innerHTML = '<i class="fa fa-camera"></i> Upload Photo'
    }
  })
}

// ── Load gallery on page ready ───────────────────────────────
window.addEventListener('load', loadGalleryFromAPI)
