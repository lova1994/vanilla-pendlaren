const testBtn = document.getElementById("testBtn"),
 departuresEl =  document.getElementById('departures'),
 stopsEl = document.getElementById("stops");
 transportTypeEl = document.getElementById("transportType"),

testBtn.addEventListener('click', getLocation);





// let test = transportTypeEl.value;
// console.log(test)


// function start(){
//     transportTypeEl.addEventListener("change", pickTransportation, false);
//     }

// function pickTransportation(){
//     //option is selected
//     console.log(transportTypeEl.value);
// }

// window.addEventListener("load", start, false);


/* testar checkbox value */

// function getTransportType() {
//     var coffee = document.forms[0];
//     var txt = "";
//     var i;
//     for (i = 0; i < coffee.length; i++) {
//       if (coffee[i].checked) {
//         txt = txt + coffee[i].value + " ";
//       }
//     }
//     document.getElementById("order").value = "You ordered a coffee with: " + txt;
//   }



// document.querySelector('.messageCheckbox').checked;




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
  console.log("Något gick fel")
  }
}

async function nearStops(currentLocation) {

    console.log("Hittar närmaste hållplatser...")
    const apiKey = '32808697-8cef-4cdc-81a3-477f899fd378'
    const baseUrl = 'https://api.resrobot.se/v2/location.nearbystops?';

    let latitude = currentLocation.latitude;
    let longitude = currentLocation.longitude;
    let URL = `${baseUrl}key=${apiKey}&originCoordLat=${latitude}&originCoordLong=${longitude}&format=json`
    
    try {
        let resp = await fetch(URL);
        let stops = await resp.json();
        let i;
        console.log("Hämtar hållplatser...");
     
        for (i=0; i < 10; i++) {
            let id = stops.StopLocation[i].id;
            let stop = stops.StopLocation[i].name;
            stopsEl.innerHTML += `<p id="myStop" class="stops">  ${stop} </p>
            <button id="pickStation" stop-id="${id}" > Visa avgångar  </button>`;
        }
        
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

    // let transportType = checkbox.value
   
    departuresEl.innerHTML = '';

    // let transportType = "";


    // https://api.resrobot.se/v2/departureBoard?key=92eb7245-c121-4899-90dc-059f68233948&id=740000782&products=16&format=json


    // &products=16

    let URL = `${baseUrl}key=${apiKey}&id=${id}&format=json`;
    try {
        let resp = await fetch(URL);
        let departures = await resp.json();        

        for(departure of departures.Departure) {
            console.log('Loopar ut alla avgångar...')
            departuresEl.innerHTML += `
            <p> ${departure.direction}</p>
            <p> ${departure.name}</p>
            <p> ${departure.date}</p>
            <p> ${departure.time}</p>
            <hr>`            
    }


  
    console.log(departure.stop)

    } catch (err) {
        console.log(err)
    }
}


// getLocation();

function GetSelected() {
    //Create an Array.
    let selected = [];

    //Reference the Table.
    let transportTypes = document.getElementById("transportTypes");

    //Reference all the CheckBoxes in Table.
    let chks = transportTypes.getElementsByTagName("INPUT");

    // Loop and push the checked CheckBox value in Array.
    for (var i = 0; i < chks.length; i++) {
        if (chks[i].checked) {
            selected.push(chks[i].value);
        }
    }

    let numArr = selected.map( x => { 
        return parseInt(x, 10); 
      });
      let totalSum = numArr.reduce((a, b) => a + b, 0);
      console.log(totalSum)
};
