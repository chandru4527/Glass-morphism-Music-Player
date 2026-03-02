const musics = [
    {
        id: 1,
        img: "https://i.scdn.co/image/ab67616d0000b27361782ebf5b61ebf8856d26ff",
        artistname: "The Chinese song",
        songname: "The Untamed",
        src: "./musics/The untamed.mp4"
    },
    {
        id: 2,
        img: "https://a10.gaanacdn.com/gn_img/albums/kGxbn03y4r/xbnL8owl3y/size_m.jpg",
        artistname: "Zusebi",
        songname: "I Sleep Better",
        src: "./musics/I sleep better.mp4"
    },
    {
        id: 3,
        img: "https://i1.sndcdn.com/artworks-000199426975-6b0u2k-t500x500.jpg",
        artistname: "Sia",
        songname: "Cheap Thrills",
        src: "./musics/Cheap thrills.mp4"
    },
    {
        id: 4,
        img: "https://i1.sndcdn.com/artworks-hZECOy9bUCDfzWbI-Gy9TdQ-t500x500.jpg",
        artistname: "The Chinese song",
        songname: "Goddess of the Mountain",
        src: "./musics/Goddess of the mountain.mp4"
    },

]

// initial loading
const img = document.getElementById("songimg")
const song_name = document.getElementById("songname")
const artist = document.getElementById("artistname")
const audio = document.getElementById("audio")

// progress
const progress = document.getElementById("progress")
const currenttime = document.getElementById("currenttime")
const duration = document.getElementById("duration")

// controls
const volumeIcon = document.getElementById("volume");
const prevbtn = document.getElementById("prevbtn");
const playbtn = document.getElementById("playbtn");
const nextbtn = document.getElementById("nextbtn");
const shufflebtn = document.getElementById("shufflebtn");

let index = 0;
let isShuffle = false;
let isPlaying = false;

// playsong
const playsong = (i) => {
    const songs = musics[i];
    img.src = songs.img;
    artist.innerText = songs.artistname;
    song_name.innerText = songs.songname;
    audio.src = songs.src;
}

playsong(index);

// next btn
nextbtn.addEventListener("click", () => {
    if (isShuffle) {
        index = Math.floor(Math.random() * musics.length)
    } else {
        index = (index + 1) % musics.length;
    }

    playsong(index)


    if (isPlaying) {
        audio.play().catch(() => { })
    }
})

// prevbtn 
prevbtn.addEventListener("click", () => {
    index = (index - 1 + musics.length) % musics.length
    playsong(index);
    if (isPlaying) {
        audio.play().catch(() => { })
    }
})

// play / pause
playbtn.addEventListener("click", () => {
    if (!isPlaying) {
        audio.play().catch(() => { })
        playbtn.classList.replace("ri-play-fill", "ri-pause-fill");
        isPlaying = true;
    } else {
        audio.pause();
        playbtn.classList.replace("ri-pause-fill", "ri-play-fill")
        isPlaying = false;
    }
})

// shuffle 
shufflebtn.addEventListener("click", () => {
    isShuffle = !isShuffle
    shufflebtn.style.color = isShuffle ? "purple" : "white"
})

// mute
volumeIcon.addEventListener("click", () => {
    audio.muted = !audio.muted
    volumeIcon.classList = audio.muted ? "ri-volume-mute-fill" : "ri-volume-up-fill"
})

// audio time duration
audio.addEventListener("loadedmetadata", () => {
    progress.max = Math.floor(audio.duration)
    duration.innerText = formatTime(audio.duration)
})

// current time
audio.addEventListener("timeupdate", () => {
    progress.value = Math.floor(audio.currentTime);
    currenttime.innerText = formatTime(audio.currentTime)

    // progress bar color fill 
    const current = audio.currentTime;
    const total = audio.duration;

    const percent = (current / total) * 100;
     progress.style.background =
        `linear-gradient(to right, purple ${percent}%, rgba(255,255,255,0.2) ${percent}%)`;
})


// time farmating
const formatTime = (time) => {
    let minutes = Math.floor(time / 60)
    let seconds = Math.floor(time % 60)
    if (seconds < 10) seconds = "0" + seconds;

    return `${minutes}:${seconds}`
}

// music end
audio.addEventListener("ended", () => {
    nextbtn.click();
});
