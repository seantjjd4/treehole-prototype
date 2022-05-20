var input;
var rec;
var mediaRecorder;

window.AudioContext = window.AudioContext || window.webkitAudioContext;
navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;

var AudioContext = window.AudioContext || window.webkitAudioContext;
var audioContext; //  audio data

var recordButton = document.getElementById("recordButton");
var stopButton = document.getElementById("stopButton");
var pauseButton = document.getElementById("pauseButton");

$("#record-btn").on("click", () => {
    $("#stop-btn").prop('disabled', false);
    startRecording();
});
$("#pause-btn").on("click", () => {
    stopRecording()
});
$("#stop-btn").on("click", () => {
    stopRecording()
});

var constraints = { audio: true, video:false }
navigator.mediaDevices.getUserMedia({
        audio: true
    }).then(mediaStream => {
        // console.log(mediaStream);

        // audioContext = new AudioContext();
        // $("#record-status").val("recording");
        // input = audioContext.createMediaStreamSource(mediaStream);
        // console.log("success")
        mediaRecorder = new MediaRecorder(mediaStream);
        console.log(mediaRecorder.state);
    }).catch(function (error) {
        console.log(error);
});

function startRecording() {
    setMediaRecorderOnStop();
    mediaRecorder.start();
    $("#record-status").text("recording");
    console.log(mediaRecorder.state);
    console.log(mediaRecorder);
}

function stopRecording() {
    mediaRecorder.stop();
    console.log(mediaRecorder.state);
    $("#record-status").text("stop");
}

function setMediaRecorderOnStop() {
    mediaRecorder.onstop = function(e) {
        console.log("recorder stopped");
        var audioURL = window.URL.createObjectURL(e.data);
        $("audio").attr("src", audioURL);
    }
}