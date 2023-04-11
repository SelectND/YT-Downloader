const urlInput = document.getElementById('video-url');
const submitButton = document.getElementById('submit');

let submitUrl = (url) => {
    window.location.href = `http://127.0.0.1:3000/download?url=${url}`;
} 

submitButton.addEventListener('click', () => {
    console.log(`Entered URL: ${urlInput.value}`);
    submitUrl(urlInput.value);
});