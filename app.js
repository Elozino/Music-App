//Variable Declaration
const home = document.querySelector(".home");
const menu = document.querySelector(".menu");
const close = document.querySelector(".close");
const playlists = document.querySelector(".playlists");

//Song Info
const trackImage = document.querySelector(".track-image");
const songTitle = document.querySelector(".song-title");
const artisteName = document.querySelector(".artiste-name");

//Speaker Volume
const speakerVolume = document.querySelector(".speaker-volume");
const speakerControl = document.querySelector(".speaker-control");
const speaker = document.querySelector(".speaker");

//Controls
const prev = document.querySelector(".previous-btn");
const play = document.querySelector(".play-pause-btn");
const next = document.querySelector(".next-btn");
const playall = document.querySelector(".playall");

//Song duration
const currentTimer = document.querySelector(".current-time");
const durationTime = document.querySelector(".duration-time");
const durationSlider = document.querySelector(".duration-slider");
console.log(durationTime);
console.log(currentTimer);
console.log(durationSlider)


//To open and close playlist section
menu.addEventListener("click", () => {
  playlists.style.left = "0";
});
close.addEventListener("click", () => {
  playlists.style.left = "-100%";
});



//Creating a track list
let trackList = [
  {
    name: "Creative Minds",
    path: "./music/bensound-creativeminds.mp3",
    img: "./assets/adrian-korte-5gn2soeAc40-unsplash.jpg",
    artiste: "Bensound Creative",
  },
  {
    name: "Happy Rock",
    path: "./music/bensound-happyrock.mp3",
    img: "./assets/download-1.jpg",
    artiste: "Bensound Happy",
  },
  {
    name: "JazzyFrenchy",
    path: "./music/bensound-jazzyfrenchy.mp3",
    img: "./assets/download-2.jpg",
    artiste: "Bensound JazzyFrenchy",
  },
  {
    name: "Ukulele",
    path: "./music/bensound-ukulele.mp3",
    img: "./assets/download-3.jpg",
    artiste: "Bensound Ukulele",
  },
];


//EventListeners
play.addEventListener("click", playAndPause);
next.addEventListener("click", nextSong);
prev.addEventListener("click", prevSong);
speaker.addEventListener("click", mute);
speakerControl.addEventListener("change", slider);
durationSlider.addEventListener("change", updateDuration);

let indexOfTrack = 0;
let timer = 0;
let track = document.createElement("audio");
let isPlaying = false;

//Load Tracks
function loadTracks(indexTrack) {
  track.src = trackList[indexTrack].path;
  trackImage.src = trackList[indexTrack].img;
  songTitle.textContent = trackList[indexTrack].name;
  artisteName.TextContent = trackList[indexTrack].artiste;
  track.load();
}
loadTracks(indexOfTrack);

//Play and Paused tracks
function playAndPause() {
  if (isPlaying == false) {
    playSong();
  } else {
    pauseSong();
  }
}

//Play tracks
function playSong() {
  track.play();
  isPlaying = true;
  play.innerHTML = '<i class="fas fa-pause"></i>';
}

//Pause tracks
function pauseSong() {
  track.pause();
  isPlaying = false;
  play.innerHTML = '<i class="fas fa-play"></i>';
}

//Next Song
function nextSong() {
  if (indexOfTrack < trackList.length - 1) {
    indexOfTrack++;
    loadTracks(indexOfTrack);
    playSong();
  } else {
    indexOfTrack = 0;
    loadTracks(indexOfTrack);
    playSong();
  }
}

//Previous song
function prevSong() {
  if (indexOfTrack > 0) {
    indexOfTrack--;
    loadTracks(indexOfTrack);
    playSong();
  } else {
    indexOfTrack = trackList.length - 1;
    loadTracks(indexOfTrack);
    playSong();
  }
}

//To mute sound
function mute() {
  track.volume = 0;
  speakerVolume.innerHTML = 0;
  speakerControl.value = 0;
  console.log(speaker);
}

//To change volume with th slider
function slider() {
  speakerVolume.value = speakerControl.value;
  track.volume = speakerControl.value / 100;
  speakerVolume.innerHTML = Math.round(track.volume * 100);
}

//To update duration of audio
function updateDuration(){
  console.log('changed')
  console.log(track.duration * 5)
  console.log(durationSlider.value)
  let sliderPosition = track.duration * (durationSlider.value / 100)
  track.currentTime = sliderPosition;
  
}