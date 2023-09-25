// Get references to HTML elements
const cityInput = document.getElementById('cityInput');
const recentCitiesList = document.getElementById('recentCities');
const forecastContainer = document.querySelector('.forecast-cards');
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
    // Checking Today's Weather Data
    console.log('Today\'s weather forecast:', data);
    // Access the relevant data from the 'data' object
    const cityName = data.name;
    const currentTemp = data.main.temp;
    const currentWind = data.wind.speed;
    const currentHigh = data.main.temp_max;
    const currentLow = data.main.temp_min;
    const currentIcon = data.weather[0].icon;
    const currentHumidity = data.main.humidity;

    // Create a div to display today's weather
    const todayWeatherDiv = document.createElement('div');
    todayWeatherDiv.className = 'today-weather';
    
    // Setting Inner HTML to display the data
    todayWeatherDiv.innerHTML = `
        <h1>Today's Weather</h1>
        <h3>${cityName}</h3>
        <p>Temperature: ${currentTemp} °F</p>
        <p>Wind: ${currentWind} mph</p>
        <p>High: ${currentHigh} °F</p>
        <p>Low: ${currentLow} °F</p>
        <p>Icon: <img src=${' http://openweathermap.org/img/w/'+ currentIcon +'.png'}/></p>
        <p>Humidity: ${currentHumidity}%</p>
        
    `;

    // Append the div to the 'current-weather' container
    const currentWeatherContainer = document.querySelector('.current-weather');
    currentWeatherContainer.innerHTML = '';
    currentWeatherContainer.appendChild(todayWeatherDiv);
}

// Function to update the weather forecast cards
function updateForecast(data) {
    // Checking Forecast Data
    console.log('Updating forecast:', data);
       // Access the list of forecast data
       const forecastList = data.list;

       // Create a div to display the 5-day forecast
       const forecastDiv = document.createElement('div');
       forecastDiv.className = 'forecast-cards';
   
       // Loop through the forecast data and create forecast cards
       for (let i = 0; i < 40; i += 8) {
           // Access the relevant data for each forecast entry
              const forecastList = data.list[i];
           const forecastTime = forecastList.dt_txt;
           const forecastTemp = forecastList.main.temp;
           const forecastDescription = forecastList.weather[0].description;
           const forecastIcon = forecastList.weather[0].icon;
           const forecastWind = forecastList.wind.speed;
           const forecastHumidity = forecastList.main.humidity;
   
           // Create a div for each forecast card
           const forecastCard = document.createElement('div');
           forecastCard.className = 'forecast-card';
           
           // Use a template literal to set the inner HTML for each card
           forecastCard.innerHTML = `
               <p>${forecastTime}</p>
               <p>Temperature: ${forecastTemp} °F</p>
               <p>Description: ${forecastDescription}</p>
               <p>Wind: ${forecastWind} mph</p>
               <p>Humidity: ${forecastHumidity}%</p>
               Icon: <img src=${' http://openweathermap.org/img/w/'+ forecastIcon +'.png'}/>
           `;
   
           // Append the forecast card to the 'forecastDiv'
           forecastDiv.appendChild(forecastCard);
       }
   
       // Append the 'forecastDiv' to the 'forecastContainer'
       forecastContainer.innerHTML = '';
       forecastContainer.appendChild(forecastDiv); 

}

// Add Event Listener to search button
searchButton.addEventListener('click', citySearch);

// Initial setup: Display recent cities
displayRecentCities();

