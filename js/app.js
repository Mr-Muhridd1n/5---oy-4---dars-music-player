const playBtn = document.querySelector("#play");
const audio = document.querySelector("audio");
const voiceRange = document.querySelector("#voice");
const voiceValue = document.querySelector("#voice-value");
const container = document.querySelector(".container");
const backward = document.querySelector("#backward");
const forward = document.querySelector("#forward");
const cover = document.querySelector("#cover");
const progress = document.querySelector(".progress");
const progress__music_time = document.querySelector(".progress__music_time");
const progress__present_time = document.querySelector(
  ".progress__present_time"
);
const count = document.querySelector("#count");
const musicTitle = document.querySelector("#music-title");

const musics = [
  "Shawn Mendes - There s Nothing Holdin  Me Back",
  "The Weeknd - Blinding Lights",
  "The Weeknd - Save Your Tears",
];

let musicCounter = 0;

function changeMusic(musicCounter) {
  cover.src = `./images/${musics[musicCounter]}.jpg`;
  cover.alt = `${musics[musicCounter]}`;
  musicTitle.textContent = `${musics[musicCounter]}`;
  audio.src = `./music/${musics[musicCounter]}.mp3`;
  count.textContent = `${musicCounter + 1} / ${musics.length}`;
}

changeMusic(musicCounter);

function play() {
  audio.play();
  container.classList.add("play");
  playBtn.innerHTML = `<i class="fa-solid fa-pause"></i>`;
}

function pause() {
  audio.pause();
  container.classList.remove("play");
  playBtn.innerHTML = `<i class="fa-solid fa-play"></i>`;
}

function forwardFunc() {
  if (musicCounter < musics.length - 1) {
    musicCounter++;
    changeMusic(musicCounter);
  } else {
    musicCounter = 0;
    changeMusic(musicCounter);
  }
  play();
}

function backwardFunc() {
  if (musicCounter > 0) {
    musicCounter--;
    changeMusic(musicCounter);
  } else {
    musicCounter = musics.length - 1;
    changeMusic(musicCounter);
  }
  play();
}

audio.volume = 0.5;
voiceValue.textContent = 50;

playBtn.addEventListener("click", () => {
  const isPlaying = container.classList.contains("play");
  if (isPlaying) {
    pause();
  } else {
    play();
  }
});

voiceRange.addEventListener("input", () => {
  audio.volume = voiceRange.value / 100;
  voiceValue.textContent = voiceRange.value;
});

forward.addEventListener("click", () => {
  forwardFunc();
});

backward.addEventListener("click", () => {
  backwardFunc();
});

audio.addEventListener("timeupdate", () => {
  // Update progress bar width
  if (!isNaN(audio.duration) && audio.duration > 0) {
    let times = (audio.currentTime / audio.duration) * 100;
    progress.style.width = `${times}%`;
    let minutes = Math.floor(audio.duration / 60);
    let seconds = Math.floor(audio.duration % 60);
    let minutesTimes = Math.floor(times / 60);
    let secondsTimes = Math.floor(times % 60);
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    minutesTimes = minutesTimes < 10 ? "0" + minutesTimes : minutesTimes;
    secondsTimes = secondsTimes < 10 ? "0" + secondsTimes : secondsTimes;
    progress__music_time.textContent = `${minutes}:${seconds}`;
    progress__present_time.textContent = `${minutesTimes}:${secondsTimes}`;
  } else {
    progress.style.width = "0%";
    progress__music_time.textContent = `00:00`;
  }
});
