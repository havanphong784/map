import {useEffect, useMemo, useState} from "react";
import {GoogleMap, LoadScript, MarkerF} from "@react-google-maps/api";
import DisasterMarker from "./DisasterMarker";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const defaultCenter = {lat: 14.0583, lng: 108.2772};

const mapOptions = {
  disableDefaultUI: true,
  zoomControl: true,
  fullscreenControl: true,
  styles: [
    {elementType: "geometry", stylers: [{color: "#f5f5f5"}]},
    {featureType: "water", stylers: [{color: "#cfe8ff"}]},
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [{color: "#ffffff"}],
    },
  ],
};

const GOOGLE_MAP_LIBRARIES = ["places"];

function MapComponent({
  apiKey,
  disasters,
  selectedDisasterId,
  onSelectDisaster,
  userLocation,
  center,
}) {
  const [mapRef, setMapRef] = useState(null);
  const [loadError, setLoadError] = useState(false);
  const [errorReason, setErrorReason] = useState("");

  const mapCenter = center || defaultCenter;

  const activeDisaster = useMemo(
    () => disasters.find((item) => item.id === selectedDisasterId),
    [disasters, selectedDisasterId],
  );

  useEffect(() => {
    if (!mapRef || !activeDisaster) return;
    mapRef.panTo(activeDisaster.position);
    mapRef.setZoom(8);
  }, [mapRef, activeDisaster]);

  useEffect(() => {
    const originalAuthFailure = window.gm_authFailure;
    window.gm_authFailure = () => {
      setErrorReason(
        "Authentication failed. API key is invalid or blocked by restrictions.",
      );
      setLoadError(true);
      if (typeof originalAuthFailure === "function") {
        originalAuthFailure();
      }
    };

    return () => {
      window.gm_authFailure = originalAuthFailure;
    };
  }, []);

  if (loadError) {
    return (
      <div className="map-load-error">
        <h3>Google Maps failed to load</h3>
        <p>
          Check API key, billing, enabled APIs, and allowed referrer domain.
        </p>
        {errorReason ? <p>{errorReason}</p> : null}
      </div>
    );
  }

  return (
    <LoadScript
      googleMapsApiKey={apiKey}
      libraries={GOOGLE_MAP_LIBRARIES}
      onError={() => {
        setErrorReason(
          "Script load error. Verify internet access and API key restrictions.",
        );
        setLoadError(true);
      }}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={mapCenter}
        zoom={6}
        options={mapOptions}
        onLoad={setMapRef}
      >
        {disasters.map((disaster) => (
          <DisasterMarker
            key={disaster.id}
            disaster={disaster}
            active={activeDisaster?.id === disaster.id}
            onOpen={() => onSelectDisaster(disaster.id)}
            onClose={() => onSelectDisaster(null)}
          />
        ))}

        {userLocation && (
          <MarkerF
            position={userLocation}
            title="Your location"
            icon={{
              path: window.google.maps.SymbolPath.CIRCLE,
              fillColor: "#0ea5e9",
              fillOpacity: 1,
              strokeColor: "#ffffff",
              strokeWeight: 2,
              scale: 7,
            }}
          />
        )}
      </GoogleMap>
    </LoadScript>
  );
}

export default MapComponent;
