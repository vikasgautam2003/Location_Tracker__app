const socket = io();


if(navigator.geolocation) {
    navigator.geolocation.watchPosition((position) => {
         const {latitude, longitude} = position.coords;

         socket.emit("locationUpdate", {latitude, longitude});
    }, (error) => {
        console.error("Error getting location:", error);
    }, {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
        
    })
} 



const map = L.map('map').setView([0, 0], 2);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "Gautam Tracker"
}).addTo(map);



const markers = {};

socket.on("Received-location", (data) => {
    const { id, latitude, longitude } = data;

    
  if (markers[id]) {
    markers[id].setLatLng([latitude, longitude]);
  } else {
  
    markers[id] = L.marker([latitude, longitude]).addTo(map);
  }

    map.setView([latitude, longitude], 10);
});
