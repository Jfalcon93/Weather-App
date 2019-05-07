const backgroundColors = {
    midnight: "linear-gradient(to top, #0f0c29, #302b63, #24243e)",
    dawn: "linear-gradient(to top, #4BC0C8, #C779D0, #FEAC5E)",
    morning: "linear-gradient(to top, #fceabb, #f8b500)",
    afternoon: "linear-gradient(to top, #ffffff, #6dd5fa, #2980b9)",
    evening: "linear-gradient(to top, #b92b27, #1565c0)"
};

const timeElement = document.getElementById('time');

function checkTime() {
    
    let currentTime = new Date();
    let hour = currentTime.getHours();
    let minute = currentTime.getMinutes();
    let amPM = "AM";
    
    if (hour == 0) {
        hour = 12;
    }
    else if (hour > 12) {
        hour = hour - 12;
        amPM = "PM";
    }
    else {
        hour = hour;
    }
    
    hour = (hour < 10) ? "0" + hour : hour;
    minute = (minute < 10) ? "0" + minute : minute;
    
    return `${hour}:${minute} ${amPM}`
}

function setBackground() {
    
    let time = new Date();
    let background = document.getElementById('body');
    
    if(time.getHours() >= 22 || time.getHours() <= 5) {
        background.style.background = backgroundColors['midnight'];
        background.style.color = 'white';
    }
    else if (time.getHours() > 5 && time.getHours() <= 9) {
        background.style.background = backgroundColors['dawn'];
        background.style.color = 'white';
    }
    else if (time.getHours() > 9 && time.getHours() <= 12){
        background.style.background = backgroundColors['morning'];
        background.style.color = 'black';
    }
    else if (time.getHours() > 12 && time.getHours() <= 16){
        background.style.background = backgroundColors['afternoon'];
        background.style.color = 'black';
    }
    else if (time.getHours() > 16 && time.getHours() < 22) {
        background.style.background = backgroundColors['evening'];
        background.style.color = 'white';
    }    
}

window.addEventListener('load', () => {
    setBackground();
    timeElement.textContent = `Last update was at: ${checkTime()}`;
})