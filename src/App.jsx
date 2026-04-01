import {useCallback, useMemo, useState} from "react";
import Sidebar from "./components/Sidebar";
import SearchBox from "./components/SearchBox";
import MapComponent from "./components/MapComponent";
import {initialDisasters} from "./data/mockDisasters";
import {useMockRealtimeDisasters} from "./hooks/useMockRealtimeDisasters";

const DEFAULT_CENTER = {lat: 14.0583, lng: 108.2772};

function App() {
  const [disasters, setDisasters] = useState(initialDisasters);
  const [selectedDisasterId, setSelectedDisasterId] = useState(null);
  const [filterType, setFilterType] = useState("all");
  const [mapCenter, setMapCenter] = useState(DEFAULT_CENTER);
  const [realtimeEnabled, setRealtimeEnabled] = useState(true);
  const [userLocation, setUserLocation] = useState(null);

  const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  const filteredDisasters = useMemo(() => {
    if (filterType === "all") return disasters;
    return disasters.filter((item) => item.type === filterType);
  }, [disasters, filterType]);

  const requestNotification = useCallback(async (eventPayload) => {
    if (!("Notification" in window)) return;
    if (Notification.permission === "default") {
      await Notification.requestPermission();
    }
    if (Notification.permission === "granted") {
      new Notification(`New ${eventPayload.type} alert`, {
        body: `${eventPayload.title} (${eventPayload.severity})`,
      });
    }
  }, []);

  const pushDisaster = useCallback(
    (incoming) => {
      setDisasters((prev) => [incoming, ...prev.slice(0, 19)]);
      setSelectedDisasterId(incoming.id);
      setMapCenter(incoming.position);
      requestNotification(incoming);
    },
    [requestNotification],
  );

  useMockRealtimeDisasters(realtimeEnabled, pushDisaster);

  const handleSearch = async (query) => {
    if (!query) return;
    if (!window.google?.maps?.Geocoder) return;

    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({address: query}, (results, status) => {
      if (status === "OK" && results[0]) {
        const location = results[0].geometry.location;
        setMapCenter({lat: location.lat(), lng: location.lng()});
      }
    });
  };

  const handleFindMe = () => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const current = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setUserLocation(current);
        setMapCenter(current);
      },
      () => {},
    );
  };

  if (!googleMapsApiKey) {
    return (
      <div className="missing-key">
        <h2>Google Maps API key is missing</h2>
        <p>Create a .env file and set VITE_GOOGLE_MAPS_API_KEY.</p>
      </div>
    );
  }

  return (
    <div className="app-shell">
      <Sidebar
        disasters={filteredDisasters}
        activeFilter={filterType}
        onChangeFilter={setFilterType}
        onSelectDisaster={setSelectedDisasterId}
        selectedDisasterId={selectedDisasterId}
        realtimeEnabled={realtimeEnabled}
        onToggleRealtime={() => setRealtimeEnabled((prev) => !prev)}
      />

      <main className="map-panel">
        <div className="top-controls">
          <SearchBox onSearch={handleSearch} />
          <button className="location-btn" type="button" onClick={handleFindMe}>
            Use My Location
          </button>
        </div>

        <div className="map-wrapper">
          <MapComponent
            apiKey={googleMapsApiKey}
            disasters={filteredDisasters}
            selectedDisasterId={selectedDisasterId}
            onSelectDisaster={setSelectedDisasterId}
            userLocation={userLocation}
            center={mapCenter}
          />
        </div>
      </main>
    </div>
  );
}

export default App;
