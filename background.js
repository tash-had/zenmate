const AZURE_ENDPOINT = 'xxxx/face/v1.0/detect';
const AZURE_KEY = 'xxxxx';
let videoStream = null;

navigator.mediaDevices.getUserMedia({ video: true })
  .then(stream => {
    videoStream = stream;
    const video = document.createElement('video');
    video.srcObject = stream;
    video.play();

    setInterval(() => {
      analyzeFrame(video);
    }, 3000);
  });

// Send video frame to Azure and check for confusion
function analyzeFrame(video) {
  const canvas = document.createElement('canvas');
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  const context = canvas.getContext('2d');
  context.drawImage(video, 0, 0, canvas.width, canvas.height);
  const imageData = canvas.toDataURL('image/jpeg');

  fetch(AZURE_ENDPOINT, {
    method: 'POST',
    body: JSON.stringify({ url: imageData }),
    headers: {
      'Content-Type': 'application/json',
      'Ocp-Apim-Subscription-Key': AZURE_KEY
    }
  })
  .then(response => response.json())
  .then(data => {
    if (data && data[0] && data[0].faceAttributes && data[0].faceAttributes.emotion && data[0].faceAttributes.emotion.confusion > 0.5) {
      chrome.tabs.executeScript({ file: 'content.js' });
    }
  });
}
