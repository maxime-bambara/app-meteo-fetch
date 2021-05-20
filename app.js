const weatherIcons = {
    "Rain" : "wi wi-day-rain",
    "Clouds" : "wi wi-day-cloudy",
    "Clear" : "wi wi-day-sunny",
    "Snow" : 'wi wi-day-snow',
    "mist" : 'wi wi-day-fog',
    "Drizzle" : "wi wi-day-sleet"
}

async function main(withIP = true){
    let ville;

    if(withIP){
    //Optention de l'adress IP qui ouvre la page : https://api.ipify.org?format=json
    const ip = await fetch('https://api.ipify.org?format=json')
    .then(resultat => resultat.json())
    .then(json => json.ip)
    
    // Trouver la ville grâce à l'adresse ip : http://francegeoip.net/json/adresseip
    ville = await fetch('https://freegeoip.app/json/' + ip)
    .then(resultat => resultat.json())
    .then(json => json.city)
    } else{
        ville = document.querySelector('#ville').textContent;
    }

            
    // Trouver la météo de la ville : http://api.openweathermap.org/data/2.5/weather?q={city name}&appid=1fe24dc44bdbe47a9887cb52ad93bbef
    const meteo = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${ville}&appid=1fe24dc44bdbe47a9887cb52ad93bbef&lang=fr&units=metric`)
    .then(resultat => resultat.json())
    .then(json => json)

    console.log(meteo);

    //Afficher les infos sur la page
    displayWeatherInfos(meteo);
}

function displayWeatherInfos(data){
        const name = data.name;
        const temperature = data.main.temp;
        const conditions = data.weather[0].main;
        const description = data.weather[0].description;

        document.querySelector('#ville').textContent = name;
        document.querySelector('#temperature').textContent = Math.round(temperature);
        document.querySelector('#conditions').textContent = description;
        document.querySelector('i.wi').className = weatherIcons[conditions];

        document.body.className = conditions.toLowerCase()
}

const ville = document.querySelector('#ville');

ville.addEventListener('click', () =>{
    ville.contentEditable = true;
});

ville.addEventListener('keydown', (e) => {
    if(e.keyCode === 13){
        e.preventDefault();
        ville.contentEditable = false;
        main(false);
    }
})

main();