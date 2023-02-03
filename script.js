// get our elements 
const song = document.querySelector('.player');
const toggleBtn = document.querySelector('.toggle');
const loader = document.querySelector('.progress');
const loaderBar = document.querySelector('.progress-filled');
const skipButtons = document.querySelectorAll('[data-skip]');

//build out functions 
function toggleSong() {
  const player = document.querySelector("audio");
  if (player.paused) {
    player.play();
    player.autoplay = true;
  } else {
    player.pause();
  }
}

function updateBtn(){
  if(song.paused){
     toggleBtn.innerHTML = '<i class="fa fa-play fa-4x"></i>';
     }else{
     toggleBtn.innerHTML = '<i class="fa fa-pause fa-4x"></i>';
     }
}

function handleProgress(){
  loaderBar.style.flexBasis = ((song.currentTime / song.duration) * 100) + "%"; 
}

function scrub(event){
  const scrubTime = (event.offsetX / loader.offsetWidth) * song.duration;
  song.currentTime = scrubTime;
}

function skip(){
    song.currentTime = song.currentTime + parseFloat(this.dataset.skip);
}
//attach our functions to elements using event listeners
toggleBtn.addEventListener("click", toggleSong);
song.addEventListener("play", updateBtn);
song.addEventListener("pause", updateBtn);
song.addEventListener("timeupdate", handleProgress);

skipButtons.forEach(button => button.addEventListener("click", skip));

let mousedown = false;
loader.addEventListener("click", scrub);
loader.addEventListener("mousemove", (e) => mousedown && scrub(e));
loader.addEventListener("mousedown", () => mousedown = true);
loader.addEventListener("mouseup", () => mousedown = false);
