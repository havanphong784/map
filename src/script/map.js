// tạo token 
Cesium.Ion.defaultAccessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIxN2E2YTE1Mi1iZmY2LTRjZTUtYWNmMy1jZjJmMjhjMmZiZWUiLCJpZCI6Mzg3NDgzLCJpYXQiOjE3NzAzMDkyMzV9.MfTKzKZrLpA4q2kcCbNGBrcPCeMZOeIovrNRJkN8G1c";

// tạo đối tượng view
const viewer = new Cesium.Viewer("cesiumContainer", {
  terrain: Cesium.Terrain.fromWorldTerrain(),
  animation: false,
  timeline: false,
});

// Bay tới Việt Nam
viewer.camera.flyTo({
  destination: Cesium.Cartesian3.fromDegrees(
    108.2772, // longitude
    14.0583, // latitude
    300000, // height (closer zoom)
  ),
});
