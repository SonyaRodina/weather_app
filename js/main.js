const apiKey = 'be9bf39af00c4120a1c152327230912';

const form = document.querySelector('#form');
const input = document.querySelector('#inputCity');
let city;
const main = document.querySelector('#main');

function removeCard() {                                         
    const prevCard = document.querySelector('.card');              
    if(prevCard) prevCard.remove(); 
}   

function showError(errorMessage) {                              
    const html = `<div class="card">${errorMessage}</div>`;  
    main.insertAdjacentHTML('afterbegin', html);
}

function showCard(name, country, temp, condition) {             
     // разметка для карточки с полученными данными
    const html = `<div class="card">                              
                <h2 class="card-city">${name} <span>${country}</span></h2> 
                <div class="card-weather">
                    <div class="card-value">${temp}<sup>°c</sup></div>
                    <img class="card-img" src="./img/example.svg" alt="Weather"></img>
                </div>
                <div class="card-description">${condition}</div>
            </div>`
    main.insertAdjacentHTML('afterbegin', html);
}

async function getWeather(city) {                                 
    const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;
    const response = await fetch(url);
    const data = await response.json();                              
    console.log(data);
    return data;
}

form.onsubmit = async function(e) {
    e.preventDefault();
    city = input.value.trim();                                 

    const data = await getWeather(city); 

        if(data.error) {                                                   
            removeCard(); 
            showError(data.error.message);
        } else {                                                           
            removeCard();                                
            showCard(
                data.location.name,
                data.location.country,
                data.current.temp_c,
                data.current.condition.text
            );
        }
    }





// data.error.message