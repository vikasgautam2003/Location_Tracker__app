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
      updateSidebar(latitude, longitude);
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






const infoBtn = document.getElementById("infoToggle");
const infoPanel = document.getElementById("infoPanel");
const closePanel = document.getElementById("closePanel");
const latlonEl = document.getElementById("latlon");
const locNameEl = document.getElementById("locName");
const photosEl = document.getElementById("photos");



let isPanelOpen = false;
let currentCoords = {lat: null, lon: null};

infoBtn.addEventListener("click", () => {
  isPanelOpen = !isPanelOpen;
  togglePanel();
})


closePanel.addEventListener("click", () => {
  isPanelOpen = false;
  togglePanel();
});


function togglePanel() {
  if (isPanelOpen) {
    infoPanel.classList.remove("-translate-x-full");
  
  } else {
    infoPanel.classList.add("-translate-x-full");
    document.getElementById("map").style.width = "100%";
  }
 
}



async function fetchLocationName(lat, lon) {
  try {
    const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`);
    const data = await res.json();

    locNameEl.textContent = data.display_name || "Unknown location";
  } catch (err) {
    locNameEl.textContent = "Unable to fetch location name";
  }
}


console.log("📡 script.js loaded successfully!");

window.onload = async () => {
  console.log("⚙️ Fetching /config...");

  try {
    const res = await fetch('/config');
    const data = await res.json();
    const ACCESS_KEY = data.mapKey;

    console.log("✅ ACCESS_KEY received:", ACCESS_KEY);
  } catch (err) {
    console.error("❌ Error fetching config:", err);
  }
};




async function fetchLocationPhotos(query) {

  const res = await fetch('/config');
    const data = await res.json();
    const ACCESS_KEY = data.mapKey;

    console.log("Access Key from server:", ACCESS_KEY);


   photosEl.innerHTML = "<p class='text-gray-400'>Loading photos...</p>";

   try{

    const res = await fetch(`https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=4&client_id=${ACCESS_KEY}`);
    const data = await res.json();

    if(!data.results.length){
      photosEl.innerHTML = "<p class='text-gray-400'>No photos found</p>";
      return;
    }

    photosEl.innerHTML = data.results.map((img) => `<img src="${img.urls.thumb}" alt="${img.alt_description}" class="rounded shadow">`)
      .join("");


   } catch (err) {
    photosEl.innerHTML = "<p class='text-gray-400'>Error loading images</p>";
  }


}





function updateSidebar(lat, lon) {
  currentCoords = { lat, lng: lon };
  latlonEl.textContent = `Lat: ${lat.toFixed(5)}, Lng: ${lon.toFixed(5)}`;
  fetchLocationName(lat, lon).then(() => {
    const locText = locNameEl.textContent.split(",")[0];
    fetchLocationPhotos(locText);
  });
}