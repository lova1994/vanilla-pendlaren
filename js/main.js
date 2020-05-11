var x = document.getElementById("show-position");

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


function getId() {
    let id = 740000782;
    console.log("Get id ran")
    departures(id)
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
    
        // departures(id) // vald hållplats ska skickas in här till departures

     
        for (i=0; i < 10; i++) {
            let id = stops.StopLocation[i].id;
            let stop = stops.StopLocation[i].name;
            // console.log("Hållplats-id:" + id) // MAN SKA KUNNA KLICKA PÅ EN HÅLLPLATS som skickar med id
            // console.log("Hållplats-namn:" + stop)
            document.getElementById("stops").innerHTML += `<p data-stop-id="${id}">  ${stop} </p> 

            <button onclick="getId()" > Add  </button>            
           `;
            // document.getElementById("stops").innerHTML += `<p> ${stops.StopLocation[i].id} </p>`;
        
        
        // loopa ut en knapp som har varje hållplats id, 
        // när du klickar den körs funktionen som skickar id hållplats till departures()
    
     
    
    }




           
    } catch (err) {
        console.log(err)
    }
}

// function sendId(){
    
//     let id = 740000782;
//     departures(id)
// }


async function departures() {
    console.log("Hämtar avgång")
    const apiKey = '92eb7245-c121-4899-90dc-059f68233948'
    const baseUrl = 'https://api.resrobot.se/v2/departureBoard?';
    // https://api.resrobot.se/v2/departureBoard?key=92eb7245-c121-4899-90dc-059f68233948&id=740000782&format=json
    

    let id = 740000782; // Hållplats ID
    let URL = `${baseUrl}key=${apiKey}&id=${id}&format=json`;
    let el =  document.getElementById('departures');
    try {
        let resp = await fetch(URL);
        // console.log("svar " + resp)
        let departures = await resp.json();
        // console.log( "DEEPARTUTRES: " + departures)


        for(departure of departures.Departure) {
            console.log('Loopar alla avgångar...')
            // console.log(departure);
            // console.log(departure.direction);

            el.innerHTML += `
            <p> ${departure.direction}</p>
            <p> ${departure.name}</p>
            <p> ${departure.date}</p>
            <p> ${departure.time}</p>
            <hr>
            `
            // console.log(departure.name);
            // console.log(departure.date);
            // console.log(departure.time);
    }

        // return departures; 
        


    } catch (err) {
        console.log(err)
    }
}

getLocation()
departures()
