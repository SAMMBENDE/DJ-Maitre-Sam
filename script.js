const audioPlayer = document.getElementById('audioPlayer')
const tabBtns = document.querySelectorAll('.tab-btn')
const categoryLists = document.querySelectorAll('.category-list')
const repeatBtn = document.getElementById('repeatBtn')
const equalizer = document.querySelector('.equalizer')

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
bassControl.addEventListener('input', function() {
  bassValue.textContent = this.value
  if (bassFilter) {
    bassFilter.gain.value = this.value
  }
})

// Treble control
trebleControl.addEventListener('input', function() {
  trebleValue.textContent = this.value
  if (trebleFilter) {
    trebleFilter.gain.value = this.value
  }
})

// Initialize audio context when audio starts playing
audioPlayer.addEventListener('play', initializeAudioContext)

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
      '#playlist-' + this.dataset.tab + ' li'
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
    (list) => list.style.display !== 'none'
  )
  const items = activeList.querySelectorAll('li')
  const currentIndex = Array.from(items).findIndex((li) =>
    li.classList.contains('active')
  )
  const nextIndex = (currentIndex + 1) % items.length
  items.forEach((li) => li.classList.remove('active'))
  items[nextIndex].classList.add('active')
  audioPlayer.src = items[nextIndex].dataset.src
  audioPlayer.play()
})

// Repeat button logic
repeatBtn.addEventListener('click', function () {
  audioPlayer.loop = !audioPlayer.loop
  repeatBtn.classList.toggle('active', audioPlayer.loop)
})

// Equalizer animation only when playing
audioPlayer.addEventListener('play', function () {
  equalizer.classList.add('playing')
})
audioPlayer.addEventListener('pause', function () {
  equalizer.classList.remove('playing')
})
audioPlayer.addEventListener('ended', function () {
  equalizer.classList.remove('playing')
})

// Gallery Carousel Functionality
let currentSlideIndex = 1

function showSlide(n) {
  const slides = document.querySelectorAll('.carousel-slide')
  const indicators = document.querySelectorAll('.indicator')

  if (n > slides.length) currentSlideIndex = 1
  if (n < 1) currentSlideIndex = slides.length

  slides.forEach((slide) => slide.classList.remove('active'))
  indicators.forEach((indicator) => indicator.classList.remove('active'))

  slides[currentSlideIndex - 1].classList.add('active')
  indicators[currentSlideIndex - 1].classList.add('active')
}

function changeSlide(n) {
  currentSlideIndex += n
  showSlide(currentSlideIndex)
}

function currentSlide(n) {
  currentSlideIndex = n
  showSlide(currentSlideIndex)
}

// Auto-slide carousel every 4 seconds when gallery is active
let carouselInterval
function startCarouselAutoSlide() {
  carouselInterval = setInterval(() => {
    changeSlide(1)
  }, 4000)
}

function stopCarouselAutoSlide() {
  if (carouselInterval) {
    clearInterval(carouselInterval)
  }
}

// Start auto-slide when gallery tab is selected
document.addEventListener('DOMContentLoaded', function () {
  const galleryTab = document.querySelector('[data-tab="gallery"]')
  if (galleryTab) {
    galleryTab.addEventListener('click', function () {
      setTimeout(startCarouselAutoSlide, 100) // Small delay to ensure tab is active
    })
  }

  // Stop auto-slide when other tabs are selected
  tabBtns.forEach((btn) => {
    if (btn.dataset.tab !== 'gallery') {
      btn.addEventListener('click', stopCarouselAutoSlide)
    }
  })
})

// Music Notes Animation Control
const musicNotesContainer = document.querySelector('.music-notes')

function showMusicNotes() {
  musicNotesContainer.style.display = 'block'
}

function hideMusicNotes() {
  musicNotesContainer.style.display = 'none'
}

// Show notes when music plays, hide when paused
audioPlayer.addEventListener('play', showMusicNotes)
audioPlayer.addEventListener('pause', hideMusicNotes)
audioPlayer.addEventListener('ended', hideMusicNotes)

// Hide notes initially
hideMusicNotes()

// PWA Specific Functionality
document.addEventListener('DOMContentLoaded', function() {
  // Offline/Online detection
  function updateOnlineStatus() {
    const offlineIndicator = document.querySelector('.offline-indicator') || createOfflineIndicator()
    
    if (navigator.onLine) {
      offlineIndicator.classList.remove('show')
    } else {
      offlineIndicator.classList.add('show')
    }
  }
  
  function createOfflineIndicator() {
    const indicator = document.createElement('div')
    indicator.className = 'offline-indicator'
    indicator.innerHTML = '<i class="fa fa-wifi"></i> You are currently offline. Some features may be limited.'
    document.body.appendChild(indicator)
    return indicator
  }
  
  // Listen for online/offline events
  window.addEventListener('online', updateOnlineStatus)
  window.addEventListener('offline', updateOnlineStatus)
  
  // Initial check
  updateOnlineStatus()
  
  // Enhanced audio loading for PWA
  function preloadAudio() {
    if ('serviceWorker' in navigator && 'caches' in window) {
      // Preload first track for instant playback
      const firstTrack = document.querySelector('[data-src]')
      if (firstTrack) {
        const audioSrc = firstTrack.dataset.src
        fetch(audioSrc).then(response => {
          if (response.ok) {
            console.log('First track preloaded for offline playback')
          }
        }).catch(err => {
          console.log('Preload failed:', err)
        })
      }
    }
  }
  
  // Call preload after page loads
  setTimeout(preloadAudio, 2000)
  
  // PWA Update notification
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (refreshing) return
      window.location.reload()
      refreshing = true
    })
  }
  
  let refreshing = false
  
  // Background sync for offline actions
  function registerBackgroundSync() {
    if ('serviceWorker' in navigator && 'sync' in window.ServiceWorkerRegistration.prototype) {
      navigator.serviceWorker.ready.then(registration => {
        return registration.sync.register('background-sync')
      }).catch(err => {
        console.log('Background sync registration failed:', err)
      })
    }
  }
  
  // Register background sync when going offline
  window.addEventListener('offline', registerBackgroundSync)
  
  // Enhanced touch gestures for PWA
  let touchStartX = 0
  let touchStartY = 0
  
  document.addEventListener('touchstart', function(e) {
    touchStartX = e.touches[0].clientX
    touchStartY = e.touches[0].clientY
  })
  
  document.addEventListener('touchend', function(e) {
    if (!touchStartX || !touchStartY) return
    
    const touchEndX = e.changedTouches[0].clientX
    const touchEndY = e.changedTouches[0].clientY
    
    const diffX = touchStartX - touchEndX
    const diffY = touchStartY - touchEndY
    
    // Only handle horizontal swipes in gallery
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
      const galleryContainer = document.getElementById('playlist-gallery')
      if (galleryContainer && galleryContainer.style.display !== 'none') {
        if (diffX > 0) {
          // Swipe left - next slide
          changeSlide(1)
        } else {
          // Swipe right - previous slide
          changeSlide(-1)
        }
      }
    }
    
    // Reset
    touchStartX = 0
    touchStartY = 0
  })
  
  // PWA performance optimization
  function optimizeForPWA() {
    // Lazy load images in gallery
    const images = document.querySelectorAll('.carousel-slide img')
    
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target
            if (img.dataset.src) {
              img.src = img.dataset.src
              img.removeAttribute('data-src')
              observer.unobserve(img)
            }
          }
        })
      })
      
      images.forEach(img => {
        if (img.src && !img.dataset.lazyLoaded) {
          // Move src to data-src for lazy loading (except first few images)
          const slideIndex = Array.from(img.closest('.carousel-container').children).indexOf(img.closest('.carousel-slide'))
          if (slideIndex > 2) {
            img.dataset.src = img.src
            img.src = ''
            imageObserver.observe(img)
          }
        }
      })
    }
  }
  
  // Initialize PWA optimizations
  setTimeout(optimizeForPWA, 1000)
})

// PWA keyboard shortcuts
document.addEventListener('keydown', function(e) {
  // Space bar to play/pause
  if (e.code === 'Space' && !e.target.matches('input')) {
    e.preventDefault()
    if (audioPlayer.paused) {
      audioPlayer.play()
    } else {
      audioPlayer.pause()
    }
  }
  
  // Arrow keys for gallery navigation when gallery is active
  const galleryContainer = document.getElementById('playlist-gallery')
  if (galleryContainer && galleryContainer.style.display !== 'none') {
    if (e.code === 'ArrowLeft') {
      e.preventDefault()
      changeSlide(-1)
    } else if (e.code === 'ArrowRight') {
      e.preventDefault()
      changeSlide(1)
    }
  }
})
