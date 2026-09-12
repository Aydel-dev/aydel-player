```javascript
// ===============================
// AYDEL PLAYER — V1
// ===============================

// Get elements from the HTML
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


// ===============================
// VARIABLES
// ===============================

let currentMedia = null;
let currentFile = null;


// ===============================
// OPEN FILE BUTTON
// ===============================

openButton.addEventListener("click", () => {
    fileInput.click();
});


// ===============================
// FILE SELECTED
// ===============================

fileInput.addEventListener("change", () => {

    const file = fileInput.files[0];

    if (!file) {
        return;
    }

    currentFile = file;

    const fileURL = URL.createObjectURL(file);

    const isVideo = file.type.startsWith("video/");
    const isAudio = file.type.startsWith("audio/");


    // -------------------------------
    // VIDEO
    // -------------------------------

    if (isVideo) {

        currentMedia = videoPlayer;

        audioPlayer.pause();

        videoPlayer.src = fileURL;

        videoPlayer.hidden = false;

        albumArt.hidden = true;

        trackName.textContent = file.name;

        trackType.textContent = "Video";

        videoPlayer.play();

        playButton.textContent = "❚❚";
    }


    // -------------------------------
    // AUDIO
    // -------------------------------

    else if (isAudio) {

        currentMedia = audioPlayer;

        videoPlayer.pause();

        videoPlayer.hidden = true;

        albumArt.hidden = false;

        audioPlayer.src = fileURL;

        trackName.textContent = file.name;

        trackType.textContent = "Audio";

        audioPlayer.play();

        playButton.textContent = "❚❚";
    }

});


// ===============================
// PLAY / PAUSE
// ===============================

playButton.addEventListener("click", () => {

    if (!currentMedia) {
        return;
    }


    if (currentMedia.paused) {

        currentMedia.play();

        playButton.textContent = "❚❚";

    } else {

        currentMedia.pause();

        playButton.textContent = "▶";

    }

});


// ===============================
// UPDATE PROGRESS
// ===============================

function updateProgress() {

    if (!currentMedia) {
        return;
    }

    const current = currentMedia.currentTime;
    const total = currentMedia.duration;


    if (!isNaN(total)) {

        progressBar.max = total;

        progressBar.value = current;

        currentTime.textContent = formatTime(current);

        duration.textContent = formatTime(total);

    }

}


// Update while playing

audioPlayer.addEventListener(
    "timeupdate",
    updateProgress
);

videoPlayer.addEventListener(
    "timeupdate",
    updateProgress
);


// ===============================
// SEEK
// ===============================

progressBar.addEventListener("input", () => {

    if (!currentMedia) {
        return;
    }

    currentMedia.currentTime = progressBar.value;

});


// ===============================
// VOLUME
// ===============================

volumeBar.addEventListener("input", () => {

    const volume = volumeBar.value;

    audioPlayer.volume = volume;

    videoPlayer.volume = volume;

});


// ===============================
// PLAYBACK ENDED
// ===============================

audioPlayer.addEventListener("ended", () => {

    playButton.textContent = "▶";

});

videoPlayer.addEventListener("ended", () => {

    playButton.textContent = "▶";

});


// ===============================
// PREVIOUS / NEXT
// ===============================

// V1 doesn't have playlists yet,
// so these buttons are placeholders.

previousButton.addEventListener("click", () => {

    if (!currentMedia) {
        return;
    }

    currentMedia.currentTime = 0;

});


nextButton.addEventListener("click", () => {

    if (!currentMedia) {
        return;
    }

    currentMedia.currentTime = currentMedia.duration;

});


// ===============================
// TIME FORMATTER
// ===============================

function formatTime(seconds) {

    if (isNaN(seconds)) {
        return "0:00";
    }

    const minutes = Math.floor(seconds / 60);

    const remainingSeconds =
        Math.floor(seconds % 60)
        .toString()
        .padStart(2, "0");

    return `${minutes}:${remainingSeconds}`;
}
```
