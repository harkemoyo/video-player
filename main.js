const playerEl = document.querySelector(".player");

const videoEl = document.querySelector("video");
const progressRange = document.querySelector(".progress-range");
const progressBar = document.querySelector(".progress-bar");
const playBtn = document.getElementById("play-btn");
const volumeIcon = document.getElementById("volume-icon");
const volumeRange = document.querySelector(".volume-range");
const volumeBar = document.querySelector(".volume-bar");
const timeElapsed = document.querySelector(".time-elapsed");
const timeDuration = document.querySelector(".time-duration");
const speed = document.querySelector(".player-speed");

const fullscreenEl = document.querySelector(".fullscreen");

// play/pause

function showPlayIcon() {
  playBtn.classList.replace("fa-pause", "fa-play");
  playBtn.setAttribute("title", "play");
}

function togglePlay() {
  if (videoEl.paused) {
    videoEl.play();
    playBtn.classList.replace("fa-play", "fa-pause");
    playBtn.setAttribute("title", "pause");
  } else {
    videoEl.pause();
    showPlayIcon();
  }
}
//calc display time
function displayTime(time) {
  const minutes = Math.floor(time / 60);
  let seconds = Math.floor(time % 60);
  seconds = seconds > 9 ? seconds : `0${seconds}`;
  return `${minutes} : ${seconds}`;
}

//timeupdate
function updateProgress() {
  progressBar.style.width = `${
    (videoEl.currentTime / videoEl.duration) * 100
  }%`;

  timeElapsed.textContent = `${displayTime(videoEl.currentTime)} /`;

  timeDuration.textContent = `${displayTime(videoEl.duration)}`;
}

//on show icon end
videoEl.addEventListener("ended", showPlayIcon);

//on seek progress bar
function seekProgress(e) {
  const newTime = e.offsetX / progressRange.offsetWidth;
  progressBar.style.width = `${newTime * 100}%`;
  videoEl.currentTime = newTime * videoEl.duration;
}

let lastVolume = 1;
//on volumeBar set
function setVolume(e) {
  let volume = e.offsetX / volumeRange.offsetWidth;
  if (volume < 0.1) {
    volume = 0;
  }
  if (volume > 0.9) {
    volume = 1;
  }
  volumeBar.style.width = `${volume * 100}%`;
  videoEl.volume = volume;

  // on volume icon
  volumeIcon.className = "";
  if (volume > 0.7) {
    volumeIcon.classList.add("fas", "fa-volume-up");
  } else if (volume < 0.7 && volume > 0) {
    volumeIcon.classList.add("fas", "fa-volume-down");
  } else if (volume === 0) {
    volumeIcon.classList.add("fas", "fa-volume-off");
  }

  lastVolume = volume;
}
// on mute & unmute
function toggleMute() {
  volumeIcon.className = "";
  if (videoEl.volume) {
    lastVolume = videoEl.volume;
    videoEl.volume = 0;
    volumeBar.style.width = 0;
    volumeIcon.classList.add("fas", "fa-volume-mute");
    volumeIcon.setAttribute("title", "Unmute");
  } else {
    videoEl.volume = lastVolume;
    volumeBar.style.width = `${lastVolume * 100}%`;
    volumeIcon.classList.add("fas", "fa-volume-up");
    volumeIcon.setAttribute("title", "Mute");
  }
}
//on playback rate
function changeSpeed() {
  videoEl.playbackRate = speed.value;
}
//on fullscreen
/* View in fullscreen */
function openFullscreen(elem) {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) {
    /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) {
    /* IE11 */
    elem.msRequestFullscreen();
  }
  videoEl.classList.add("video-fullscreen");
}

/* Close fullscreen */
function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    /* Safari */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    /* IE11 */
    document.msExitFullscreen();
  }
  videoEl.classList.remove("video-fullscreen");
}

let fullscreen = false;

//togglefullscreen
function toggleFullscreen() {
  !fullscreen ? openFullscreen(playerEl) : closeFullscreen();
  fullscreen = !fullscreen; //reverse fullscreen
}

// events
playBtn.addEventListener("click", togglePlay);
videoEl.addEventListener("click", togglePlay);
videoEl.addEventListener("timeupdate", updateProgress);
videoEl.addEventListener("canplay", updateProgress);
progressRange.addEventListener("click", seekProgress);
volumeRange.addEventListener("click", setVolume);
volumeIcon.addEventListener("click", toggleMute);
speed.addEventListener("change", changeSpeed);
fullscreenEl.addEventListener("click", toggleFullscreen);
