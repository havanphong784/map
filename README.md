# Disaster Alert Website (React + Google Maps)

A modern full-screen disaster alert web app with mock real-time updates.

## Features

- Full-screen Google Maps view
- Disaster markers: flood, earthquake, wildfire, storm
- Marker click opens InfoWindow with details
- Sidebar with alert list and severity color cues
- Search location by place name
- Filter alerts by disaster type
- Mock real-time updates every 15s
- Browser notifications for new alerts
- Geolocation support (center map on user)
- Responsive layout for mobile and desktop

## Tech Stack

- React + Vite
- @react-google-maps/api
- CSS (custom modern UI)
- Optional Axios included for real API integration

## Project Structure

```
src/
  components/
    MapComponent.jsx
    DisasterMarker.jsx
    Sidebar.jsx
    SearchBox.jsx
  constants/
    disasterTypes.js
  data/
    mockDisasters.js
  hooks/
    useMockRealtimeDisasters.js
  utils/
    formatters.js
  App.jsx
  main.jsx
  styles.css
```

## Setup Google Maps API Key

1. Go to Google Cloud Console.
2. Create or select a project.
3. Enable `Maps JavaScript API` and `Geocoding API`.
4. Create an API key.
5. Copy `.env.example` to `.env` and set your key:

```bash
VITE_GOOGLE_MAPS_API_KEY=YOUR_REAL_KEY
```

## Run Project

```bash
npm install
npm run dev
```

Open the URL shown by Vite (usually `http://localhost:5173`).

## Build for Production

```bash
npm run build
npm run preview
```

## Mock Data Example

`src/data/mockDisasters.js` contains initial sample alerts:

- Saigon River Flood Risk
- Minor Earthquake Activity
- Forest Fire Near Da Lat
- Tropical Storm Watch

The app also generates random simulated alerts every 15 seconds when realtime mode is on.

## Integrating Real APIs (Optional)

You can replace mock data with APIs from disaster providers.

Example approach:

1. Create a service file (e.g. `src/services/disasterApi.js`) using Axios.
2. Fetch alerts in `App.jsx` with `useEffect`.
3. Normalize API data into this shape:

```js
{
  id: 'string',
  type: 'flood' | 'earthquake' | 'wildfire' | 'storm',
  severity: 'low' | 'medium' | 'high',
  title: 'string',
  description: 'string',
  timestamp: number,
  position: { lat: number, lng: number }
}
```

## Notes

- Browser notifications require user permission.
- Geolocation requires user permission and HTTPS in production.
- If map does not render, verify API key and enabled APIs.
