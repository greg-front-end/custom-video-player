window.addEventListener('DOMContentLoaded', () => {

  // ====================== DARK THEME ====================== //
  const body = document.querySelector('body')
  const darkThemeBtn = document.querySelector('.dark-theme')

  const toggleTheme = () => {
    body.classList.toggle('dark')
  }

  darkThemeBtn.addEventListener('click', toggleTheme)
  
  // ====================== VIDEO PLAYER ====================== //
  const openVideoPopup = document.querySelector('.video__btn'),
        player = document.querySelector('.player'),
        video = document.querySelector('video'), 
        progressWrapper = document.querySelector('.player__progress'),
        progressBar = document.querySelector('.player__progress-bar'),
        playBtn = document.querySelector('.player__play-btn'),
        playVideoBtnCenter = document.querySelector('.player__play-video-btn'),
        volumeIcon = document.querySelector('.player__volume-btn'),
        volumeLine = document.querySelector('.player__volume-line'),
        volumeBar = document.querySelector('.player__volume-bar'),
        speed = document.querySelector('.player__speed-select'),
        currentVideoTime = document.querySelector('.player__time-elapsed'),
        durationVideoTime = document.querySelector('.player__time-duration'),
        fullscreenBtn = document.querySelector('.player__fullscreen'),
        closeVideoPopupIcon = document.querySelector('.player__close'),
        overlay = document.querySelector('.video__overlay')
  

  // ====================== Functions ====================== //
  // Close popup function
  const hideVideoPopup = () => {
    overlay.classList.remove('video__overlay--active')
    player.classList.remove('player--active')
  }
  
  // Start video
  const startVideo = () => {
    if (video.paused) {
      video.play()
      playBtn.classList.add('player__play-btn--pause')
      playBtn.setAttribute('title', 'Pause')
      playVideoBtnCenter.classList.add('player__play-video-btn--hidden')
    }
  }
  
  // Pause video
  const pauseVideo = () => {
    if (!video.paused) {
      video.pause()
      playBtn.classList.remove('player__play-btn--pause')
      playBtn.setAttribute('title', 'Play')
      playVideoBtnCenter.classList.remove('player__play-video-btn--hidden')
    }
  }

  // Get time for min and sec
  const showTime = (time) => {
    let min = Math.floor(time / 60) 
    let sec = Math.floor(time % 60)
    sec = sec > 9 ? sec : `0${sec}`
    return `${min}:${sec}`
  }

  // Change time value and progress for video
  const progressWrapperUpdate = () => {
    progressBar.style.width = `${(video.currentTime / video.duration) * 100}%`
    currentVideoTime.textContent = `${showTime(video.currentTime)} /`
    durationVideoTime.textContent = ` ${showTime(video.duration)}`;
  }

  // Progress bar time
  const progressTimeLine = (e) => {
    const newTime = e.offsetX / progressWrapper.offsetWidth
    progressBar.style.width = `${newTime * 100}%`
    video.currentTime = newTime * video.duration
  }

  // Chage volume icon if it zero
  const changeVolumeIcon = () => {
    if (video.volume <= 0.1 && parseInt(volumeBar.style.width) === 0) {
      volumeIcon.classList.add('player__volume-btn--mute')
    } else {
      volumeIcon.classList.remove('player__volume-btn--mute')
    }
  }

  // Sound volume 
  const changeVolume = (e) => {
    let volume = e.offsetX /  volumeLine.offsetWidth

    if (volume < 0.1) {
      volume = 0
    }
    if (volume > 0.9) {
      volume = 1
    }
    volumeBar.style.width = `${volume * 100}%`
    video.volume = volume 
    changeVolumeIcon()
  }

  // If volume > 0 set mute, or set the prev value 
  volumeBar.style.width = `${video.volume * 100}%`
  let volumeMute = video.volume
  const setVolumeMute = () => {
    if (video.volume) {
      volumeMute = video.volume
      volumeBar.style.width = 0
      video.volume = 0
      changeVolumeIcon()
    } else {
      volumeBar.style.width = `${volumeMute * 100}%`
      changeVolumeIcon()
      video.volume = volumeMute
    }
  }
  // Chage video speed
  const changeSpeed = () => {
    video.playbackRate = speed.value 
  }

  // ====================== Event listneres ====================== //
  // Open video popup
  openVideoPopup.addEventListener('click', (e) => {
    overlay.classList.add('video__overlay--active')
    player.classList.add('player--active')
  })

  // Close video popup
  overlay.addEventListener('click', () => {
    hideVideoPopup()
    pauseVideo()
  })
  closeVideoPopupIcon.addEventListener('click', () => {
    hideVideoPopup()
    pauseVideo()
  })

  // Start video or pause when click on play button
  playBtn.addEventListener('click', (e) => {
    let currBtn = e.target
    if (!currBtn.classList.contains('player__play-btn--pause')) {
      startVideo()
    } else {
      pauseVideo()
    }
  })

  // Start or pause video when click on video popup
  video.addEventListener('click', (e) => {
    let currBtn = e.target
    let getBtnElement = currBtn.closest('.player > .player__video-inner').nextElementSibling.firstElementChild.firstElementChild

    if (!getBtnElement.classList.contains('player__play-btn--pause')) {
      startVideo()
    } else {
      pauseVideo()
    }
  })

  // Start or pause video with space keyboard
  document.addEventListener('keydown', (e) => {
    if (player.classList.contains('player--active')) {
      if (e.keyCode === 32) {
        if (video.paused) {
          startVideo()
        } else {
          pauseVideo()
        }
      } 
    }
  })

  // Change icon from pause to play when video ended
  video.addEventListener('ended', () => {
    playBtn.classList.remove('player__play-btn--pause')
  })

  // Update time for video
  video.addEventListener('timeupdate', progressWrapperUpdate)
  video.addEventListener('canplay', progressWrapperUpdate)

  // Change time and progress when click on porgress bar
  progressWrapper.addEventListener('click', progressTimeLine)
  
  // Change volume when click on line
  volumeLine.addEventListener('click', changeVolume)

  // Set volume mute when click on volume icon
  volumeIcon.addEventListener('click', setVolumeMute)

  // Change video speed
  speed.addEventListener('change', changeSpeed)

  // Make fullscreen
  fullscreenBtn.addEventListener('click', () => {
    video.requestFullscreen();
  })
})
