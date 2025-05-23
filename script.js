console.log("Welcome to Spotify");

// Initialize variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let currentSong = document.getElementById('currentSong');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let playIcons = document.getElementsByClassName('songPlayIcon');
let nextBtn = document.querySelector('.fa-forward-step');
let prevBtn = document.querySelector('.fa-backward-step');

let songs = [
  { songName: "Too Sweet", filepath: "songs/1.mp3", coverpath: "covers/1.jpg" },
  { songName: "Bye Bye Bye", filepath: "songs/2.mp3", coverpath: "covers/2.jpg" },
  { songName: "River", filepath: "songs/3.mp3", coverpath: "covers/3.jpg" },
  { songName: "It's Gonna Be Me", filepath: "songs/4.mp3", coverpath: "covers/4.jpg" },
  { songName: "Danger Zone", filepath: "songs/5.mp3", coverpath: "covers/5.jpg" },
  { songName: "Die with a Smile", filepath: "songs/6.mp3", coverpath: "covers/6.jpg" },
  { songName: "Take Me to Church", filepath: "songs/7.mp3", coverpath: "covers/7.jpg" },
  { songName: "Starboy", filepath: "songs/8.mp3", coverpath: "covers/8.jpg" },
  { songName: "I Ain't Worried", filepath: "songs/9.mp3", coverpath: "covers/9.jpg" },
  { songName: "Pehli Nazar Me", filepath: "songs/10.mp3", coverpath: "covers/10.jpg" },
  { songName: "Tera Hone Laga Hoon", filepath: "songs/11.mp3", coverpath: "covers/11.jpg" },
  { songName: "Tu Jaane Na", filepath: "songs/12.mp3", coverpath: "covers/12.jpg" }
];

// Format duration
function formatTime(seconds) {
  let minutes = Math.floor(seconds / 60);
  let secs = Math.floor(seconds % 60);
  return `${minutes}:${secs < 10 ? '0' + secs : secs}`;
}

// Load song details into UI
songItems.forEach((element, i) => {
  element.getElementsByTagName("img")[0].src = songs[i].coverpath;
  element.getElementsByClassName("songName")[0].innerText = songs[i].songName;

  let tempAudio = new Audio(songs[i].filepath);
  tempAudio.addEventListener("loadedmetadata", () => {
    let duration = formatTime(tempAudio.duration);
    element.getElementsByClassName("timestamp")[0].innerHTML =
      `${duration} <i id="${i}" class="songPlayIcon fa-regular fa-play-circle"></i>`;
    
    attachClickHandlers(); // Reattach play icon handlers after duration is loaded
  });
});

// Reset all play icons
function resetAllPlays() {
  Array.from(document.getElementsByClassName('songPlayIcon')).forEach((icon) => {
    icon.classList.remove('fa-pause-circle');
    icon.classList.add('fa-play-circle');
  });
}

// Play selected song
function playSong(index) {
  resetAllPlays();
  audioElement.src = songs[index].filepath;
  audioElement.currentTime = 0;
  audioElement.play();
  gif.style.opacity = 1;
  masterPlay.classList.remove('fa-play-circle');
  masterPlay.classList.add('fa-pause-circle');
  currentSong.innerText = songs[index].songName;
  document.getElementById(index).classList.remove('fa-play-circle');
  document.getElementById(index).classList.add('fa-pause-circle');
  songIndex = index;
}

// Attach event listeners to song icons
function attachClickHandlers() {
  Array.from(document.getElementsByClassName('songPlayIcon')).forEach((element) => {
    element.addEventListener('click', (e) => {
      let index = parseInt(e.target.id);
      if (songIndex === index && !audioElement.paused) {
        audioElement.pause();
        gif.style.opacity = 0;
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        e.target.classList.remove('fa-pause-circle');
        e.target.classList.add('fa-play-circle');
      } else {
        playSong(index);
      }
    });
  });
}

// Master play/pause
masterPlay.addEventListener('click', () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    gif.style.opacity = 1;
    currentSong.innerText = songs[songIndex].songName;
    resetAllPlays();
    document.getElementById(songIndex).classList.remove('fa-play-circle');
    document.getElementById(songIndex).classList.add('fa-pause-circle');
  } else {
    audioElement.pause();
    masterPlay.classList.remove('fa-pause-circle');
    masterPlay.classList.add('fa-play-circle');
    gif.style.opacity = 0;
    resetAllPlays();
  }
});

// Update progress bar
audioElement.addEventListener('timeupdate', () => {
  let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
  myProgressBar.value = progress;
});

myProgressBar.addEventListener('change', () => {
  audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100;
});

// Next and previous buttons
nextBtn.addEventListener('click', () => {
  songIndex = (songIndex + 1) % songs.length;
  playSong(songIndex);
});

prevBtn.addEventListener('click', () => {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  playSong(songIndex);
});
