var mediaRecorder;
var recordedChucks = [];

var recordButton = document.getElementById("recordButton");
var stopButton = document.getElementById("stopButton");
var pauseButton = document.getElementById("pauseButton");

$("#record-btn").on("click", () => {
    startRecording();
});
$("#pause-btn").on("click", () => {
    pauseRecording()
});
$("#stop-btn").on("click", () => {
    stopRecording()
});

function startRecording() {
    const constraints = { audio: true, video:false }
    navigator.mediaDevices.getUserMedia({
            audio: true
        }).then(mediaStream => {
            mediaRecorder = new MediaRecorder(mediaStream);
            console.log(mediaRecorder.state);

            setMediaRecorder();
            mediaRecorder.start();

            $("#record-status").text("recording");
            $('#record-status').css("color", "blue");
            $("#record-btn").prop('disabled', true);
            $("#pause-btn").prop('disabled', false);
            $("#stop-btn").prop('disabled', false);
            console.log(mediaRecorder.state);

        }).catch(function (error) {
            console.log(error);
    });
}

function pauseRecording() {
    if (mediaRecorder.state === "recording") {
        mediaRecorder.pause();
        $('#record-status').css("color", "gray");
        $("#record-status").text("pause");
        $('#pause-btn').text("resume");
    } else if (mediaRecorder.state === "paused") {
        mediaRecorder.resume();
        $('#record-status').css("color", "blue");
        $("#record-status").text("recording");
        $('#pause-btn').text("pause");
    }

    console.log(mediaRecorder.state);
}

function stopRecording() {
    mediaRecorder.stop();
    console.log(mediaRecorder.state);
    $("#record-status").text("stop");
    $("#record-status").css("color", "red");
    $("#record-btn").prop('disabled', false);
    $("#stop-btn").prop('disabled', true);
    $("#pause-btn").prop('disabled', true);
}

function setMediaRecorder() {
    mediaRecorder.ondataavailable = function(e) {
        console.log(e);
        if (e.data.size > 0) {
            recordedChucks.push(e.data);
        }
        var blob = new Blob(recordedChucks, {
            type: "video/webm"
          });
        var audioURL = URL.createObjectURL(blob);
        // var audioURL = window.URL.createObjectURL(e.data);
        console.log(audioURL);
        $("audio").attr("src", audioURL);
    }
}