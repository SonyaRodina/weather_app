const apiKey = 'be9bf39af00c4120a1c152327230912';

const form = document.querySelector('#form');
const input = document.querySelector('#inputCity');
let city;
const main = document.querySelector('#main');

form.onsubmit = function(e) {
    e.preventDefault();
    city = input.value.trim();                                 

    const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

    fetch(url).then((response) => {
        return response.json()
    })
    .then((data) => {
        console.log(data);
        console.log(data.location.name);
        console.log(data.location.country);
        console.log(data.current.temp_c);
        console.log(data.current.condition.text);

    const html = `
    <div class="card">                              
        <h2 class="card-city">${data.location.name} <span>${data.location.country}</span></h2> 
        <div class="card-weather">
            <div class="card-value">${data.current.temp_c}<sup>°c</sup></div>
            <img class="card-img" src="./img/example.svg" alt="Weather"></img>
        </div>
        <div class="card-description">${data.current.condition.text}</div>
    </div>`
main.insertAdjacentHTML('afterbegin', html);
    });
}