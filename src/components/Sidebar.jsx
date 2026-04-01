import {DISASTER_TYPES, SEVERITY_COLORS} from "../constants/disasterTypes";
import {formatTime, toSentenceCase} from "../utils/formatters";

function Sidebar({
  disasters,
  activeFilter,
  onChangeFilter,
  onSelectDisaster,
  selectedDisasterId,
  realtimeEnabled,
  onToggleRealtime,
}) {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h1>Disaster Alert</h1>
        <p>Real-time situational dashboard</p>
      </div>

      <div className="filter-group">
        {DISASTER_TYPES.map((item) => (
          <button
            key={item.key}
            className={`filter-chip ${activeFilter === item.key ? "active" : ""}`}
            onClick={() => onChangeFilter(item.key)}
            type="button"
          >
            {item.label}
          </button>
        ))}
      </div>

      <label className="switch-row">
        <span>Realtime simulation</span>
        <input
          type="checkbox"
          checked={realtimeEnabled}
          onChange={onToggleRealtime}
        />
      </label>

      <div className="alert-list">
        {disasters.length === 0 && (
          <p className="empty-state">No alerts match this filter.</p>
        )}
        {disasters.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`alert-item ${selectedDisasterId === item.id ? "active" : ""}`}
            onClick={() => onSelectDisaster(item.id)}
          >
            <div className="alert-title-row">
              <span
                className="severity-dot"
                style={{backgroundColor: SEVERITY_COLORS[item.severity]}}
              />
              <h3>{item.title}</h3>
            </div>
            <p className="meta">
              {toSentenceCase(item.type)} | {toSentenceCase(item.severity)}
            </p>
            <p className="meta">{formatTime(item.timestamp)}</p>
          </button>
        ))}
      </div>
    </aside>
  );
}

export default Sidebar;
