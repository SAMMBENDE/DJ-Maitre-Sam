const audioPlayer = document.getElementById('audioPlayer')
const tabBtns = document.querySelectorAll('.tab-btn')
const categoryLists = document.querySelectorAll('.category-list')
const repeatBtn = document.getElementById('repeatBtn')
const equalizer = document.querySelector('.equalizer')

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
