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

let currentMedia = null;


// OPEN MEDIA
openButton.addEventListener("click", function () {
    fileInput.click();
});


// FILE SELECTED
fileInput.addEventListener("change", function () {

    const file = fileInput.files[0];

    if (!file) {
        return;
    }

    const fileURL = URL.createObjectURL(file);

    if (file.type.startsWith("video/")) {

        currentMedia = videoPlayer;

        audioPlayer.pause();

        videoPlayer.src = fileURL;
        videoPlayer.hidden = false;

        albumArt.hidden = true;

        trackName.textContent = file.name;
        trackType.textContent = "Video";

        videoPlayer.play();

        playButton.textContent = "❚❚";

    } else if (file.type.startsWith("audio/")) {

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


// PLAY / PAUSE
playButton.addEventListener("click", function () {

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


// PROGRESS
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


// SEEK
progressBar.addEventListener("input", function () {

    if (currentMedia) {
        currentMedia.currentTime = progressBar.value;
    }

});


// VOLUME
volumeBar.addEventListener("input", function () {

    audioPlayer.volume = volumeBar.value;
    videoPlayer.volume = volumeBar.value;

});


// ENDED
audioPlayer.addEventListener("ended", function () {
    playButton.textContent = "▶";
});

videoPlayer.addEventListener("ended", function () {
    playButton.textContent = "▶";
});


// PREVIOUS
previousButton.addEventListener("click", function () {

    if (currentMedia) {
        currentMedia.currentTime = 0;
    }

});


// NEXT
nextButton.addEventListener("click", function () {

    if (currentMedia) {
        currentMedia.currentTime = currentMedia.duration;
    }

});


// TIME FORMAT
function formatTime(seconds) {

    if (isNaN(seconds)) {
        return "0:00";
    }

    const minutes = Math.floor(seconds / 60);

    const secondsPart =
        Math.floor(seconds % 60)
        .toString()
        .padStart(2, "0");

    return minutes + ":" + secondsPart;
}
