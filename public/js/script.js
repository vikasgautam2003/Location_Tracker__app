// const socket = io();


// if(navigator.geolocation) {
//     navigator.geolocation.watchPosition((position) => {
//          const {latitude, longitude} = position.coords;

//          socket.emit("locationUpdate", {latitude, longitude});
//     }, (error) => {
//         console.error("Error getting location:", error);
//     }, {
//         enableHighAccuracy: true,
//         timeout: 5000,
//         maximumAge: 0,
        
//     })
// } 



// const map = L.map('map').setView([0, 0], 2);

// L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
//     attribution: "Gautam Tracker"
// }).addTo(map);



// const markers = {};

// socket.on("Received-location", (data) => {
//     const { id, latitude, longitude } = data;

    
//   if (markers[id]) {
//     markers[id].setLatLng([latitude, longitude]);
//   } else {
  
//     markers[id] = L.marker([latitude, longitude]).addTo(map);
//   }

//     map.setView([latitude, longitude], 10);
// });





const socket = io();
const map = L.map('map').setView([0, 0], 2);

const tileLayer = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "© Gautam Tracker"
}).addTo(map);

const markers = {};
const statusEl = document.getElementById("status");
const coordsEl = document.getElementById("coords");
const darkModeBtn = document.getElementById("darkModeBtn");

socket.on("connect", () => {
  statusEl.textContent = "🟢 Connected";
  statusEl.classList.replace("text-red-400", "text-green-400");
});

socket.on("disconnect", () => {
  statusEl.textContent = "🔴 Disconnected";
  statusEl.classList.replace("text-green-400", "text-red-400");
});

let darkMode = false;
darkModeBtn.addEventListener("click", () => {
  darkMode = !darkMode;
  if (darkMode) {
    document.body.classList.replace("bg-gray-900", "bg-gray-100");
    document.body.classList.replace("text-white", "text-gray-900");
    tileLayer.setUrl("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png");
  } else {
    document.body.classList.replace("bg-gray-100", "bg-gray-900");
    document.body.classList.replace("text-gray-900", "text-white");
    tileLayer.setUrl("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png");
  }
});
if (navigator.geolocation) {
  navigator.geolocation.watchPosition(
    (pos) => {
      const { latitude, longitude } = pos.coords;
      coordsEl.textContent = `Lat: ${latitude.toFixed(5)}, Lng: ${longitude.toFixed(5)}`;
      socket.emit("locationUpdate", { latitude, longitude });

      // 👇 Center your map immediately
      if (!markers["self"]) {
        markers["self"] = L.marker([latitude, longitude], { title: "You" }).addTo(map);
        map.setView([latitude, longitude], 15);
      } else {
        markers["self"].setLatLng([latitude, longitude]);
      }
    },
    (err) => console.error("Error getting location:", err),
    { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
  );
} else {
  alert("Geolocation not supported in this browser");
}

socket.on("Received-location", (data) => {
  const { id, latitude, longitude } = data;
  if (markers[id]) {
    markers[id].setLatLng([latitude, longitude]);
  } else {
    markers[id] = L.marker([latitude, longitude]).addTo(map);
  }
  map.setView([latitude, longitude], 15);
});

socket.on("userDisconnected", (id) => {
  if (markers[id]) {
    map.removeLayer(markers[id]);
    delete markers[id];
  }
});
