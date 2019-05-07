const temperatureDescription = document.querySelector('.temperature-description');
const temperatureDegree = document.querySelector('.temperature-degree');
const locationTimezone = document.querySelector('.location-timezone');
const temperatureSection = document.querySelector('.temperature');
const temperatureSpan = document.querySelector('.degree-indicator');
const extraDetails = document.querySelector('.extra-details');
const windSpan = document.querySelector('.wind');
const humiditySpan = document.querySelector('.humidity');
const dewPointSpan = document.querySelector('.dewPoint');
const days = document.querySelector('.weekday');
const dayOne = days.children[0];
const dayTwo = days.children[1];
const dayThree = days.children[2];
const dayFour = days.children[3];
const dayFive = days.children[4];

window.addEventListener('load',  () => {
    let long;
    let lat;
    
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            
            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const api = `${proxy}https://api.darksky.net/forecast/b3cea05112a11957b2128a5114114cb6/${lat},${long}?exclude=alerts,flags`
            
            fetch(api)
            .then(response => {
                return response.json();
            })
            .then(data => {
                const {temperature, summary, icon, windSpeed, humidity, dewPoint} = data.currently;
                const daily = data.daily;
                // Set DOM Elements from the API
                temperatureDegree.textContent = Math.floor(temperature);
                temperatureDescription.textContent = summary;
                // Finds Location and replaces text received from API
                let location = data.timezone.replace(/^[^\/]*\//, "");
                locationTimezone.textContent = location;
                // Formula for celsius
                let celsius = (temperature - 32) * (5/9);
                // Set Icon
                setIcons(icon, document.querySelector('.icon'));
                // Set Current Wind, Humidity, Dew Point
                windSpan.textContent = `Wind ${Math.floor(windSpeed)} mph`;
                humiditySpan.textContent = `Humidity ${humidity * 100}%`;
                dewPointSpan.textContent = `Dew Point ${Math.floor(dewPoint)}`;
                //Change temperature to Celsius/Farenheit
                temperatureSection.addEventListener('click', () => {
                    if(temperatureSpan.textContent === 'F') {
                        temperatureSpan.textContent = "C";
                        temperatureDegree.textContent = Math.floor(celsius);
                    }
                    else {
                        temperatureSpan.textContent = "F";
                        temperatureDegree.textContent = Math.floor(temperature);
                    }
                })
                
                let d = new Date();
                let dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
                
                dayOne.children[0].textContent = dayNames[d.getDay()];
                setIcons(daily.data[0].icon, document.querySelector('.icon-one'));
                dayOne.children[2].textContent = `H:${Math.floor(daily.data[0].temperatureHigh)}° L:${Math.floor(daily.data[0].temperatureLow)}°`;
                dayOne.children[3].textContent = daily.data[0].summary;
                
                dayTwo.children[0].textContent = dayNames[d.getDay() + 1];
                setIcons(daily.data[1].icon, document.querySelector('.icon-two'));
                dayTwo.children[2].textContent = `H:${Math.floor(daily.data[1].temperatureHigh)}° L:${Math.floor(daily.data[1].temperatureLow)}°`;
                dayTwo.children[3].textContent = daily.data[1].summary;
                
                dayThree.children[0].textContent = dayNames[d.getDay() + 2];
                setIcons(daily.data[2].icon, document.querySelector('.icon-three'));
                dayThree.children[2].textContent = `H:${Math.floor(daily.data[2].temperatureHigh)}° L:${Math.floor(daily.data[2].temperatureLow)}°`;
                dayThree.children[3].textContent = daily.data[2].summary;
                
                dayFour.children[0].textContent = dayNames[d.getDay() + 3];
                setIcons(daily.data[3].icon, document.querySelector('.icon-four'));
                dayFour.children[2].textContent = `H:${Math.floor(daily.data[3].temperatureHigh)}° L:${Math.floor(daily.data[3].temperatureLow)}°`;
                dayFour.children[3].textContent = daily.data[3].summary;
                
                dayFive.children[0].textContent = dayNames[d.getDay() + 4];
                setIcons(daily.data[4].icon, document.querySelector('.icon-five'));
                dayFive.children[2].textContent = `H:${Math.floor(daily.data[4].temperatureHigh)}° L:${Math.floor(daily.data[4].temperatureLow)}°`;
                dayFive.children[3].textContent = daily.data[4].summary;
                
            })
        });
    }
    else {
        h1.textContent = "browser does not support";
    }
    
    function setIcons(icon, iconID) {
        const skycons = new Skycons({color: 'white'});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});