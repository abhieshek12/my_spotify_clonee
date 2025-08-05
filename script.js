let songs = []
let currentSong = new Audio(); 
let currentLi  = null 

async function getSongs () {
  let sngs = []
  let a = fetch("http://127.0.0.1:3000/songs/")
  let response = (await a).text() 
  let div = document.createElement("div") 
  div.innerHTML = await response 

  let as = div.querySelectorAll("a") 
  as.forEach(a => {
    if (a.href.endsWith(".mp3")) {
      let song = a.href
      sngs.push(song)
    }
  })
  return sngs
} 
function convToMinSec(seconds) {
    seconds = Math.floor(seconds); 
    let mins = Math.floor(seconds / 60);
    let secs = seconds % 60;

   
    mins = mins.toString().padStart(2, '0');
    secs = secs.toString().padStart(2, '0');

    return `${mins}:${secs}`;
}
async function main() {
  songs = await getSongs() 
  currentSong.src = "songs/" + songs[0].split("songs/")[1]
 
  
  document.querySelector(".songInfo h3").innerText = songs[0]
    .split("songs/")[1]
    .replace(".mp3", "")
    .replaceAll(/%20/g, "")

  let songList = document.querySelector(".songList ul")
  songs.forEach(song => {
    let realName = "songs/" + song.split("songs/")[1]
    let psudoName = song.split("songs/")[1].replace(/%20/g, "").replace(".mp3", "")
    
    songList.innerHTML += `<li data-src=${realName}>
      <div class="immg">
        <img src="imges/songg.svg" alt="" width="35"> 
      </div>
      <div class="sgn">
        <h4>${psudoName}</h4>
      </div>   
      <div class="plnw">
        <h4>play now</h4>
        <img src="imges/pl.svg" alt="">
      </div>
    </li>`
  })

  currentLi = document.querySelector(".songList ul li");
  Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e => {
    e.addEventListener("click", () => {
      let ad = e.getAttribute("data-src")
      currentSong.src = ad
      
      currentSong.play() 
      playy.src = "imges/pause.svg"

      currentLi.querySelector(".plnw img").src = "imges/pl.svg"
      currentLi.querySelector(".plnw h4").innerText = "play now"
      currentLi.style.backgroundColor = ""

      currentLi = e  
      currentLi.querySelector(".plnw img").src = "imges/pauss.svg"
      currentLi.querySelector(".plnw h4").innerText = "playing"
      currentLi.style.backgroundColor = "rgba(48, 46, 46, 1)"

      document.querySelector(".songInfo h3").innerText = ad
        .replace(".mp3", "")
        .replaceAll(/%20/g, "")
        .replace("songs/" , "")
    })
  }) 

  playy.addEventListener("click", () => {
    if (currentSong.paused) {
      currentLi.querySelector(".plnw img").src = "imges/pauss.svg"
      currentLi.querySelector(".plnw h4").innerText = "playing" 
      currentSong.play() 
        currentLi.style.backgroundColor = "rgba(48, 46, 46, 1)"
      playy.src = "imges/pause.svg"
    } else {
      currentLi.querySelector(".plnw img").src = "imges/pl.svg"
      currentLi.querySelector(".plnw h4").innerText = "play now"
      currentSong.pause()
      playy.src = "imges/play.svg"
    }
  }) 

  nextt.addEventListener("click", () => {
    let a = 1
    if (currentSong.paused) a = 0 

    currentLi.querySelector(".plnw img").src = "imges/pl.svg"
    currentLi.querySelector(".plnw h4").innerText = "play now"
    currentLi.style.backgroundColor = ""

    if (currentLi.nextElementSibling != null) {
      currentLi = currentLi.nextElementSibling 
    } else {
      currentLi = document.querySelector(".songList ul li")
    }

    currentLi.style.backgroundColor = "rgba(48, 46, 46, 1)"
    currentSong.src = currentLi.getAttribute("data-src")
    document.querySelector(".songInfo h3").innerText = currentLi.getAttribute("data-src")
      .replace(".mp3", "")
      .replaceAll(/%20/g, "")
      .replace("songs/","")

    if (a == 1) {
      currentSong.play()
      currentLi.querySelector(".plnw img").src = "imges/pauss.svg"
      currentLi.querySelector(".plnw h4").innerText = "playing" 
    }
  })

  prev.addEventListener("click", () => {
    let a = 1
    if (currentSong.paused) a = 0 

    currentLi.querySelector(".plnw img").src = "imges/pl.svg"
    currentLi.querySelector(".plnw h4").innerText = "play now"
    currentLi.style.backgroundColor = ""

    if (currentLi.previousElementSibling != null) {
      currentLi = currentLi.previousElementSibling
    } else {
      currentLi = document.querySelector(".songList ul li:last-child")
    }

    currentLi.style.backgroundColor = "rgba(48, 46, 46, 1)"
    currentSong.src = currentLi.getAttribute("data-src")
    document.querySelector(".songInfo h3").innerText = currentLi.getAttribute("data-src")
      .replace(".mp3", "")
      .replaceAll(/%20/g, "")
        .replace("songs/","")

    if (a == 1) {
      currentSong.play()
      currentLi.querySelector(".plnw img").src = "imges/pauss.svg"
      currentLi.querySelector(".plnw h4").innerText = "playing" 
    }
  })
  
  currentSong.addEventListener("timeupdate" , () => {
     if(currentSong.duration == currentSong.currentTime) {
         currentLi.querySelector(".plnw img").src = "imges/pl.svg"
    currentLi.querySelector(".plnw h4").innerText = "play now"
    currentLi.style.backgroundColor = ""

    if (currentLi.nextElementSibling != null) {
      currentLi = currentLi.nextElementSibling 
    } else {
      currentLi = document.querySelector(".songList ul li")
    }

    currentLi.style.backgroundColor = "rgba(48, 46, 46, 1)"
    currentSong.src = currentLi.getAttribute("data-src")
    document.querySelector(".songInfo h3").innerText = currentLi.getAttribute("data-src")
      .replace(".mp3", "")
      .replaceAll(/%20/g, "")
      .replace("songs/","")
     currentSong.play()
      currentLi.querySelector(".plnw img").src = "imges/pauss.svg"
      currentLi.querySelector(".plnw h4").innerText = "playing" 
    }
    
    document.querySelector(".tm h3").innerText = `${convToMinSec(currentSong.currentTime)} / ${convToMinSec(currentSong.duration)}` 
    document.querySelector(".circ").style.left = (( currentSong.currentTime / currentSong.duration) * 100 ) + "%" 
    document.querySelector(".ele").style.width = (( currentSong.currentTime / currentSong.duration) * 100 ) + "%" 
  })
    document.querySelector(".seekbar").addEventListener("click" , (e) => {
          let tarPr = (e.offsetX / e.target.getBoundingClientRect().width ) *100 
          document.querySelector(".circ").style.left = tarPr + "%"
          document.querySelector(".ele").style.width = tarPr + "%"
          currentSong.currentTime = ( currentSong.duration * tarPr) / 100 
    })
  let sl = document.querySelector(".songList ul").children

   let crd=  document.querySelector(".cardContainer").children
    console.log(sl[0])
   console.log(crd[0])
    
   for (let i = 0 ; i < crd.length ; i ++) {
    crd[i].addEventListener("click" , () =>{
   
    
      currentLi.querySelector(".plnw img").src = "imges/pl.svg"
    currentLi.querySelector(".plnw h4").innerText = "play now"
    currentLi.style.backgroundColor = ""
     
   currentLi = sl[i] 
      currentLi.querySelector(".plnw img").src = "imges/pauss.svg"
      currentLi.querySelector(".plnw h4").innerText = "playing"
      currentLi.style.backgroundColor = "rgba(48, 46, 46, 1)"

      document.querySelector(".songInfo h3").innerText =  sl[i].getAttribute("data-src").split("songs/")[1]
        .replace(".mp3", "")
        .replaceAll(/%20/g, "")
        .replace("songs/" , "")


      currentSong.src = sl[i].getAttribute("data-src") 
      currentSong.play() 
       playy.src = "imges/pause.svg"
    })
   }
      
} 

main()
function fun() {
   ham.addEventListener("click" , () => {
    document.querySelector(".left").style.left = "0%" 
   })
   cross.addEventListener("click" , () => {
    document.querySelector(".left").style.left = "-120%" 
   })

}

fun() 
  
