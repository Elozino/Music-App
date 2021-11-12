//Variable Declaration
const home = document.querySelector(".home");
const menu = document.querySelector(".menu");
const close = document.querySelector(".close");
const playlists = document.querySelector(".playlists");

const trackImage = document.querySelector(".track-image");
const songTitle = document.querySelector(".song-title");
const artisteName = document.querySelector(".artiste-name");

//Controls
const prev = document.querySelector(".previous-btn");
const play = document.querySelector(".play-pause-btn");
const next = document.querySelector(".next-btn");
const playall = document.querySelector(".playall");

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

play.addEventListener("click", playAndPause);

let indexOfTrack = 0;
let track = document.createElement("audio");
let isPlaying = false;

//Load Tracks
function loadTracks(indexTrack) {
  track.src = trackList[indexTrack].path;
  trackImage.src = trackList[indexTrack].img;
  songTitle.textContent = trackList[indexTrack].name;
  artisteName.TextContent = trackList[indexTrack].artiste;
  //track.load();
}
loadTracks(indexOfTrack);


function playAndPause(){
    if(isPlaying == false){
        playSong()
    }else{
        pauseSong();
    }
}
function playSong() {
  track.play();
  isPlaying = true;
  play.innerHTML = '<i class="fas fa-pause"></i>';
}

function pauseSong() {
    track.pause()
    isPlaying = false;
    play.innerHTML = '<i class="fas fa-play"></i>';
}
