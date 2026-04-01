import {InfoWindow, MarkerF} from "@react-google-maps/api";
import {SEVERITY_COLORS} from "../constants/disasterTypes";
import {formatTime, toSentenceCase} from "../utils/formatters";

const markerIcon = (severity) => ({
  path: window.google.maps.SymbolPath.CIRCLE,
  fillColor: SEVERITY_COLORS[severity] || "#ef4444",
  fillOpacity: 1,
  strokeColor: "#111827",
  strokeWeight: 1,
  scale: 8,
});

function DisasterMarker({disaster, active, onOpen, onClose}) {
  return (
    <MarkerF
      position={disaster.position}
      icon={markerIcon(disaster.severity)}
      onClick={onOpen}
    >
      {active && (
        <InfoWindow onCloseClick={onClose}>
          <div className="info-window">
            <h3>{disaster.title}</h3>
            <p>
              <strong>Type:</strong> {toSentenceCase(disaster.type)}
            </p>
            <p>
              <strong>Severity:</strong> {toSentenceCase(disaster.severity)}
            </p>
            <p>
              <strong>Time:</strong> {formatTime(disaster.timestamp)}
            </p>
            <p>{disaster.description}</p>
          </div>
        </InfoWindow>
      )}
    </MarkerF>
  );
}

export default DisasterMarker;
