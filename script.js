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

// Cloudinary Gallery Upload
const uploadGalleryBtn = document.getElementById('uploadGalleryBtn')
const carouselContainer = document.querySelector('.carousel-container')
let slideCounter = document.querySelectorAll('.carousel-slide').length

// Wait for Cloudinary to be available
let cloudinaryRetries = 0
const waitForCloudinary = setInterval(() => {
  if (
    typeof cloudinary !== 'undefined' &&
    (typeof cloudinary.openUploadWidget === 'function' ||
      typeof cloudinary.createUploadWidget === 'function')
  ) {
    clearInterval(waitForCloudinary)
    console.log('✓ Cloudinary widget loaded successfully')
    setupUploadButton()
  } else if (cloudinaryRetries > 150) {
    // 150 * 100ms = 15 seconds timeout
    clearInterval(waitForCloudinary)
    console.warn('Cloudinary widget not available, using direct API upload')
    setupUploadButton(true) // true = use direct API
  }
  cloudinaryRetries++
}, 100)

function setupUploadButton(useDirectAPI = false) {
  if (uploadGalleryBtn) {
    uploadGalleryBtn.addEventListener('click', function () {
      if (!checkUploadAuth()) return
      if (useDirectAPI) {
        openDirectUpload()
      } else {
        openUploadWidget()
      }
    })
  }
}

function openDirectUpload() {
  // Create hidden file input
  const fileInput = document.createElement('input')
  fileInput.type = 'file'
  fileInput.accept = 'image/*'
  fileInput.multiple = true
  fileInput.style.display = 'none'

  fileInput.addEventListener('change', function () {
    const files = Array.from(this.files)
    files.forEach((file) => {
      uploadFileToCloudinary(file)
    })
  })

  document.body.appendChild(fileInput)
  fileInput.click()
  setTimeout(() => fileInput.remove(), 1000)
}

function uploadFileToCloudinary(file) {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', 'dj-maitre-sam')
  formData.append('cloud_name', 'dkd3k6eau')

  showCloudinarySuccess('Uploading ' + file.name + '...')

  fetch('https://api.cloudinary.com/v1_1/dkd3k6eau/image/upload', {
    method: 'POST',
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.secure_url) {
        const imageName = data.original_filename || 'Gallery Photo'
        addPhotoToGallery(data.secure_url, imageName)
        showCloudinarySuccess(imageName + ' added to gallery!')
        pushPhotoToGitHub(data.secure_url, imageName)
      } else if (data.error) {
        console.error('Cloudinary error:', data.error)
        if (data.error.includes('whitelisted')) {
          showCloudinarySuccess(
            '⚠️ Upload preset not configured. Please enable unsigned uploads in your Cloudinary dashboard for the ml_default preset.',
          )
        } else {
          showCloudinarySuccess('❌ Upload failed: ' + data.error.message)
        }
      }
    })
    .catch((error) => {
      console.error('Upload failed:', error)
      showCloudinarySuccess('Upload failed: ' + error.message)
    })
}

function openUploadWidget() {
  if (typeof cloudinary === 'undefined') {
    console.log('Cloudinary not available, using direct API')
    openDirectUpload()
    return
  }

  try {
    // Try newer API first, fall back to older API
    if (typeof cloudinary.openUploadWidget === 'function') {
      // Old API (upload-widget library)
      cloudinary.openUploadWidget(
        {
          cloudName: 'dkd3k6eau',
          uploadPreset: 'dj-maitre-sam',
          multiple: true,
          sources: ['local', 'url', 'camera'],
          resourceType: 'image',
          clientAllowedFormats: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
          maxFileSize: 10000000,
          maxFiles: 10,
        },
        (error, result) => {
          if (!error && result && result.event === 'success') {
            const imageUrl = result.info.secure_url
            const imageName = result.info.original_filename || 'Gallery Photo'
            addPhotoToGallery(imageUrl, imageName)
            showCloudinarySuccess(imageName + ' added to gallery!')
            pushPhotoToGitHub(imageUrl, imageName)
          }
        },
      )
    } else if (typeof cloudinary.createUploadWidget === 'function') {
      // New API (cloudinary-core library)
      const myWidget = cloudinary.createUploadWidget(
        {
          cloudName: 'dkd3k6eau',
          uploadPreset: 'dj-maitre-sam',
          multiple: true,
          sources: ['local', 'url', 'camera'],
          resourceType: 'image',
          clientAllowedFormats: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
          maxFileSize: 10000000,
          maxFiles: 10,
        },
        (error, result) => {
          if (!error && result && result.event === 'success') {
            const imageUrl = result.info.secure_url
            const imageName = result.info.original_filename || 'Gallery Photo'
            addPhotoToGallery(imageUrl, imageName)
            showCloudinarySuccess(imageName + ' added to gallery!')
            pushPhotoToGitHub(imageUrl, imageName)
          }
        },
      )
      myWidget.open()
    } else {
      console.log('Widget APIs not found, using direct API')
      openDirectUpload()
    }
  } catch (error) {
    console.error('Widget error:', error)
    openDirectUpload()
  }
}

function addPhotoToGallery(imageUrl, imageName) {
  const newSlide = document.createElement('div')
  newSlide.className = 'carousel-slide'
  newSlide.innerHTML =
    '<img src="' +
    imageUrl +
    '" alt="' +
    imageName +
    '" /><div class="slide-caption">' +
    imageName +
    '</div>'
  carouselContainer.appendChild(newSlide)
  const newIndicator = document.createElement('span')
  newIndicator.className = 'indicator'
  slideCounter++
  newIndicator.onclick = () => currentSlide(slideCounter)
  document.querySelector('.carousel-indicators').appendChild(newIndicator)
}

function showCloudinarySuccess(message, color) {
  const notification = document.createElement('div')
  notification.textContent = message
  notification.style.cssText =
    'position:fixed;top:20px;right:20px;background:' +
    (color || '#4CAF50') +
    ';color:white;padding:12px 20px;border-radius:8px;z-index:10000;font-weight:bold;max-width:80vw;word-break:break-word'
  document.body.appendChild(notification)
  setTimeout(() => notification.remove(), 4000)
}

function setGitHubToken() {
  const existing = localStorage.getItem('gh_djsam_token')
  const msg = existing
    ? 'A token is already saved. Enter a new one to replace it, or cancel to keep it:'
    : 'Enter your GitHub Personal Access Token to enable live publishing:'
  const token = prompt(msg)
  if (token && token.trim()) {
    localStorage.setItem('gh_djsam_token', token.trim())
    showCloudinarySuccess(
      '✅ Token saved! Uploads will now publish live for everyone.',
      '#27ae60',
    )
  } else if (token === '') {
    localStorage.removeItem('gh_djsam_token')
    showCloudinarySuccess('🗑️ Token cleared.', '#e67e22')
  }
}

document.getElementById('setTokenBtn').addEventListener('click', () => {
  if (!checkUploadAuth()) return
  setGitHubToken()
})

async function pushPhotoToGitHub(imageUrl, imageName) {
  let token = localStorage.getItem('gh_djsam_token')
  if (!token) {
    token = prompt(
      'Enter your GitHub Personal Access Token to publish photos live for everyone.\n(Stored only in this browser — never sent anywhere else.)',
    )
    if (!token) {
      showCloudinarySuccess(
        '⚠️ Photo saved locally only (no token provided)',
        '#e67e22',
      )
      return
    }
    localStorage.setItem('gh_djsam_token', token.trim())
    token = token.trim()
  }

  const owner = 'SAMMBENDE'
  const repo = 'DJ-Maitre-Sam'
  const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/index.html`
  const headers = {
    Authorization: 'token ' + token,
    Accept: 'application/vnd.github.v3+json',
    'Content-Type': 'application/json',
  }

  showCloudinarySuccess('📡 Publishing to all devices…', '#2980b9')

  try {
    // Fetch current index.html from GitHub
    const res = await fetch(apiUrl, { headers })
    if (!res.ok) {
      if (res.status === 401) {
        localStorage.removeItem('gh_djsam_token')
        throw new Error('Invalid token — please try again')
      }
      throw new Error('GitHub fetch failed: ' + res.status)
    }
    const fileData = await res.json()
    const sha = fileData.sha
    // Decode (handles UTF-8 / accented chars)
    let content = decodeURIComponent(
      escape(atob(fileData.content.replace(/\n/g, ''))),
    )

    // Build new slide HTML
    const safeUrl = imageUrl
    const safeName = imageName.replace(/[<>"]/g, '')
    const newSlide =
      `            <div class="carousel-slide">\n` +
      `              <img src="${safeUrl}" alt="${safeName}" />\n` +
      `              <div class="slide-caption">${safeName}</div>\n` +
      `            </div>\n`

    // Insert new slide before carousel-container closing tag
    const containerClose =
      '          </div>\n        </div>\n          <div class="carousel-controls">'
    if (!content.includes(containerClose)) {
      throw new Error('Could not locate carousel-container in index.html')
    }
    content = content.replace(containerClose, newSlide + containerClose)

    // Count existing indicators and add one more
    const indicatorMatches = content.match(/class="indicator/g) || []
    const newNum = indicatorMatches.length + 1
    const indicatorClose =
      '</div>\n            <button class="carousel-btn next-btn"'
    if (content.includes(indicatorClose)) {
      content = content.replace(
        indicatorClose,
        `  <span class="indicator" onclick="currentSlide(${newNum})"></span>\n            </div>\n            <button class="carousel-btn next-btn"`,
      )
    }

    // Encode back to base64
    const encoded = btoa(unescape(encodeURIComponent(content)))

    // Commit to GitHub
    const commitRes = await fetch(apiUrl, {
      method: 'PUT',
      headers,
      body: JSON.stringify({
        message: `Add gallery photo: ${safeName}`,
        content: encoded,
        sha: sha,
        branch: 'main',
      }),
    })

    if (commitRes.ok) {
      showCloudinarySuccess(
        '✅ Published! Live for everyone in ~60 seconds',
        '#27ae60',
      )
    } else {
      const err = await commitRes.json()
      throw new Error(err.message || 'Commit failed')
    }
  } catch (e) {
    console.error('GitHub push failed:', e)
    showCloudinarySuccess('⚠️ Saved locally only. ' + e.message, '#e74c3c')
  }
}
