
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
    // let latitude = 59.5197344;
    // let longitude = 17.8927437;

    let latitude = currentLocation.latitude;
    console.log(latitude)

    let longitude = currentLocation.longitude;
    console.log(longitude)

    
    let URL = `${baseUrl}key=${apiKey}&originCoordLat=${latitude}&originCoordLong=${longitude}&format=json`

    try {
        let resp = await fetch(URL);
        let stops = await resp.json();
        let i;
        console.log(stops);
        console.log(stops.StopLocation[0]);


        for (i=0; i < 10; i++) {
            console.log(stops.StopLocation[i].name) 
        }
           

    } catch (err) {
        console.log(err)
    }
}








/*


fetch('http://example.com/movies.json')
  .then(response => response.json())
  .then(data => console.log(data));


*/