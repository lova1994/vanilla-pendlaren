// const testBtn = document.getElementById("testBtn");
// testBtn.addEventListener('click', departures);

// function testMe() {
//     console.log("Event listener works")
// }

function getLocation() {
    console.log("Hämtar din position...")
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
        (position) => {
            let currentLocation = position.coords;
            nearStops(currentLocation);       
        }
    )
  } else { 
  console.log("ERRRROOOORRRRRR!!!")
  }
}


async function nearStops(currentLocation) {

    console.log("Hittar närmaste hållplatser...")
    const apiKey = '32808697-8cef-4cdc-81a3-477f899fd378'
    const baseUrl = 'https://api.resrobot.se/v2/location.nearbystops?';

    let latitude = currentLocation.latitude;
    let longitude = currentLocation.longitude;
    let URL = `${baseUrl}key=${apiKey}&originCoordLat=${latitude}&originCoordLong=${longitude}&format=json`
    // let id = 740000782;

    try {
        let resp = await fetch(URL);
        let stops = await resp.json();
        let i;
        console.log("Hämtar hållplatser...");
     
        for (i=0; i < 10; i++) {
            let id = stops.StopLocation[i].id;
            let stop = stops.StopLocation[i].name;
            document.getElementById("stops").innerHTML += `<p id="myStop" class="stops">  ${stop} </p>
            <button id="pickStation" stop-id="${id}" > Visa avgångar  </button>`;

        }

        

    // const pickStation = document.getElementById("pickStation");

    // pickStation.addEventListener('click', (event) => {
    //     const stationID = document.getElementById("myStop").getAttribute('stop-id');
    //     console.log("Hämtar stations ID: " + stationID)
    //     departures(stationID)
    // });

    addEventsListeners();
    } catch (err) {
        console.log(err)
    }
}

function addEventsListeners() {
    //Hämtar alla stationer med klassen .stops
    //Sätter en event listener på varje station 
    const pickStation = document.querySelectorAll("#pickStation");
    for(let i = 0; i < pickStation.length; i++) {
        pickStation[i].addEventListener('click', (event) => {
            //Hämtar stop-id från det elementet man klickade på
            const stationID = event.srcElement.getAttribute('stop-id');
            console.log("Hämtar stations ID: " + stationID)
            departures(stationID)
        });
    }
}

async function departures(id) {
    console.log("Hämtar avgång...")
    const apiKey = '92eb7245-c121-4899-90dc-059f68233948'
    const baseUrl = 'https://api.resrobot.se/v2/departureBoard?';    

    let URL = `${baseUrl}key=${apiKey}&id=${id}&format=json`;
    let el =  document.getElementById('departures');
    try {
        let resp = await fetch(URL);
        let departures = await resp.json();        

        for(departure of departures.Departure) {
            console.log('Loopar ut alla avgångar...')

            el.innerHTML += `
            <p> ${departure.direction}</p>
            <p> ${departure.name}</p>
            <p> ${departure.date}</p>
            <p> ${departure.time}</p>
            <hr>
            `            
    }
    console.log(departure.stop)

    } catch (err) {
        console.log(err)
    }
}

getLocation()
