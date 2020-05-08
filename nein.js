
var x = document.getElementById("show-position");

function getLocation() {
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
    const apiKey = '32808697-8cef-4cdc-81a3-477f899fd378'
    const baseUrl = 'https://api.resrobot.se/v2/location.nearbystops?';

    let latitude = currentLocation.latitude;
    let longitude = currentLocation.longitude;
    let URL = `${baseUrl}key=${apiKey}&originCoordLat=${latitude}&originCoordLong=${longitude}&format=json`

    try {
        let resp = await fetch(URL);
        let stops = await resp.json();
        let i;
        console.log( "hållplatser " + stops);
        console.log(stops.StopLocation[0]);

        let id = stops.StopLocation[0].id;
        console.log("id " + id)


        departures(id) // vald hållplats ska skickas in här till departures


        for (i=0; i < 10; i++) {
            console.log(stops.StopLocation[i].name) 
            document.getElementById("stops").innerHTML += `<p onclick="getId(${id})">  ${stops.StopLocation[i].name} </p>`;
            document.getElementById("stops").innerHTML += `<p> ${stops.StopLocation[i].id} </p>`;

           
        }
       
           
    } catch (err) {
        console.log(err)
    }
}





async function departures() {
    console.log("departures ran")
    const apiKey = '92eb7245-c121-4899-90dc-059f68233948'
    const baseUrl = 'https://api.resrobot.se/v2/departureBoard?';
    // let latitude = 59.5197344;
    // let longitude = 17.8927437;

    // let latitude = currentLocation.latitude;
    // console.log(latitude)

    // let longitude = currentLocation.longitude;
    // console.log(longitude)

    let id = 740000782;

    
    let URL = `${baseUrl}key=${apiKey}&id=${id}&format=json`

    try {
        let resp = await fetch(URL);
        console.log("svar " + resp)
        let departures = await resp.json();

        console.log( "avgångar: " + id + departures)


    } catch (err) {
        console.log(err)
    }
}

getLocation()







/*


fetch('http://example.com/movies.json')
  .then(response => response.json())
  .then(data => console.log(data));


*/