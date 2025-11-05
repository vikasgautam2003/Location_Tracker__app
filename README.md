# 🌍 Locatrix — Live Location Tracker App

A full-stack, real-time location tracking platform designed to visualize and share users’ live positions using GPS, Leaflet maps, and real-time socket communication — built for accuracy, simplicity, and modern design.

Next.js badge → https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white&style=for-the-badge  
Express.js badge → https://img.shields.io/badge/Express.js-000000?logo=express&logoColor=white&style=for-the-badge  
Socket.IO badge → https://img.shields.io/badge/Socket.IO-black?logo=socket.io&style=for-the-badge  
Leaflet badge → https://img.shields.io/badge/Leaflet-199900?logo=leaflet&logoColor=white&style=for-the-badge  
Tailwind badge → https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white&style=for-the-badge  
JavaScript badge → https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black&style=for-the-badge  
OpenStreetMap badge → https://img.shields.io/badge/OpenStreetMap-7EBF50?logo=openstreetmap&logoColor=white&style=for-the-badge  
Unsplash badge → https://img.shields.io/badge/Unsplash_API-000000?logo=unsplash&logoColor=white&style=for-the-badge  
Render badge → https://img.shields.io/badge/Render-000000?logo=render&logoColor=white&style=for-the-badge  

---

### ▶️ [Live Demo](https://location-tracker-app-07th.onrender.com/)

---

## 📖 About The Project

**Locatrix** is a modern, real-time **live location tracker web app** that allows users to visualize their current location on a map, view address details, and fetch related images dynamically using **Unsplash**.

It combines the **Leaflet** mapping library, **Socket.IO** for live updates, and **OpenStreetMap Nominatim** for reverse geocoding to provide real-time and accurate tracking data.  
Users can toggle an interactive sidebar showing latitude, longitude, location name, and related photos fetched automatically from Unsplash.

![Project Screenshot](public/live.png)

---

## 🌟 Key Features

- **Live Location Detection**: Uses the browser’s Geolocation API to fetch and display the current position.  
- **Real-Time Updates**: Broadcasts location changes instantly across connected users using Socket.IO.  
- **Reverse Geocoding**: Fetches readable location names via OpenStreetMap’s Nominatim API.  
- **Dynamic Photo Fetching**: Integrates Unsplash API to display images based on detected locations.  
- **Responsive Sidebar UI**: Tailwind-powered sidebar showing coordinates, place name, and photos.  
- **Fast & Lightweight**: Zero-database setup, optimized for speed and simplicity.  

---

## 🔧 Tech Stack

| Technology | Role & Justification |
| :---------- | :------------------- |
| **Node.js** | **Backend Runtime**: Handles server operations and Socket.IO events. |
| **Express.js** | **Web Framework**: Manages HTTP routes, APIs, and serves static files. |
| **Socket.IO** | **Real-Time Engine**: Powers bidirectional live updates for location sync. |
| **Leaflet.js** | **Mapping Library**: Displays dynamic maps with markers and zoom. |
| **OpenStreetMap (Nominatim)** | **Geocoding API**: Converts coordinates into readable addresses. |
| **Unsplash API** | **Media Integration**: Fetches location-related photos for better visualization. |
| **Tailwind CSS** | **UI Framework**: Utility-first styling for a clean, responsive design. |
| **Render** | **Hosting Platform**: Reliable, auto-deploy cloud hosting for this full-stack app. |

---

## 📦 Getting Started

### Prerequisites

- **Node.js** (`v18` or higher)  
- **npm** or **yarn**  
- (Optional) **Unsplash API Key** → Get from [https://unsplash.com/developers](https://unsplash.com/developers)

---

### Installation & Setup

1. **Clone the repository:**
    ```bash
    git clone https://github.com/vikasgautam2003/Location_Tracker__app.git
    cd Location_Tracker__app
    ```

2. **Install dependencies:**
    ```bash
    npm install
    ```

3. **Create a `.env` file in the root directory:**
    ```env
    PORT=3000
    UNSPLASH_ACCESS_KEY=your_unsplash_api_key_here
    ```

4. **Run the server:**
    ```bash
    npm start
    ```

5. **Visit the app locally:**
    ```
    http://localhost:3000
    ```

---

