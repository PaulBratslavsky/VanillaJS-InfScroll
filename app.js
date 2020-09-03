
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

function renderPhotosToDOM() {
    const imageContainer = document.getElementById('image-container');
    const loader = document.getElementById('loader-container');

    
}

/********************************************
    FUNCTIONS CALL
********************************************/
getVideosFromAPI();
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