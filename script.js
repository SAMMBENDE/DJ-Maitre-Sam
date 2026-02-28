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

