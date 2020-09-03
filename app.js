
console.log("Ready");

/********************************************
    GLOBAL VARIABLES
********************************************/
let dataArray = [];

/********************************************
    FUNCTIONS
********************************************/
async function getVideosFromAPI() {
    const urlBase = 'https://scrapiapi.herokuapp.com/' 
    const apiPoint = 'videos';
    
    try {
        dataArray = await fetch(urlBase + apiPoint).then(data => data.json());
        console.log(dataArray);
    } catch (err) {
        console.error("APP ERROR ", err);
    }
}

function getId(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
  
    return match && match[2].length === 11 ? match[2] : null;
}

function renderVideosToDOM() {
    const imageContainer = document.getElementById('container');
    const loader = document.getElementById('loader-container');

    imageContainer.innerHTML = generateVideoHTML('test','hello','61P0yKsU8yw');
}

/********************************************
    HTML TEMPLATE
********************************************/
function generateVideoHTML(title, description, id) {
    return `
        <div class="video-container ">
            <div class="image-description">
                <div><h2>${title}</h2></div>
                <div><p>${description}</p></div>
            </div>
            <iframe width="560" height="349" src="http://www.youtube.com/embed/${id}" frameborder="0" allowfullscreen></iframe>
        </div>
    `
}

/********************************************
    FUNCTIONS CALL
********************************************/
getVideosFromAPI();
renderVideosToDOM();
console.log(dataArray);

/********************************************
    EXAMPLE CODE
********************************************/

// async function getPhotosFromAPI() {
//     const COUNT = 15;
//     const YOUR_ACCESS_KEY = '2aWbj014bYBiOPNzwlqXCPEzIwa6pjIV4BZLpmRxQkA';
//     const URL_BASE = `https://api.unsplash.com/photos/random/?client_id=${YOUR_ACCESS_KEY}&count=${COUNT}`;

//     try {
//         const photosDataArray = await fetch(URL_BASE).then(data => data.json());
//     } catch (err) {
//         console.error("API ERROR: ", err);    
//     }
// }