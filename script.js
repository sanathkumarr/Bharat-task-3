// HTML elements
const localVideo = document.getElementById('local-video');
const remoteVideo = document.getElementById('remote-video');
const chatInput = document.getElementById('chat-input');
const chatMessages = document.getElementById('chat-messages');
const sendButton = document.getElementById('send-button');
const startVideoCallButton = document.getElementById('start-video-call');
const startAudioCallButton = document.getElementById('start-audio-call');
const startRecordingButton = document.getElementById('start-recording');
const stopRecordingButton = document.getElementById('stop-recording');
const stopButton = document.getElementById('stop-button'); // Stop audio or video

// Check if the browser supports MediaRecorder for video and audio recording
if ('MediaRecorder' in window) {
    let mediaRecorder;
    let videoChunks = [];
    let audioChunks = [];

    // Get the local video stream
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then((stream) => {
            // Display the user's video locally
            localVideo.srcObject = stream;
            mediaRecorder = new MediaRecorder(stream);

            // Event handler for recording
            mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    if (event.data.type === 'video/webm') {
                        videoChunks.push(event.data);
                    } else if (event.data.type === 'audio/wav') {
                        audioChunks.push(event.data);
                    }
                }
            };

            mediaRecorder.onstop = () => {
                // Create and display video and audio recordings
                const videoBlob = new Blob(videoChunks, { type: 'video/webm' });
                const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });

                // Create URLs for playback
                const videoUrl = URL.createObjectURL(videoBlob);
                const audioUrl = URL.createObjectURL(audioBlob);

                // Display the recorded video and audio
                const recordedVideo = document.createElement('video');
                recordedVideo.controls = true;
                recordedVideo.src = videoUrl;
                document.getElementById('video-container').appendChild(recordedVideo);

                const recordedAudio = document.createElement('audio');
                recordedAudio.controls = true;
                recordedAudio.src = audioUrl;
                document.getElementById('video-container').appendChild(recordedAudio);

                // Reset chunks
                videoChunks = [];
                audioChunks = [];
            };

            // Event handler for chat input and sending messages
            sendButton.addEventListener('click', () => {
                const message = chatInput.value;
                chatInput.value = '';
                chatMessages.innerHTML += `<div>You: ${message}`;
                
                // Send the message to other participants (requires actual server-side code)
            });
        });
}

// Event handler for starting a video call
startVideoCallButton.addEventListener('click', () => {
    // Display a pop-up message
    window.alert('Video call started.');

    // Implement video call initiation here
});
// Event handler for starting an audio call
startAudioCallButton.addEventListener('click', () => {
    // Display a pop-up message
    window.alert('Audio call started.');

    // Implement audio call initiation here
});



// Event handler for starting recording
startRecordingButton.addEventListener('click', () => {
    // Display a pop-up message
    window.alert('Recording started.');

    // Implement recording initiation here
});

// Event handler for stopping recording
stopRecordingButton.addEventListener('click', () => {
    // Display a pop-up message
    window.alert('Recording stopped.');

    // Implement the logic to stop the recording here
});

// Event handler for stopping audio or video
stopButton.addEventListener('click', () => {
    // Display a pop-up message
    window.alert('Call stopped.');

    // Implement the logic to stop the call here
});
