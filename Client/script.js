const videoURL = document.getElementById('video-url');
const playlistURL = document.getElementById('playlist-url');
const submitVideoButton = document.getElementById('submit-video');
const submitPlaylistButton = document.getElementById('submit-playlist');

let submitVideo = (url) => {
    window.location.href = `http://127.0.0.1:3000/download?url=${url}`;
}

let dl = async (video, name) => {
    await fetch(`http://127.0.0.1:3000/download?url=${video}`).then(res => res.blob())
    .then(data => {
      var a = document.createElement("a");
      a.href = window.URL.createObjectURL(data);
      a.download = name;
      a.click();
    });
}

let submitPlaylist = async (url) => {
    let resp = await fetch(`http://127.0.0.1:3000/playlist?url=${url}`, {method: 'GET'}).then(response => response.json());
    let playlistLen = resp.playlistLen;
    let videos = resp.URLs;
    let names = resp.Names;
    console.log(videos);
    for (let i = 0; i < playlistLen; i++) {
        console.log(videos[i], `${names[i]}.mp3`);
        dl(videos[i], `${names[i]}.mp3`);
    }
}
submitVideoButton.addEventListener('click', () => {
    submitVideo(videoURL.value);
});

submitPlaylistButton.addEventListener('click', () => {
    submitPlaylist(playlistURL.value);
})
