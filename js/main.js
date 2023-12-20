import conditions from '../conditions.js';
console.log(conditions);

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

function showCard(name, country, temp, condition, img) {             
    const html = `<div class="card">                              
                <h2 class="card-city">${name} <span>${country}</span></h2> 
                <div class="card-weather">
                    <div class="card-value">${temp}<sup>°c</sup></div>
                    <img class="card-img" src="${img}"></img>
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
           
            const info = conditions.find((obj) => obj.code === data.current.condition.code);
            console.log(info);
            const condition = data.current.is_day ? info.languages[23]['day_text'] : info.languages[23]['night_text'];

            const filePath = './img/' + (data.current.is_day ? 'day' : 'night') + '/';
            const fileName = (data.current.is_day ? info.day : info.night) + '.png';
            const imgPath = filePath + fileName;
            console.log('filePath', filePath + fileName);

            showCard(
                data.location.name,
                data.location.country,
                data.current.temp_c,
                condition,
                imgPath
            );
        }
    }
