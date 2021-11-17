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
const durationTimer = document.querySelector(".duration-time");
const durationSlider = document.querySelector(".duration-slider");
console.log(durationTimer);
console.log(currentTimer);
console.log(durationSlider);

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


let indexOfTrack = 0;
let timer = 0;
let track = document.createElement("audio");
let isPlaying = false;


//EventListeners
play.addEventListener("click", playAndPause);
next.addEventListener("click", nextSong);
prev.addEventListener("click", prevSong);
speaker.addEventListener("click", mute);
speakerControl.addEventListener("change", slider);
durationSlider.addEventListener("change", updateDuration);
track.addEventListener("timeupdate", updateSongTime);


//Load Tracks
function loadTracks(indexTrack) {
  clearInterval(timer);
  resetSlider();
  track.src = trackList[indexTrack].path;
  trackImage.src = trackList[indexTrack].img;
  songTitle.textContent = trackList[indexTrack].name;
  artisteName.TextContent = trackList[indexTrack].artiste;
  track.load();
  timer = setInterval(updateSlider, 1000);
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


//To change volume with the slider
function slider() {
  speakerVolume.value = speakerControl.value;
  track.volume = speakerControl.value / 100;
  speakerVolume.innerHTML = Math.round(track.volume * 100);
}


//To update duration of audio
function updateDuration() {
  // console.log('changed')
  // console.log(track.duration * 5)
  // console.log(durationSlider.value)
  let sliderPosition = track.duration * (durationSlider.value / 100);
  track.currentTime = sliderPosition;
}


//To reset the slider so when a song is played the prev is cleared
function resetSlider() {
  durationSlider.value = 0;
}


//Making the slider move with the song track
function updateSlider() {
  let position = 0;

  if (!isNaN(track.duration)) {
    position = track.currentTime * (100 / track.duration);
    durationSlider.value = position;
    //Recall in the update slider func we did an arithmetic in term of 0-1 that is why this is like this so it can correspond
  }
  if (track.ended) {
    play.innerHTML = '<i class="fas fa-play"></i>';
    if (indexOfTrack < trackList.length - 1) {
      indexOfTrack++;
      loadTracks(indexOfTrack);
      playSong();
    } else if (indexOfTrack == trackList.length) {
      indexOfTrack = 0;
      loadTracks(indexOfTrack);
      playSong();
    }
  }
}


//Update current song time
function updateSongTime() {
  if (track.duration) {
    //Creating for current min and sec
    let currentMin = Math.floor(track.currentTime / 60); //To get the current min
    let currentSec = Math.floor(track.currentTime - currentMin * 60); //To get the current sec

    //creating the duration min and sec
    let durationMin = Math.floor(track.duration / 60); //To get the current min
    let durationSec = Math.floor(track.duration - durationMin * 60); //To get the current sec

    if (durationMin < 10) {
      durationMin = `0${durationMin}`
    }
    if (durationSec < 10) {
      durationSec = `0${durationSec}`
    }
    if (currentMin < 10) {
      currentMin = `0${currentMin}`
    }
    if (currentSec < 10) {
      currentSec = `0${currentSec}`
    } 
    currentTimer.innerHTML = `${currentMin}:${currentSec}`
    durationTimer.innerHTML = `${durationMin}:${durationSec}`
  }
  else{
    currentTimer.innerHTML = `00:00`
    durationTimer.innerHTML = `00:00`
  }
}
