function insertVideoWithGif() {
    if (document.getElementById('webcamContainer')) return;

    const container = document.createElement('div');
    container.id = 'webcamContainer';
    container.style.width = '200px';
    container.style.position = 'fixed';
    container.style.bottom = '10px';
    container.style.left = '10px';
    container.style.zIndex = '9999';

    const video = document.createElement('video');
    video.id = 'webcamFeed';
    video.style.width = '100%';
    video.style.height = '200px';
    video.style.zIndex = '1';
    video.style.borderRadius = '50%';
    video.style.overflow = 'hidden';
    video.autoplay = true;

    const gif = document.createElement('img');
    gif.id = 'overlayGif';
    gif.style.width = '25%';
    gif.style.height = 'auto';
    gif.style.zIndex = '2';
    gif.style.display = 'block';
    gif.src = chrome.runtime.getURL('assets/SIRI_FINAL.gif');

    container.appendChild(gif);
    container.appendChild(video);

    document.body.appendChild(container);

    navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
            video.srcObject = stream;
            video.play();
        })
        .catch(error => {
            console.error("Error accessing the webcam.", error);
        });
}

insertVideoWithGif();
function dissolveAndRemove(element) {
    if (element) {
        element.classList.add('dissolve-out');
        element.style.opacity = '0';

        element.addEventListener('transitionend', () => {
            element.remove();
        });
    }
}

function filterStackOverflowContent() {
    dissolveAndRemove(document.querySelector("#header"));
    dissolveAndRemove(document.querySelector("#left-sidebar"));
    dissolveAndRemove(document.querySelector("#right-sidebar"));
    dissolveAndRemove(document.querySelector("#footer"));

    document.querySelectorAll('.post-layout--right.js-post-comments-component').forEach(dissolveAndRemove);


    dissolveAndRemove(document.querySelector("#post-form"));

    document.querySelectorAll('.ps-relative').forEach(dissolveAndRemove);
    document.querySelectorAll('.module.sidebar-linked').forEach(dissolveAndRemove);
    document.querySelectorAll('.bottom-notice').forEach(dissolveAndRemove);
    dissolveAndRemove(document.querySelector('#sidebar'));

    const answersContainer = document.querySelector("#answers");
    if (answersContainer) {
        const answers = answersContainer.querySelectorAll('div[id^="answer-"]');
        answers.forEach((answer, index) => {
            if (index !== 0) {
                dissolveAndRemove(answer);
            }
        });
    }
    const question = document.querySelector(".question");
    if (question) {
        question.style.display = 'block';
    }

}