// Get references to HTML elements
const cityInput = document.getElementById('cityInput');
const recentCitiesList = document.getElementById('recentCities');
const forecastContainer = document.querySelector('.forecast');
const searchButton= document.getElementById('citySearchBtn');


// Event handler for searching weather
function searchWeather() {
    const city = cityInput.value.trim();

    if (city === '') {
        alert('Please enter a city name.');
        return;
    }

    // Save the city to local storage for recent searches
    saveRecentCity(city);

    
    // Fetch weather data from the API
    const apiKey = '525b4a6ab93b3489f9f9c289047be1bd';
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

    // Make an API request and update the forecast
    fetch(apiUrl)
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

    // Add each recent city to the list
    for (const city of recentCities) {
        const li = document.createElement('li');
        li.textContent = city;
        recentCitiesList.appendChild(li);
    }
}

// Function to update the weather forecast cards
function updateForecast(data) {

}
//add Event Listener to search button
searchButton.addEventListener("click", searchWeather);

// Initial setup: Display recent cities
displayRecentCities();
