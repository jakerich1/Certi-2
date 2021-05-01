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

//Audio control logic
const audio = document.getElementById('myAudio')
const playbtn = document.querySelector('#play')
const pausebtn = document.querySelector('#pause')
const scrubArea = document.querySelector('.scrubArea')
const scrubBar = document.querySelector('.scrubTop')
pausebtn.style.display = "none"

function playAudio() { 
    audio.play(); 
    playbtn.style.display = "none"
    pausebtn.style.display = "inline-block"
    playbtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-player-play" width="24" height="24"viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round"stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M7 4v16l13 -8z"></path></svg>'
} 

function pauseAudio() { 
    audio.pause(); 
    pausebtn.style.display = "none"
    playbtn.style.display = "inline-block"
} 

function scrubClick(event){
    let x = event.pageX - this.offsetLeft 
    let scubWidth = scrubArea.clientWidth
    let percentage = x/scubWidth
    audio.currentTime = audio.duration * percentage
}

playbtn.addEventListener("click", playAudio)
pausebtn.addEventListener("click", pauseAudio)
audio.onended = function() {
    pausebtn.style.display = "none"
    playbtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-repeat" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M4 12v-3a3 3 0 0 1 3 -3h13m-3 -3l3 3l-3 3"></path><path d="M20 12v3a3 3 0 0 1 -3 3h-13m3 3l-3 -3l3 -3"></path></svg>'
    playbtn.style.display = "inline-block"
};
audio.ontimeupdate = function() {
    let progress = (audio.currentTime/audio.duration)*100
    console.log(progress)
    scrubBar.style.width = `${progress}%`
};
scrubArea.addEventListener("click", scrubClick)

//
const position = {
    x: 0,
    y: 0
}

const screenWidth = window.innerWidth

interact('.draggable').draggable({
    listeners: {
        start(event) {
            event.target.style.transition = "unset"
        },
        move(event) {
            let rotateDeg = (position.x/screenWidth)*30;
            position.x += event.dx
            position.y += event.dy

            event.target.style.transform = `translate(${position.x}px, ${position.y}px) rotate(${rotateDeg}deg)`
            
        },
        end(event) {
            event.target.style.transition = "all 0.3s ease-in-out"
            event.target.style.transform =
                `translate(0px, 0px)`
            position.x = 0
            position.y = 0
            document.body.style.overflow = `visible`
        }
    }
})