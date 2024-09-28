const API_KEY = 'd326554400f04758bf542a8b56618dd7';  // Replace with your OpenWeatherMap API key
const cityInput = document.getElementById('location-input');
const weatherStatus = document.getElementById('weather-status');
const weatherImageDisplay = document.getElementById('weather-image-display');
const imageUploadInput = document.getElementById('image-upload');
const uploadedImagesDiv = document.getElementById('uploaded-images');
const getWeatherBtn = document.getElementById('get-weather-btn');

// Weather-based images from the gallery
const weatherImages = {
  clear: document.querySelector('.gallery-item1 img').src,
  rain: document.querySelector('.gallery-item2 img').src,
  snow: document.querySelector('.gallery-item3 img').src,
  clouds: document.querySelector('.gallery-item4 img').src,
  default: document.querySelector('.gallery-item5 img').src,
};

// Fetch weather data
async function fetchWeather() {
  const city = cityInput.value;
  if (!city) {
    alert('Please enter a city name.');
    return;
  }

  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`);
    const data = await response.json();
    if (data.cod !== 200) {
      weatherStatus.textContent = `Error: ${data.message}`;
      return;
    }

    const weatherDesc = data.weather[0].description;
    const weatherMain = data.weather[0].main.toLowerCase();

    weatherStatus.textContent = `It's currently ${weatherDesc} in ${city}.`;

    // Display corresponding image based on the weather
    if (weatherMain.includes('clear')) {
      showWeatherImage('clear');
    } else if (weatherMain.includes('rain')) {
      showWeatherImage('rain');
    } else if (weatherMain.includes('snow')) {
      showWeatherImage('snow');
    } else if (weatherMain.includes('clouds')) {
      showWeatherImage('clouds');
    } else {
      showWeatherImage('default');
    }
  } catch (error) {
    weatherStatus.textContent = 'Error fetching weather data.';
    console.error(error);
  }
}

// Show the weather-based image
function showWeatherImage(weatherType) {
  const weatherImage = document.createElement('img');
  weatherImage.src = weatherImages[weatherType] || weatherImages['default'];
  weatherImage.alt = `${weatherType} weather image`;

  // Clear previous image if any
  weatherImageDisplay.innerHTML = '';
  weatherImageDisplay.appendChild(weatherImage);
}

imageUploadInput.addEventListener('change', function (event) {
  const file = event.target.files[0];
  if (!file) return;

  const imgElement = document.createElement('img');
  imgElement.src = URL.createObjectURL(file);
  imgElement.alt = 'Uploaded image';
  
  const my = document.querySelector("#uploaded-images");
  
  // Set styles on the uploaded images container
  my.style.boxShadow = "0 0 16px #333";
  my.style.transition = "all 1.5s ease";
  my.style.borderRadius = "8px"; // Corrected property
  my.style.maxWidth = "200px";
  my.style.opacity = "1"; // Sets opacity to fully visible
  imgElement.style.objectFit = "cover";
  imgElement.style.maxWidth = '100%'; // Ensure uploaded images fit nicely
  imgElement.style.borderRadius = "8px"; // Optional: Add rounded corners to images

  uploadedImagesDiv.appendChild(imgElement);
});


// Fetch weather on button click
getWeatherBtn.addEventListener('click', fetchWeather);
