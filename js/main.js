//Definee a variables

let audio,
  playbtn,
  title,
  poster,
  artists,
  mutebtn,
  seekslider,
  volumeslider,
  seeking = false,
  seekto,
  curtimetext,
  durtimetxt,
  playlist_status,
  dir,
  playlist,
  ext,
  agent,
  playlist_artist,
  repeat,
  randomSong;

//Initialization of Array of Music, Title, poster Image, Artists

dir = "./music/";
playlist = [
  "BOm Diggy diggy",
  "cm1",
  "chotechotepeg",
  "DIl-Chori",
  "Hauli Hauli",
  "Kaun Nachdi",
  "Mere Liye tum Kaafi Ho",
  "Morni Banke",
  "Sauda Khara Khara",
  "Sweety Slowly Slowly",
  "Tung Tung Baje",
  "Vaddi sharaban",
];
title = [
  "BOm Diggy diggy",
  "Chandigrah Mein",
  "Chhote Chhote Peg",
  "DIl-Chori",
  "Hauli Hauli",
  "Kaun Nachdi",
  "Mere Liye tum Kaafi Ho",
  "Morni Banke",
  "Sauda Khara Khara",
  "Sweety Slowly Slowly",
  "Tung Tung Baje",
  "Vaddi sharaban",
];

artists = [
  "(Zack knight,Jasmin Walia) [Sonu ke Titu ki Sweety]",
  "(Badshah,Hardy Sandhu) [Good Newz]",
  "(yo yo Honey singh,Neha kakkar) [ Sonu ke Titu ki Sweety]",
  " (Simar kaur,yo yo Honey Singh)[Sonu ke Titu ki Sweety]",
  "(Garry Sandhu, Neha Kakkar),[De de Pyar De]",
  "(Guru Randhawa, Neeti Mohan),[Sonu ke Titu ki Sweety]",
  "(Ayushman Khurana),[Shubh Mangal Zyada Saavdhan]",
  "(Neha Kakkar,Guru Randhawa),[Badhaai ho]",
  "(Diljit Doshanj, Sukhbir,Dhavni Bhanushali),[Good Newz]",
  "(Mika Singh),[Sonu ke Titu ki Sweety]",
  "(Diljit Doshanj,Noora Sisters),[Singh is Bling]",
  "(Vipin patwa, Sunidhi Chuhan),[De De Pyar De]",
];
poster = [
  "images/img-1.jpg",
  "images/img-2.jpg",
  "images/img-3.jpg",
  "images/img-4.jpg",
  "images/img-5.jpg",
  "images/img-6.jpg",
  "images/img-7",
  "images/img-8",
  "images/img-9.jpg",
  "images/img-10.jpg",
  "images/img-11.jpg",
  "images/img-12.jpg",
];

//used on ron every browser
ext = ".mp3";
agent = navigator.userAgent.toLowerCase();
if (agent.indexOf("firefox") != -1 || agent.indexOf("opera") != -1) {
  ext = ".egg";
}

//set objects references
playbtn = document.getElementById("playpausebtn")
const nextbtn = document.getElementById("nextbtn")
prevbtn = document.getElementById("prevbtn")
mutebtn = document.getElementById("mutebtn");
seekslider = document.getElementById("seekslider");
volumeslider = document.getElementById("volumeslider");
curtimetext = document.getElementById("curtimetext");
durtimetext = document.getElementById("durtimeTxt");
playlist_status = document.getElementById("playlist_status");
playlist_artist = document.getElementById("playlist_artist");
repeat = document.getElementById("repeat");
randomSong = document.getElementById("random");

//Audio object
let playlist_index = 0;
audio = new Audio();
audio.setAttribute("src",dir + playlist[playlist_index] + ext)
audio.loop = false;

//first SOng Title and Artist
playlist_status.innerHTML = title[playlist_index];
playlist_artist.innerHTML = artists[playlist_index];

//Add Event Handling

playbtn.addEventListener("click", playpause);
nextbtn.addEventListener("click", nextSong);
prevbtn.addEventListener("click", prevSong);
mutebtn.addEventListener("click", mute);
seekslider.addEventListener("mousedown", function (event) {
  seeking = true;
});
seekslider.addEventListener("mousemove", function (event) {
  seek(event);
});
seekslider.addEventListener("mouseup", function () {
  seeking = false;
});
volumeslider.addEventListener("mousemove", setvolume);
// audio.addEventListener("timeupdate", function(){  seektimeupdate(); });
audio.addEventListener("ended", function () {
  switchTrack();
});
repeat.addEventListener("click", loop);
// console.log(randomSong)
randomSong.addEventListener("click", random);

//function
function fetchMusicDetails() {
  audio.setAttribute("src",dir + playlist[playlist_index] + ext) ;
  audio.play()
  
  // Poster Image Pause/Play Image

  $("#playpausebtn img").attr("src", "images/pause-red.png");
  $("#bgImage").attr("src",poster[playlist_index]);
  $("#image").attr("src", poster[playlist_index]);

  //title and Artist
  playlist_status.innerHTMl = title[playlist_index];
  playlist_artist.innerHTMl = artists[playlist_index];

}

function playpause(e) {
  console.log(audio.getAttribute("src"))
  if (audio.paused) {
    audio.play();
    document.querySelector('.playImg').setAttribute("src","images/pause-red.png")
  } else {
    audio.pause();
    document.querySelector('.playImg').setAttribute("src","images/play-red.png")
  }
}

document.querySelector('.play',function(e){
  console.log('btn click')
})

function nextSong(e) {
  audio.pause();
  playlist_index++;
  if (playlist_index > playlist.length - 1) {
    playlist_index = 0;
  }
  fetchMusicDetails();
}
function prevSong() {
  playlist_index--;
  if (playlist_index < 0) {
    playlist_index = playlist.length - 1;
  }
  fetchMusicDetails();
}
function mute() {
  if (audio.muted) {
    audio.muted = false;
    $("#mutebtn img").attr("src", "images/speaker.png");
  } else {
    audio.muted = true;
    $("#mutebtn img").attr("src", "images/mute.png");
  }
}
function seek(event) {
  if (audio.durations == 0) {
    null;
  } else {
    if (seeking) {
      seekslider.value = event.client - seekslider.offsetleft;
      seekto = audio.currentTime = seekto;
    }
  }
}
function setvolume() {
  if (audio.duration) {
    let nt = audio.currentTime * (100 / audio.duratio);
    seekslider.value = nt;
    var curmins = Math.floor(audio.currentTime / 60);
    var cursecs = Math.floor(audio.currentTime - curmins * 60);
    var durmins = Math.floor(audio.duration / 60);
    var dursecs = Math.floor(audio.duration - durmins * 60);
    if (cursecs < 10) {
      cursecs = "0" + cursecs;
    }
    if (dursecs < 10) {
      dursecs = "0" + dursecs;
    }
    if (curmins < 10) {
      curmins = "0" + curmins;
    }
    if (dursecs < 10) {
      dursecs = "0" + dursecs;
    }
  } else {
    curtimetext.innerHTML = "00" + ":" + "00";
    Durtimetext.innerHTML = "00" + ":" + "00";
  }
}
function switchTrack() {
  if (playlist_index == playlist.length - 1) {
    playlist_index = 0;
  } else {
    playlist_index++;
  }
  fetchMusicDetails();
}
function loop() {
  if (audio.loop) {
    audio.loop = false;
    $("#report img").attr("src", "images/rep.png");
  } else {
    audio.loop = true;
    $("#repeat img").attr("src", "images/rep1.png");
  }
}
function getRandomNumber(min, max) {
  let step1 = max - min + 1;
  let step2 = Math.random() * step1;
  let result = Math.floor(step2) + min;
  return result;
}
function random() {
  let randomIndex = getRandomNumber(0, playlist.length - 1);
  playlist_index = randomIndex;
  fetchMusicDetails();
}
