let mediaObj = [{
        cover: "/assets/images/covers/ayshani.jpg",
        music: "/assets/music/9oclock.mp3",
        artist: "Ayshani",
        track: "9 O'Clock",
        actioned: false,
        like: false
    },
    {
        cover: "/assets/images/covers/majical.jpg",
        music: "/assets/music/downtown.mp3",
        artist: "Majical Cloudz",
        track: "Downtown",
        actioned: false,
        like: false
    },
    {
        cover: "/assets/images/covers/theheavy.jpg",
        music: "/assets/music/shortchange.mp3",
        artist: "The Heavy",
        track: "Short Change Hero",
        actioned: false,
        like: false
    },
    {
        cover: "/assets/images/covers/unnamed.jpg",
        music: "/assets/music/dontthinktwice.mp3",
        artist: "Post Malone",
        track: "Don't Think Twice",
        actioned: false,
        like: false
    }
]

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