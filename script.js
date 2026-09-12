const fileInput = document.getElementById("fileInput");
const openButton = document.getElementById("openButton");

const audioPlayer = document.getElementById("audioPlayer");
const videoPlayer = document.getElementById("videoPlayer");

const albumArt = document.getElementById("albumArt");

const playButton = document.getElementById("playButton");
const previousButton = document.getElementById("previousButton");
const nextButton = document.getElementById("nextButton");

const progressBar = document.getElementById("progressBar");
const volumeBar = document.getElementById("volumeBar");

const trackName = document.getElementById("trackName");
const trackType = document.getElementById("trackType");

const currentTime = document.getElementById("currentTime");
const duration = document.getElementById("duration");

const sideTrackName = document.getElementById("sideTrackName");
const sideTrackType = document.getElementById("sideTrackType");

const infoType = document.getElementById("infoType");
const infoStatus = document.getElementById("infoStatus");

const clockTime = document.getElementById("clockTime");
const clockDate = document.getElementById("clockDate");

let currentMedia = null;


/* =========================
   OPEN MEDIA
========================= */

openButton.addEventListener("click", () => {
    fileInput.click();
});


/* =========================
   FILE SELECTION
========================= */

fileInput.addEventListener("change", () => {

    const file = fileInput.files[0];

    if (!file) {
        return;
    }

    const fileURL = URL.createObjectURL(file);

    trackName.textContent = file.name;
    sideTrackName.textContent = file.name;

    infoStatus.textContent = "Loading";


    /* VIDEO */

    if (file.type.startsWith("video/")) {

        currentMedia = videoPlayer;

        audioPlayer.pause();

        videoPlayer.src = fileURL;
        videoPlayer.hidden = false;

        albumArt.hidden = true;

        trackType.textContent = "Video";
        sideTrackType.textContent = "Video";
        infoType.textContent = "Video";

        videoPlayer.play()
            .then(() => {
                playButton.textContent = "❚❚";
                infoStatus.textContent = "Playing";
            })
            .catch(() => {
                playButton.textContent = "▶";
                infoStatus.textContent = "Ready";
            });

    }


    /* AUDIO */

    else if (file.type.startsWith("audio/")) {

        currentMedia = audioPlayer;

        videoPlayer.pause();

        videoPlayer.hidden = true;
        albumArt.hidden = false;

        audioPlayer.src = fileURL;

        trackType.textContent = "Audio";
        sideTrackType.textContent = "Audio";
        infoType.textContent = "Audio";

        audioPlayer.play()
            .then(() => {
                playButton.textContent = "❚❚";
                infoStatus.textContent = "Playing";
            })
            .catch(() => {
                playButton.textContent = "▶";
                infoStatus.textContent = "Ready";
            });

    }

    else {

        infoStatus.textContent = "Unsupported file";
    }

});


/* =========================
   PLAY / PAUSE
========================= */

playButton.addEventListener("click", () => {

    if (!currentMedia) {
        return;
    }

    if (currentMedia.paused) {

        currentMedia.play();

        playButton.textContent = "❚❚";
        infoStatus.textContent = "Playing";

    } else {

        currentMedia.pause();

        playButton.textContent = "▶";
        infoStatus.textContent = "Paused";
    }

});


/* =========================
   PROGRESS
========================= */

function updateProgress() {

    if (!currentMedia) {
        return;
    }

    if (!isNaN(currentMedia.duration)) {

        progressBar.max = currentMedia.duration;
        progressBar.value = currentMedia.currentTime;

        currentTime.textContent =
            formatTime(currentMedia.currentTime);

        duration.textContent =
            formatTime(currentMedia.duration);
    }
}

audioPlayer.addEventListener("timeupdate", updateProgress);
videoPlayer.addEventListener("timeupdate", updateProgress);


/* =========================
   SEEK
========================= */

progressBar.addEventListener("input", () => {

    if (currentMedia) {
        currentMedia.currentTime = progressBar.value;
    }

});


/* =========================
   VOLUME
========================= */

volumeBar.addEventListener("input", () => {

    audioPlayer.volume = volumeBar.value;
    videoPlayer.volume = volumeBar.value;

});


/* =========================
   PREVIOUS
========================= */

previousButton.addEventListener("click", () => {

    if (!currentMedia) {
        return;
    }

    currentMedia.currentTime = 0;

});


/* =========================
   NEXT
========================= */

nextButton.addEventListener("click", () => {

    if (!currentMedia) {
        return;
    }

    if (!isNaN(currentMedia.duration)) {
        currentMedia.currentTime = currentMedia.duration;
    }

});


/* =========================
   MEDIA ENDED
========================= */

audioPlayer.addEventListener("ended", () => {

    playButton.textContent = "▶";
    infoStatus.textContent = "Finished";

});

videoPlayer.addEventListener("ended", () => {

    playButton.textContent = "▶";
    infoStatus.textContent = "Finished";

});


/* =========================
   CLOCK
========================= */

function updateClock() {

    const now = new Date();

    const time = now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
    });

    const date = now.toLocaleDateString([], {
        weekday: "long",
        day: "numeric",
        month: "short"
    });

    clockTime.textContent = time;
    clockDate.textContent = date;
}

updateClock();

setInterval(updateClock, 1000);


/* =========================
   TIME FORMAT
========================= */

function formatTime(seconds) {

    if (isNaN(seconds)) {
        return "0:00";
    }

    const minutes = Math.floor(seconds / 60);

    const secondsPart = Math.floor(seconds % 60)
        .toString()
        .padStart(2, "0");

    return minutes + ":" + secondsPart;
}
