/********************************************
    GLOBAL VARIABLES
********************************************/
const loader = document.getElementById('loader-container');
let count = 4;
let skip = 0;
let dataArray = [];

let isReady = false;
let videosLoaded = 0;
let totalVideos = 0;



/********************************************
    FUNCTIONS
********************************************/
function handleOnLoadVideo() {
    videosLoaded++;
    console.log(videosLoaded, 'vs', totalVideos)
    if (videosLoaded === totalVideos) {
        isReady = true;
        loader.hidden = true;
    } 
}

async function getVideosFromAPI() {
    const urlBase = 'https://scrapiapi.herokuapp.com/' 
    const apiPoint = 'videos';
    const limit = '&_limit=';
    const start = '?_start=';

    try {
        result = await fetch(urlBase + apiPoint + start + skip + limit + count)
        data =  await result.json();
        totalVideos = data.length;
        renderVideosToDOM(data);
        skip = skip + count;
    } catch (err) {
        console.error("APP ERROR ", err);
    }
}

function getId(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
  
    return match && match[2].length === 11 ? match[2] : null;
}

function renderVideosToDOM(arrayData) {
    videosLoaded = 0;
    const imageContainer = document.getElementById('container');
    arrayData.forEach(item => imageContainer.appendChild(generateVideoHTML(item.Title, item.Desription, getId(item.Url), handleOnLoadVideo)));
}

/********************************************
    HTML TEMPLATE
********************************************/
function generateVideoHTML(title, description, id, callbackFunction) {
    const videoContainer = document.createElement('div');
    videoContainer.className = "video-container";

    const videoDescription = document.createElement('div');
    videoDescription.className = "video-description";

    const videoTitleContainer = document.createElement('div');
    const videoTitleText = document.createElement('h2');
    videoTitleText.innerText = title;

    const videoDescriptionContainer = document.createElement('div');
    const videoDescriptionText = document.createElement('p');
    videoDescriptionText.innerText = description;

    const video = document.createElement('iframe');
    video.setAttribute('src', `https://www.youtube.com/embed/${id}`);
    video.setAttribute('frameborder', '0');

    video.addEventListener('load', callbackFunction);

    videoTitleContainer.appendChild(videoTitleText);
    videoDescriptionContainer.appendChild(videoDescriptionText);

    videoDescription.appendChild(videoTitleContainer);
    videoDescription.appendChild(videoDescriptionContainer);

    videoContainer.appendChild(videoDescription);
    videoContainer.appendChild(video);

    return videoContainer;   
}

// function generateVideoHTML(title, description, id) {
//     return `
//         <div class="video-container">
//             <div class="video-description">
//                 <div><h2>${title}</h2></div>
//                 <div><p>${description}</p></div>
//             </div>
//             <iframe width="560" height="349" src="https://www.youtube.com/embed/${id}" frameborder="0" allowfullscreen></iframe>
//         </div>
//     `
// }

/********************************************
    EVENT LISTENER
********************************************/
window.addEventListener('click', () => getVideosFromAPI());

window.addEventListener('scroll', () => {
    console.log('scroll', isReady);
    if (window.innerHeight + window.screenY >= document.body.offsetHeight - 1500 && isReady) {
        getVideosFromAPI();
        isReady = false;
    }    
})
/********************************************
    FUNCTIONS CALL
********************************************/
getVideosFromAPI();

