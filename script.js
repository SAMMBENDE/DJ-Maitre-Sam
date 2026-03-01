// ── Gallery API ──────────────────────────────────────────────
// Update GALLERY_API_URL once your Render service is live.
// Leave as empty string to fall back to the embedded static slides.
const GALLERY_API_URL = 'https://dj-maitre-sam.onrender.com'

// Password for gallery uploads
const UPLOAD_PASSWORD = 'djsam123'
function revealUploadButton() {
  const row = document.getElementById('galleryUploadRow')
  if (row) row.style.display = 'block'
}

function checkUploadAuth() {
  if (!sessionStorage.getItem('uploadAuth')) {
    const pwd = prompt('Enter password to upload:')
    if (pwd === UPLOAD_PASSWORD) {
      sessionStorage.setItem('uploadAuth', '1')
      revealUploadButton()
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
    const targetId = 'playlist-' + this.dataset.tab
    const targetPanel = document.getElementById(targetId)
    const isAlreadyOpen = this.classList.contains('active')

    // Collapse all
    tabBtns.forEach((b) => b.classList.remove('active'))
    categoryLists.forEach((list) => {
      list.classList.remove('panel-open')
      list.style.display = 'none'
    })

    // If it wasn't open, open it now
    if (!isAlreadyOpen && targetPanel) {
      this.classList.add('active')
      targetPanel.style.display = 'block'
      targetPanel.classList.add('panel-open')

      // Lazy-load calendar on first open
      setTimeout(() => {
        if (typeof maybeLoadCalendar === 'function') maybeLoadCalendar()
      }, 50)

      // Highlight first track in playlist
      const items = targetPanel.querySelectorAll('li[data-src]')
      if (items.length > 0) {
        categoryLists.forEach((list) =>
          list
            .querySelectorAll('li')
            .forEach((li) => li.classList.remove('active')),
        )
        items[0].classList.add('active')
        audioPlayer.src = items[0].dataset.src
      }
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

// Secret trigger: triple-click Gallery or Calendar tab to reveal admin controls
;(function () {
  const galleryTabBtn = document.querySelector('[data-tab="gallery"]')
  if (galleryTabBtn) {
    let gc = 0,
      gt = null
    galleryTabBtn.addEventListener('click', () => {
      gc++
      clearTimeout(gt)
      gt = setTimeout(() => {
        gc = 0
      }, 600)
      if (gc >= 3) {
        gc = 0
        if (!sessionStorage.getItem('uploadAuth')) checkUploadAuth()
        else revealUploadButton()
      }
    })
  }

  const calTabBtn = document.querySelector('[data-tab="calendar"]')
  if (calTabBtn) {
    let cc = 0,
      ct = null
    calTabBtn.addEventListener('click', () => {
      cc++
      clearTimeout(ct)
      ct = setTimeout(() => {
        cc = 0
      }, 600)
      if (cc >= 3) {
        cc = 0
        // Toggle: lock if already unlocked
        if (window._calAdminMode) {
          window._lockCalAdmin()
        } else if (sessionStorage.getItem('uploadAuth')) {
          window._unlockCalAdmin()
        } else {
          checkUploadAuth()
          if (sessionStorage.getItem('uploadAuth')) window._unlockCalAdmin()
        }
      }
    })
  }
})()

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

// ── Load tracks from API ─────────────────────────────────────
async function loadTracksFromAPI() {
  try {
    const res = await fetch(GALLERY_API_URL + '/tracks')
    if (!res.ok) throw new Error('API error')
    const tracks = await res.json()
    if (!tracks.length) return

    const categories = ['afro']
    categories.forEach((cat) => {
      const ul = document.getElementById('playlist-' + cat)
      if (!ul) return
      ul.innerHTML = ''
      const catTracks = tracks.filter((t) => t.category === cat)
      catTracks.forEach((track) => {
        const li = document.createElement('li')
        li.dataset.src = track.url
        li.innerHTML = `${track.title}
          <a href="${track.url}" download class="download-btn" title="Télécharger">
            <i class="fa fa-download"></i>
          </a>`
        li.addEventListener('click', function () {
          document
            .querySelectorAll('.category-list li')
            .forEach((el) => el.classList.remove('active'))
          this.classList.add('active')
          audioPlayer.src = this.dataset.src
          audioPlayer.play()
        })
        ul.appendChild(li)
      })
      // Auto-select first track of visible playlist
      if (ul.style.display !== 'none') {
        const first = ul.querySelector('li')
        if (first) {
          first.classList.add('active')
          audioPlayer.src = first.dataset.src
        }
      }
    })
  } catch (err) {
    console.warn('Could not load tracks from API:', err.message)
  }
}

// ── Load gallery on page ready ───────────────────────────────
window.addEventListener('load', () => {
  loadGalleryFromAPI()
  loadTracksFromAPI()
  // Re-show upload button if already authenticated this session
  if (sessionStorage.getItem('uploadAuth')) {
    revealUploadButton()
  }
})

// ═══════════════════════════════════════════════════════════
//  ARTIST PAGE — Custom Controls & Audio Settings Panel
//  All wired up inside 'load' so tracks are ready.
// ═══════════════════════════════════════════════════════════

// Global so onclick attributes in HTML can also call them
function openAudioPanel() {
  const panel = document.getElementById('audioSettingsPanel')
  const overlay = document.getElementById('panelOverlay')
  if (panel) panel.classList.add('open')
  if (overlay) overlay.classList.add('visible')
}
function closeAudioPanel() {
  const panel = document.getElementById('audioSettingsPanel')
  const overlay = document.getElementById('panelOverlay')
  if (panel) panel.classList.remove('open')
  if (overlay) overlay.classList.remove('visible')
}

window.addEventListener('load', () => {
  // ── Helper: get real track items from visible playlist ─────
  function getActiveTracks() {
    const lists = Array.from(document.querySelectorAll('.category-list'))
    const visible = lists.find(
      (el) => el.tagName === 'UL' && el.style.display !== 'none',
    )
    return visible ? Array.from(visible.querySelectorAll('li[data-src]')) : []
  }

  function playTrack(li) {
    if (!li || !li.dataset.src) return
    document
      .querySelectorAll('.category-list li')
      .forEach((el) => el.classList.remove('active'))
    li.classList.add('active')
    audioPlayer.src = li.dataset.src
    audioPlayer.play().catch(() => {})
  }

  // ── Play / Pause ───────────────────────────────────────────
  const mainPlayBtn = document.getElementById('mainPlayBtn')
  if (mainPlayBtn) {
    mainPlayBtn.addEventListener('click', () => {
      if (!audioPlayer.src) {
        const tracks = getActiveTracks()
        if (tracks.length) playTrack(tracks[0])
        return
      }
      audioPlayer.paused
        ? audioPlayer.play().catch(() => {})
        : audioPlayer.pause()
    })
  }

  // ── Previous track ─────────────────────────────────────────
  const prevBtnEl = document.getElementById('prevBtn')
  if (prevBtnEl) {
    prevBtnEl.addEventListener('click', () => {
      const tracks = getActiveTracks()
      if (!tracks.length) return
      const idx = tracks.findIndex((li) => li.classList.contains('active'))
      const prevIdx = idx <= 0 ? tracks.length - 1 : idx - 1
      playTrack(tracks[prevIdx])
    })
  }

  // ── Next track ─────────────────────────────────────────────
  const nextBtnEl = document.getElementById('nextBtn')
  if (nextBtnEl) {
    nextBtnEl.addEventListener('click', () => {
      const tracks = getActiveTracks()
      if (!tracks.length) return
      const idx = tracks.findIndex((li) => li.classList.contains('active'))
      const nextIdx = (idx + 1) % tracks.length
      playTrack(tracks[nextIdx])
    })
  }

  // ── Sync UI to audio state ─────────────────────────────────
  const playIconEl = document.getElementById('playIcon')
  const heroDiscEl = document.getElementById('heroDisc')
  const nowPlayingRow = document.querySelector('.now-playing-info')
  const trackNameEl = document.getElementById('currentTrackName')

  function updateNowPlaying() {
    const active = document.querySelector('.category-list li.active')
    if (active && trackNameEl) {
      const text = Array.from(active.childNodes)
        .filter((n) => n.nodeType === Node.TEXT_NODE)
        .map((n) => n.textContent.trim())
        .join(' ')
        .trim()
      trackNameEl.textContent = text || 'Now Playing…'
    }
  }

  audioPlayer.addEventListener('play', () => {
    if (playIconEl) {
      playIconEl.classList.remove('fa-play')
      playIconEl.classList.add('fa-pause')
    }
    if (heroDiscEl) heroDiscEl.classList.add('spinning')
    if (nowPlayingRow) nowPlayingRow.classList.add('playing')
    updateNowPlaying()
  })

  audioPlayer.addEventListener('pause', () => {
    if (playIconEl) {
      playIconEl.classList.remove('fa-pause')
      playIconEl.classList.add('fa-play')
    }
    if (heroDiscEl) heroDiscEl.classList.remove('spinning')
    if (nowPlayingRow) nowPlayingRow.classList.remove('playing')
  })

  audioPlayer.addEventListener('ended', () => {
    if (playIconEl) {
      playIconEl.classList.remove('fa-pause')
      playIconEl.classList.add('fa-play')
    }
    if (heroDiscEl) heroDiscEl.classList.remove('spinning')
    if (nowPlayingRow) nowPlayingRow.classList.remove('playing')
  })

  // ── Audio Settings Panel listeners ────────────────────────
  const openSettingsBtn = document.getElementById('openSettings')
  const closeSettingsBtn = document.getElementById('closeSettings')
  const panelOverlayEl = document.getElementById('panelOverlay')

  if (openSettingsBtn) openSettingsBtn.addEventListener('click', openAudioPanel)
  if (closeSettingsBtn)
    closeSettingsBtn.addEventListener('click', closeAudioPanel)
  if (panelOverlayEl) panelOverlayEl.addEventListener('click', closeAudioPanel)

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeAudioPanel()
  })

  // ── Bio accordion (mobile) ─────────────────────────────────
  const bioToggle = document.getElementById('bioToggle')
  const bioBody = document.getElementById('bioBody')
  if (bioToggle && bioBody) {
    bioToggle.addEventListener('click', () => {
      const open = bioToggle.getAttribute('aria-expanded') === 'true'
      bioToggle.setAttribute('aria-expanded', String(!open))
      bioBody.classList.toggle('bio-open', !open)
    })
  }
  // ── Booking Calendar ─────────────────────────────────────
  let calYear = new Date().getFullYear()
  let calMonth = new Date().getMonth() // 0-indexed
  let calBookings = {} // key: 'YYYY-MM-DD', value: 'available'|'booked'|'unavailable'
  let calAdminMode = false
  let calSelectedStatus = 'available'

  const calGrid = document.getElementById('calGrid')
  const calMonthLabel = document.getElementById('calMonthLabel')
  const calPrev = document.getElementById('calPrev')
  const calNext = document.getElementById('calNext')
  const calAdminToggle = document.getElementById('calAdminToggle')
  const calStatusPicker = document.getElementById('calStatusPicker')

  const MONTH_NAMES = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  function pad(n) {
    return String(n).padStart(2, '0')
  }
  function dateKey(y, m, d) {
    return `${y}-${pad(m + 1)}-${pad(d)}`
  }

  function saveCalendarLocal() {
    try {
      localStorage.setItem('djsam_calendar', JSON.stringify(calBookings))
    } catch (_) {}
  }

  function renderCalendar() {
    if (!calGrid || !calMonthLabel) return
    calMonthLabel.textContent = MONTH_NAMES[calMonth] + ' ' + calYear
    calGrid.innerHTML = ''

    const today = new Date()
    const todayKey = dateKey(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
    )
    const firstDay = new Date(calYear, calMonth, 1).getDay() // 0=Sun
    const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate()

    // Empty spacers for day-of-week offset
    for (let i = 0; i < firstDay; i++) {
      const blank = document.createElement('div')
      blank.className = 'cal-day empty'
      calGrid.appendChild(blank)
    }

    for (let d = 1; d <= daysInMonth; d++) {
      const key = dateKey(calYear, calMonth, d)
      const cell = document.createElement('div')
      cell.className = 'cal-day'
      cell.textContent = d
      cell.dataset.date = key

      // Past dates
      const cellDate = new Date(calYear, calMonth, d)
      if (
        cellDate <
        new Date(today.getFullYear(), today.getMonth(), today.getDate())
      ) {
        cell.classList.add('past')
      }
      if (key === todayKey) cell.classList.add('today')
      if (calBookings[key]) cell.classList.add(calBookings[key])

      if (calAdminMode) {
        cell.addEventListener('click', () => onAdminDayClick(key, cell))
      }
      calGrid.appendChild(cell)
    }

    if (calAdminMode) {
      calGrid.classList.add('cal-admin-active')
    } else {
      calGrid.classList.remove('cal-admin-active')
    }
  }

  async function onAdminDayClick(key, cell) {
    const password = UPLOAD_PASSWORD
    if (!password) return

    if (calSelectedStatus === 'none') {
      // Remove status
      delete calBookings[key]
      try {
        await fetch(GALLERY_API_URL + '/calendar/' + key, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ password }),
        })
      } catch (_) {
        saveCalendarLocal()
      }
    } else {
      calBookings[key] = calSelectedStatus
      try {
        const r = await fetch(GALLERY_API_URL + '/calendar/' + key, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: calSelectedStatus, password }),
        })
        if (!r.ok) throw new Error('API')
      } catch (_) {
        saveCalendarLocal()
      }
    }
    renderCalendar()
  }

  async function loadCalendar() {
    // Try API first
    try {
      const r = await fetch(GALLERY_API_URL + '/calendar')
      if (!r.ok) throw new Error('API')
      const data = await r.json() // [{date, status}...]
      calBookings = {}
      data.forEach((b) => {
        calBookings[b.date] = b.status
      })
    } catch (_) {
      // Fallback: localStorage
      try {
        const stored = localStorage.getItem('djsam_calendar')
        if (stored) calBookings = JSON.parse(stored)
      } catch (__) {}
    }
    renderCalendar()
  }

  // Prev/Next month
  if (calPrev)
    calPrev.addEventListener('click', () => {
      calMonth--
      if (calMonth < 0) {
        calMonth = 11
        calYear--
      }
      renderCalendar()
    })
  if (calNext)
    calNext.addEventListener('click', () => {
      calMonth++
      if (calMonth > 11) {
        calMonth = 0
        calYear++
      }
      renderCalendar()
    })

  function unlockAdmin() {
    calAdminMode = true
    window._calAdminMode = true
    if (calStatusPicker) calStatusPicker.classList.add('visible')
    renderCalendar()
  }

  function lockAdmin() {
    calAdminMode = false
    window._calAdminMode = false
    if (calStatusPicker) calStatusPicker.classList.remove('visible')
    renderCalendar()
  }

  window._unlockCalAdmin = unlockAdmin
  window._lockCalAdmin = lockAdmin

  // Auto-unlock if session already authenticated
  if (sessionStorage.getItem('uploadAuth')) unlockAdmin()

  // Status picker buttons
  if (calStatusPicker) {
    calStatusPicker.querySelectorAll('.status-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        calStatusPicker
          .querySelectorAll('.status-btn')
          .forEach((b) => b.classList.remove('active'))
        btn.classList.add('active')
        calSelectedStatus = btn.dataset.status
      })
    })
  }

  // Load calendar when tab is first shown
  let calLoaded = false
  function maybeLoadCalendar() {
    const calTab = document.getElementById('playlist-calendar')
    if (calTab && calTab.style.display !== 'none' && !calLoaded) {
      calLoaded = true
      loadCalendar()
    }
  }

  // Hook into existing tab switching
  document.querySelectorAll('.tab-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      setTimeout(maybeLoadCalendar, 50)
    })
  })
  // Also check immediately in case calendar is the default visible tab
  maybeLoadCalendar()
}) // end load

// ── Booking Modal ────────────────────────────────────────────
;(function () {
  const overlay  = document.getElementById('bookingOverlay')
  const modal    = document.getElementById('bookingModal')
  const openBtn  = document.getElementById('openBookingModal')
  const closeBtn = document.getElementById('closeBookingModal')
  const form     = document.getElementById('bookingForm')
  const successEl= document.getElementById('bookingSuccess')
  const errorEl  = document.getElementById('bookingError')
  const submitBtn= document.getElementById('bkSubmitBtn')
  const btnText  = document.getElementById('bkBtnText')
  const btnSpinner=document.getElementById('bkBtnSpinner')

  function openModal() {
    overlay.classList.add('visible')
    modal.classList.add('open')
    document.body.style.overflow = 'hidden'
    // Reset to form view each open
    successEl.style.display = 'none'
    form.style.display = ''
    errorEl.style.display = 'none'
  }

  function closeModal() {
    overlay.classList.remove('visible')
    modal.classList.remove('open')
    document.body.style.overflow = ''
  }

  if (openBtn)  openBtn.addEventListener('click', openModal)
  if (closeBtn) closeBtn.addEventListener('click', closeModal)
  if (overlay)  overlay.addEventListener('click', closeModal)
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('open')) closeModal()
  })

  // Success close button
  const successClose = document.getElementById('bookingSuccessClose')
  if (successClose) successClose.addEventListener('click', closeModal)

  // Form submit — Web3Forms AJAX
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault()
      errorEl.style.display = 'none'

      // Basic validation
      const required = form.querySelectorAll('[required]')
      let valid = true
      required.forEach(f => {
        f.style.borderColor = ''
        if (!f.value.trim()) {
          f.style.borderColor = '#f07080'
          valid = false
        }
      })
      if (!valid) {
        errorEl.textContent = 'Please fill in all required fields.'
        errorEl.style.display = 'block'
        return
      }

      // Loading state
      submitBtn.disabled = true
      btnText.style.display = 'none'
      btnSpinner.style.display = ''

      try {
        const data = new FormData(form)
        const res  = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          body: data,
        })
        const json = await res.json()

        if (json.success) {
          form.style.display = 'none'
          successEl.style.display = 'block'
          form.reset()
        } else {
          throw new Error(json.message || 'Submission failed')
        }
      } catch (err) {
        errorEl.textContent = 'Something went wrong. Please try again or email djmaitresam@gmail.com'
        errorEl.style.display = 'block'
      } finally {
        submitBtn.disabled = false
        btnText.style.display = ''
        btnSpinner.style.display = 'none'
      }
    })
  }
})()
