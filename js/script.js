//placeholder data
let mediaObj = [{
        cover: "./assets/images/covers/ayshani.jpg",
        music: "./assets/music/9oclock.mp3",
        artist: "Ayshani",
        track: "9 O'Clock",
        actioned: false,
        like: false
    },
    {
        cover: "./assets/images/covers/majical.jpg",
        music: "./assets/music/downtown.mp3",
        artist: "Majical Cloudz",
        track: "Downtown",
        actioned: false,
        like: false
    },
    {
        cover: "./assets/images/covers/theheavy.jpg",
        music: "./assets/music/shortchange.mp3",
        artist: "The Heavy",
        track: "Short Change Hero",
        actioned: false,
        like: false
    },
    {
        cover: "./assets/images/covers/unnamed.jpg",
        music: "./assets/music/dontthinktwice.mp3",
        artist: "Post Malone",
        track: "Don't Think Twice",
        actioned: false,
        like: false
    }
]

const coverArea = document.querySelector('#cover-area')
const cover = document.querySelector('#cover')
const gradient = document.querySelector('#gradient')
const audio = document.querySelector('#myAudio')
const playbtn = document.querySelector('#play')
const pausebtn = document.querySelector('#pause')
pausebtn.style.display = "none"
const scrubArea = document.querySelector('.scrubArea')
const scrubBar = document.querySelector('.scrubTop')
const botNav = document.querySelector('.botNav')
const position = {
    x: 0,
    y: 0
}
const screenWidth = window.innerWidth
let currentTrack = 0

//initialize content
setTrack(currentTrack)

//Set content
function setTrack(mediaKey) {
    currentTrack = mediaKey
    if (!mediaObj[currentTrack]) {
        currentTrack = 0
    }
    scrubBar.style.width = "0"
    pauseAudio()
    cover.src = mediaObj[currentTrack].cover
    audio.src = mediaObj[currentTrack].music
}

//audio control functions
function playAudio() {
    audio.play();
    playbtn.style.display = "none"
    pausebtn.style.display = "block"
    playbtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-player-play" width="24" height="24"viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round"stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M7 4v16l13 -8z"></path></svg>'
}
//pause music
function pauseAudio() {
    audio.pause();
    pausebtn.style.display = "none"
    playbtn.style.display = "block"
}
//scrub through music
function scrubClick(event) {
    let x = event.pageX - this.offsetLeft
    let scubWidth = scrubArea.clientWidth
    let percentage = x / scubWidth
    audio.currentTime = audio.duration * percentage
}
//audio events
playbtn.addEventListener("click", playAudio)
pausebtn.addEventListener("click", pauseAudio)
scrubArea.addEventListener("click", scrubClick)

audio.onended = function () {
    pausebtn.style.display = "none"
    playbtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-repeat" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M4 12v-3a3 3 0 0 1 3 -3h13m-3 -3l3 3l-3 3"></path><path d="M20 12v3a3 3 0 0 1 -3 3h-13m3 3l-3 -3l3 -3"></path></svg>'
    playbtn.style.display = "inline-block"
}

audio.ontimeupdate = function () {
    let progress = (audio.currentTime / audio.duration) * 100
    scrubBar.style.width = `${progress}%`
}

interact('.draggable').draggable({
    listeners: {
        start(event) {
            event.target.style.transition = "unset"
        },
        move(event) {
            if (position.x > 0) {
                gradient.classList.add("gradient-good")
                gradient.classList.remove("gradient-bad")
                gradient.style.display = "inline-block"
                gradient.style.opacity = position.x / screenWidth

            } else if (position.x < 0) {
                gradient.classList.add("gradient-bad")
                gradient.classList.remove("gradient-good")
                gradient.style.display = "inline-block"
                gradient.style.opacity = (position.x / screenWidth) * -1
            }
            let rotateDeg = (position.x / screenWidth) * 20;
            position.x += event.dx
            position.y += event.dy
            event.target.style.transform = `translate(${position.x}px, ${position.y}px) rotate(${rotateDeg}deg)`
        },
        end(event) {

            if (position.x > (screenWidth / 2)) {

                event.target.style.transition = "all 0.1s ease-in-out"
                event.target.style.transform = `translate(${screenWidth*2}px, 0px)`   
                next()

            } else if (position.x < (0 - (screenWidth / 2.65))) {

                event.target.style.transition = "all 0.1s ease-in-out"
                event.target.style.transform = `translate(-${screenWidth*2}px, 0px)`
                next()

            } else {
                
                event.target.style.transition = "all 0.3s ease-in-out"
                event.target.style.transform = `translate(0px, 0px)`

            }

            gradient.style.display = "none"
            position.x = 0
            position.y = 0
            document.body.style.overflow = `visible`


            function next() {
                setTrack(currentTrack+1)
                setTimeout(function() {
                    coverArea.style.transition = "all 0s ease-in-out"
                    coverArea.style.opacity = `0`
                    coverArea.style.transform = `translate(0px, 0px)`
                }, 100);
                
                setTimeout(function() {
                    coverArea.style.transition = "all 0.3s ease-in-out"
                    coverArea.style.opacity = `1`
                }, 200);

            }


        }
    }
})