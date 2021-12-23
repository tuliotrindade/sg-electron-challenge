const input = document.querySelector('#newCity');
let button = document.getElementById('criar-tarefa');

const interativeBackdround = (temp, section) => {
    switch (Math.ceil(temp / 10) * 10) {
        case -0:
            section.id = 'extremelyCold';
            break;
        case 10:
            section.id = 'veryCold';
            break;
        case 20:
            section.id = 'cold';
            break;
        case 30:
            section.id = 'normal'
            break;
        case 40:
            section.id = 'hot';
            break;
        case 50:
            section.id = 'veryHot';
            break;
        case 60:
            section.id = 'extremelyHot';
            break;
        default:
            section.id = 'defaultColor';
    };
};

button.addEventListener('click', function() {
    const city = input.value;
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${ city }&lang=pt_br&units=metric&appid=d66570dbf2aa2d0a40da157169e4f96d`)
        .then((res) => res.json())
        .then((city) => {
            if (city.cod === '404') {
                return alert('Cidade não encontrada');
            }
            createdItem = createItemElement(city.name, city.sys.country, city.main.temp, city.weather[0].description);
            document.querySelector('.list').appendChild(createdItem);
        });
});

const createElement = (element, className, innerText) => {
    const e = document.createElement(element);
    e.className = className;
    e.innerText = innerText;
    return e;
};

const createItemElement = (name, country, temp, sky) => {
    const section = document.createElement('section');
    section.className = 'item';

    section.appendChild(createElement('span', 'title', `Cidade: ${name}`));
    section.appendChild(createElement('span', 'country', `Pais: ${country}`));
    section.appendChild(createElement('span', 'temp', `Temperatura: ${temp}ºC`));
    section.appendChild(createElement('span', 'sky', `Céu: ${sky}`));

    interativeBackdround(temp, section);

    return section;
};

const citiesData = () => {
    const URL = 'https://api.openweathermap.org/data/2.5/find?lat=-19.9666635&lon=-44.1982364&cnt=5&units=metric&lang=pt_br&appid=d66570dbf2aa2d0a40da157169e4f96d'
    fetch(URL)
        .then((res) => res.json())
        .then((output) => {
            output.list.forEach((city) => {
                console.log(city.weather[0].description);
                createdItem = createItemElement(city.name, city.sys.country, city.main.temp, city.weather[0].description);
                document.querySelector('.list').appendChild(createdItem);
            })
        });
};

const cards = document.querySelector('.list');

cards.addEventListener('dblclick', function(event) {
    if (event.target.parentElement.className === 'item') {
        event.target.parentElement.remove();
    };
});

window.onload = function onload() {
    citiesData();
};