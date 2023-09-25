// Get references to HTML elements
const cityInput = document.getElementById('cityInput');
const recentCitiesList = document.getElementById('recentCities');
const forecastContainer = document.querySelector('.forecast');
const searchButton = document.getElementById('citySearchBtn');


// Event handler for searching weather

function citySearch(){
    let city = cityInput.value.trim();
    searchWeather(city);
}


function searchWeather(city) {

    if (city === '') {
        alert('Please enter a city name.');
        return;
    }

    // Save the city to local storage for recent searches
    saveRecentCity(city);

    // Fetch weather data from the API
    const apiKey = '525b4a6ab93b3489f9f9c289047be1bd';
    const apiUrlForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`;
    const apiUrlCurrent = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

    // Make an API request and update the current weather
    fetch(apiUrlCurrent)
        .then(response => response.json())
        .then(data => {
            // Process the data and update the forecast cards
            todayForecast(data);
            console.log(data);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            alert('Unable to fetch weather data. Please try again later.');
        });

    // Make an API request and update the forecast
    fetch(apiUrlForecast)
        .then(response => response.json())
        .then(data => {
            // Process the data and update the forecast cards
            updateForecast(data);
            console.log(data);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            alert('Unable to fetch weather data. Please try again later.');
        });
}

// Function to save a recent city to local storage
function saveRecentCity(city) {
    // Get the existing list of recent cities from local storage
    const recentCities = JSON.parse(localStorage.getItem('recentCities')) || [];

    // Add the new city to the list (limit it to 5 recent cities)
    recentCities.unshift(city);
    if (recentCities.length > 5) {
        recentCities.pop(); // Remove the oldest city if there are more than 5
    }

    // Save the updated list to local storage
    localStorage.setItem('recentCities', JSON.stringify(recentCities));

    displayRecentCities();
}

// Function to display recent cities in the UI
function displayRecentCities() {
    const recentCities = JSON.parse(localStorage.getItem('recentCities')) || [];

    // Clear the existing list
    recentCitiesList.innerHTML = '';

    // Add each recent city as a button
    for (const city of recentCities) {
        const historyBtn = document.createElement('button');
        historyBtn.textContent = city;
        historyBtn.className = 'btn btn-info my-2 d-block';
        historyBtn.addEventListener('click', function () {
            searchWeather(city); // Call searchWeather with the selected city
        });
        recentCitiesList.appendChild(historyBtn);
    }
}

// Function to display the current weather forecast
function todayForecast(data) {
    // Implement your logic to display today's weather forecast
    console.log('Today\'s weather forecast:', data);
}

// Function to update the weather forecast cards
function updateForecast(data) {
    // Implement your logic to update the forecast cards
    console.log('Updating forecast:', data);
}

// Add Event Listener to search button
searchButton.addEventListener('click', citySearch);

// Initial setup: Display recent cities
displayRecentCities();

