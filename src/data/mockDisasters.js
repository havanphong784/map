const now = Date.now();

export const initialDisasters = [
  {
    id: "1",
    type: "flood",
    severity: "high",
    title: "Saigon River Flood Risk",
    description:
      "Water level is above warning threshold. Residents should avoid low-lying roads.",
    timestamp: now - 1000 * 60 * 14,
    position: {lat: 10.7769, lng: 106.7009},
  },
  {
    id: "2",
    type: "earthquake",
    severity: "medium",
    title: "Minor Earthquake Activity",
    description:
      "A 4.8 magnitude quake was detected. No major structural damage reported.",
    timestamp: now - 1000 * 60 * 45,
    position: {lat: 21.0285, lng: 105.8542},
  },
  {
    id: "3",
    type: "wildfire",
    severity: "high",
    title: "Forest Fire Near Da Lat",
    description:
      "Emergency units are containing the fire front. Smoke expected nearby.",
    timestamp: now - 1000 * 60 * 9,
    position: {lat: 11.9404, lng: 108.4583},
  },
  {
    id: "4",
    type: "storm",
    severity: "low",
    title: "Tropical Storm Watch",
    description:
      "Wind speed is increasing in coastal districts. Track updates every 30 minutes.",
    timestamp: now - 1000 * 60 * 32,
    position: {lat: 16.0544, lng: 108.2022},
  },
];

const randomOffset = () => (Math.random() - 0.5) * 0.18;

const randomType = () => {
  const types = ["flood", "earthquake", "wildfire", "storm"];
  return types[Math.floor(Math.random() * types.length)];
};

const randomSeverity = () => {
  const levels = ["low", "medium", "high"];
  return levels[Math.floor(Math.random() * levels.length)];
};

export const generateMockDisaster = () => {
  const type = randomType();
  const severity = randomSeverity();

  return {
    id: crypto.randomUUID(),
    type,
    severity,
    title: `${type.toUpperCase()} Alert`,
    description: `Simulated ${type} update. Field teams are validating latest sensor readings.`,
    timestamp: Date.now(),
    position: {
      lat: 14.0583 + randomOffset(),
      lng: 108.2772 + randomOffset(),
    },
  };
};
